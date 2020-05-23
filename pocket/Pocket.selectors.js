
/**
 * ### PocketSelectors
 * - Extends PocketModule using selectors for better access to Probes
 */
module.exports = (PocketModule) => {
    const { copy,warn, log, onerror, objectSize } = require('../Pocket/utils')
    return class PocketSelectors extends PocketModule {
        constructor(opts, debug) {
            super(opts, debug)          
        }

        /**
         * ### $select
         * - select current payloadID/project/job by id you are working on
         * @param {*} projectID optional, sensitive
         */
        $select(projectID=''){
            projectID = this.lastProjectID(projectID)
            return this
        }

        /**
         * ### $transfer
         * - select data from `fromProbeID` and hold it in `_transferCache`, until `$to(probeID)` is called
         * - warning this action removes `Probe[fromProbeID].data` and overrides data on Probe[probeID].data when `$to(probeID)` is called, simple as that
         * @param {*} fromProbeID optional/sensitive, pointless to use it if not selecting a `probeID`, usualy the current reference from which you want to transfer
         */
        $transfer(fromProbeID=''){
            fromProbeID = this.lastProbeID(fromProbeID)
            if (!this.pocket[fromProbeID]){
                if(this.debug) warn(`[$transfer] no Probe found for this id fromProbeID:${fromProbeID}`)
                return this
            }
            this.storeTransfers(fromProbeID,copy(this.pocket[fromProbeID]['data']))
            // NOTE needed for extra security to make sure it was called before we can update `$to()`
            this.$transfer_called = true 
            return this
        }

        /**
         * ### $to
         * - works together with `$transfer`, will complete data transfer from one Probe to another
         * if `_transferCache` is set, after this method call - the cache is cleared.
         * @param {*} toProbeID optional/sensitive, you should select `toProbeID` to which data will be packed, it is not the last reference pointer but the next.
         * @param {*} keepLastPointerReference if you wish to stay on the last pointer of the chain, this will allow you not to change it
         * @param {*} maxDelay, keep it at minimum! Time of chance when transaction can take place, cooresponds to `fromAverageTimeHasPast` found in `accessLastValidTransfer(fromAverageTimeHasPast)`
         */
        $to(toProbeID = '', keepLastPointerReference = true, maxDelay = 100) {
            if (!keepLastPointerReference) toProbeID = this.lastProbeID(toProbeID)
            if (keepLastPointerReference) toProbeID = this.validProbe(toProbeID)
            if (!toProbeID) {
                if (this.debug) warn(`[$to] toProbeID is invalid`)
                return this
            }
            if (!this.pocket[toProbeID]) {
                if (this.debug) warn(`[$to] no Probe found for this id toProbeID:${toProbeID}`)
                return this
            }
            if (this.$transfer_called) {
                // please note because this can be a delayed transaction, if you send `status=complete`
                // the data will not be updated
                const lastValidTransfer = this.accessLastValidTransfer(maxDelay)
                if (objectSize(lastValidTransfer))  {
                    const {fromProbeID, data} = lastValidTransfer
                    this.pocket[fromProbeID]['data'] = null // from $transfer 
                    this.pocket[toProbeID]['data'] = data // $to 
                }
                else {
                    if (this.debug) warn(`[$to] no last valid transfer found`)
                }
                this.$transfer_called = false
            }
            return this
        }

        /**
         * ### $of
         * - points to Probe be reference
         * @param {*} probeID optional/sensitive, pointless to use it if not selecting a `probeID`
         */
        $of(probeID = '') {
            this.lastProbeID(probeID)
            return this
        }

        /**
         * ### $data
         * - returns Object copy of `Probe['data']`
         * @param {*} probeID optional/sensitive, will use last selector reference, if supplied this reference becomes last pointer
         */
        $data(probeID) {
            probeID = this.lastProbeID(probeID)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['data'])
        }

        /**
         * ### $compaign
         * - returns Object copy of `Probe['compaign']` 
         * @param {*} probeID optional/sensitive, if supplied this reference becomes last pointer
         */
        $compaign(probeID) {
            probeID = this.lastProbeID(probeID)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['compaign'])
        }

        /**
        * ### $status
        * - returns Object copy of `Probe['status']` 
        * @param {*} probeID optional/sensitive, if supplied this reference becomes last pointer
        */
        $status(probeID) {
            probeID = this.lastProbeID(probeID)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['status'])
        }

        /**
       * ### $task
       * - returns Object copy of `Probe['task']` 
       * @param {*} probeID optional/sensitive, if supplied this reference becomes last pointer
       */
        $task(probeID) {
            probeID = this.lastProbeID(probeID)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['task'])
        }

        /**
         * ### $all
         * - return Object copy of all setters: `{id,status,compaign,task,data}` 
         * @param {*} probeID optional/sensitive, if supplied this reference becomes last pointer
         */
        $all(probeID) {
            probeID = this.lastProbeID(probeID)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID].all())
        }

    }
}