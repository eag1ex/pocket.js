/* eslint-disable no-proto */
const { validID } = require('x-utils-es/umd')

// node.js/browser detection

// const { isObject } = require('x-utils-es/umd')
// const { v4 } = require('uuid')

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

const idRegexValid = (str = '') => {
    const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
    const regx = new RegExp(pat, 'gi')
    if (regx.test(str)) {
        // NOT ALWAYS NEEDED TO DISPLAY THE ERROR
        // if (this.debug) onerror(`your id is invalid, allowed chars: ${pat}`)
        return false
    }
    return true
}

exports.validProjectID = (id = '') => {
    // id = validID(id) // bad idea we should alwasy provide valid id, not modifying inputs
    if (!id) return undefined
    if ((id || '').split(' ').length > 1) return undefined
    if (!idRegexValid(id)) return undefined
    return id
}

/**
 * Evaluate ProbeID
 * @param {string} probeID (required)
 */
exports.validProbe = (probeID = '') => {
    probeID = validID(probeID)
    if (!probeID) return undefined
    if (!idRegexValid(probeID)) return
    if (probeID.indexOf(`::`) === -1) return undefined
    // if (!this.pocket[probeID]) {
    //     if (this.debug && debug === null) warn('[pocket]',`[validProbe] did not find probe with probeID ${probeID}`)
    //     return null
    // }
    return probeID
}

exports.idRegexValid = idRegexValid
