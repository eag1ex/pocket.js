/**
 * ### PocketLibs
 * - Top of the stack class of `PocketModule`, all `opt` initial `properties` are set here
 */
module.exports = () => {
    const { objectSize, warn, onerror, validID, copy, log, isString } = require('x-utils-es/umd')
    return class PocketLibs {
        /**
         * @param {*} opts.async, when set, allow $payload(`data`) to be async object
         * @param {*} opts.dispatcher, when set to true, loads external library `Dispatcher`
         * @param {*} debug optional
         */
        constructor(opts = {}, debug) {
            this.debug = debug || false
            this.async = (opts || {}).async || null
            this._onChange = (opts || {}).onChange || null // loads watch for changes Probe asset 
            this.completeOnNull = (opts || {}).completeOnNull || null // Allow Probe to complete even if data is null
            this.disableWarnings = (opts || {}).disableWarnings // disable some less relevant warning messages

            // when set enables dispatcher to communicate directly with `probe.js`
            this.dispatcher = (opts || {}).dispatcher ? require('../libs/dispatcher')() : null
            this.pocket = {} // example this.pocket[`abc::taskName`] returns Probe{} Instance
            this.payloadData = {}// each payload by id
            this.lastPocketTimestamp = 0
            this._lastProjectID = null // last cached reference
            this._lastProbeID = null // last cached reference
            this._$cached_data = {/** id:{} */ }// stores last captured data when calling `$data(..)`
            this.$transfer_lastID = '' // set when we call `$transfer()` and reset after `$to()`
            this._ready = {} // collect all ready example: `{id:Promise}`
            this._ready_method_set = {/** [id]:true */}// ignore subsequent calls to $ready method 
            this.d = undefined // NOTE user reference data, carefull when using selectors from previous target, always access last
            this._projectSet = {/** projectID:promise */ }
            this._transferCached = [ /** {timestamp,fromProbeID,data} */]
            this._projectSetDispatcher = {/** id:dispatcher */ }
            this._projectSetAsync = {/** id:SQ */ } // collect all $projectSetAsync promisses
            this._lastFilterList = {/** id:[probe references only] */ }
            this.projectsCache = {/** [id]:'open/complete' */}// keep reference of completed projects, this variable is never purged
            this.deleteWithDelay = (opts || {}).deleteWithDelay || 1000// after project is completed and $ready(..) is resolved set delay to when it should be deleted
            // this.createArchitect() // only when pocketInstance is set
        }

        // NOTE abolished functional class, doesnt work well with es6 class
        // createArchitect() {
        //     if (this.architect && !this["architect_set"]) {
        //         try {
        //             const Architect = require('./Pocket.architect')()
        //             Architect.prototype = Object.create(this)
        //             Architect.prototype.constructor = Architect             
        //             Object.assign(this, new Architect())
        //         } catch (err) {
        //             console.log(`[createArchitect] error`, err)
        //         }

        //         this["architect_set"] = true
        //     }
        // }

        /**
         * - return latest Probe by reference from `this._lastFilterList[projectID]`
         * @param {*} projectID 
         */
        // getProbesByFilterRef(projectID) {
        //     if (!projectID) return []
        //     if (!this._lastFilterList[projectID]) return []
        //     return this._lastFilterList[projectID].reduce((n, ref, inx) => {
        //         if (ref.id && ref.isNONE === undefined && this.pocket[ref.id]) n.push(this.pocket[ref.id])
        //         else if (this.pocket[ref.id]) n.push({ id: ref.id, isNONE: true })
        //         return n
        //     }, []).filter(z => !!z)
        // }

        /**
         * ### projectSetDispatcher
         * - create new dispather to act as a callback for setting new projects in future. NOTE once project is created and using $architect /$project/$payload to update will not recreate `projectSetDispatcher`
         * - works with `$projectSetAsync`
         * @param {*} projectID 
         */
        projectSetDispatcher(projectID) {
            if (!projectID) {
                if (this.debug) onerror(`[projectSetDispatcher] projectID must be set`)
                return null
            }
            if (this._projectSetDispatcher[projectID]) return this._projectSetDispatcher[projectID]
            if (!this._projectSetDispatcher[projectID]) this._projectSetDispatcher[projectID] = require('../libs/dispatcher')(projectID)
            return this._projectSetDispatcher[projectID]
        }

        /**
         * @param {*} projectID
         * @returns array [Probe{},...] of selected project
         */
        projectProbeList(projectID) {
            if (!projectID) return []
            return Object.entries(this.pocket).filter(([id]) => id.indexOf(projectID) === 0).map(([id, probe]) => probe)
        }

        /**
         * ### clearStoreTransfers
         * - clear any pending transfers
         * @param {*} projectID required
         */
        clearStoreTransfers(projectID = '') {
            if (!projectID) return
            let cleared = false
            if (this._transferCached.length) {
                this._transferCached.forEach((element, i) => {
                    const { fromProbeID } = element || {}
                    if (!fromProbeID) return
                    if (fromProbeID.indexOf(projectID) !== -1) {
                        this._transferCached.splice(i, 1)
                        cleared = true
                        if (this.debug) log('[pocket]', `[clearStoreTransfers] transferCached for probeID: ${fromProbeID} has been removed`)
                    }
                })
            }
            return cleared
        }
        /**
         * ### storeTransfers
         * - caches pending transfers when using `$transfer` with `$to()`
         * - access last data by timestamp
         * @param {*} fromProbeID  required
         * @param {*} data required
         */
        storeTransfers(fromProbeID, data) {
            this._transferCached.push({ timestamp: new Date().getTime(), fromProbeID, data })
            return this._transferCached
        }

        /**
         * ### accessLastValidTransfer
         * returns latest transfer that is inRange from `fromAverageTimeHasPast` in `ms` vs current Date.getTime
         * - removes _transferCached that was found 
         */
        accessLastValidTransfer(fromAverageTimeHasPast = 100) {
            if (!this._transferCached.length) return {}

            this._transferCached.sort((a, b) => a.timestamp - b.timestamp)
            const transferCachedCopy = copy(this._transferCached)

            const coundCache = transferCachedCopy.reduce((n, el, i) => {
                const { timestamp } = el

                // calculate max wait between transfers, so if we have timeout we can only wait as long as `fromAverageTimeHasPast` 
                const currentOffset = new Date().getTime() + fromAverageTimeHasPast
                const diff = (currentOffset - timestamp) - fromAverageTimeHasPast
                const timeInRange = (currentOffset > timestamp) && diff <= fromAverageTimeHasPast
                if (timeInRange) {
                    n = el
                    // delete found cache
                    this._transferCached.splice(i, 1)
                }
                return n
            }, {})

            if (!objectSize(coundCache)) return {}
            else return coundCache
        }

        /**
         * ### selectByTask
         * - works with `PocketSelectors class`, when `::taskNames, taskName` are specified, extracts full probeID by matching previous pointer reference and updates `lastProbeID()`        
         * - returns valid probeID or null
         * @param {*} probeID {*} required, but optional
         */
        selectByTask(taskOrProbeID = '', updateLastProbeID = null) {
            taskOrProbeID = !isString(taskOrProbeID) ? '' : taskOrProbeID
            if (!this.idRegexValid(taskOrProbeID) && taskOrProbeID) return null
            if (taskOrProbeID.indexOf(':') > 0 && !this.pocket[taskOrProbeID]) {
                if (this.debug) warn('[pocket]', `[selectByTask] when using '::' prefix selector, it should come at 0 index`)
                return null
            }

            if (taskOrProbeID.split(":").length > 3 || taskOrProbeID.split(":").length === 2) {
                if (this.debug) warn('[pocket]', `[selectByTask] wrong taskName :${taskOrProbeID}, allowed prefix is '::taskName'`)
                return null
            }

            if (updateLastProbeID) this.lastProbeID(taskOrProbeID, true) // if a match we receive below updated `_lastProbeID` 
            if (this.pocket[taskOrProbeID]) {
                if (updateLastProbeID) this.lastProbeID(taskOrProbeID)
                return taskOrProbeID // we have a valid ref so use that
            }

            /**
             * - generate valid probeID `${projectID}::${probeTaskName}` //
             */
            const dynamicProbeID = (name) => {
                const n = name.split("::")[1] || name // in case we are using prefixed taskName, example "::cocacola"
                const matchByProbeID = (this._lastProbeID || '').indexOf(n) > 0
                if (matchByProbeID && n) return this._lastProbeID
                else if (this._lastProjectID && n) return this._lastProjectID + `::` + n
                return this._lastProbeID
            }

            const newProbeID = dynamicProbeID(taskOrProbeID)
            if (!newProbeID) {
                if (this.debug) warn('[pocket]', `[selectByTask] newProbeID was not found from taskOrProbeID: ${taskOrProbeID}`)
            } else if (updateLastProbeID) this.lastProbeID(newProbeID)
            return newProbeID
        }

        /**
         * ### lastProjectID
         * - every project is a job initiated by payload, so `payload.id === lastProjectID()`
         * @param type strictly validate against scoped projecjID
         */
        lastProjectID(projectID = '', debug = null, type = 'strict') {
            if (!projectID && this._lastProjectID) projectID = this._lastProjectID
            if (projectID) projectID = this.validProjectID(projectID, debug)
            if (projectID && this.payloadData[projectID]) this._lastProjectID = projectID
            if (!this.payloadData[projectID] && type === 'strict') return null
            if (!projectID) return null
            if (projectID && !this._lastProjectID) this._lastProjectID = projectID
            return projectID
        }

        /**
         * ### lastProbeID
         * - return last reference to probeID
         * - cache with `_lastProbeID`
         * @param {*} probeID 
         */
        lastProbeID(probeID = '', debug = null) {
            if (!probeID && this._lastProbeID) probeID = this._lastProbeID
            if (probeID) probeID = this.validProbe(probeID, debug)
            if (probeID && this.pocket[probeID]) this._lastProbeID = probeID
            if (!probeID) return null
            if (!this.pocket[probeID]) return null
            return probeID
        }

        /**
         * ### validProjectID
         * - `test if projectID is valid`
         * - return valid id
         * @param {*} id required
         */
        validProjectID(id, debug = null) {
            id = validID(id)
            if (!id) return null
            if ((id || '').split(' ').length > 1) return null
            if (!this.idRegexValid(id)) return null
            return id
        }

        /**
         * ### validProbe
         * - returns a valid probe
         * @param {*} probeID required
         */
        validProbe(probeID, debug = null) {
            probeID = validID(probeID)
            if (!probeID) return null
            if (!this.idRegexValid(probeID)) return
            if (probeID.indexOf(`::`) === -1) return null
            // if (!this.pocket[probeID]) {
            //     if (this.debug && debug === null) warn('[pocket]',`[validProbe] did not find probe with probeID ${probeID}`)
            //     return null
            // }
            return probeID
        }

        /**
         * ### dataPropSelector
         * - works with `$data()` and `$cached()` user selectors 
         * - refer to `PocketSelectors` module
         * @param {*} probeID required
         * @param {*} dataProp optional
         * @param {*} self optional
         * @param {*} probeData{} required our referencing probeData{}
         */
        dataPropSelector(type = 'data()', probeID = '', dataProp = {}, self = false, probeData = {}) {
            let selectedData
            /**
             * NOTE if calling via `$cached()`,  `probeData` already comes as `this._$cached_data` so dont need to cache  it again!
             */
            try {
                /**
                  * NOTE IMPORTANT
                  * assembly order: `dataProp < probeData > selectedData`
                  * if are asking for multiple, example `selectedData:{a,b,value:1111}`, will return those available 
                  * as an Object{}. But if asking for only 1 `selectedData:{value:1111}`, will return the value `11111`, only because we know what we asked for initially
                  */
                selectedData = Object.entries(dataProp).reduce((n, [k, val], i) => {
                    if (probeData[k] !== undefined) n[k] = probeData[k]
                    return n
                }, {})

                if (!objectSize(selectedData)) selectedData = undefined

                // selct only value if `dataProp` === `selectedData` is size ( 1 + 1 === 2 )
                if (objectSize(selectedData) + objectSize(dataProp) === 2) selectedData = Object.values(selectedData).shift()

                // if coming from `$data()` we cache our data 
                if (type === 'data()') this._$cached_data[probeID] = selectedData
                return self ? this : selectedData
            } catch (err) {
                if (this.debug) warn('[pocket]', `[$data] no dataProp found on probeID: ${probeID}`)
                if (type === 'data()') this._$cached_data[probeID] = selectedData
                return self ? this : selectedData
            }
        }

        idRegexValid(str) {
            const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
            const regx = new RegExp(pat, 'gi')
            if (regx.test(str)) {
                // NOT ALWAYS NEEDED TO DISPLAY THE ERROR
                // if (this.debug) onerror(`your id is invalid, allowed chars: ${pat}`)
                return null
            }
            return true
        }

        /**
         * ### probeProps
         * - `each probe props that can be available and send on ready`
         * - `order is important, keep 'status' last`
         * - only updatable props are: `'campaign', 'data', 'error', 'ref', 'status'(limited)`
         */
        get probeProps() {
            return ['campaign', 'data', 'task', 'ref', 'error', 'id', 'status']
        }
    }
}
