module.exports = () => {
    // const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE
    const { log, onerror, warn, isArray, isObject, isPromise, validID } = require('./utils')
    const sq = require('simple-q') // nice and simple promise/defer by `eaglex.net`
    const newProbe = require('./Probe')

    class PocketModule {
        /**
         * @param {*} opts.async, when set, allow $payload(`data`) to be async object
         * @param {*} opts.dispatcher, when set to true, loads external library `Dispatcher`
         * @param {*} debug optional
         */
        constructor(opts = {}, debug) {
            this.debug = debug || false
            this.async = (opts || {}).async || null
            this.$getChain = (opts || {}).$getChain || null // in case you want to preset chaining thru `$get()`
            // when set enables dispatcher to communicate directly with `probe.js`
            this.dispatcher = (opts || {}).dispatcher ? require('../libs/dispatcher')() : null
            this.pocket = {} // example this.pocket[`abc::taskName`] returns Probe Instance
            this.payloadData = {}// each payload by id
            this.lastPocketTimestamp = 0
            this.lastPayloadID = null // when chaining access last used id
            this.lastProbeID = null // when chaining access last used id
            this._ready = {} // collect all ready example: `{id:Promise}`
            this.d = undefined // user dynamic value
            if (this.dispatcher) {
                this.dispatcher.initListener().subscribe(z => {
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
         * ### $payload
         * @prop {*} data `required`
         * @prop {*} async `override current opts.sync for this payload`
         * 
         * - `initialize new payload, for as many tasks`
         * - `sets a multi task with instructions:`
         * - `data = {
                id: '', // 1 id for all tasks
                tasks: [{ taskName: '', data: '', compaign: '' }]
            }`

         * - `call distributor and setDefer`
         */
        $payload(data = {}, async) {
            this.d = null

            // validate payload format
            if (!isObject(data)) return false
            
            const keys = Object.keys(data)
            // must match all keys
            if (keys.every(el => ['id', 'tasks'].indexOf(el) === -1)) {
                if(this.debug) onerror(`[$payload] id and tasks are required`)
                return false
            }
            if (!isArray(data['tasks']))  {
                if(this.debug) onerror(`[$payload] data.tasks must be an array`)
                return false
            }
            // make sure our id's all are lowercase
            data.id = validID(data.id)

            const idDeepTest = (str) => {
                if ((str ||'').split(' ').length > 1) return false
                const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
                const regx = new RegExp(pat, 'gi')
                if (regx.test(str)) {
                    if(this.debug) onerror(`[$payload] data.id invalid regx: ${regx}`)
                    return false
                }
                return true
            }

            if(!idDeepTest(data.id)) return false

            if (!data.id) {
                if(this.debug) onerror(`[$payload] data.id invalid`)
                return false
            }

            if(this.payloadData[data.id]){
                if(this.debug) warn(`[$payload] this payload.id already exists`)
                return false
            }

            this.lastProbeID = null
            // NOTE validate our pocket values before generating each `new Probe()`
            for (let val of data['tasks'].values()) {
                if (!val['task']) {
                    if (this.debug) log('task must be set for your tasks')
                    continue
                }
                if (!this.payloadData[data.id]) this.payloadData[data.id] = { value: [], status: 'open', timestamp: new Date().getTime() }
                const exists = this.payloadData[data.id]['value'].filter(z => z.task.indexOf(val.task) !== -1)
                if (exists.length) {
                    if (this.debug) warn(`the same task "${val.task}" already exists on the payload, you must choose uniq`)
                    continue
                }

                this.payloadData[data.id]['value'].push(val)
                this.lastPocketTimestamp = this.payloadData[data.id]['timestamp']
            }
            if (this.payloadData[data.id]) {
                this.lastPayloadID = data.id
                this.distributor()
                    .setDefer(data.id)
                    
                return true
            } else return false
            
        }

        /**
         * ### $get
          * - `get probe by 'id::taskName'`
          * - `returns instance`
          *  methods:`{get,all}` props: `{id,data,tasks,status}`
          * @param {*} probeID required, example format: `${payload.id}::taskName`
          * @param {*} self optional, in case you want to chain, and access `Probe` through `...).d`
         */
        $get(probeID = '', self = null) {

            if(!probeID) probeID = this.lastProbeID
            probeID = this.validProbe(probeID)
            if(probeID) this.lastProbeID = probeID
            if (!probeID) return null

            self = (self === false) ? false : this.$getChain
            if (self) {
                this.d = this.pocket[probeID]
                return this
            }
                  
           return this.pocket[probeID]
        }

        /**
         * ### $probeStatusAsync
         * - return last probe status, this is a dynamic Promise, creates new promise every time status is changed, so then it needs to bu called again to get latest update
         * @param {*} probeID 
         */
        $probeStatusAsync(probeID=''){

            if(!probeID) probeID = this.lastProbeID   
            probeID = this.validProbe(probeID)
            if(!probeID) this.lastProbeID = probeID

            const returnAs = (val)=>{
                this.d = val
                return this
            }

            if(!probeID) return returnAs(null)
            return returnAs(this.pocket[probeID].getStatusAsync)
        }

        /**
         * ### $update
         * - update Probe/task, for convenience, so we dont have do this, example: `pc.$get('abc123::grab').status='complete'`
         * @param {*} probeID required, example format: `${payload.id}::taskName`
         * @param {*} dataFrom required, must specify what to update on the Probe, example: `dataFrom:{data:'coke',status:'complete',compaign:'cocacola'}`
         * @prop {*} mergeData optional if `true` will merge: `Object.assing({},probe[id].data,mergeData['data'])`
         */
        $update(probeID='', dataFrom, mergeData = null) {

            if(!probeID) probeID = this.lastProbeID
            let id = this.validProbe(probeID)
            if(id) this.lastProbeID = id

            const returnAs = (val)=>{
                this.d = val
                return this
            }
            if (!id) {
                if (this.debug) onerror(`[$update] must specify id`)
                return returnAs(false)
            }

            if (!isObject(dataFrom)) {
                if (this.debug) warn(`[$update] dataFrom must be an `)
                return returnAs(false)
            }

            if (!this.pocket[id]) {
                if (this.debug) onerror(`[$update] this.pocket with id:${id} not found`)
                return returnAs(false)
            }
            
            let updated = false
            // reorder dataFrom, make sure if `status` exists, it is shifted to last position, so the Probe doent change state before other values got chance to do so, nice!

            // we need to convert dataFrom{} to dataFrom[]>array to achieve this
            dataFrom = Object.entries(dataFrom).reduce((n, [key, value]) => {
                const pos = this.probeProps.indexOf(key)  // new order
                if (this.probeProps[pos] === key) n.push({ inx: pos, data: { [key]: value } })
                return n
            }, [])

            for (let inx = 0; inx < dataFrom.length; inx++) {
                if ((dataFrom[inx] || {})['data'] === undefined) continue
                const [key, value] = Object.entries(dataFrom[inx]['data'])[0]
                if ((key !== 'id' && key !== 'task') && this.pocket[id][key] !== undefined) {
                    if (key === 'data') {
                        if (mergeData === true) this.pocket[id][key] = Object.assign({}, this.pocket[id][key], value)
                        else this.pocket[id][key] = value
                    } else this.pocket[id][key] = value

                    updated = true
                    continue
                } else {
                    if (this.debug) warn(`[$update] not a valid propName: ${key}`)
                }
            }           
            return returnAs(updated)
        }

        /**
         * ### $activeTasks
         * - list any active tasks for assigned Probes
         * @param {*} payloadID optional, when set will only filter thru given job id (NOT Probe ID!)
         */
        $activeTasks(payloadID = '') {

            if(!payloadID) payloadID = this.lastPayloadID 
            payloadID = validID(payloadID)
            this.lastPayloadID = payloadID

            const returnAs = (val)=>{
                this.d = val
                return this
            }
            if (!Object.entries(this.pocket).length) return returnAs([])
            let tasks = Object.entries(this.pocket).reduce((n, [probeID, probe]) => {
                if (probeID.indexOf(payloadID || '') === 0 && payloadID && this.payloadData[payloadID]) n.push(probe['task'])
                else if (!payloadID) n.push(probe['task'])
                return n
            }, [])
            return returnAs(tasks)
        }

        /**
         * ### $ready
         * - resolves currently active `$payload(...)`
         * - `after completion of Pocket, instance data for all Probes is deleted`
         * @param {*} payloadID `required`
         */
        $ready(payloadID='') {
            this.d = null
            if(!payloadID) payloadID = this.lastPayloadID
            payloadID = validID(payloadID)
           
            if (!payloadID) throw (`payloadID must be set`)

            if (!this._ready[payloadID]) throw (`ready[payloadID] is not set, maybe you called it before $payload()`)
            if(payloadID) this.lastPayloadID = payloadID
            return this._ready[payloadID].promise()
        }

        //
        // ──────────────────────────────────────────────────────
        //   :::::: E N D : :  :   :    :     :        :          
        // ──────────────────────────────────────────────────────

        /**
         * ### validProbe
         * - returns a valid probe
         * @param {*} probeID required
         */
        validProbe(probeID){
            probeID = validID(probeID)
            if (!probeID) return null

            if (!this.pocket[probeID]) {
                if (this.debug) warn(`[get] did not find probe with probeID ${id}`)
                return null
            }
            if (probeID.indexOf(`::`) === -1) return null
            return probeID
        }


        /**
         * ### probeProps
         * - `each probe props that can be available and send on ready`
         * - `order is important, keep 'status' last`
         * - only updatable props are: `'compaign', 'data', 'status'(limited)`
         */
        get probeProps() {
            return ['compaign', 'data', 'task', 'id', 'status']  
        }

        /**
         * - sets defer for `$ready()` initially after calling payload 
         * @param {*} id required
         */
        setDefer(id) {
            id = validID(id)
            if (!id) throw 'id must be set'

            if (!this._ready[id]) this._ready[id] = sq()

            if (!Object.entries(this.pocket).length) {
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
                        if (pock[prop]) output[prop] = pock[prop]
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
         * optional: `{compaign}`
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
                const p = new this.Probe(opts, this.debug)
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
         * methods:`{get,all}` props: `{id,data,task,status,compaign}`
         * 
         *  @param {*} opts.id required
         *  @param {*} opts.task required
         *  @param {*} opts.compaign optional
         * 
         * - `Probe` is resolved once `sq.resolve()` is called, sq => `Simple Q` our plugin
         */
        get Probe() {
            return newProbe(this)
        }

        /**
         * - emit extends with `Dispatcher` to be used by every new Probe as an emitter `(if opts.dispatcher===true)`
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
            if (Object.values(this.pocket).length) {
                for (let poc of Object.values(this.pocket)) {
                    if (poc.id.includes(id)) delete this.pocket[poc.id]
                }
            }
            if (this.payloadData[id]) delete this.payloadData[id]
            if (this._ready[id]) delete this._ready[id]
        }
    }

    return class PocketModuleExt extends PocketModule {
        constructor(opts, debug) {
            super(opts, debug)
        }

        /**
         * - extend payload async data handling
         */
        $payload(data, async) {
            const returnAs = (val)=>{
                this.d = val
                return this
            }
            const asAsync = async !== undefined ? async : this.async // override if set
            if (asAsync && isPromise(data)) return returnAs(data.then(z => super.$payload(z), err => err))
            if (!this.async && !isPromise(data)) return returnAs(super.$payload(data))
            else {
                if (this.debug) onerror(`[payload] with opts.async=true, data must be a promise, or do not set async when not a promise`)
                if (asAsync) return returnAs(Promise.reject())
                else return returnAs(false)
            }
        }

        $ready(payloadID) {

            const returnAs = (val)=>{
                this.d = val
                return this
            }

           const p = super.$ready(payloadID).then(z => {
                this.deletePocketSet(payloadID)
                return z
            }, err => Promise.reject(err))

           return returnAs(p) 
        }
    }
}
