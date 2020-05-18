module.exports = () => {
    const Dispatcher = require('../libs/dispatcher')()
    const { log, error, warn, isArray, isObject } = require('./utils')
    const sq = require('simple-q')
    const newPocket = require('./pocket')

    return class PocketController {
        /**
         * @param {*} opts  no options yet!
         * @param {*} debug optional
         */
        constructor(opts = {}, debug) {
            this.debug = debug || false
            /**
             * what is a pocketSet
             * pocketSet works with ` this.pocket[id]`, `this.pocketSetRef[id]` and `this.payloadData[id]`
             * - after job is finished these props should be deleted
             */
            this.defers = {}
            this.pocket = {} // currently set pockets, example this.pocket[`abc::taskName`]
            this.payloadData = {}// each payload by id
            this.pocketSetRef = {} // references each payload to help deliver results
            this.lastPocketTimestamp = 0
            Dispatcher.initListener().subscribe(z => {
                const { pocket, status } = z || {}

                if (status === 'complete') {
                    // NOTE dispatch data out
                    if (this.debug) log(`pocket id:${pocket.id} completed`)
                }
                // uppon succesfull delivery all data is deleted
                if (pocket) this.delivery(pocket)
                // else console.log('ready', ready)
            })
        }

        /**
         * - match all pockets by id and check if set to `send`
         * - return {pockets:[],success}
         * @param {*} id required
         */
        pocketSetStatus(id) {
            if (!id) return {}
            const pocketSet = Object.values(this.pocket).filter(z => z.id.indexOf(id) !== -1)
            const pocketSize = pocketSet.length
            const pockets = pocketSet.filter(z => z.status === 'send')
            const success = pockets.length === pocketSize
            return { pockets, success }
        }

        /**
         * - when `pocketSetRef` id match all pockets with status `send` we are done with the payload
         * @param {*} pocket === this.pocket[id]
         */
        delivery({ id }) {
            try {
                const setID = id.split(`::`)[0]

                const { pockets, success } = this.pocketSetStatus(setID) || {}
                if (success === true && this.pocketSetRef[setID] === false) {
                    this.pocketSetRef[setID] = true
                    this.deletePocketSet(setID)
                    this.defers[setID].def.resolve(pockets)
                }
            } catch (err) {
                error(`[delivery]`, err)
            }
        }

        /**
         * - delete completed `pocketSet`
         */
        deletePocketSet(id) {
            for (let poc of Object.values(this.pocket)) {
                if (poc.id.includes(id)) delete this.pocket[poc.id]
            }
            delete this.payloadData[id]
            delete this.pocketSetRef[id]
        }

        /**
         * @prop {*} data required
         * initialize new payload, for as many tasks as required
         * - sets a multi task with instructions
         * - `data = {
                id: '', // 1 id for all tasks
                tasks: [{ taskName: '', data: '', compaign: '' }]
            }`
         * - call distributor method
         */
        payload(data = {}) {
            // validate payload format
            if (!isObject(data)) return false
            const keys = Object.keys(data)
            // must match all keys
            if (keys.every(el => ['id', 'tasks'].indexOf(el) === -1)) return false
            if (!isArray(data['tasks'])) return false

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
                this.setDefer(data.id)
                return true
            } else return false
        }
        /** 
         * - ready/defer is resolved for each payload assignmnet
         */
        ready(id) {
            if (!this.defers[id] || !id) throw (`defers[id] not found`)
            return this.defers[id].p
        }

        setDefer(id) {
            if (!id) throw 'id must be set'
            const def = sq()
            this.defers[id] = { p: def.promise(), def }
        }
        /**
         * - distribute payloadData, each to new pocket
         * - set `pocketSetRef`
         */
        distributor() {
            for (let [key, el] of Object.entries(this.payloadData)) {
                if (this.lastPocketTimestamp > el['timestamp']) continue // no new entries

                // omit done
                if (el.status === 'complete' || el.status === 'send') continue

                for (let value of el.value.values()) {
                    const pl = { id: key, ...value }
                    const pocketSet = this.setPocket(pl)
                    if (pocketSet) this.pocketSetRef[key] = false // create ref for each new set of pockets
                    else error(`pocket for id:${key} already exists`)
                }
            }
            return this
        }

        /**
         * - get pocket by `id::taskName`
         *  methods:`{get,all}` props: `{id,data,tasks,status}`
        */
        $get(id) {
            if (!id) return null
            if (!this.pocket[id]) return null
            if (id.indexOf(`::`) === -1) return null
            return this.pocket[id]
        }

        /**
         * - every new pocket `id` must be of format `id:::taskName`
         * required: `{id,task}`
         * optional: `{compaign}`
         * @param {*} opts
         */
        setPocket(opts = {}) {
            if (!opts.id || !opts.task) throw ('id and task both must be set')
            const uid = `${opts.id}::${opts.task}`
            if (this.pocket[uid]) {
                if (this.debug) log(`[setPocket] pocket: ${uid} already set`)
                return null
            }
            try {
                opts.id = uid
                const p = new this.Pocket(opts, this.debug)
                this.pocket[uid] = p
            } catch (err) {
                error(err)
                return null
            }

            return this.pocket[uid]
        }

        /**
         * set new pocket model
         * - every new task has a set of requirements. Once status is `complete` and data is available, every pocket sends a dispatch with pocket information.
         * methods:`{get,all}` props: `{id,data,task,status}`
         *  @param {*} opts.id required
         *  @param {*} opts.task required
         *  @param {*} opts.compaign optional
         */
        get Pocket() {
            return newPocket(this)
        }

        /**
         * - emit extends with `Dispatcher` to be used by every new Pocket as an emitter
         * - being used by every `pocket`
         * @param {*} obj required
         */
        _emit(obj) {
            if (!obj) return null
            try {
                Dispatcher.initListener().next(obj)
                return true
            } catch (err) {
                error(`[_emit] Dispatcher did not emit`)
                return null
            }
        }
    }
}
