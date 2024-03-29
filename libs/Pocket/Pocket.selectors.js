/**
 * ### PocketSelectors
 * - Extends PocketModule using selectors for better access to Probes
 * - allow selection to reference by, example:  `taskName`, `::taskName` and `${projectID}::taskName`, thanks to `selectByTask()` method
 */

// TYPES
// eslint-disable-next-line no-unused-vars
const Probe = require("../Probe/Probe")
// MODELS AND TYPES
// eslint-disable-next-line no-unused-vars
const SetUpdateModel = require("../Models/SetUpdateModel")

const { copy, warn, isArray, onerror, objectSize, isString, uniq, isFunction } = require("x-utils-es/umd")
const { validProbe, validProjectID } = require("../utils")

const PocketArchitect = require("./Pocket.architect")

/**
 * @class
 */
class PocketSelectors extends PocketArchitect {
    constructor(opts, debug) {
        super(opts, debug)
    }

    /**
     *
     * more construct way of setting up a project and allowing few external assets to be used. This method uses $payload inheritance with access to `type` and `async`. Things to remember consecutive call to $architect thru  .$condition() method, can only update existing items.
    -   `cb(()=>({project:payloadData, type,async}))`: return callback must return {project:payload} as minimum requirement, when running in a loop or repetitive actions, it is best to set type='update' so that concurrent call to the same task wont wont be ignored, `type` is state base, so last setting is kept
    -  memberof PocketArchitect
     */
    $architect(cb, projectID) {
        return super.architect(cb, projectID)
    }

    /**
     * can access the asset declared in `$architect`
     *  - memberof PocketArchitect
     *
     */
    $asset(assetName, asCallback, projectID) {
        return super.asset(assetName, asCallback, projectID)
    }

    /**
     * check is probe exists on PocketModule
     * @param {*} probeID required, can specify `::taskName` or full id `{projectID}::{probeID}`
     * @returns boolean
     */
    $exists(probeID) {
        return !!this.selectByTask(probeID)
    }

    /**
     * @param projectID required
     * @returns boolean `true/false/null`, determined by project completion
     */
    $projectComplete(projectID) {
        if (!this.projectsCache[projectID]) return null
        return this.projectsCache[projectID] === "complete"
    }

    /**
     * use it to check if project already available, it is similar to `$projectSetAsync` but not a promise, returns current status, not in future
     * @param {*} projectID required
     * @returns {boolean}
     */
    $projectSet(projectID = "") {
        projectID = validProjectID(projectID)
        if (this.payloadData[projectID]) return true
        return false
    }

    /**
     * Callback for adding two numbers.
     *
     * @callback condition_cb
     * @param {PocketSelectors} pocket
     * @returns {any}
     */

    /**
     * REVIEW self is inconsistent here we may have to update this logic
     *
     * run conditional statement within callback, so we can keep chaining in the same block
     * @param {condition_cb} cb required, inside callback access to self for PocketModule, or for Probe{}, depending on `projectID/probeID` id specified
     * @param {string} id `projectID/probeID` optional, specify either `projectID` or `probeID`, defaults to last `projectID`
     * @returns {PocketSelectors} by default returns Pocket/self, or any true value passed inside callback
     */
    $condition(cb, id = undefined) {
        if (!isFunction(cb)) {
            if (this.debug) warn("[pocket]", `[$condition] must provide callback`)
            return this
        }
        id = !isString(id) ? "" : id

        let selfType = "PocketSelf" // `ProbeSelf`
        let self = null
        if (id.indexOf(`::`) === 0) {
            // if specified id is `probeID`
            id = this.selectByTask(id, true)
            id = this.lastProbeID(id)
            selfType = `ProbeSelf`
            if (!id) {
                if (this.debug) warn("[pocket]", `[$condition] probeID not found`)
                return this
            }
            // also updates last selector reference
        } else if (this.lastProjectID(id)) selfType = "PocketSelf"
        // if specified id is `projectID`
        else {
            if (this.debug) warn("[pocket]", `[$condition] projectID not found`)
            return this
        }

        if (selfType === "PocketSelf") self = this
        if (selfType === "ProbeSelf") self = this.$get(id)

        if (!self) {
            if (this.debug) warn("[pocket]", `[$condition] no valid self value`)
            return this
        }

        const cbDATA = cb.call(self, self) // when using arrow function pass `(self)=>` in callback as well
        if (cbDATA) return cbDATA
        // if callback has any true data return it,
        else return this // else return self
    }

    /**
     * @returns last selected projectID
     */
    get $projectID() {
        return this._lastProjectID
    }

    /**
     * return last probe status, this is a dynamic Promise, creates new promise every time status is changed, so then it needs to bu called again to get latest update
     * @param {*} probeID
     */
    $probeStatusAsync(probeID = "") {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        let lastProbeID = this.lastProbeID(probeID)
        return super.probeStatusAsync(lastProbeID)
    }

    /**
     *`get probe by 'id::taskName'`
     * - `returns instance`
     *  methods:`{get,all}` props: `{id,data,tasks,status}`
     * @param {*} probeID required, example format: `${payload.id}::taskName`
     * @param {*} self = false optional, in case you want to chain, and access `Probe{}` through `...).d` otheriwe return Pocket
     * @returns {Probe} actually {Pcket | Probe}
     */
    $get(probeID, self) {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        let lastProbeID = this.lastProbeID(probeID)
        return super._get(lastProbeID, self)
    }

    /**
     * REVIEW this method must be updated
     * @deprecated
     * - return array of Probes matched by ref
     * @param {*} probeRef, required
     * @returns [Probe{},...] array
     */
    $getByRef(probeRef = "") {
        return Object.assign(this.pocket).filter(([id, probe], inx) => probe.ref === probeRef)
    }

    /**
     * as name suggest sets up new new data for Probe/task, it derives from `$update`
     * @param {SetUpdateModel} dataFrom required, must specify what to set on Probe{}, example: `dataFrom:{data:'coke',status:'complete',campaign:'cocacola'}`
     * - we should only use `$set` for initialization, this action also calls `clearStoreTransfers`
     * @param {*} probeID required, example format: `${payload.id}::taskName`
     */
    $set(dataFrom, probeID) {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        let lastProbeID = this.lastProbeID(probeID)
        return super._set(dataFrom, lastProbeID)
    }

    /**
     * return as Probe{}, similar as $get(...), although does additional check for instanceOf Probe{}
     * @param {*} probeID
     * @returns {Probe}
     */
    $probe(probeID = "") {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        let lastProbeID = this.lastProbeID(probeID)
        if (!this.pocket[lastProbeID]) {
            if (this.debug) warn("[pocket]", `[$probe] not found for probeID: ${probeID}`)
            return undefined
        }

        if (this.pocket[lastProbeID].constructor.name !== "Probe") {
            if (this.debug) onerror("[pocket]", `[$probe] probeID: ${probeID} is not an instance of Probe{}`)
            return undefined
        }

        return this.pocket[lastProbeID]
    }

    /**
     * update Probe/task, for convenience, so we dont have do this, example: `pc.$get('abc123::grab').status='complete'`
     * @param {SetUpdateModel} dataFrom required, must specify what to update on Probe{}, example: `dataFrom:{data:'coke',status:'complete',campaign:'cocacola'}`
     * @param {*} mergeData optional if `true` will merge: `Object.assing({},probe[id].data,mergeData['data'])`
     * @param {*} probeID required, example format: `${payload.id}::taskName`
     */
    $update(dataFrom, mergeData, probeID) {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        let lastProbeID = this.lastProbeID(probeID)
        return super.update(dataFrom, mergeData, lastProbeID)
    }

    /**
     * select current payloadID/project/job by id you are working on
     * @param {*} projectID optional/sensitive, selects new point of reference.
     */
    $select(projectID = undefined) {
        projectID = !isString(projectID) ? "" : projectID
        this.lastProjectID(projectID) // also updates last selector reference
        return this
    }

    /**
     *
     * @callback filter_cb
     * @param {Probe} probe
     * @returns {any}
     */

    /**
     * Filter works together with `$compute` or standalone when specified `.d` to return filtered `list`
     * memberof PocketSelectors
     * @param {filter_cb} cb
     * @param {string} projectID
     * @returns {PocketSelectors}
     */
    $filter(cb, projectID = undefined) {
        const self = this
        projectID = this.lastProjectID(projectID) // also updates last selector reference
        const returnAs = (val) => {
            this.d = (val || []).filter((z) => z.isNONE === undefined)
            return self
        }

        if (!isFunction(cb)) return returnAs([])

        if (!this.payloadData[projectID]) {
            if (this.debug) warn("[pocket]", `[$filter] no projectID found`)
            return returnAs(null)
        }
        // when narrowing down $filter.$filter process, lets remember last action
        let probeList = []
        if ((this._lastFilterList[projectID] || []).length) probeList = this._lastFilterList[projectID]
        else {
            this._lastFilterList[projectID] = []
            probeList = this.projectProbeList(projectID)
        }
        probeList.forEach((probe, inx) => {
            if (probe.isNONE) {
                return
            }
            const matchFound = cb.call(probe, probe)
            if (!matchFound) {
                this._lastFilterList[projectID] = this._lastFilterList[projectID].filter((z) => z.id !== probe.id)
                this._lastFilterList[projectID].push({ id: probe.id, isNONE: true })
                return
            }

            if (matchFound !== undefined && (matchFound === true || matchFound === 1)) {
                // dont re-add same probe
                const isNew = this._lastFilterList[projectID].filter((z, i) => (z || {}).id === probe.id).length

                if (!isNew) this._lastFilterList[projectID].push(probe)
            } else this._lastFilterList[projectID].push({ id: probe.id, isNONE: true })
        })
        return returnAs(this._lastFilterList[projectID])
    }

    /**
     *
     * @callback compute_cb
     * @param {Probe} probe
     * @returns {any}
     */

    /**
     * iterate thru each Probe{}/ instance in a callback, and make changes to it
     * - note: you can only compute thru items that are not `complete`
     * @param {compute_cb} cb cb callback to current Probe instance process
     * @param {string} projectID optional/sensitive, selects new point of reference.
     */
    $compute(cb, projectID = "") {
        projectID = this.lastProjectID(projectID)
        const returnAs = (val) => {
            // delete last filtered list after it was consumed
            if (val) delete this._lastFilterList[projectID]
            this.d = val
            return this
        }

        if (!isFunction(cb)) {
            if (this.debug) warn("[pocket]", `[$compute] cb must be a function`)
            return returnAs(null)
        }

        if (!this.payloadData[projectID]) {
            if (this.debug) warn("[pocket]", `[$compute] no project found fo your/last id projectID:${projectID}`)
            return returnAs(null)
        }

        let lastFilter = this._lastFilterList[projectID] || []
        if (lastFilter.length) {
            // uniq
            this._lastFilterList[projectID] = lastFilter = lastFilter
                .filter((z) => z.isNONE === undefined)
                .filter(({ id }, i, all) => {
                    return all.filter((_probe) => id === _probe.id).length === 1
                })
            lastFilter.forEach((probe) => {
                // compute method is designed to allow access to each Probe, but we do not want to allow looping thru assets that are already complete
                if (probe.status !== "complete" && probe.status !== "send") cb.call(probe, probe)
            })
            // finally only return not none list on probes, then clear _lastFilterList
            return returnAs(this._lastFilterList[projectID])
        } else {
            this.projectProbeList(projectID).forEach((probe) => {
                // compute method is designed to allow access to each Probe, but we do not want to allow looping thru assets that are already complete

                if (probe.status !== "complete" && probe.status !== "send") cb.call(probe, probe)
            })
            return returnAs(this.projectProbeList(projectID))
        }
    }

    /**
     *
     * @callback list_cb
     * @param {object} probeCopy
     * @returns {{}}
     */

    /**
     * list active Probes{} by project id, should return all assigned probe/tasks regardless of status
     * - returns array[] of active Probe{}/tasks or []
     * @param {*} projectID optional/sensitive, selects new point of reference.
     * @param {list_cb} cb ((probe, probeID)=>) optional, when set will loop thru each Probe{} in callback
     * @param {*} type optional, set to `list`, will return latest Probes, that includes if initiated cb and made a few changes
     */
    $list(projectID = "", cb = null, type = "self") {
        projectID = this.lastProjectID(projectID)
        if (!this.payloadData[projectID]) return []
        const list = () => {
            return Object.entries(this.pocket).reduce((n, [key, val], inx) => {
                if (val.id.includes(projectID)) n.push(val)
                return n
            }, [])
        }
        if (isFunction(cb)) {
            this.projectProbeList(projectID).forEach((probe) => {
                cb(probe.all()) // no access to Probe/instance only copy
            })
            if (type === "self" || !type) {
                return this
            }
            if (type === "list") return list()
        } else {
            return list()
        }
    }

    /**
     * select data from `fromProbeID` and hold it in `_transferCache`, until `$to(probeID)` is called
     * - warning, action removes `Probe[fromProbeID].data` and overrides it on Probe[probeID].data, only when `$to(probeID)` is called, simple as that!
     * @param {*} fromProbeID optional/sensitive, selects new point of reference.
     */
    $transfer(fromProbeID = "") {
        // allow use of short ref names example: `::cocalola`
        fromProbeID = this.selectByTask(fromProbeID, true)
        fromProbeID = this.lastProbeID(fromProbeID)
        if (!this.pocket[fromProbeID]) {
            if (this.debug) warn("[pocket]", `[$transfer] no Probe{} found for this id fromProbeID:${fromProbeID}`)
            return this
        }
        this.storeTransfers(fromProbeID, copy(this.pocket[fromProbeID]["data"]))
        // NOTE needed for extra security to make sure it was called before we can update `$to()`
        this.$transfer_lastID = fromProbeID
        return this
    }

    /**
     * works together with `$transfer`, will transfer `data` from one Probe{} to another
     * if `_transferCache` is set, the cache is cleared.
     * @param {*} toProbeID optional/sensitive, points to Probe{} `data` will be packed, it is not previous reference pointer, but the next.
     * - will only work if `toProbeID` is not yet complete
     * @param {*} pointToThisProbe to stay on the current pointer reference
     * @param {*} maxDelay, keep at minimum! Time between transaction can take place, relates to `fromAverageTimeHasPast` found in `accessLastValidTransfer()`
     */
    $to(toProbeID = "", pointToThisProbe = true, maxDelay = 100) {
        // allow use of short ref names example: `::cocalola`
        toProbeID = this.selectByTask(toProbeID, pointToThisProbe)
        // if (!keepLastPointerReference) toProbeID = this.lastProbeID(toProbeID)
        if (pointToThisProbe) toProbeID = validProbe(toProbeID)
        if (!toProbeID) {
            if (this.debug) warn("[pocket]", `[$to] toProbeID is invalid`)
            return this
        }
        if (!this.pocket[toProbeID]) {
            if (this.debug) warn("[pocket]", `[$to] no Probe{} found for this id toProbeID:${toProbeID}`)
            return this
        }
        if (this.$transfer_lastID) {
            // please note because this can be a delayed transaction, if you send `status=complete`
            // the data will not be updated
            const lastValidTransfer = this.accessLastValidTransfer(maxDelay)
            if (objectSize(lastValidTransfer)) {
                const { fromProbeID, data } = lastValidTransfer
                if (this.$transfer_lastID === fromProbeID) {
                    if (this.pocket[toProbeID].status === "complete" || this.pocket[toProbeID].status === "send") {
                        if (this.debug) warn("[pocket]", `[$to] cannot transfer since toProbeID: ${toProbeID} is already complete`)
                        this.$transfer_lastID = ""
                        return this
                    }
                    this.pocket[fromProbeID]["data"] = null // from $transfer
                    this.pocket[toProbeID]["data"] = data // $to
                }
            } else {
                if (this.debug) warn("[pocket]", `[$to] no last valid transfer found`)
            }
            this.$transfer_lastID = ""
        }
        return this
    }

    /**
     * points to Probe{} be reference
     * @param {*} probeID optional/sensitive, select new point of reference
     */
    $of(probeID = "") {
        // allow use of short ref names example: `::cocalola`
        this.selectByTask(probeID, true)
        return this
    }

    /**
     * returns Object copy of `Probe['data']`
     * @param {*} dataProp optional, if you know what you are asking for example: `{assets:true}`,or `array['assets]`, it has catch error exception, so you wont receive any errors just `null`
     * will return all available matched within our `Probe{}['data]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be returned
     * @param {*} probeID optional/sensitive, select new point of reference
     * @param {*} self optional,if you want to $cached() last data enquiry and return `self` to keep chaining, nice!
     */
    $data(dataProp = undefined /** {}||[] */, probeID = "", self = false) {
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
            this._$cached_data[probeID] = copy(this.pocket[probeID]["data"])
            return self ? this : this._$cached_data[probeID]
        }
        return this.dataPropSelector("data()", probeID, dataProp, self, copy(this.pocket[probeID]["data"]))
    }

    /**
     * grabs last cached `$data(...)` from Probe{}
     * @param {*} dataProp{}/String optional, know what you are asking for example: ` {assets:true}/ or > 'assets,values,somethingElse'`, it has catch error exception, so you wont receive any errors just `null`
     * will return all available matched within our `_$cached_data[probeID]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be returned
     * @param {*} probeID
     */
    $cached(dataProp = {}, probeID = "") {
        probeID = this.selectByTask(probeID, true)
        if (!this.pocket[probeID]) return undefined
        const hasValue = this._$cached_data[probeID] !== undefined && this._$cached_data[probeID] !== null
        if (!hasValue) return undefined
        // if you provided a string make it an object
        if (isString(dataProp) && (dataProp || "").length) {
            dataProp = uniq(dataProp.trim().replace(/ /gi, "").split(",")).reduce((n, el) => {
                if (el !== undefined) n[el] = true
                return n
            }, {})
        }
        // return cached data if its not an object, or undefined
        if (!objectSize(this._$cached_data[probeID]) && hasValue) {
            if (objectSize(dataProp)) return undefined
            // our cache not an object, but we are asking for dataProp reference, so should return undefined
            else return this._$cached_data[probeID]
        }
        // no selection at all, so just return whats available
        if (!dataProp || !objectSize(dataProp)) {
            return this._$cached_data[probeID] === undefined ? undefined : this._$cached_data[probeID]
        } else return this.dataPropSelector("cached()", probeID, dataProp, false, this._$cached_data[probeID])
    }

    /**
     * returns Object copy of `Probe['campaign']`
     * @param {*} probeID optional/sensitive, select new point of reference
     */
    $campaign(probeID) {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        if (!this.pocket[probeID]) return null
        return copy(this.pocket[probeID]["campaign"])
    }

    /**
     * ### $ref
     * - returns Probe{}.ref
     * @param {*} probeID optional/sensitive, select new point of reference
     * @returns {string}
     */
    $ref(probeID) {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        if (!this.pocket[probeID]) return undefined
        return copy(this.pocket[probeID]["ref"])
    }

    /**
     * ### $status
     * - returns Object copy of `Probe['status']`
     * @param {*} probeID optional/sensitive, select new point of reference
     * @returns {string}
     */
    $status(probeID) {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        if (!this.pocket[probeID]) return undefined
        return copy(this.pocket[probeID]["status"])
    }

    /**
     * ### $task
     * - returns Object copy of `Probe['task']`
     * @param {*} probeID optional/sensitive, select new point of reference
     *  @returns {string}
     */
    $task(probeID) {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        if (!this.pocket[probeID]) return undefined
        return copy(this.pocket[probeID]["task"])
    }

    /**
     * ### $task
     * - returns Object copy of `Probe['task']`
     * @param {*} probeID optional/sensitive, select new point of reference
     * @returns {array}
     */
    $error(probeID) {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        if (!this.pocket[probeID]) return undefined
        return copy(this.pocket[probeID]["error"])
    }

    /**
     * ### $all
     * - return Object copy of all setters: `{id,status,campaign,task,data}`
     * @param {*} probeID optional/sensitive, select new point of reference
     * @returns {object}
     */
    $all(probeID) {
        // allow use of short ref names example: `::cocalola`
        probeID = this.selectByTask(probeID, true)
        if (!this.pocket[probeID]) return undefined
        return copy(this.pocket[probeID].all())
    }

    /**
     *
     * @callback onChange_cb
     * @param {Probe} probe
     * @param {string} id
     * @returns {any}
     */

    /**
     * - changes are observed for `[data,status,ref,error,campaign, status:complete]`
     * - when watchProp `status:complete` is selected all copy data is returned in callback
     * @param {onChange_cb} cb
     * @param watchProp specify what property to watch, defaults to `all`, except for `status:complete`
     * @param {*} probeID optional/sensitive, select new point of reference

     */
    $onChange(cb, watchProp, probeID) {
        if (!this._onChange) {
            if (this.debug) warn("[pocket]", `[$onChange] opts.onChange=true must be enabled to use this feature`)
            return this
        }
        probeID = this.selectByTask(probeID, true)
        if (!this.pocket[probeID]) return null
        this.pocket[probeID].onChange(cb, watchProp)
        return this
    }

    /**
     *
     * @callback onProbeComplete_cb
     * @param {Probe} probe
     * @param {string} id
     * @returns {any}
     */

    /**
     * callback initialled of any probe that was completed, unless specificity selected `probeID`
     * @param {onProbeComplete_cb} cb
     * @param {*} probeID optional if you only want to listen for changes to specific probe add the id
     */
    $onProbeComplete(cb, probeID) {
        if (!this._onChange) {
            if (this.debug) warn("[pocket]", `[$onChange] opts.onChange=true must be enabled to use this feature`)
            return this
        }
        // only run available onChange for selected probe by id
        if (probeID) {
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return undefined
            this.pocket[probeID].onChange(cb, "status:complete")
            return this
        } else {
            let projectID = this.lastProjectID()
            let probeList = this.projectProbeList(projectID)

            /**
             * callback any probe that completed due process
             */
            probeList.forEach((probe) => {
                probe.onChange(cb, "status:complete")
            })

            return this
        }
    }
}

module.exports = PocketSelectors
