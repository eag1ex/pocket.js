const { errorMessages } = require("./utils")

/**
 * NOTE : MOMENTARILY not using this error strategy!
 * - errors and messages
 * returns example : `{'001':{message,code},...}`
 */
module.exports = errorMessages({
    "001": ["task must be set for your tasks"]
})
