// @ts-nocheck
/**
 * Set new probe model
 * - every new task has a set of requirements controlled by `statusStackOrder` in status setter. Once status is `complete` and data available, information is send and probe is blocked.
 * methods:`{get,all}` props: `{id,data,tasks,status}`
 */

// const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE
const { isString, sq, isArray, warn, log, isNumber, onerror, last, copy, isObject, isFunction, dispatcher } = require("x-utils-es/umd")
const ProbeDataBank = require("./Probe.dataBank")
class Probe extends ProbeDataBank {
    /**
     * @param {object} props probe options `{id,task,campaign,data,status,emitter,completeOnNull}`
     * @param {string} props.id required, case sensitive, all will be toLowerCase()
     * @param {string} props.task once set cannot be changed
     * @param {string} props.campaign optional, once set cannot be changed
     * @param {any} props.data optional any value except undefined, cannot be change once status set to `complete` or send
     * @param {string} props.ref (optional) any type of string reference
     * @param {string} props.status required to control Probe actions
     * @param {({ prob: Probe, status })=>{}} props.emitter optional, dispatcher/emitter available if not null
     * @param {boolean} props.completeOnNull override complete setting even if data was never set
     * @param {boolean} debug
     */
    constructor(props = undefined, opts = {}, debug) {
        super(props, opts, debug)

        this.debug = debug || false
        if (isNumber(props.id) || props.id) props.id = props.id.toString()
        if (!props.task || !isString(props.task)) throw "task as string is required"
        this._id = null
        this._error = [] // REVIEW should be add options for props.error ?
        this._ref = null
        this._task = null
        this._status = null
        this._data = null
        this._campaign = null
        this._dataIndex = 0
        this._statusIndex = 0
        this._statusAsync = [
            /** {timestamp:promise} */
        ] // dynamic promise changer
        this.task = props.task
        this.id = props.id
        this.status = "open"
        this._sealed = false // once the pocket is send of complete we set to true

        this._onChange = opts.onChange || null
        this._onchangeDispatch = undefined // loads dispatcher when `opts.onChange=true` is set
        this.emitter = opts.emitter || null
        // this will allow storing old data in to an array when current data gets updated via setter
        this.withDataBank = opts.withDataBank || false
        this.completeOnNull = opts.completeOnNull || null // when true allows completion on data still at initial null state
        this.disableWarnings = (opts || {}).disableWarnings // disable some less relevant warning messages

        // assign initial data if differs from default
        if (props.ref !== this._ref) this.ref = props.ref
        if (props.data !== this._data) this.data = props.data
        if (props.campaign) this.campaign = props.campaign

        this._completeAsync = sq()
    }

    /**
     * nice and easy, save some coding, and added security
     */
    get sq() {
        if (this._sq) return this._sq
        this._sq = sq()
        return this._sq
    }

    set id(v) {
        if (this._id) {
            if (this.debug) warn("[pocket]", `cannot update already set id: ${this._id}`)
            return
        }
        if (!v) throw "id is required"
        if (v.split(" ").length > 1) throw "each id cannot have spaces"
        if (v.indexOf(`::`) === -1) throw "each id must be of format id::taskName"
        if (v.indexOf(`:::`) !== -1) throw "each id must be of format id::taskName"

        // validate chars
        const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
        const regx = new RegExp(pat, "gi")
        if (regx.test(v)) throw `your id is invalid, allowed chars: ${pat}`

        v = v.replace(/ /gi, "_").toLowerCase()

        if (v.indexOf(this._task) === -1) {
            throw `wrong id setup, your id should make up the task name, example: id='cocacola::drink'`
        }

        this._id = v
    }

    get id() {
        return this._id
    }

    /**
     * - collect all errors in to an array
     * - no empty error values will be set
     */
    set error(v) {
        if (!v) return

        // in case data is in its initial status state = 'open' we need to update it to change `_dataIndex`
        //  if (this.data === null) this.data = false
        // NOTE  we now use `this.completeOnNull` so can ignore above logic
        this._error.push(isArray(v) ? v.toString() : v)
        this._error = this._error.filter((z) => !!z)
        this.dispatchChange("error")
    }

    /**
     * @returns an arrays of errors or null
     */
    get error() {
        if (!this._error.length) return undefined
        return this._error
    }

    get ref() {
        return this._ref
    }

    /**
     * - accept string, can only be set when status isnt complete
     * - can be used to find your Pocket by particular `ref`
     */
    set ref(v) {
        if (!v) return
        if (!isString(v)) {
            warn("[pocket]", `[ref] must be a string`)
            return
        }
        if (this.status === "complete" || this.status === "send") return

        this._ref = v
        this.dispatchChange("ref")
    }

    get campaign() {
        return this._campaign
    }

    set campaign(v) {
        if (v === undefined) return
        if (this._campaign) {
            if (this.debug && !this.disableWarnings) warn("[pocket]", `cannot update already set campaign ${this._campaign}`)
            return
        }
        if (!v) return
        if (!isString(v)) {
            if (this.debug) warn("[pocket]", `campaign must be a string`, v)
            return
        }

        this._campaign = v
        this.dispatchChange("campaign")
    }

    set task(v) {
        if (v === undefined) return
        if (this._task) {
            if (this.debug && !this.disableWarnings) warn("[pocket]", `cannot update already set task`)
            return
        }

        if (!v) return
        if (!isString(v)) {
            if (this.debug) warn("[pocket]", `task must be a string`)
            return
        }
        if (v.indexOf("::") !== -1) throw "task separator :: is restricted"
        if (v.split(" ").length > 1) throw "task cannot have spaces, use separators: _+"
        const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
        const regx = new RegExp(pat, "gi")
        if (regx.test(v)) throw `your task is invalid, allowed chars: ${pat}`

        this._task = v.replace(/ /gi, "_").toLowerCase() // every task must be valid with required
    }

    get task() {
        return this._task
    }

    set data(v) {
        if (v === undefined) return
        /**
         * cannot be updated uppon status is send || complete
         */
        const complete = this.status === "complete" || this.status === "send"
        if (complete) {
            // NOTE this can also happen if you are using $transfer().$to from `PocketModule` that is a delayed
            if (this.debug && !this.disableWarnings) warn("[pocket]", `you cannot update data once the status is complete or send`)
            return
        }

        this._dataIndex++
        if (this.status === "open" && this._data !== null && this._dataIndex > 1) this.status = "updated"

        this._data = v
        if (this.withDataBank) this.dataBank = v
        this.dispatchChange("data")
    }

    /**
     *
     *
     * @memberof Probe
     * @returns {any}
     */
    get data() {
        return this._data
    }

    /**
     * ### update
     * - update data of current Probe{}.data
     * @param {*} data:any, required
     * @param {*} merge:Boolean, optional for merging object to this.data
     */
    update(data, merge = null) {
        if (this.status === "complete" || this.status === "send") {
            if (this.debug && !this.disableWarnings) warn(`[Probe][update] cannot update data on complete status`)
            return this
        }
        if (!isObject(data) && merge) {
            if (this.debug) warn("[pocket]", `[Probe][update] cannot update none object 'data' with option 'merge=true' set`)
            return this
        }
        if (isObject(data) && merge) this.data = Object.assign({}, this.data, data)
        else if (data !== undefined) this.data = data
        return this
    }

    /**
     * forward motion `status` update is allowed
     * `value`: importance que
     * `set`: if status already set
     */
    get statusStackOrder() {
        return {
            open: { value: 1, set: false },
            updated: { value: 2, set: false },
            complete: { value: 3, set: false },
            send: { value: 4, set: false },
            error: { value: 5, set: false }
        }
    }

    /**
     * allow status: open | updated | complete | send | error
     * `open`: status is set when pocked is initialized
     * `updated`: status is set when data is updated
     * `complete`: status is set when you want to complete and discard probe
     * `send`: once the status was set `complete` data is resolved first then status is set as `send`.
     * and Probe is locked, cannot be interacted with. Follow the strategic order set by `statusStackOrder`
     * `error` acts like complete, it will resolve() last available data and block the Probe
     */
    get status() {
        return this._status
    }

    set status(v) {
        // order of status and allowed values
        ;((stat) => {
            try {
                // meaning do not allow any status changes beyond `updated`
                if (this.statusStackOrder[stat].value > 2 && this.statusStackOrder[stat].set === true) return false
            } catch (err) {
                onerror("statusStackOrder invalid status")
            }

            // if (this._status === 'send' && (stat === 'complete' || stat ==='send')) {
            //     if (this.debug) warn(`cannot update status if already complete, id:${this.id}`)
            //     return false
            // }

            switch (stat) {
                case "open":
                    if (this._status === "updated" || this._status === "send" || this._status === "complete") {
                        if (this.debug) warn("[pocket]", `cannot set status back to open once set to updated/complete/send`)
                        break
                    }

                    this._status = stat
                    this.statusStackOrder[stat].set = true
                    this.onOpenStatus(v) // emit probe when status opens
                    this.setStatusAsync = stat
                    this.dispatchChange("status")
                    break

                case "updated":
                    if (this._status === "complete" || this._status === "send") {
                        if (this.debug) warn("[pocket]", `cannot update status to 'updated' then previously set to 'complete/send'`)
                        break
                    }

                    if (this._dataIndex > 0) {
                        this._status = stat
                        this.statusStackOrder[stat].set = true
                        this.setStatusAsync = stat
                        this.dispatchChange("status")
                        if (this.debug) log(`id:${this.id}, data updated`)
                    }

                    break

                case "complete":
                    if (this.data === null && this.completeOnNull !== true) {
                        if (this.debug) warn("[pocket]", `[status] cannot complete status because data is null, to complete you set data prop to false`)
                        break
                    }
                    this.statusStackOrder[stat].set = true
                    this.setStatusAsync = stat
                    // setTimeout(()=>{
                    this._status = stat
                    this.dispatchChange("status")
                    this.onComplete(v) // resolve probe when status complete
                    //  })

                    break

                case "send":
                    if (this._status !== "complete") {
                        if (this.debug) warn("[pocket]", `cannot update status to 'send' then previously not set to 'complete'`)
                        break
                    }

                    this._status = stat
                    this.statusStackOrder[stat].set = true
                    this.setStatusAsync = stat
                    this._completeAsync.resolve({ status: this._status, id: this.id })
                    this.dispatchChange("status")
                    break

                case "error":
                    if (this._status === "complete") return
                    // when we have error we need to inform what happen, and close the Probe

                    this.statusStackOrder[stat].set = true
                    this.setStatusAsync = stat
                    this.dispatchChange("status")
                    this.onComplete(v) // resolve probe when status complete
                    break

                default:
                    if (this.debug) warn("[pocket]", `id:${this.id},  you set invalid status: ${stat}, nothing changed`)
            }
        })(v)
    }

    /**
     * - works with `statusAsync`
     * - (1.) setter creates our new sq() promise every time, and allows use or resolve
     * - to use example: setStatusAsync.resolve()
     */
    // @ts-ignore
    set setStatusAsync(v) {
        // 'v'  set to anything to initiate setter
        const timestamp = new Date().getTime()
        const p = { timestamp, p: sq() }
        this._statusAsync.push(p)
    }

    /**
     * Resolve lext promise and returns last status
     *
     * @memberof Probe
     * @returns {Promise}
     */
    get setStatusAsync() {
        const lastPromise = last(this._statusAsync.sort((a, b) => a.timestamp - b.timestamp).map((z) => z["p"]))
        lastPromise.resolve(copy(this.status)) // << we are only returning
        return lastPromise
    }

    /**
     * ### statusAsync
     * - dynamic promise resolver with `Simple Q` from `eaglex.net`
     * - works with `setStatusAsync` setter/getter
     * - return last 'resolve' status from last `timestamp` setting
     * @returns {Promise<string>} status name
     */
    get getStatusAsync() {
        // @ts-ignore
        return this.setStatusAsync.promise
    }

    /**
     * - when status is set to complete or send, the promise will then be resolved
     * @returns {Promise<{status, id}>}
     */
    get completeAsync() {
        return this._completeAsync.promise
    }

    /**
     * - alias of `getStatusAsync`
     * @readonly
     */
    get statusAsync() {
        return this.getStatusAsync
    }

    all() {
        const d = { error: this.error, ref: this.ref, campaign: this.campaign, data: this.data, id: this.id, task: this.task, status: this.status }
        if (this.withDataBank) d.dataBank = copy(this.dataBank)
        return d
    }

    /**
     * - can be used when `opts.onChange=true` is set
     * - changes are observed for `[ data,status,ref,error,campaign,status:complete]`
     * @param {(probe:Probe,id)=>{}} cb(data,id) callback returns updated value in real time
     */
    onChange(cb, watch = "all") {
        if (!this._onChange) {
            if (this.debug) warn("[pocket]", `[onChange] to use need to set opts.onChange=true`)
            return this
        }
        if (!isFunction(cb)) {
            if (this.debug) warn(`[onChange] cb must be a function`)
            return this
        }
        let availableWatch = ["all", "data", "status", "ref", "error", "campaign"]

        // allow lookout for status complete event only when selected to watch
        availableWatch = [].concat(availableWatch, ["status:complete"])

        if (!availableWatch.includes(watch)) {
            if (this.debug) warn("[pocket]", `[onChange] no watch available for ${watch}`)
            return this
        }

        let statIndex = availableWatch.indexOf("status:complete")
        availableWatch.splice(statIndex, 1)

        const self = this

        if (!this.onchangeDispatch) {
            if (this.debug) warn("[pocket]", `[onChange] onchangeDispatch no longer active`)
            return this
        }

        this.onchangeDispatch.subscribe(function (data, id) {
            // NOTE data['changed'] // returned in dispatch only provided name of asset changed
            // no point to carry data if we can access it direct
            if (data["changed"] && watch === "all") {
                cb.bind(self)(self, id)
                return
            }

            /**
             * on status complete return all data copy in callback
             */
            if (watch === "status:complete") {
                if (data["changed"] === "status" && (self["status"] === "send" || self["status"] === "complete") && !self._sealed) {
                    let d = {
                        ...copy(self),
                        status: "complete"
                    }
                    cb.bind(self)(d, id)
                    self._sealed = true
                }
                return this
            }

            if (data["changed"] === watch && self[watch] !== undefined) {
                cb.bind(self)(self[watch], id)
            }
        })
        return this
    }

    /**
     * - works with onchangeDispatch, onChange
     * - emits next value to `onchangeDispatch` listener
     * @param {*} changedName required, provide name of Probe prop to alert dispatcher what has changed
     * @returns self
     */
    dispatchChange(changedName) {
        if (!this._onChange) {
            return false
        }
        if (!this.onchangeDispatch) {
            return false
        }
        this.onchangeDispatch.next({ changed: changedName })
        return true
    }

    /**
     * initiates dispatcher to handle on change value of [data,status,ref,error,campaign]
     * @returns dispatcher instance
     */
    get onchangeDispatch() {
        if (!this._onChange) {
            if (this.debug) warn("[pocket]", `[onchangeDispatch] to use need to set opts.onChange=true`)
            return null
        }

        if (this._onchangeDispatch) {
            return this._onchangeDispatch
        }

        this._onchangeDispatch = dispatcher(this.id)
        return this._onchangeDispatch
    }

    /**
     * status watch, when current status changes execute send
     * @param {*} status
     */
    onComplete(status) {
        if ((status === "complete" || status === "error") && this._status !== "send" && (this._dataIndex > 0 || this.completeOnNull === true)) {
            if (this.emitter) {
                setTimeout(() => {
                    this.emitter({ probe: this, status })
                })
            }
            this._status = "send"
            this.sq.resolve({ probe: this.all() })

            setTimeout(() => {
                // in case delete listener when data complete
                // @ts-ignore
                if (this.onchangeDispatch) this.onchangeDispatch.del()
            })
        }
        return this
    }

    /**
     * do something on open task, this means we start request for data
     * @param {*} status
     */
    onOpenStatus(status) {
        if (status === "open") {
            // return this probe and update it when its complete
            if (this.emitter) {
                setTimeout(() => {
                    this.emitter({ probe: this, status: "open" })
                })
            }
        }
        return this
    }
}

module.exports = Probe
