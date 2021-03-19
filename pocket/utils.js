/* eslint-disable no-proto */
// node.js/browser detection

const { isObject } = require('x-utils-es/umd')
const { v4 } = require('uuid')
/**
 * @Utils
 * my own lodash/like `Utils`
 */

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
