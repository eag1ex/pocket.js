
const { isString, isArray, uniq, error, log, warn, push } = require('./utils')

/**
 * set new pocket model
 * - every new task has a set of requiremends. Once status is `complete` and data is available, the information is ipc.send and pocket is closed
 * methods:`{get,all}` props: `{id,data,tasks,status}`
 *  @param {*} opts.id required
 *  @param {*} opts.tasks required
 *  @param {*} opts.compaign optional
 */
module.exports = (self) => {
    return class Pocket {
        constructor(opts = {}) {
            if (opts.id !== undefined) opts.id = opts.id.toString()
            if (!opts.id) throw ('id is required')
            if (!opts.task || !isString(opts.task)) throw ('task as string is required')
            if (opts.id.indexOf(`::`) === -1) throw ('each id must be of format id::taskName')
            this.task = opts.task.replace(/ /gi, '_').toLowerCase()// every task must be valid and same format
            this._data = null
            this._status = null
            this.compaign = opts.compaign || null // optional
            this.id = opts.id.replace(/ /gi, '_').toLowerCase()
            this.status = 'open'
        }

        set data(v) {
            /**
            * data set once cannot be updated when status is send || complete
            */
            const complete = this.status === 'complete' || this.status === 'send'
            if (complete) return null
            else this._data = v
        }
        get data() {
            return this._data
        }

        get status() {
            return this._status
        }
        set status(v) {
            if (this._status === 'send') return

            if (v === 'open') {
                this._status = 'open'
                this.onOpenStatus(v) // emit pocket when status opens
                return
            }

            let okStatus = v === 'complete' || v === 'busy' || v === 'error'

            if (okStatus) {
                this._status = v
                /// //////////////////////////////////////
                this.onComplete(v)
                /// //////////////////////////

                // log('new status set to', v)
            } else {
                warn(`you set invalid status, nothing changed`)
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
            if (status === 'complete' && this.status !== 'send' && this.data) {
                setTimeout(() => {
                    self.emit({ pocket: this, status:'complete' })
                    // ipc.send('pre-script', this.all()) // send directly to server
                })
                this._status = 'send'
                //
            }
        }
        /**
         * do something on open tast, this means we start request for data
         * @param {*} status
         */
        onOpenStatus(status) {
            if (status === 'open') {
                // return this pocket and update it when its complete
                setTimeout(() => {
                    self.emit({ pocket: this, status:'open' })
                })
            }
        }
    }
}
