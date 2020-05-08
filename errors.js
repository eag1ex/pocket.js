const { errorMessages } = require('./utils')

/**
 * - errors and messages
 * returns example : `{'001':{message,code},...}`
 */
module.exports = errorMessages({
    '001': ['some error']
})
