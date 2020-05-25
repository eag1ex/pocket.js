/**
 * Set new probe model
 * - every new task has a set of requirements controlled by `statusStackOrder` in status setter. Once status is `complete` and data available, information is send and probe is blocked.
 * methods:`{get,all}` props: `{id,data,tasks,status}`
 */
module.exports = (dispatcher) => {
    // const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE
    const { isString, warn, log, isNumber, onerror, last, copy, isObject } = require('./utils')
    const sq = require('simple-q')  // nice and simple promise/defer by `eaglex.net`
    return class Probe {
        /**
         * @param {*} opts.id required, case sensitive, all will be toLowerCase() 
         * @param {*} opts.task once set cannot be changed
         * @param {*} opts.compaign optional, once set cannot be changed
         * @param {*} opts.data optional any value except undefind, cannot be change once status set to `complete` or send
         * @param {*} opts.status required to control Probe actions
         * @param {*} debug 
         */
        constructor(opts = {}, debug) {
            this.debug = debug || false
            if (isNumber(opts.id) || opts.id) opts.id = opts.id.toString()
            if (!opts.task || !isString(opts.task)) throw ('task as string is required')

            this._id = null
            this._task = null
            this._status = null
            this._data = null
            this._compaign = null
            this._dataIndex = 0
            this._statusIndex = 0
            this._statusAsync = [/**{timestamp:promise} */] // dynamic promise changer

            this.task = opts.task
            this.id = opts.id
            this.status = 'open'

            // assign initial data if differs from default
            if (opts.data !== this._data) this.data = opts.data
            if (opts.compaign) this.compaign = opts.compaign
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
            if (!v) throw ('id is required')
            if (v.split(' ').length > 1) throw ('each id cannot have spaces')
            if (v.indexOf(`::`) === -1) throw ('each id must be of format id::taskName')
            if (v.indexOf(`:::`) !== -1) throw ('each id must be of format id::taskName')

            // validate chars
            const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
            const regx = new RegExp(pat, 'gi')
            if (regx.test(v)) throw (`your id is invalid, allowed chars: ${pat}`)

            v = v.replace(/ /gi, '_').toLowerCase()

            if (v.indexOf(this._task) === -1) {
                throw (`wrong id setup, your id should make up the taks name, example: id='cocacola::drink'`)
            }

            this._id = v
        }

        get id() {
            return this._id
        }

        get compaign() {
            return this._compaign
        }

        set compaign(v) {
            if (this._compaign) {
                if (this.debug) warn(`cannot update already set compaign ${this._compaign}`)
                return
            }
            if (!v) return
            if (!isString(v)) {
                if (this.debug) warn(`compaign must be a string`, v)
                return
            }

            this._compaign = v
        }

        set task(v) {
            if (this._task) {
                if (this.debug) warn(`cannot update already set task`)
                return
            }


            if (!v) return
            if (!isString(v)) {
                if (this.debug) warn(`task must be a string`)
                return
            }
            if (v.indexOf("::") !== -1) throw ('task seperator :: is restricted')
            if (v.split(' ').length > 1) throw ('task cannot have spaces, use seperators: _+')
            const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
            const regx = new RegExp(pat, 'gi')
            if (regx.test(v)) throw (`your task is invalid, allowed chars: ${pat}`)



            this._task = v.replace(/ /gi, '_').toLowerCase()// every task must be valid with required 
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
                // NOTE this can also happen if you are using $transfer().$to from `PocketModule` that is a delayed
                if (this.debug) warn(`you cannot update data once the status is complete or send`)
                return null
            }

            this._dataIndex++
            if (this.status === 'open' && this._data !== null && this._dataIndex > 1) this.status = 'updated'
            this._data = v
        }

        /**
         * ### update
         * - update data of current Probe{}.data
         * @param {*} data:any, required
         * @param {*} merge:Boolean, optional for merging object to this.data
         */
        update(data, merge = null) {
            if (this.status === 'complete' || this.status === 'send') {
                if (this.debug) warn(`[Probe][update] cannot update data on complete status`)
                return this
            }
            if (!isObject(data) && merge) {
                if (this.debug) warn(`[Probe][update] cannot update none object 'data' with option 'merge=true' set`)
                return this
            }
            if (isObject(data) && merge) this.data = Object.assign({}, this.data, data)
            else if (data !== undefined) this.data = data
            return this
        }

        get data() {
            return this._data
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
            ((stat) => {
                try {
                    // meaning do not allow any status changes beond `updated`
                    if (this.statusStackOrder[stat].value > 2 && this.statusStackOrder[stat].set === true) return false
                } catch (err) {
                    onerror('statusStackOrder invalid status')
                }

                if (this._status === 'complete' || this._status === 'send') {
                    if (this.debug) warn(`cannot update status if already complete, id:${this.id}`)
                    return false
                }

                switch (stat) {
                    case 'open':
                        if (this._status === 'updated') {
                            if (this.debug) warn(`cannot set status back to open once set to updated`)
                            break
                        }
                        this._status = stat
                        this.statusStackOrder[stat].set = true
                        this.onOpenStatus(v) // emit probe when status opens
                        this.setStatusAsync = stat
                        break

                    case 'updated':
                        if (this._status === 'complete') {
                            if (this.debug) warn(`cannot update status to 'updated' then previously set to 'complete'`)
                            break
                        }

                        if (this._dataIndex > 0) {
                            this._status = stat
                            this.statusStackOrder[stat].set = true
                            this.setStatusAsync = stat
                            if (this.debug) log(`id:${this.id}, data updated`)
                        }

                        break

                    case 'complete':
                        
                        this.statusStackOrder[stat].set = true
                        this.setStatusAsync = stat
                       // setTimeout(()=>{
                            this._status = stat
                            this.onComplete(v) // resolve probe when status complete
                      //  })

                       
                        break

                    case 'send':
                        if (this._status !== 'complete') {
                            if (this.debug) warn(`cannot update status to 'send' then previously not set to 'complete'`)
                            break
                        }
                        this._status = stat
                        this.statusStackOrder[stat].set = true
                        this.setStatusAsync = stat
                        break

                    case 'error':
                        if (this._status === 'complete') return
                        // when we have error we need to inform what happen, and close the Probe
                        
                        this.statusStackOrder[stat].set = true
                        this.setStatusAsync = stat
                        this.onComplete(v) // resolve probe when status complete                     
                        break

                    default:
                        if (this.debug) warn(`id:${this.id},  you set invalid status: ${stat}, nothing changed`)
                }
            })(v)
        }


        /**
         * - works with `statusAsync`
         * - (1.) setter creates our new sq() promise every time, and allows use or resolve 
         * - to use example: setStatusAsync.resolve()
         */
        set setStatusAsync(v) {
            // 'v'  set to anything to initiate setter
            const timestamp = new Date().getTime()
            const p = { timestamp, p: sq() }
            this._statusAsync.push(p)
        }

        get setStatusAsync() {
            const lastPromise = last(this._statusAsync.sort((a, b) => a.timestamp - b.timestamp).map(z => z['p']))
            lastPromise.resolve(copy(this.status)) // << we are unly returning
            return lastPromise
        }

        /**
         * ### statusAsync
         * - dynamic promise resolver with `Simple Q` from `eaglex.net`
         * - works with `setStatusAsync` setter/getter
         * - return last 'resolve' status from last `timestamp` setting
         */
        get getStatusAsync() {
            return this.setStatusAsync.promise()
        }

        all() {
            return { compaign: this.compaign, data: this.data, id: this.id, task: this.task, status: this.status }
        }

        /**
         * status watch, when current status changes execute send
         * @param {*} status
         */
        onComplete(status) {
            if ((status === 'complete' || status === 'error') && this._status !== 'send' && this._dataIndex > 0) {
               
                if (dispatcher){
                    setTimeout(() => {
                        if (dispatcher) dispatcher._emit({ probe: this, status })                   
                    })
                }
                
                this.sq.resolve({ probe: this.all() })
                this._status = 'send'
            }
        }

        /**
         * do something on open task, this means we start request for data
         * @param {*} status
         */
        onOpenStatus(status) {
            if (status === 'open') {
                // return this probe and update it when its complete
                setTimeout(() => {
                    if (dispatcher) dispatcher._emit({ probe: this, status: 'open' })
                })
            }
        }
    }
}
