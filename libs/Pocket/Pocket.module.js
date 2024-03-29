// const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE

// MODELS AND TYPES
const ProjectPayloadModel = require("../Models/ProjectPayloadModel")
const SetUpdateModel = require("../Models/SetUpdateModel")
// eslint-disable-next-line no-unused-vars
const ProbeModel = require("../Probe/Probe")

const { idRegexValid } = require("../utils")
const { sq, objectSize, log, onerror, warn, isObject, validID } = require("x-utils-es/umd")
const PocketLibs = require("./Pocket.libs")

/**
 * TODO ADD to $update `// action/[merge], action/+-*` using regEx
 */

/**
 * @class
 */
class PocketModule extends PocketLibs {
    constructor(opts, debug) {
        super(opts, debug)
        if (this.dispatcher) {
            this.dispatcher.subscribe((z, id) => {
                const { probe, status } = z || {}

                if (status === "error") {
                    // NOTE dispatch data out
                    if (this.debug) log("[pocket]", `[dispatcher] probe id:${probe.id} error`)
                }

                if (status === "open") {
                    if (this.debug) log("[pocket]", `[dispatcher] probe id:${probe.id} created`)
                }

                if (status === "complete") {
                    // NOTE dispatch data out
                    if (this.debug) log("[pocket]", `[dispatcher] probe id:${probe.id} completed`)
                }
            })
        }
    }

    // ----
    //   :::::: U S E R   A P P L I C A T I O N   C A L L I N G   M E T H O D S : :  :   :    :
    // ----
    //

    /**
     * @memberof PocketModule
     * @param {ProjectPayloadModel} data
     * @param {'new'|'update'} type
     */
    payload(data = undefined, async, type = "new") {
        try {
            data = new ProjectPayloadModel(data)
        } catch (err) {
            onerror("[payload]", err)
            return false
        }

        this.d = null
        let isUpdated = null

        if (this.payloadData[data.id] && (!type || type === "new")) {
            this._lastProjectID = data.id
            if (this.debug) warn(`[$payload] this payload.id already exists`)
            return true
        }

        let initialProject = this.payloadData[data.id] === undefined // because there is no data set as of yet

        // NOTE on update/new of project we need to reset $filter values, in case
        if ((this._lastFilterList[data.id] || []).length) this._lastFilterList[data.id] = []

        // NOTE validate our pocket values before generating each `new Probe()`
        for (let val of data["tasks"]) {
            if (!val["task"]) {
                if (this.debug) warn("[pocket]", "[$payload] task must be set for your tasks")
                continue
            }
            // validate task
            if (!idRegexValid(val["task"]) || val["task"].indexOf("::") !== -1) {
                if (this.debug) warn("[pocket]", "[$payload] invalid taskName, failed idRegexValid validation")
                continue
            }

            const probeID = `${data.id}::${val["task"]}`
            if (type === "update" && !initialProject && this.pocket[probeID]) {
                if (val["data"]) this.pocket[probeID]["data"] = val["data"]
                if (val["status"]) this.pocket[probeID]["status"] = val["status"]

                // NOTE in case we update status in case it wasnt provided but new data was assigned
                // status should only be changed after data is set
                if (!val["status"] && val["data"] && this.pocket[probeID]["status"] === "open") {
                    this.pocket[probeID]["status"] = "updated"
                }
                if (val["ref"]) this.pocket[probeID]["ref"] = val["ref"]
                if (val["error"]) this.pocket[probeID]["error"] = val["error"]
                if (val["campaign"]) this.pocket[probeID]["campaign"] = val["campaign"]

                isUpdated = true
                this._lastProjectID = data.id
                // NOTE after update, payloadData will differ from new Probe{} data
                // NOTE do not update `payloadData` it is redundant if we do not need it for anything, only update Probes{}
                /// this.payloadData[data.id]['value']
                // an existing project do not override

                continue
            }

            if (!this.payloadData[data.id]) this.payloadData[data.id] = { value: [], status: "open", timestamp: new Date().getTime() }
            const exists = this.payloadData[data.id]["value"].filter((z) => z.task.indexOf(val.task) !== -1)
            if (exists.length) {
                if (this.debug && !this.disableWarnings) warn("[pocket]", `the same task "${val.task}" already exists on the payload, you must choose uniq`)
                continue
            }

            this.payloadData[data.id]["value"].push(val)
            this.lastPocketTimestamp = this.payloadData[data.id]["timestamp"]
        }

        // only when updating existance of Probe{}
        if (type === "update" && this.payloadData[data.id] && !initialProject) {
            this.projectsCache[data.id] = "open"
            return isUpdated
        }

        if (this.payloadData[data.id]) {
            this.lastProjectID(data.id)
            this.projectsCache[data.id] = "open" // means created project
            this.distributor().setDefer(data.id)
            // NOTE required in order for $projectSetAsync to return callback to resolve our promise
            this.projectSetDispatcher(data.id).next({ projectID: data.id })
            return true
        } else return false
    }

    /**
     * ### $projectSetAsync
     * - usage: to call before `$project()/$payload()/$architect` were called
     * - for example you have loaded same `Pocket` instance in another part of your code, now checking for it  in future before $project created. This method can `await $projectSetAsync(projectID)` and continue with already set `$project(...).$get(..).$update(..)` etc
     * @param {*} projectID required, this is your `$project/$payload` id
     * @returns {Promise}
     */
    $projectSetAsync(projectID = "") {
        const self = this
        projectID = this.lastProjectID(projectID, false, null)
        if (this._projectSetAsync[projectID]) {
            return this._projectSetAsync[projectID].promise
        }
        /**
         * will subscribe when called the first time and set our simple promise then resolve once the `$payload` is successful
         */
        this._projectSetAsync[projectID] = sq()
        this.projectSetDispatcher(projectID).subscribe(function (z, id) {
            self._projectSetAsync[id].resolve(z)
            this.del() // deletes projectSetDispatcher of self
        })
        return this._projectSetAsync[projectID].promise
    }

    /**
     * @memberof probeStatusAsync
     */
    probeStatusAsync(probeID = "") {
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
     * @param {SetUpdateModel} dataFrom
     */
    update(dataFrom, mergeData = null, probeID = undefined) {
        return this._setUpdate(dataFrom, mergeData, probeID, "update")
    }

    /**
     * @memberof $set
     * @param {SetUpdateModel} dataFrom
     */
    _set(dataFrom, probeID = undefined) {
        return this._setUpdate(dataFrom, null, probeID, "set")
    }

    /**
     * - declared via $get
     * @memberof PocketModule
     * @returns {ProbeModel} actually {PocketModule | ProbeModel}
     */
    _get(probeID = "", self = undefined) {
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
    $activeTasks(payloadID = "") {
        const returnAs = (val) => {
            this.d = val
            return this
        }

        payloadID = this.lastProjectID(payloadID)
        if (!objectSize(this.pocket)) return returnAs([])
        let tasks = Object.entries(this.pocket).reduce((n, [probeID, probe]) => {
            if (probeID.indexOf(payloadID || "") === 0 && payloadID && this.payloadData[payloadID]) n.push(probe["task"])
            else if (!payloadID) n.push(probe["task"])
            return n
        }, [])
        return returnAs(tasks)
    }

    /**
     * @summary called by $ready()
     * @memberof PocketModule
     * @returns {Promise<ProbeModel[]>}
     */
    ready(payloadID = "") {
        this.d = null

        if (!this._ready[payloadID]) throw `ready[payloadID] is not set, maybe you called it before $payload()`
        return this._ready[payloadID].promise
    }

    //
    // ---
    //   :::::: E N D : :  :   :    :     :        :
    // ---

    /**
     * @summary extends  `$update` and `$set`
     * @param {SetUpdateModel} dataFrom
     * @param {boolean} mergeData
     * @param {string} probeID
     * @param {string} type
     */
    _setUpdate(dataFrom, mergeData = null, probeID = "", type = "update") {
        // @ts-ignore
        dataFrom = new SetUpdateModel(dataFrom || {})

        const returnAs = (val) => {
            this.d = val
            return this
        }

        let id = this.lastProbeID(probeID)
        if (!id) {
            if (this.debug) onerror("[pocket]", `[$update] must specify id`)
            return returnAs(false)
        }

        // TODO to remove
        if (!objectSize(dataFrom)) {
            if (this.debug) warn("[pocket]", `[$update] dataFrom{} must not be empty`)
            return returnAs(false)
        }

        if (!this.pocket[id]) {
            if (this.debug) onerror("[pocket]", `[$update] this.pocket with id:${id} not found`)
            return returnAs(false)
        }

        let updated = false
        this._lastProjectID = id
        // reorder dataFrom, make sure if `status` exists, it is shifted to last position, so the Probe{} doent change state before other values got chance to do so, nice!

        // we need to convert dataFrom{} to dataFrom[]>array to achieve this

        let dataFromArr = Object.entries(dataFrom).reduce((n, [key, value]) => {
            const pos = this.probeProps.indexOf(key) // new order
            if (this.probeProps[pos] === key) n.push({ inx: pos, data: { [key]: value } })
            return n
        }, [])

        for (let inx = 0; inx < dataFromArr.length; inx++) {
            if ((dataFromArr[inx] || {})["data"] === undefined) continue
            const [key, value] = Object.entries(dataFromArr[inx]["data"])[0]
            if (this.pocket[id][key] !== undefined) {
                if (key === "data") {
                    if (mergeData === true) this.pocket[id][key] = Object.assign({}, this.pocket[id][key], value)
                    else this.pocket[id][key] = value
                }
                if (key === "status" || key === "ref" || key === "error" || key === "campaign") this.pocket[id][key] = value
                updated = true
                continue
            } else {
                if (this.debug) warn("[pocket]", `[$update] not a valid prop/value: { ${key}:${this.pocket[id][key]} }`)
            }
        }
        // when setting new data, using `$set()` we should clear any cached Probes and related data
        if (updated && type === "set") {
            this.clearStoreTransfers(id)
            if (this.$transfer_lastID === id) this.$transfer_lastID = ""
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
        if (!id) throw "id must be set"

        if (!this._ready[id]) this._ready[id] = sq()

        if (!objectSize(this.pocket)) {
            const msg = `[setDefer] probe is empty, so nothing set, id:${id}`
            if (this.debug) onerror("[pocket]", msg)
            this._ready[id].reject(msg)
            return undefined
        }

        const pocketSet = Object.values(this.pocket).filter((z) => z.id.indexOf(id) !== -1)
        if (!pocketSet.length) {
            const msg = `[setDefer] no pocketSet found for id:${id} `
            if (this.debug) onerror("[pocket]", msg)
            this._ready[id].reject(msg)
            return undefined
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
            Promise.all(pocketSet.map((z) => z.sq.promise)).then(
                (z) => {
                    const output = z.map((p) => userOutput(p.probe)).filter((n) => !!n)
                    this._ready[id].resolve(output)
                },
                (err) => {
                    // should unlikely happen since we dont have any rejects set
                    onerror("[pocket]", `[setDefer] Promise.all`, err)
                }
            )

            return true
        } catch (err) {
            onerror("[pocket]", `[setDefer]`, err)
        }

        return false
    }

    /**
     * - distribute payloadData, each to `new Probe()`
     */
    distributor() {
        for (let [key, el] of Object.entries(this.payloadData)) {
            if (this.lastPocketTimestamp > el["timestamp"]) continue // no new entries

            // omit done
            if (el.status === "complete" || el.status === "send" || el.status === "error") continue

            for (let value of el.value.values()) {
                const pl = { id: key, ...value }
                const pocketSet = this.setProbe(pl)
                if (!pocketSet) onerror("[pocket]", `probe for id:${key} already exists`)
            }
        }
        return this
    }

    /**
     * - every new probe `id` must be: format `id:::taskName`
     * required: `{id,task}`
     * optional: `{campaign}`
     * @param {*} props
     */
    setProbe(props = {}) {
        if (!props.id || !props.task) throw "id and task both must be set"
        if (!validID(props.id)) throw "props.id not valid"

        const uid = `${props.id}::${props.task}`
        if (this.pocket[uid]) {
            if (this.debug) log("[pocket]", `[setProbe] probe: ${uid} already set`)
            return null
        }
        try {
            props.id = uid
            const emitter = this.dispatcher !== null ? this._emit.bind(this) : null
            let opts = {
                withDataBank: this.withDataBank,
                disableWarnings: this.disableWarnings, // disable some less relevant warning messages
                onChange: this._onChange,
                emitter,
                completeOnNull: this.completeOnNull
            }

            const Probe = this.Probe
            const p = new Probe(props, opts, this.debug)
            this.pocket[uid] = p
        } catch (err) {
            onerror("[pocket]", err)
            return null
        }
        return this.pocket[uid]
    }

    /**
     * UPDATE
     * @deprecated using Imports
     * set new probe model
     * - every new task has a set of requirements. Once status is `complete` and data available, probe sends a dispatch with probe information `(if opts.dispatcher===true)`.
     * methods:`{get,all}` props: `{id,data,task,status,campaign}`
     *
     * @memberof Probe.js module
     */
    // Probe(props = {}, opts = {}) {
    //     return new NewProbe(props, opts, this.debug)
    // }

    /**
     * - emit extends with `Dispatcher` to be used by every new Probe{} as an emitter `(if opts.dispatcher===true)`
     * @param {*} obj required
     */
    _emit(obj) {
        if (!obj) return null
        if (!this.dispatcher) return false
        try {
            this.dispatcher.next(obj)
            return true
        } catch (err) {
            onerror("[pocket]", `[_emit] dispatcher did not emit`)
            return false
        }
    }
}

module.exports = PocketModule
