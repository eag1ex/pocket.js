
/**
 * ### PocketSelectors
 * - Extends PocketModule using selectors for better access to Probes
 * - allow selecttion to refference by, example:  `taskName`, `::taskName` and `${projectID}::taskName`, thanks to `selectByTask()` method
 */
module.exports = (PocketModule) => {
    const { copy, warn, log, onerror, objectSize } = require('../Pocket/utils')
    return class PocketSelectors extends PocketModule {
        constructor(opts, debug) {
            super(opts, debug)
        }

        /**
         * ### $select
         * - select current payloadID/project/job by id you are working on
         * @param {*} projectID optional/sensitive, selects new point of reference.
         */
        $select(projectID = '') {
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
            console.log('$transfe/fromProbeID', fromProbeID)
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
            if (keepLastPointerReference) toProbeID = this.validProbe(toProbeID)
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
                }
                else {
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
            console.log('$of',this.selectByTask(probeID, true))
            return this
        }

        /**
         * ### $data
         * - returns Object copy of `Probe['data']`
         * @param {*} probeID optional/sensitive, select new point of reference
         */
        $data(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['data'])
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