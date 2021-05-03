const ProbePayload = require('./ProbePayloadModel')
const { validProjectID } = require('../utils')
const { isArray, isString } = require('x-utils-es/umd')

/**
 * Data configuration asset required to create new project
 * @param {object} params
 * @param {string} params.id project/Pocket id that identify each project to Probes batch
 * @param {ProbePayload[]} params.tasks each Probe data asset
 */
function ProjectPayloadModel({ id = '', tasks = [] }) {

    if (!id || isString(id) || !validProjectID(id)) throw ('ProjectPayloadModel/invalid id provided')
    if (!isArray(tasks) || !(tasks || []).length) throw ('ProjectPayloadModel/invalid tasks[] provided')

    this.id = id
    this.tasks = tasks.map(n => new ProbePayload(n))

}

module.exports = ProjectPayloadModel

/*
id: 'pocket-1', // Belt and Road Initiative
    tasks: [

        {
            ref: 'abc',
            task: 'china',
            data: { 'assets': 15, type: 'billions', info: 'benefactor' },
            compaign: 'Belt_and_Road_Initiative'
        },

* */
