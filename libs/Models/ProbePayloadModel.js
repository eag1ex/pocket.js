
/**
 * Probe propeties that can be set
 * @param {object} params `{id,ref,task,campaign,data}`
 * @param {string} params.id (required)
 * @param {string} params.ref (optional)
 * @param {string} params.task (optional)
 * @param {string} params.campaign (optional)
 * @param {any} params.data any data any be set except for undefined
 */
function ProbePalyoadModel({ id = undefined, ref = undefined, task = undefined, campaign = undefined, data = undefined }) {
    this.id = id
    this.ref = ref
    this.task = task
    this.campaign = campaign
    this.data = data

    // NOTE just a clean up do not pass any undefined vals
    Object.entries(this).forEach(([k, val]) => {
        if (val === undefined) delete this[k]
    })
}

module.exports = ProbePalyoadModel
