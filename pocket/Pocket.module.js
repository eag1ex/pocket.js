exports.PocketModule = () => {
    // const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE
    const { objectSize, log, onerror, warn, isArray, isObject, isPromise, validID, isString } = require('./utils')
    const sq = require('simple-q') // nice and simple promise/defer by `eaglex.net`
    const PocketLibs = require('./Pocket.libs')()
    const newProbe = require('./Probe').Probe

    /**
     * TODO ADD to $update `// action/[merge], action/+-*` using regEx
     */

    class PocketModule extends PocketLibs {
        constructor(opts, debug) {
            super(opts, debug)
            if (this.dispatcher) {
                this.dispatcher.initListener().subscribe((z, id) => {
                    const { probe, status } = z || {}

                    if (status === 'error') {
                        // NOTE dispatch data out
                        if (this.debug) log(`[dispatcher] probe id:${probe.id} error`)
                    }

                    if (status === 'open') {
                        if (this.debug) log(`[dispatcher] probe id:${probe.id} created`)
                    }

                    if (status === 'complete') {
                        // NOTE dispatch data out
                        if (this.debug) log(`[dispatcher] probe id:${probe.id} completed`)
                    }
                })
            }
        }

        // ───────────────────────────────────────────────────────────────────────────────────────
        //   :::::: U S E R   A P P L I C A T I O N   C A L L I N G   M E T H O D S : :  :   :    : 
        // ───────────────────────────────────────────────────────────────────────────────────────
        //

        /**
         * @memberof $payload
         */
        payload(data = {}, async, type = 'new') {
            this.d = null
            let isUpdated = null

            // validate payload format
            if (!isObject(data)) return false

            const keys = Object.keys(data)
            // must match all keys
            if (keys.every(el => ['id', 'tasks'].indexOf(el) === -1)) {
                if (this.debug) onerror(`[$payload] id and tasks are required`)
                return false
            }
            if (!isArray(data['tasks'])) {
                if (this.debug) onerror(`[$payload] data.tasks must be an array`)
                return false
            }

            data.id = this.validProjectID(data.id)

            if (!data.id) {
                if (this.debug) onerror(`[$payload] data.id invalid`)
                return false
            }

            if (this.payloadData[data.id] && (!type || type === 'new')) {
                this._lastProjectID = data.id
                // if (this.debug) warn(`[$payload] this payload.id already exists`)
                return true
            }

            let initialProject = this.payloadData[data.id] === undefined // because there is no data set as of yet

            // NOTE on update/new of project we need to reset $filter values, in case 
            if ((this._lastFilterList[data.id] || []).length) this._lastFilterList[data.id] = []

            // NOTE validate our pocket values before generating each `new Probe()`
            for (let val of data['tasks'].values()) {
                if (!val['task']) {
                    if (this.debug) warn('[$payload] task must be set for your tasks')
                    continue
                }
                // validate task 
                if (!this.idRegexValid(val['task']) || val['task'].indexOf('::') !== -1) {
                    if (this.debug) warn('[$payload] invalid taskName, failed idRegexValid validation')
                    continue
                }
                
                const probeID = `${data.id}::${val['task']}`
                if (type === 'update' && !initialProject && this.pocket[probeID]) {
                    if (val['data']) this.pocket[probeID]['data'] = val['data']    
                    if (val['status']) this.pocket[probeID]['status'] = val['status']    

                    // NOTE in case we update status in case it wasnt provided but new data was assigned
                    // status should only be changed after data is set
                    if (!val['status'] && val['data'] && this.pocket[probeID]['status'] === 'open') {
                        this.pocket[probeID]['status'] = 'updated'
                    }
                    if (val['ref']) this.pocket[probeID]['ref'] = val['ref']
                    if (val['error']) this.pocket[probeID]['error'] = val['error']
                    if (val['campaign']) this.pocket[probeID]['campaign'] = val['campaign']
                    
                    isUpdated = true
                    this._lastProjectID = data.id
                    // NOTE after update, payloadData will differ from new Probe{} data
                    // NOTE do not update `payloadData` it is redundant if we donot need it for anything, only update Probes{}
                    /// this.payloadData[data.id]['value']
                    // an existing project do not everride

                    continue
                }

                if (!this.payloadData[data.id]) this.payloadData[data.id] = { value: [], status: 'open', timestamp: new Date().getTime() }
                const exists = this.payloadData[data.id]['value'].filter(z => z.task.indexOf(val.task) !== -1)
                if (exists.length) {
                    if (this.debug && !this.disableWarnings) warn(`the same task "${val.task}" already exists on the payload, you must choose uniq`)
                    continue
                }

                this.payloadData[data.id]['value'].push(val)
                this.lastPocketTimestamp = this.payloadData[data.id]['timestamp']
            }

            // only when updating existance of Probe{}
            if (type === 'update' && this.payloadData[data.id] && !initialProject) {
                this.projectsCache[data.id] = 'open'
                return isUpdated
            }

            if (this.payloadData[data.id]) {
                this.lastProjectID(data.id)
                this.projectsCache[data.id] = 'open' // means created project
                this.distributor()
                    .setDefer(data.id)
                // NOTE required in order for $projectSetAsync to retrun callback to resolve our promise
                this.projectSetDispatcher(data.id).initListener().next({ projectID: data.id })
                return true
            } else return false
        }

        /**
         * ### $projectSetAsync
         * - usage: to call before `$project()/$payload()/$architect` were called
         * - for example you have loaded same `Pocket` instance in another part of your code, now checking for it  in future before $project created. This method can `await $projectSetAsync(projectID)` and continue with already set `$project(...).$get(..).$update(..)` etc
         * @param {*} projectID required, this is your `$project/$payload` id
         */
        $projectSetAsync(projectID = '') {
            const self = this
            projectID = this.lastProjectID(projectID, false, null)
            if (this._projectSetAsync[projectID]) {
                return this._projectSetAsync[projectID].promise()
            }
            /**
             * will subscribe when called the first time and set our simple promise then resolve once the `$payload` is succesfull
             */
            this._projectSetAsync[projectID] = sq()
            this.projectSetDispatcher(projectID).initListener().subscribe(function (z, id) {
                self._projectSetAsync[id].resolve(z)
                this.del() // deletes projectSetDispatcher of self 
            })
            return this._projectSetAsync[projectID].promise()
        }

        /**
         * @memberof probeStatusAsync
         */
        probeStatusAsync(probeID = '') {
            const returnAs = (val) => {
                this.d = val
                return this
            }

            probeID = this.lastProbeID(probeID)
            if (!probeID) return returnAs(null)
            return returnAs(this.pocket[probeID].getStatusAsync)
        }

        /**
         * @memberof $update
         */
        update(dataFrom, mergeData = null, probeID = '') {
            return this._setUpdate(dataFrom, mergeData, probeID, 'update')
        }

        /**
         * @memberof $set
         */
        _set(dataFrom, probeID = '') {
            return this._setUpdate(dataFrom, null, probeID, 'set')
        }

        /**
         * - declated via $get
         * @memberof $get
         */
        _get(probeID = '', self = false) {
            const returnAs = (val) => {
                this.d = val
                return self ? this : this.d
            }

            this.d = null
            probeID = this.lastProbeID(probeID)
            if (!probeID) return returnAs(null)
            else return returnAs(this.pocket[probeID])
        }

        /**
         * ### $activeTasks
         * - list any active tasks for assigned Probes
         * @param {*} payloadID optional, when set will only filter thru given job id (NOT Probe{} ID!)
         */
        $activeTasks(payloadID = '') {
            const returnAs = (val) => {
                this.d = val
                return this
            }

            payloadID = this.lastProjectID(payloadID)
            if (!objectSize(this.pocket)) return returnAs([])
            let tasks = Object.entries(this.pocket).reduce((n, [probeID, probe]) => {
                if (probeID.indexOf(payloadID || '') === 0 && payloadID && this.payloadData[payloadID]) n.push(probe['task'])
                else if (!payloadID) n.push(probe['task'])
                return n
            }, [])
            return returnAs(tasks)
        }

        /**
         * @memberof $ready
         */
        ready(payloadID = '') {
            this.d = null

            if (!this._ready[payloadID]) throw (`ready[payloadID] is not set, maybe you called it before $payload()`)
            return this._ready[payloadID].promise()
        }

        //
        // ──────────────────────────────────────────────────────
        //   :::::: E N D : :  :   :    :     :        :          
        // ──────────────────────────────────────────────────────  

        // extends  `$update` and `$set`
        _setUpdate(dataFrom, mergeData = null, probeID = '', type = 'update') {
            const returnAs = (val) => {
                this.d = val
                return this
            }

            let id = this.lastProbeID(probeID)
            if (!id) {
                if (this.debug) onerror(`[$update] must specify id`)
                return returnAs(false)
            }

            if (!isObject(dataFrom)) {
                if (this.debug) warn(`[$update] dataFrom must be an Object`)
                return returnAs(false)
            }

            if (!this.pocket[id]) {
                if (this.debug) onerror(`[$update] this.pocket with id:${id} not found`)
                return returnAs(false)
            }

            let updated = false
            this._lastProjectID = id
            // reorder dataFrom, make sure if `status` exists, it is shifted to last position, so the Probe{} doent change state before other values got chance to do so, nice!

            // we need to convert dataFrom{} to dataFrom[]>array to achieve this
            dataFrom = Object.entries(dataFrom).reduce((n, [key, value]) => {
                const pos = this.probeProps.indexOf(key) // new order
                if (this.probeProps[pos] === key) n.push({ inx: pos, data: { [key]: value } })
                return n
            }, [])

            for (let inx = 0; inx < dataFrom.length; inx++) {
                if ((dataFrom[inx] || {})['data'] === undefined) continue
                const [key, value] = Object.entries(dataFrom[inx]['data'])[0]
                if (this.pocket[id][key] !== undefined) {
                    if (key === 'data') {
                        if (mergeData === true) this.pocket[id][key] = Object.assign({}, this.pocket[id][key], value)
                        else this.pocket[id][key] = value
                    } if (key === 'status' || key === 'ref' || key === 'error' || key === 'campaign') this.pocket[id][key] = value
                    updated = true
                    continue
                } else {
                    if (this.debug) warn(`[$update] not a valid prop/value: { ${key}:${this.pocket[id][key]} }`)
                }
            }
            // when setting new data, using `$set()` we should clear any cached Probes and realated data
            if (updated && type === 'set') {
                this.clearStoreTransfers(id)
                if (this.$transfer_lastID === id) this.$transfer_lastID = ''
                if (this._$cached_data[id]) delete this._$cached_data[id]
            }

            // if(updated && type==='update') { }
            return returnAs(updated)
        }

        /**
         * - sets defer for `$ready()` initially after calling payload 
         * @param {*} id required
         */
        setDefer(id) {
            id = validID(id)
            if (!id) throw 'id must be set'

            if (!this._ready[id]) this._ready[id] = sq()

            if (!objectSize(this.pocket)) {
                const msg = `[setDefer] probe is empty, so nothing set, id:${id}`
                if (this.debug) onerror(msg)
                this._ready[id].reject(msg)
                return null
            }

            const pocketSet = Object.values(this.pocket).filter(z => z.id.indexOf(id) !== -1)
            if (!pocketSet.length) {
                const msg = `[setDefer] no pocketSet found for id:${id} `
                if (this.debug) onerror(msg)
                this._ready[id].reject(msg)
                return null
            }

            try {
                const userOutput = (pock) => {
                    const output = {}
                    if (!isObject(pock)) return null
                    for (let i = 0; i < this.probeProps.length; i++) {
                        const prop = this.probeProps[i]
                        if (pock[prop] !== undefined && pock[prop] !== null) output[prop] = pock[prop]
                    }
                    return output
                }
                /**
                 * IMPORTANT:
                 * when our pocketSet for each this.pocket[id] is marked 'complete'
                 * `Probe().resolve(...)` is called, and Promise.all is waiting for `pocketSet` to complete
                 */
                Promise.all(pocketSet.map(z => z.sq.promise())).then(z => {
                    const output = z.map(p => userOutput(p.probe)).filter(n => !!n)
                    this._ready[id].resolve(output)
                }, err => {
                    // should unlikely happen since we dont have any rejects set
                    onerror(`[setDefer] Promise.all`, err)
                })

                return true
            } catch (err) {
                onerror(`[setDefer]`, err)
            }

            return false
        }

        /**
         * - distribute payloadData, each to `new Probe()`
         */
        distributor() {
            for (let [key, el] of Object.entries(this.payloadData)) {
                if (this.lastPocketTimestamp > el['timestamp']) continue // no new entries

                // omit done
                if (el.status === 'complete' || el.status === 'send' || el.status === 'error') continue

                for (let value of el.value.values()) {
                    const pl = { id: key, ...value }
                    const pocketSet = this.setProbe(pl)
                    if (!pocketSet) onerror(`probe for id:${key} already exists`)
                }
            }
            return this
        }

        /**
         * - every new probe `id` must be: format `id:::taskName`
         * required: `{id,task}`
         * optional: `{campaign}`
         * @param {*} opts
         */
        setProbe(opts = {}) {
            if (!opts.id || !opts.task) throw ('id and task both must be set')
            if (!validID(opts.id)) throw ('opts.id not valid')

            const uid = `${opts.id}::${opts.task}`
            if (this.pocket[uid]) {
                if (this.debug) log(`[setProbe] probe: ${uid} already set`)
                return null
            }
            try {
                opts.id = uid
                const emitter = this.dispatcher !== null ? this._emit.bind(this) : null
                const p = new this.Probe(opts, {
                    disableWarnings: this.disableWarnings, // disable some less relevant warning messages
                    onChange: this._onChange, 
                    emitter, 
                    completeOnNull: this.completeOnNull }, this.debug)
                this.pocket[uid] = p
            } catch (err) {
                onerror(err)
                return null
            }
            return this.pocket[uid]
        }

        /**
         * set new probe model
         * - every new task has a set of requirements. Once status is `complete` and data available, probe sends a dispatch with probe information `(if opts.dispatcher===true)`.
         * methods:`{get,all}` props: `{id,data,task,status,campaign}`
         * 
         *  @param {*} opts.id required
         *  @param {*} opts.task required
         *  @param {*} opts.campaign optional
         * 
         * - `Probe` is resolved once `sq.resolve()` is called, sq => `Simple Q` our plugin
         * @memberof Probe.js module
         */
        get Probe() {
            return newProbe()
        }

        /**
         * - emit extends with `Dispatcher` to be used by every new Probe{} as an emitter `(if opts.dispatcher===true)`
         * @param {*} obj required
         */
        _emit(obj) {
            if (!obj) return null
            if (!this.dispatcher) return null
            try {
                this.dispatcher.initListener().next(obj)
                return true
            } catch (err) {
                onerror(`[_emit] dispatcher did not emit`)
                return null
            }
        }

        /**
         * - delete completed `pocketSet`
         */
        deletePocketSet(id) {
            if (!id) return
            if (Object.values(this.pocket).length) {
                for (let poc of Object.values(this.pocket)) {
                    if (this._$cached_data[poc.id]) delete this._$cached_data[poc.id]
                    if (poc.id.includes(id)) delete this.pocket[poc.id]
                }
            }
            if (this.payloadData[id]) delete this.payloadData[id]
            if (this._ready[id]) delete this._ready[id]

            // these  two are together
            if (this._projectSetDispatcher[id] !== undefined) delete this._projectSetDispatcher[id]
            if (this._projectSetAsync[id]) delete this._projectSetAsync[id]
            if (this._lastFilterList[id]) delete this._lastFilterList[id]

            // from PocketArchitect dynamicly assigned
            try {
                if (this.architectConfig[id]) delete this.architectConfig[id]
            } catch (err) {
                // blah
            }

            // empty self
            this.clearStoreTransfers(id)
        }
    }

    class PocketModuleExt extends PocketModule {
        constructor(opts, debug) {
            super(opts, debug)
        }

        /**
         * ### $removeProject
         * - removes all Probes and references relating to `projectID`
         * @param {*} projectID 
         */
        $removeProject(projectID) {
            projectID = !isString(projectID) ? '' : projectID
            projectID = this.lastProjectID(projectID) // also updates last selector reference
            this.deletePocketSet(projectID)
            return this
        }

        /**
         * - you can also use it on concurent payloads to existing `projectID`, once initial project is created overy other call will update each Probe{}.data/status, based on payloadData
         * @param {*} data `required`
         * @param {*} async `override current opts.sync for this payload`
         * @param {*} type optional, new/update, `update`: if we call on an existing project we can update `data/status properties` of all assigned tasks at once
         * 
         * - `initialize new payload, for as many tasks`
         * - `sets a multi task with instructions:`
         * - `data = {
                id: '', // 1 id for all tasks
                tasks: [{ taskName: '', data: '', campaign: '' }]
            }`

         * - `call distributor and setDefer`
         * @extends payload
         */
        $payload(data, async, type) {

            const returnAs = (val) => {
                this.d = val
                return this
            }
            const asAsync = async !== undefined ? async : this.async // override if set
            if (asAsync && isPromise(data)) return returnAs(data.then(z => this.payload(z, false, type), err => err))
            if (!asAsync && !isPromise(data)) return returnAs(this.payload(data, false, type))
            else {
                if (this.debug) onerror(`[payload] with opts.async=true, data must be a promise, or do not set async when not a promise`)
                if (asAsync) return returnAs(Promise.reject())
                else return returnAs(false)
            }
        }

        /**
         * ### $project
         * - `an alias on $payload(...), can use either`
         * - refer to `$payload` for specifications :)
         * @extends $payload
         */
        $project(...args) {
            return this.$payload(...args)
        }

        /**
          * - resolves currently active `$payload(...)`
          * - `after completion of Pocket, instance data for all Probes is deleted`
          * - can be called even before project was declared thanks to callback dispather `$projectSetAsync()`
          * @param {*} payloadID ,required
          * @param allowsMultiple optional, when set to true will allow multiple calls to resolved data
          * @extends ready
          */
        $ready(payloadID, allowsMultiple = false) {

            try {

                const returnAs = (val) => {
                    this.d = val
                    if (this.d && !allowsMultiple) this.d.catch(warn)
                    return this
                }

                // sofl validation for non existant `payloadID` if called before declaration of a project
                let _payloadID = this.lastProjectID(payloadID, false, null)
                if (!payloadID && _payloadID) payloadID = _payloadID // grab last assigned id incase provided none

                // in case it was called the second time, when already resolved!
                if (this.projectsCache[payloadID] === 'complete' && !allowsMultiple) {
                    return returnAs(Promise.reject(`[$ready] project: ${payloadID} already complete`))
                }

                if (this._ready_method_set[payloadID] !== undefined && !allowsMultiple) {
                    if (this._ready_method_set[payloadID] === true) {
                        return returnAs(Promise.reject(`[$ready] project: ${payloadID} already complete, cannot recall same $ready`))
                    }
                    if (this._ready_method_set[payloadID] === false) {
                        return returnAs(Promise.reject(`[$ready] project: ${payloadID} you already declared $ready somewhere else, this call is ignored`))
                    }
                }

                if (!_payloadID) throw (`payloadID must be set`)

                // we wrap it if on ready project so it allows declaring `${$ready()}` even before $project was created, cool ha!
                const p = this.$projectSetAsync(_payloadID).then(({ projectID }) => {
                    return this.ready(projectID).then(z => {

                        // NOTE to help problems with loops and using chaining with last selector
                        // will gradualy delete project with specified timeout
                        if (!this.deleteWithDelay) this.deletePocketSet(projectID)
                        else {
                            setTimeout(() => {
                                this.deletePocketSet(projectID)
                            }, this.deleteWithDelay)
                        }

                        this.projectsCache[projectID] = 'complete'
                        this._ready_method_set[_payloadID] = true

                        return z
                    }, Promise.reject)
                    
                }, Promise.reject)

                this._ready_method_set[_payloadID] = false
                return returnAs(p)

            } catch (error) {
                if (!this.disableWarnings) onerror(error)
                
            }
        }
    }
    const PocketArchitect = require('./Pocket.architect')(PocketModuleExt)
    const PocketSelectors = require('./Pocket.selectors')(PocketArchitect)
    return PocketSelectors
}
