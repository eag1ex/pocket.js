/**
 * Data provided to _setUpdate() method
 * @param {object} dataFrom
 * @param {any} dataFrom.data
 * @param {string} dataFrom.status
 * @param {string} dataFrom.ref
 * @param {string} dataFrom.error
 * @param {string} dataFrom.campaign
 */
function SetUpdateModel({ data = undefined, status = undefined, ref = undefined, error = undefined, campaign = undefined }) {
    this.data = data
    this.status = status
    this.ref = ref
    this.error = error
    this.campaign = campaign

    // NOTE just a clean up do not pass any undefined vals
    Object.entries(this).forEach(([k, val]) => {
        if (val === undefined) delete this[k]
    })
}

module.exports = SetUpdateModel
