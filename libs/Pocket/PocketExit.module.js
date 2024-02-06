/**
 * This is the last Pocket extended class
 */

const PocketSelectors = require("./Pocket.selectors")

/**
 * @class
 */
class Pocket extends PocketSelectors {
    /**
     *
     * @param {Object} opts available options
     * @param {boolean} opts.async  when set, allow $payload(`data`) to be async object
     * @param {boolean} opts.onChange loads watch for changes Probe asset
     * @param {boolean} opts.completeOnNull Allow Probe to complete even if data
     * @param {boolean} opts.disableWarnings disable some less relevant warning messages
     * @param {boolean} opts.withDataBank
     * @param {number} opts.deleteWithDelay
     * @param {any} opts.dispatcher, when set to true, loads external library `Dispatcher`
     * @param {*} debug optional
     */
    constructor(opts, debug) {
        super(opts, debug)
    }
}
module.exports = Pocket
