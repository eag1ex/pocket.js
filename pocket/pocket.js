
const { isString, warn, log, isNumber } = require('./utils')

/**
 * set new pocket model
 * - every new task has a set of requirements. Once status is `complete` and data availabl, information is send and pocket is sealed.
 * methods:`{get,all}` props: `{id,data,tasks,status}`
 *  @param {*} opts.id required
 *  @param {*} opts.tasks required
 *  @param {*} opts.compaign optional
 *  @param {*} debug optional
 */
module.exports = (self) => {
    return class Pocket {
        constructor(opts = {}, debug) {
            this.debug = debug || false
            if (isNumber(opts.id) || opts.id) opts.id = opts.id.toString()
            if (!opts.id) throw ('id is required')
            if (!opts.task || !isString(opts.task)) throw ('task as string is required')
            if (opts.id.indexOf(`::`) === -1) throw ('each id must be of format id::taskName')

            this.task = opts.task.replace(/ /gi, '_').toLowerCase()// every task must be valid and same format
            this._updateIndex = 1 // cound times data been updated to hel set correct status for  `updated`
            this._status = 'open'

            this._data = null
            // assing initial data if differs from default
            if (opts.data !== this._data) this._data = opts.data

            this.compaign = opts.compaign || null // optional
            this.id = opts.id.replace(/ /gi, '_').toLowerCase()
        }

        set data(v) {
            /**
            * once cannot be updated uppon status is send || complete
            */
            const complete = this.status === 'complete' || this.status === 'send'
            if (complete) {
                if (this.debug) warn(`you cannot update data once the status is complete and send`)
                return null
            }

            this._data = v
            this._updateIndex++

            if (this.status === 'open' && this._data !== null && this._updateIndex > 1) this.status = 'updated'
        }

        get data() {
            return this._data
        }

        /**
         * allowed status: open | updated | complete | send
         * `open`: this status is set when pocked is initialized
         * `updated`: this status is set when data is updated
         * `complete`: this status is set when you want to discard and complete the the pocket
         * `send`: once the status was set the complete data is emited first then this status is set as send, at this pont Pocked is done/seald and cannot be worked in anymore
         */
        get status() {
            return this._status
        }

        set status(v) {
            if (this._status === 'send') return

            if (v === 'updated') {
                this._status = v
                if (this.debug) log(`id:${this.id},  data updated`)
                return
            }

            if (v === 'open') {
                this._status = v
                /// //////////////////////////////////////
                this.onOpenStatus(v) // emit pocket when status opens
                /// //////////////////////////
                return
            }

            let okStatus = (v === 'complete' || v === 'error')

            if (okStatus) {
                this._status = v
                /// //////////////////////////////////////
                this.onComplete(v) // emit pocket when status complete
                /// //////////////////////////

                // log('new status set to', v)
            } else {
                if (this.debug) warn(`id:${this.id},  you set invalid status, nothing changed`)
            }
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
                    self._emit({ pocket: this, status })
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
                    self._emit({ pocket: this, status: 'open' })
                })
            }
        }
    }
}
