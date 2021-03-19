/**
* Probe databank extention   
* 
**/

const { uniqBy } = require('x-utils-es/umd')
class ProbeDataBank {
   
    constructor() {
        this._dataBank = []
    }

    /**
     * accumulate data into historic array
     * this data is never cleared, unless we unset protected var
     * @memberof ProbeDataBank
     * @returns {*} [{data,data_id},...]
     */
    set dataBank(v) {
        this._dataBank.push({ data: v, data_id: new Date().getTime().toString() })
        this._dataBank = this._dataBank.filter(n => n.data !== undefined)
    }

    get dataBank() {
        return uniqBy((this._dataBank || []), 'data_id')
    }
}

module.exports = ProbeDataBank
