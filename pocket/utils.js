/* eslint-disable no-proto */
const util = require('util')
const color = require('bash-color')
/**
 * @Utils
 * my own lodash/like `Utils`
 */

/**
* make class copy by refs[...]
*/
exports.copyBy = (obj, refs) => refs.reduce((n, el, i) => {
    if (obj[el] !== undefined) n[el] = obj[el]
    return n
}, {})
exports.validID = (id) => !(id || '') ? null : (id || '').toString().toLowerCase()
exports.isNumber = (n) => n !== undefined ? (n).__proto__ === Number.prototype : false
exports.isPromise = (defer) => Promise.prototype === (defer || {}).__proto__
exports.uniq = (arr) => arr.filter((el, i, all) => all.indexOf(el) === i)
exports.isObject = (obj) => !obj ? false : (Object.prototype === (obj).__proto__ || (obj) instanceof Object)
exports.isArray = (arr) => !arr ? false : Array.prototype === (arr).__proto__
exports.isString = (str) => !str ? false : String.prototype === (str).__proto__
exports.isFunction = (el) => typeof el === 'function'
exports.log = function (...args) {
    args = [].concat('[Pocket]', args)
    args = args.map(z => util.inspect(z, false, 3, true))
    console.log.apply(null, args)
}
exports.warn = function (...args) {
    args = [].concat('[warning]', args)
    args = args.map(z => color.cyan(util.inspect(z, false, 2, false), true))
    console.warn.apply(null, args)
}
exports.onerror = function (...args) {
    args = [].concat('[error]', args)
    args = args.map(z => color.red(util.inspect(z, false, 2, false), true))
    console.log('  ')
    console.error.apply(null, args)
    console.log('  ')
}
exports.copy = (data) => {
    if (!data) return data
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (err) {
        return err.toString()
    }
}

/**
* - accepting object of messages, example: `{'001':['my message',001],...}`
* - returns : {'001':{message,code},...}
*/
exports.errorMessages = (messages) => {
    const msgs = {}
    for (let [k, v] of Object.entries(messages)) {
        msgs[k] = { message: v[0], code: k }
    }
    return msgs
}
