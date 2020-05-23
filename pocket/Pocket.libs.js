/**
 * ### PocketLibs
 * - Top of the stack class of `PocketModule`, all `opt` initial `properties` are set here
 */
module.exports = () => {
    const { onerror, warn, validID, copy,log } = require('./utils')
    return class PocketLibs {
        /**
         * @param {*} opts.async, when set, allow $payload(`data`) to be async object
         * @param {*} opts.dispatcher, when set to true, loads external library `Dispatcher`
         * @param {*} debug optional
         */
        constructor(opts = {}, debug) {
            this.debug = debug || false
            this.async = (opts || {}).async || null
            // when set enables dispatcher to communicate directly with `probe.js`
            this.dispatcher = (opts || {}).dispatcher ? require('../libs/dispatcher')() : null
            this.pocket = {} // example this.pocket[`abc::taskName`] returns Probe{} Instance
            this.payloadData = {}// each payload by id
            this.lastPocketTimestamp = 0
            this._lastProjectID = null // last cached reference
            this._lastProbeID = null // last cached reference
            this._ready = {} // collect all ready example: `{id:Promise}`
            this.d = undefined // NOTE user reference data, carefull when using selectors from previous target, always access last
            this._transferCached = [ /** {timestamp,fromProbeID,data} */]
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
                        if (this.debug) log(`[clearStoreTransfers] transferCached for probeID: ${fromProbeID} has been removed`)
                    }
                });
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
        storeTransfers(fromProbeID,data){
           
            this._transferCached.push({timestamp:new Date().getTime(),fromProbeID,data })
            return this._transferCached
        }

        /**
         * ### accessLastValidTransfer
         * returns latest transfer that is inRange from `fromAverageTimeHasPast` in `ms` vs current Date.getTime
         * - removes _transferCached that was found 
         */
        accessLastValidTransfer(fromAverageTimeHasPast = 100) {
            if (!this._transferCached.length) return {}

            this._transferCached.sort((a, b) => a.timestamp - b - timestamp)
            const transferCachedCopy = copy(this._transferCached)
            
            const coundCache = transferCachedCopy.reduce((n, el, i) => {
                const { timestamp, fromProbeID, data } = el

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

            if (!Object.entries(coundCache).length) return {}
            else return coundCache
        }


        

        /**
         * ### lastProjectID
         * - every project is a job initiated by payload, so `payload.id === lastProjectID()`
         */
        lastProjectID(projectID = '') {
            if (!projectID && this._lastProbeID) projectID = this._lastProjectID
            projectID = this.validProjectID(projectID)
            if (!projectID) return null
            this._lastProjectID = projectID // cache last reference
            return projectID
        }

        /**
         * ### lastProbeID
         * - return last reference to probeID
         * - cache with `_lastProbeID`
         * @param {*} probeID 
         */
        lastProbeID(probeID = '') {
            if (!probeID && this._lastProbeID) probeID = this._lastProbeID
            probeID = this.validProbe(probeID)
            if (!probeID) return null
            this._lastProbeID = probeID // cache last reference
            return probeID
        }

        /**
         * ### validProjectID
         * - `test if projectID is valid`
         * - return valid id
         * @param {*} id required
         */
        validProjectID(id) {
            id = validID(id)
            if (!id) return null
            if ((id || '').split(' ').length > 1) return null
            const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
            const regx = new RegExp(pat, 'gi')
            if (regx.test(id)) {
                if (this.debug) onerror(`[validProjectID] id with invalid regx: ${regx}`)
                return null
            }
            return id
        }

        /**
         * ### validProbe
         * - returns a valid probe
         * @param {*} probeID required
         */
        validProbe(probeID) {
            probeID = validID(probeID)
            if (!probeID) return null

            const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
            const regx = new RegExp(pat, 'gi')
            if (regx.test(probeID)) {
                // NOT ALWAYS NEEDED TO DISPLAY THE ERROR
                // if (this.debug) onerror(`your id is invalid, allowed chars: ${pat}`)
                return null
            }

            if (probeID.indexOf(`::`) === -1) return null
            if (!this.pocket[probeID]) {
                if (this.debug) warn(`[get] did not find probe with probeID ${id}`)
                return null
            }
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
    }
}