
/**
 * requirejs global event handler
 */
module.exports = function (_uid, _debug = null) {
    return (new function (uid, debug) {
        const plugin = `[dispatcher]`
        this.uid = (uid || '').toString() || new Date().getTime()
        this.debug = debug
        this.cbQueue = {}
        this.dispatchInstance = {}

        this.initListener = () => {
            this.Dispatch()
            return this
        }
        /**
         * @next
         * send next data to the `batchReady` callback
         * @param {*} data # optional
         */
        this.next = (data = null) => {
            if (this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid].next(data)
            else {
                if (this.debug) console.log({ message: `${plugin} for uid not available`, uid: this.uid })
            }
            return this
        }

        /**
         * @Dispatch
         * master listener, sends all event callbacks to `batchReady`
         */
        this.Dispatch = () => {
            if (this.dispatchInstance[this.uid]) return this
            const self = this
            const D = function () {
                this.uid = self.uid
                this.data = null

                this.next = (data) => {
                    if ((data || {}).type !== 'cb') this.data = data
                    /**
                         * @next
                         * acts as a reverse callback, it sends back the `cb` from `batchReady`
                         */
                    if ((data || {}).type === 'cb') {
                        if (typeof data.cb === 'function') {
                            // when calling next before batchReady is initiated
                            // collect cb from .next
                            if (!self.cbQueue[self.uid]) self.cbQueue[self.uid] = data.cb
                            if (this.data) data.cb.call(self, this.data, self.uid)
                        }

                        return
                    }

                    if (this.data) {
                        if (typeof self.cbQueue[self.uid] === 'function') self.cbQueue[self.uid].call(self, this.data, self.uid)
                    } else {
                        if (this.debug) console.log(`${plugin} no callback data`)
                    }
                }
            }

            if (!this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid] = new D()
            return this
        }

        this.isActive = () => {
            return this.dispatchInstance[this.uid] ? true : false
        }

        this.del = () => {
            delete this.cbQueue[this.uid]
            delete this.dispatchInstance[this.uid]

            if (!this.cbQueue[this.uid] && !this.dispatchInstance[this.uid]) {
                // if (this.debug) console.log(`cbQueue and dispatchInstance for uid ${this.uid} deleted`)
            }
            return this
        }

        /**
     * @subscribe
     * wait for callbacks forwarded from Dispatch and returned in callback of this method
     * - Dispatch must be set initially before you call `subscribe`
     * @param {*} cb #required
     */
        this.subscribe = (cb) => {
            const isFN = typeof cb === 'function'
            if (!isFN) {
                if (this.debug) console.log(`${plugin}[batchReady] cb must be set`)
                return this
            }
            if (!this.dispatchInstance[this.uid]) {
                // this means batchReady was executed prior to `Dispatch`, because it has forward with next
                // it will get executed anyway
                this.Dispatch()
            }
            if (this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid].next({ type: 'cb', cb })
            return this
        }
    }(_uid, _debug))
}
