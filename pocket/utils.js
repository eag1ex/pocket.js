/* eslint-disable no-proto */
module.exports = {
    /**
     * make class copy by refs[...]
     */
    copyBy: (obj, refs) => refs.reduce((n, el, i) => {
        if (obj[el] !== undefined) n[el] = obj[el]
        return n
    }, {}),
    validID: (id) => !(id || '') ? null : (id || '').toString().toLowerCase(),
    isNumber: (n) => n !== undefined ? (n).__proto__ === Number.prototype : false,
    isPromise: (defer) => Promise.prototype === (defer || {}).__proto__,
    uniq: (arr) => arr.filter((el, i, all) => all.indexOf(el) === i),
    isObject: (obj) => !obj ? false : (Object.prototype === (obj).__proto__ || (obj) instanceof Object),
    isArray: (arr) => !arr ? false : Array.prototype === (arr).__proto__,
    isString: (str) => !str ? false : String.prototype === (str).__proto__,
    isFunction: (el) => typeof el === 'function',
    log: function (...args) {
        args = [].concat('[Pocket]', args)
        console.log.apply(null, args)
    },
    warn: function (...args) {
        args = [].concat('[warning]', args)
        console.warn.apply(null, args)
    },
    error: function (...args) {
        args = [].concat('[error]', args)
        console.error.apply(null, args)
    },
    copy: (data) => {
        if (!data) return data
        try {
            return JSON.parse(JSON.stringify(data))
        } catch (err) {
            return err.toString()
        }
    },
    /**
     * - accepting object of messages, example: `{'001':['my message',001],...}`
     * - returns : {'001':{message,code},...}
     */
    errorMessages: (messages) => {
        const msgs = {}
        for (let [k, v] of Object.entries(messages)) {
            msgs[k] = { message: v[0], code: k }
        }
        return msgs
    }
}
