
/**
 * ### PocketSelectors
 * - Extends PocketModule using selectors for better access to Probes
 * - allow selecttion to refference by, example:  `taskName`, `::taskName` and `${projectID}::taskName`, thanks to `selectByTask()` method
 */
module.exports = (PocketModule) => {
    const { copy, warn, isArray, onerror, objectSize, isString, uniq } = require('../Pocket/utils')
    return class PocketSelectors extends PocketModule {
        constructor(opts, debug) {
            super(opts, debug)
        }

        // extending original `$probeStatusAsync`
        $probeStatusAsync(probeID = '') {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            return super.$probeStatusAsync(lastProbeID)
        }

        // extending original `$get`
        $get(probeID, self) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            return super.$get(lastProbeID, self)
        }

        // extending original `$set`
        $set(dataFrom, probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            return super.$set(dataFrom, lastProbeID)
        }

        /**
         * ### $probe
         * - return me as Probe{}, similar as $get(...), although does additional check for instanceOf Probe{}
         * @param {*} probeID 
         */
        $probe(probeID = '') {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            if (!this.pocket[lastProbeID]) {
                if (this.debug) warn(`[$probe] not found for probeID: ${probeID}`)
                return undefined
            }

            if (this.pocket[lastProbeID].constructor.name !== 'Probe') {
                if (this.debug) onerror(`[$probe] probeID: ${probeID} is not an instance of Probe{}`)
                return undefined
            }

            return this.pocket[lastProbeID]
        }

        // extending original `$update`
        $update(dataFrom, mergeData, probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            return super.$update(dataFrom, mergeData, lastProbeID)
        }

        /**
         * ### $select
         * - select current payloadID/project/job by id you are working on
         * @param {*} projectID optional/sensitive, selects new point of reference.
         */
        $select(projectID = '') {
            projectID = !isString(projectID) ? '' : projectID
            this.lastProjectID(projectID) // also updates last selector reference
            return this
        }

        /**
         * ### $transfer
         * - select data from `fromProbeID` and hold it in `_transferCache`, until `$to(probeID)` is called
         * - warning, action removes `Probe[fromProbeID].data` and overrides it on Probe[probeID].data, only when `$to(probeID)` is called, simple as that!
         * @param {*} fromProbeID optional/sensitive, selects new point of reference.
         */
        $transfer(fromProbeID = '') {
            // allow use of short ref names example: `::cocalola`
            fromProbeID = this.selectByTask(fromProbeID, true)
            fromProbeID = this.lastProbeID(fromProbeID)
            if (!this.pocket[fromProbeID]) {
                if (this.debug) warn(`[$transfer] no Probe{} found for this id fromProbeID:${fromProbeID}`)
                return this
            }
            this.storeTransfers(fromProbeID, copy(this.pocket[fromProbeID]['data']))
            // NOTE needed for extra security to make sure it was called before we can update `$to()`
            this.$transfer_lastID = fromProbeID
            return this
        }

        /**
         * ### $to
         * - works together with `$transfer`, will transfer `data` from one Probe{} to another
         * if `_transferCache` is set, the cache is cleared.
         * @param {*} toProbeID optional/sensitive, points to Probe{} `data` will be packed, it is not previous reference pointer, but the next.
         * @param {*} pointToThisProbe to stay on the current pointer reference
         * @param {*} maxDelay, keep at minimum! Time between transaction can take place, relates to `fromAverageTimeHasPast` found in `accessLastValidTransfer()`
         */
        $to(toProbeID = '', pointToThisProbe = true, maxDelay = 100) {

            // allow use of short ref names example: `::cocalola`
            toProbeID = this.selectByTask(toProbeID, pointToThisProbe)
            // if (!keepLastPointerReference) toProbeID = this.lastProbeID(toProbeID)
            if (pointToThisProbe) toProbeID = this.validProbe(toProbeID)
            if (!toProbeID) {
                if (this.debug) warn(`[$to] toProbeID is invalid`)
                return this
            }
            if (!this.pocket[toProbeID]) {
                if (this.debug) warn(`[$to] no Probe{} found for this id toProbeID:${toProbeID}`)
                return this
            }
            if (this.$transfer_lastID) {
                // please note because this can be a delayed transaction, if you send `status=complete`
                // the data will not be updated
                const lastValidTransfer = this.accessLastValidTransfer(maxDelay)
                if (objectSize(lastValidTransfer)) {
                    const { fromProbeID, data } = lastValidTransfer
                    if (this.$transfer_lastID === fromProbeID) {
                        this.pocket[fromProbeID]['data'] = null // from $transfer 
                        this.pocket[toProbeID]['data'] = data // $to 
                    }
                } else {
                    if (this.debug) warn(`[$to] no last valid transfer found`)
                }
                this.$transfer_lastID = ''
            }
            return this
        }

        /**
         * ### $of
         * - points to Probe{} be reference
         * @param {*} probeID optional/sensitive, select new point of reference
         */
        $of(probeID = '') {
            // allow use of short ref names example: `::cocalola`
            this.selectByTask(probeID, true)
            return this
        }

        /**
         * ### $data
         * - returns Object copy of `Probe['data']`
         * @param {*} dataProp optional, if you know what you are asking for example: `{assets:true}`,or `array['assets]`, it has catch error exception, so you wont receive any errors just `null`
         * will return all available matched within our `Probe{}['data]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be retured
         * @param {*} probeID optional/sensitive, select new point of reference
         * @param {*} self optional,if you want to $cached() last data enquiry and return `self` to keep chaining, nice!
         */
        $data(dataProp = null/** {}||[] */, probeID = '', self = false) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return self ? this : undefined

            // NOTE can provide as an array
            if (isArray(dataProp) && (dataProp || []).length) {
                dataProp = uniq(dataProp).reduce((n, el) => {
                    if (el !== undefined) n[el.trim()] = true
                    return n
                }, {})
            }

            if (!dataProp || !objectSize(dataProp)) {
                this._$cached_data[probeID] = copy(this.pocket[probeID]['data'])
                return self ? this : this._$cached_data[probeID]
            }
            return this.dataPropSelector("data()", probeID, dataProp, self, copy(this.pocket[probeID]['data']))
        }

        /**
         * ### cached
         * - grabs last cached `$data(...)` from Probe{}
         * @param {*} dataProp{}/String optional, know what you are asking for example: ` {assets:true}/ or > 'assets,values,somethingElse'`, it has catch error exception, so you wont receive any errors just `null`
         * will return all available matched within our `_$cached_data[probeID]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be retured
         * @param {*} probeID 
         */
        $cached(dataProp = {}/** ='' */, probeID = '') {
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return undefined
            const hasValue = this._$cached_data[probeID] !== undefined && this._$cached_data[probeID] !== null
            if (!hasValue) return undefined
            // if you provided a string make it an object
            if (isString(dataProp) && (dataProp || '').length) {
                dataProp = uniq(dataProp.trim().replace(/ /gi, '').split(',')).reduce((n, el) => {
                    if (el !== undefined) n[el] = true
                    return n
                }, {})
            }
            // return cached data if its not an object, or undefined
            if (!objectSize(this._$cached_data[probeID]) && hasValue) {
                if (objectSize(dataProp)) return undefined // our cache not an object, but we are asking for dataProp reference, so should return undefined
                else return this._$cached_data[probeID]
            }
            // no selection at all, so just return whats available
            if (!dataProp || !objectSize(dataProp)) {
                return this._$cached_data[probeID] === undefined ? undefined : this._$cached_data[probeID]
            } else return this.dataPropSelector("cached()", probeID, dataProp, false, this._$cached_data[probeID])
        }

        /**
         * ### $compaign
         * - returns Object copy of `Probe['compaign']` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */
        $compaign(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['compaign'])
        }

        /**
        * ### $status
        * - returns Object copy of `Probe['status']` 
        * @param {*} probeID optional/sensitive, select new point of reference
        */
        $status(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['status'])
        }

        /**
       * ### $task
       * - returns Object copy of `Probe['task']` 
       * @param {*} probeID optional/sensitive, select new point of reference
       */
        $task(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['task'])
        }

        /**
         * ### $all
         * - return Object copy of all setters: `{id,status,compaign,task,data}` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */
        $all(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID].all())
        }
    }
}
