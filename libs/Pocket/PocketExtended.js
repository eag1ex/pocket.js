// providing jsdocs intellisense
// eslint-disable-next-line no-unused-vars
const ProbeModel = require("../Probe/Probe")

// eslint-disable-next-line no-unused-vars
const ProjectPayloadModel = require("../Models/ProjectPayloadModel")

// @ts-ignore
const { onerror, warn, isPromise, validID, isString } = require("x-utils-es/umd")
// const sq = require('simple-q') // nice and simple promise/defer by `eaglex.net`
// const PocketLibs = require('./Pocket.libs')
const PocketModule = require("./Pocket.module")

class PocketModuleExt extends PocketModule {
    constructor(opts, debug) {
        super(opts, debug)

        /**
         * @borrows $payload
         * @function $payload an alias on $payload(...)
         */
        this.$project = this.$payload
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
            // @ts-ignore
            if (this.architectConfig[id]) delete this.architectConfig[id]
        } catch (err) {
            // blah
        }

        // empty self
        this.clearStoreTransfers(id)
    }
    /**
     * ### $removeProject
     * - removes all Probes and references relating to `projectID`
     * @param {*} projectID
     */
    $removeProject(projectID) {
        projectID = !isString(projectID) ? "" : projectID
        projectID = this.lastProjectID(projectID) // also updates last selector reference
        this.deletePocketSet(projectID)
        return this
    }

    /**
     * - you can also use it on concurrent payloads to existing `projectID`, once initial project is created every other call will update each Probe{}.data/status, based on payloadData
     * @param {ProjectPayloadModel | Promise<ProjectPayloadModel>} data required
     * @param {*} async `override current opts.sync for this payload`
     * @param {"new"| "update"} type optional, new/update, `update`: if we call on an existing project we can update `data/status properties` of all assigned tasks at once
     * 
     * - `initialize new payload, for as many tasks`
     * - `sets a multi task with instructions:`
     * - `data = {
            id: '', // 1 id for all tasks
            tasks: [{ taskName: '', data: '', campaign: '' }]
        }`

    * - `call distributor and setDefer`
    * 
    */
    $payload(data, async, type) {
        const returnAs = (val) => {
            this.d = val
            return this
        }
        const asAsync = async !== undefined ? async : this.async // override if set
        if (asAsync && isPromise(data)) {
            return returnAs(
                // @ts-ignore
                data.then(
                    (z) => this.payload(z, false, type),
                    (err) => err
                )
            )
        }
        // @ts-ignore
        if (!asAsync && !isPromise(data)) return returnAs(this.payload(data, false, type))
        else {
            if (this.debug) onerror("[pocket]", `[payload] with opts.async=true, data must be a promise, or do not set async when not a promise`)
            if (asAsync) return returnAs(Promise.reject())
            else return returnAs(false)
        }
    }

    /**
     * @exports d
     * @memberof PocketModule
     * - resolves currently active `$payload(...)`
     * - `after completion of Pocket, instance data for all Probes is deleted`
     * - can be called even before project was declared thanks to callback dispatcher `$projectSetAsync()`
     * @param {*} payloadID ,required
     * @param { boolean?}  allowsMultiple optional, when set to true will allow multiple calls to resolved data
     * @param { boolean?} strict if true will check {payloadID} exists
     * @returns {PocketModule & {d:Promise<any>}}
     */
    $ready(payloadID, allowsMultiple = false, strict = false) {
        try {
            /**
             *
             * @param {Promise<ProbeModel[]>} val
             */
            const returnAs = (val) => {
                this.d = val
                if (this.d && !allowsMultiple) {
                    this.d.catch((err) => {
                        if (!this.disableWarnings) warn("[pocket]", err)
                    })
                }
                return this
            }

            // soft validation for non existent `payloadID` if called before declaration of a project
            let _payloadID = this.lastProjectID(payloadID, null, strict === true ? "strict" : null)
            if (!payloadID && _payloadID) payloadID = _payloadID // grab last assigned id incase provided none

            // in case it was called the second time, when already resolved!
            if (this.projectsCache[payloadID] === "complete" && !allowsMultiple) {
                return returnAs(Promise.reject(`[$ready] project: ${payloadID} already complete`))
            }

            if (this._ready_method_set[payloadID] !== undefined && !allowsMultiple) {
                if (this._ready_method_set[payloadID] === true) {
                    return returnAs(Promise.reject(`[$ready] project: ${payloadID} already complete, cannot recall same $ready, ALLOW_MULTIPLE_FALSE`))
                }

                if (this._ready_method_set[payloadID] === false) {
                    return returnAs(Promise.reject(`[$ready] project: ${payloadID} you already declared $ready somewhere else, this call is ignored, ALLOW_MULTIPLE_FALSE`))
                }
            }

            if (!_payloadID) {
                return returnAs(Promise.reject(`payloadID must be set`))
            }
            // we wrap it if on ready project so it allows declaring `${$ready()}` even before $project was created, cool ha!
            const p = this.$projectSetAsync(_payloadID).then(({ projectID }) => {
                return this.ready(projectID).then((z) => {
                    // NOTE to help problems with loops and using chaining with last selector
                    // will gradually delete project with specified timeout
                    if (!this.deleteWithDelay) this.deletePocketSet(projectID)
                    else {
                        setTimeout(() => {
                            this.deletePocketSet(projectID)
                        }, this.deleteWithDelay)
                    }

                    this.projectsCache[projectID] = "complete"
                    this._ready_method_set[_payloadID] = true
                    return z
                }, Promise.reject)
            }, Promise.reject)

            this._ready_method_set[_payloadID] = false
            return returnAs(p)
        } catch (error) {
            if (!this.disableWarnings) onerror("[pocket]", error)
        }
    }
}

module.exports = PocketModuleExt
