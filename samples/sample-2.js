/**
 * Example, exchange of data regarding `china => covid19 => world`
 */
const { log, warn, loop } = require("x-utils-es/umd")
const Pocket = require("../index").Pocket

const { readyOutput } = require("../libs/Intellisense")
// const Pocket = require('../index').Pocket
const DEBUG = true

const pock = new Pocket(
    {
        async: false,
        onChange: true,
        dispatcher: true,
        disableWarnings: false,
        completeOnNull: true,
        deleteWithDelay: 4000,
        withDataBank: true // keeps probe data history updates in an array var {probe.dataBank[{data},...]}
    },
    DEBUG
)

const data = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: "pocket-1", // Belt and Road Initiative
    tasks: [
        {
            ref: "abc",
            task: "china",
            data: { assets: 15, type: "billions", info: "benefactor" },
            campaign: "Belt_and_Road_Initiative"
        },
        {
            task: "srilanka",
            ref: "efg",
            data: { budget: 1.5, type: "billions", project: "naval port" },
            campaign: "Belt_and_Road_Initiative"
        }
        // {
        //     task: 'kenya', data: { 'budget': 3.2, type: 'billions', project:'railway' },
        //     campaign: 'Belt_and_Road_Initiative'
        // },
        // {
        //     task: 'laos', data: { 'budget': 5.95, type: 'billions', project:'railway' },
        //     campaign: 'Belt_and_Road_Initiative'
        // }
    ]
}
pock.$ready(data.id).d.then((n) => {
    // readyOutput(n)
    // log('[ready]', n)
})
// pock.$project(data, false, 'new')

if (pock.$project(data, false, "new").d) {
    loop(2, () => {
        const data = {
            // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
            id: "pocket-1", // Belt and Road Initiative
            tasks: [
                {
                    task: "china",
                    data: { value: 1, message: "some data" },
                    // status: 'complete',
                    campaign: "Belt_and_Road_Initiative"
                },
                {
                    // status: 'complete',
                    task: "srilanka",
                    data: { budget: 1.4, type: "billions", project: "naval port" },
                    campaign: "Belt_and_Road_Initiative"
                }
            ]
        }
        pock.$project(data, false, "update")
            .$compute((probe, id) => {
                // this.data = this.dataBank
                log(probe.task)
                log("dataBank", probe.dataBank)
                setTimeout(() => {
                    probe.status = "complete"
                }, 5000)
                // this.error = 'error!'
            })
            .$onProbeComplete(function (probeCopy) {
                log("$onProbeComplete/task", this.task)
            })
    })
}
