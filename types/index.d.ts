/**
 * Type declarations and JSdocs for function operators and modules
 */

import _PocketSelectors from "../libs/Pocket/Pocket.selectors"

export namespace PocketSpace {
    export class PocketSelectors extends _PocketSelectors {
        /**
         * ### $data
         * - returns Object copy of `Probe['data']`
         * @param {*} dataProp optional, if you know what you are asking for example: `{assets:true}`,or `array['assets]`, it has catch error exception, so you wont receive any errors just `null`
         * will return all available matched within our `Probe{}['data]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be returned
         * @param {*} probeID optional/sensitive, select new point of reference
         * @param {*} self optional,if you want to $cached() last data enquiry and return `self` to keep chaining, nice!
         */
        $data(dataProp?: any, probeID?: any, self?: any)
    }
}
