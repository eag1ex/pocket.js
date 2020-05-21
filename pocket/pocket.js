
const { isString, warn, log, isNumber, onerror } = require('./utils')
const sq = require('simple-q')
/**
 * Set new pocket model
 * - every new task has a set of requirements controlled by `statusSetOrder` in status setter. Once status is `complete` and data available, information is send and pocket is blocked.
 * methods:`{get,all}` props: `{id,data,tasks,status}`
 *  @param {*} opts.id required
 *  @param {*} opts.tasks required
 *  @param {*} opts.compaign optional
 *  @param {*} debug optional
 */
module.exports = (dispatcher) => {
    return class Pocket {
        /**
         * @param {*} opts.id required, case sensitive, all will be toLowerCase() 
         * @param {*} opts.tast once set cannot be changed
         * @param {*} opts.compaign optional, once set cannot be changed
         * @param {*} opts.data optional any value except undefind, cannot be change once status set to `complete` or send
         * @param {*} opts.status required to control Pocket actions
         * @param {*} debug 
         */
        constructor(opts = {}, debug) {
            this.debug = debug || false
            if (isNumber(opts.id) || opts.id) opts.id = opts.id.toString()
            if (!opts.id) throw ('id is required')
            if (!opts.task || !isString(opts.task)) throw ('task as string is required')
            if (opts.id.indexOf(`::`) === -1) throw ('each id must be of format id::taskName')
            this._id = null
            this.id = opts.id.replace(/ /gi, '_').toLowerCase()

            this._task = opts.task.replace(/ /gi, '_').toLowerCase()// every task must be valid with required format
            this._statusIndex = 0
            this._status = null
            this.status = 'open'
            this._dataIndex = 0;
            this._data = null
            // assign initial data if differs from default
            if (opts.data !== this._data) this.data = opts.data

            this._compaign = isString(opts.compaign) ? opts.compaign : null // optional

        }

        /**
         * nice and easy, save some coding, and added security
         */
        get sq() {
            if (this[`_sq`]) return this[`_sq`]
            this[`_sq`] = sq()
            return this[`_sq`]
        }

        set id(v) {
            if (this._id) {
                if (this.debug) warn(`cannot update already set id: ${this._id}`)
                return
            }
            this._id = v
        }

        get id() {
            return this._id
        }

        set compaign(v) {
            if (this._compaign) {
                if (this.debug) warn(`cannot update already set compaign ${this._compaign}`)
                return
            }
            this._compaign = v
        }

        set task(v) {
            if (this._task) {
                if (this.debug) warn(`cannot update already set task`)
                return
            }
            this._task = v
        }

        get task() {
            return this._task
        }

        set data(v) {
            /**
            * cannot be updated uppon status is send || complete
            */
            const complete = this.status === 'complete' || this.status === 'send'
            if (complete) {
                if (this.debug) warn(`you cannot update data once the status is complete or send`)
                return null
            }

            this._dataIndex++
            if (this.status === 'open' && this._data !== null && this._dataIndex > 1) this.status = 'updated'
            this._data = v
        }

        get data() {
            return this._data
        }

        /**
         * forward motion `status` update is allowed
         * `value`: importance que
         * `set`: if status already set
         */
        get statusSetOrder() {
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
         * `complete`: status is set when you want to complete and discard pocket
         * `send`: once the status was set `complete` data is resolved first then status is set as `send`.
         * and Pocket is locked, cannot be interacted with. Follow the strategic order set by `statusSetOrder`
         * `error` acts like complete, it will resolve() last available data and block the Pocket
         */
        get status() {
            return this._status
        }

        set status(v) {

            // order of status and allowed values
            ((stat) => {
                try {
                    // meaning do not allow any status changes beond `updated`
                    if (this.statusSetOrder[stat].value > 2 && this.statusSetOrder[stat].set === true) return false

                } catch (err) {
                    onerror('statusSetOrder invalid status')
                }

                if (this._status === 'complete' || this._status === 'send') {
                    if (this.debug) log(`cannot update status if already complete`)
                    return false
                }
                let error = false
                switch (stat) {
                    case 'open':
                        if (this._status === 'updated') {
                            if (this.debug) warn(`cannot set status back to open once set to updated`)
                            break
                        }
                        this._status = stat
                        this.statusSetOrder[stat].set = true
                        this.onOpenStatus(v) // emit pocket when status opens
                        break

                    case 'updated':
                        if (this._status === 'complete') {
                            if (this.debug) warn(`cannot update status to 'updated' then previously set to 'complete'`)
                            error = true
                            break
                        }

                        this._status = stat
                        this.statusSetOrder[stat].set = true
                        if (this.debug) log(`id:${this.id}, data updated`)
                        break

                    case 'complete':
                        this._status = stat
                        this.statusSetOrder[stat].set = true
                        this.onComplete(v) // resolve pocket when status complete                     
                        break

                    case 'send':
                        if (this._status !== 'complete') {
                            if (this.debug) warn(`cannot update status to 'send' then previously not set to 'complete'`)
                            break
                        }
                        this._status = stat
                        this.statusSetOrder[stat].set = true
                        break


                    case 'error':
                        // when we have error we need to inform what happen, and close the Pocket
                        this._status = stat
                        this.statusSetOrder[stat].set = true
                        this.onComplete(v) // resolve pocket when status complete                     
                        break

                    default:
                        if (this.debug) warn(`id:${this.id},  you set invalid status: ${stat}, nothing changed`)
                        error = true
                }
                return error ? false : true
            })(v)
        }

        all() {
            return { compaign: this.compaign, data: this.data, id: this.id, task: this.task, status: this.status }
        }

        /**
         * status watch, when current status changes execute send
         * @param {*} status
         */
        onComplete(status) {
            if ((status === 'complete' || status === 'error') && this.status !== 'send' && this.data) {
                setTimeout(() => {
                    if (dispatcher) dispatcher._emit({ pocket: this, status })
                    this.sq.resolve({ pocket: this.all() })
                })
                this._status = 'send'
            }
        }

        /**
         * do something on open task, this means we start request for data
         * @param {*} status
         */
        onOpenStatus(status) {
            if (status === 'open') {
                // return this pocket and update it when its complete
                setTimeout(() => {
                    if (dispatcher) dispatcher._emit({ pocket: this, status: 'open' })
                })
            }
        }
    }
}
