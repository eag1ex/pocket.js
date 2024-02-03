/**
 * @typedef {import('./types').Pocket} Pocket
 * @typedef {import('./types').Probe} Probe
 */

/**
 * @type {Pocket}
 */
exports.Pocket = require("./libs/Pocket/PocketExit.module")

/**
 * @type {Probe}
 */
exports.Probe = require("./libs/Probe/Probe")
exports.utils = require("./libs/utils")
