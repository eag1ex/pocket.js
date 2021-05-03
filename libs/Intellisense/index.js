/* eslint-disable no-unused-vars */

/**
 * NOTE
 * This file is only to provide Intellisense via jsDocs for source to output data, 
 * No mods are performed, original data is returned
 */

const ProbeReadyOutput = require('../Models/ProbeReadyOutput')
const Pocket = require('../../libs/Pocket/PocketExit.module')
const Probe = require('../Probe/Probe')

/**
 * @summary Provide Intellisense support
 * @param {Probe} probe
 * @param {string} id 
 * @returns {any}
 */
exports.$computeCallBack = function(probe, id) {
}

/**
 * @summary Provide Intellisense support
 * @param {ProbeReadyOutput[]} arr 
 * @returns {ProbeReadyOutput[]}
 */
exports.readyOutput = (arr) => arr

/**
 * @summary Provide Intellisense support
 * @param {Pocket} instance 
 * @returns {Pocket}
 */
exports.asPocket = (instance) => instance

/**
 * @summary Provide Intellisense support
 * @param {Probe} instance 
 * @returns {Probe}
 */
exports.asProbe = (instance) => instance
