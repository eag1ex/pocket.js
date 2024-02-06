/**
 * Probe databank extension
 *
 **/

const { uniqBy, isArray } = require("x-utils-es/umd")
class ProbeDataBank {
    constructor(props, opts, debug) {
        this._dataBank = []
        this.debug = debug
    }

    /**
     * accumulate data into historic array
     * this data is never cleared, unless we unset protected var
     * @memberof ProbeDataBank
     *
     */
    set dataBank(v) {
        // NOTE check if we are trying to assing dataBank to it self
        if (isArray(v)) {
            if (v.filter((n) => n.data_id).length) {
                // if (this.debug) warn('[dataBank]', 'trying to assign dataBank to self, skipped')
                return
            }
            // @ts-ignore
        } else if ((v || {}).data_id) {
            //  if (this.debug) warn('[dataBank]', 'trying to assign dataBank to self, skipped')
            return
        }
        this._dataBank.push({ data: v, data_id: new Date().getTime().toString() })
        this._dataBank = this._dataBank.filter((n) => n.data !== undefined)
    }
    /**
     *
     *
     * @memberof ProbeDataBank
     * @returns {Array<{data:any,data_id:string}>} may also return []
     */
    get dataBank() {
        // @ts-ignore
        return uniqBy(this._dataBank || [], "data_id")
    }
}

module.exports = ProbeDataBank
