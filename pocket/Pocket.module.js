module.exports = () => {

    const { log, onerror, warn, isArray, isObject, isPromise, validID } = require('./utils')
    const sq = require('simple-q')
    const newPocket = require('./pocket')

    class PocketModule {
        /**
         * @param {*} opts.async, when set, allow payload(`data`) to be async object
         * @param {*} opts.dispatcher, when set to true, loads external library `Dispatcher`
         * @param {*} debug optional
         */
        constructor(opts = {}, debug) {

            this.debug = debug || false
            this.async = (opts || {}).async || null

            // when set enables dispatcher to communicate directly with `pocket.js`
            this.dispatcher = (opts || {}).dispatcher ? require('../libs/dispatcher')() : null

  
            this.pocket = {} // example this.pocket[`abc::taskName`]
            this.payloadData = {}// each payload by id
            this.lastPocketTimestamp = 0
            this._ready = {} // collect all ready example: `{id:Promise}`

            if (this.dispatcher) {
                this.dispatcher.initListener().subscribe(z => {
                    const { pocket, status } = z || {}

                    if (status === 'error') {
                        // NOTE dispatch data out
                        if (this.debug) log(`[dispatcher] pocket id:${pocket.id} error`)
                    }

                    if (status === 'open') {
                        if (this.debug) log(`[dispatcher] pocket id:${pocket.id} created`)
                    }

                    if (status === 'complete') {
                        // NOTE dispatch data out
                        if (this.debug) log(`[dispatcher] pocket id:${pocket.id} completed`)
                    }
                })
            }
        }

        
        // ───────────────────────────────────────────────────────────────────────────────────────
        //   :::::: U S E R   A P P L I C A T I O N   C A L L I N G   M E T H O D S : :  :   :    : 
        // ───────────────────────────────────────────────────────────────────────────────────────
        //

        /**
         * ### payload
         * @prop {*} data `required`
         * @prop {*} async `override current opts.sync for this payload`
         * 
         * - `initialize new payload, for as many tasks`
         * - `sets a multi task with instructions:`
         * - `data = {
                id: '', // 1 id for all tasks
                tasks: [{ taskName: '', data: '', compaign: '' }]
            }`

         * - `call distributor and setDefer`
         */
        payload(data = {}, async) {
            // validate payload format
            if (!isObject(data)) return false
            const keys = Object.keys(data)
            // must match all keys
            if (keys.every(el => ['id', 'tasks'].indexOf(el) === -1)) return false
            if (!isArray(data['tasks'])) return false
            // make sure our id's all are lowercase
            data.id = validID(data.id)
            if (!data.id) return false

            // NOTE validate our pocketSet values before generating each `new Pocket()`
            for (let val of data['tasks'].values()) {
                if (!val['task']) {
                    if (this.debug) log('task must be set for your tasks')
                    continue
                }
                if (!this.payloadData[data.id]) this.payloadData[data.id] = { value: [], status: 'open', timestamp: new Date().getTime() }
                const exists = this.payloadData[data.id]['value'].filter(z => z.task.indexOf(val.task) !== -1)
                if (exists.length) {
                    if (this.debug) warn(`the same task "${val.task}" already exists on the payload, you must choose uniq`)
                    continue
                }

                this.payloadData[data.id]['value'].push(val)
                this.lastPocketTimestamp = this.payloadData[data.id]['timestamp']
            }
            if (this.payloadData[data.id]) {
                this.distributor()
                    .setDefer(data.id)

                return true
            } else return false
        }

        /**
         * ### $get
          * - `get pocket by 'id::taskName'`
          * - `returns instance a Pocket`
          *  methods:`{get,all}` props: `{id,data,tasks,status}`
         */
        $get(id) {
            id = validID(id)
            if (!id) return null

            if (!this.pocket[id]) {
                if (this.debug) warn(`[get] did not find pocket with id ${id}`)
                return null
            }
            if (id.indexOf(`::`) === -1) return null
            return this.pocket[id]
        }

        /**
         * - resolves currently active `payload(...)`
         * - `after completion of PocketSet, all instance data for all Pockets is deleted`
         * @param {*} id `required`
         */
        ready(id) {
            id = validID(id)
            if (!id) throw (`id must be set`)
            if(!this._ready[id]){
                throw(`ready[id] is not set, maybe you called it before payload()`)
            }
            return this._ready[id].promise()
        }
        
        //
        // ──────────────────────────────────────────────────────
        //   :::::: E N D : :  :   :    :     :        :          
        // ──────────────────────────────────────────────────────


        // each pocket props that can be available and send on ready
        get pocketProps() {
            return ['compaign', 'data', 'status', 'id', 'task']
        }

        /**
         * - sets defer for `ready()` initially after calling payload 
         * @param {*} id required
         */
        setDefer(id) {
            id = validID(id)
            if (!id) throw 'id must be set'

            if (!this._ready[id]) this._ready[id] = sq()

            if (!Object.entries(this.pocket).length) {
                const msg = `[setDefer] pocket is empty, so nothing set, id:${id}`
                if (this.debug) error(msg)
                this._ready[id].reject(msg)
                return null
            }

            const pocketSet = Object.values(this.pocket).filter(z => z.id.indexOf(id) !== -1)
            if (!pocketSet.length) {
                const msg = `[setDefer] no pocketSet found for id:${id} `
                if (this.debug) error(msg)
                this._ready[id].reject(msg)
                return null
            }

            try {
                const userOutput = (pock) => {
                    const output = {}
                    if (!isObject(pock)) return null
                    for (let i = 0; i < this.pocketProps.length; i++) {
                        const prop = this.pocketProps[i]
                        if (pock[prop]) output[prop] = pock[prop]
                    }
                    return output
                }
                /**
                 * IMPORTANT:
                 * when our pocketSet for each this.pocket[id] is marked 'complete'
                 * `Pocket().resolve(...)` is called, and Promise.all is waiting for `pocketSet` to complete
                 */
                Promise.all(pocketSet.map(z => z.sq.promise())).then(z => {
                    const output = z.map(p => userOutput(p.pocket)).filter(n => !!n)
                    this._ready[id].resolve(output)
                }, err => {
                    // should unlikely happen since we dont have any rejects set
                    error(`[setDefer] Promise.all`, err)
                })

                return true

            } catch (err) {
                error(`[setDefer]`, err)
            }

            return false

        }
        /**
         * - distribute payloadData, each to `new Pocket()`
         * - set `pocketSetRef`
         */
        distributor() {
            for (let [key, el] of Object.entries(this.payloadData)) {
                if (this.lastPocketTimestamp > el['timestamp']) continue // no new entries

                // omit done
                if (el.status === 'complete' || el.status === 'send' || el.status === 'error') continue

                for (let value of el.value.values()) {
                    const pl = { id: key, ...value }
                    const pocketSet = this.setPocket(pl)
                    if (!pocketSet) onerror(`pocket for id:${key} already exists`)
                }
            }
            return this
        }


        /**
         * - every new pocket `id` must be: format `id:::taskName`
         * required: `{id,task}`
         * optional: `{compaign}`
         * @param {*} opts
         */
        setPocket(opts = {}) {
            if (!opts.id || !opts.task) throw ('id and task both must be set')
            if (!validID(opts.id)) throw ('opts.id not valid')

            const uid = `${opts.id}::${opts.task}`
            if (this.pocket[uid]) {
                if (this.debug) log(`[setPocket] pocket: ${uid} already set`)
                return null
            }
            try {
                opts.id = uid
                const p = new this.Pocket(opts, this.debug)
                this.pocket[uid] = p
                console.log(`this.pocket[${uid}] issued`)
            } catch (err) {
                onerror(err)
                return null
            }
            return this.pocket[uid]
        }

        /**
         * set new pocket model
         * - every new task has a set of requirements. Once status is `complete` and data available, pocket sends a dispatch with pocket information `(if opts.dispatcher===true)`.
         * methods:`{get,all}` props: `{id,data,task,status,compaign}`
         * 
         *  @param {*} opts.id required
         *  @param {*} opts.task required
         *  @param {*} opts.compaign optional
         * 
         * - `Pocket` is resolved once `sq.resolve()` is called, sq => `Simple Q` our plugin
         */
        get Pocket() {
            return newPocket(this)
        }

        /**
         * - emit extends with `Dispatcher` to be used by every new Pocket as an emitter `(if opts.dispatcher===true)`
         * @param {*} obj required
         */
        _emit(obj) {
            if (!obj) return null
            if (!this.dispatcher) return null
            try {
                this.dispatcher.initListener().next(obj)
                return true
            } catch (err) {
                onerror(`[_emit] dispatcher did not emit`)
                return null
            }
        }

        /**
         * - delete completed `pocketSet`
         */
        deletePocketSet(id) {
            if (Object.values(this.pocket).length) {
                for (let poc of Object.values(this.pocket)) {
                    if (poc.id.includes(id)) delete this.pocket[poc.id]
                }
            }
            if (this.payloadData[id]) delete this.payloadData[id]
            if (this._ready[id]) delete this._ready[id]
        }
    }

    return class PocketModuleExt extends PocketModule {
        constructor(opts, debug) {
            super(opts, debug)
        }

        /**
         * - extend payload async data handling
         */
        payload(data, async) {
            const asAsync = async !== undefined ? async : this.async // override if set
            if (asAsync && isPromise(data)) return data.then(z => super.payload(z), err => err)
            if (!this.async && !isPromise(data)) return super.payload(data)
            else {
                if (this.debug) onerror(`[payload] with opts.async=true, data must be a promise, or do not set async when not a promise`)
                if (asAsync) return Promise.reject()
                else return false
            }
        }
    }
}
