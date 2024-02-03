const { log, warn } = require("x-utils-es/umd")

/**
 * Example, exchange of data regarding `china => covid19 => world`
 */

// can use production/bundle after running: /$ npm run build:umd
const Pocket = require("../build/index")

// const Pocket = require("../index").Pocket

const pock = new Pocket({ async: false, dispatcher: true, withDataBank: true }, true)

const data = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: "pocket-1", // Belt and Road Initiative
    tasks: [
        {
            ref: "abc",
            task: "china",
            data: { assets: 10, type: "billions", info: "benefactor" },
            campaign: "Belt_and_Road_Initiative"
        },
        {
            task: "srilanka",
            ref: "efg",
            data: { budget: 1.4, type: "billions", project: "naval port" },
            campaign: "Belt_and_Road_Initiative"
        }
    ]
}

// optional, lookup status
pock.$projectSetAsync(`pocket-1`).then((z) => {
    console.log(`projectSetAsync ready`, z)
})

if (pock.$project(data, false, "update").d) {
    const data = {
        // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
        id: "pocket-1", // Belt and Road Initiative
        tasks: [
            {
                task: "china",
                data: { value: 1, message: "some data" },
                status: "complete",
                campaign: "Belt_and_Road_Initiative"
            },
            {
                status: "complete",
                task: "srilanka",
                data: { budget: 1.4, type: "billions", project: "naval port" },
                campaign: "Belt_and_Road_Initiative"
            }
        ]
    }

    pock.$project(data, false, "update")

    const l = pock
        .$compute(function (probe, id) {
            // do something
            // this.error = 'error!'
        })
        .$filter(function () {
            return true
        }).d

    console.log(pock.$error(`::china`))

    pock.$select(`pocket-1`)
        // .$of(`::china`)
        // .$update({ data: { assets: 10.55 }})
        .$compute(function (probe, id) {
            this.data = "new data"
        })

    function newEnclosure(cb) {
        const t = new (function () {
            this.project = null
            this.order = {
                cost: 0 // updated dynamically
            }
            this.purchase = cb
        })()
        return Object.assign({}, t)
    }

    newEnclosure(async function ({ srilanka }) {
        this.projectName = "Naval Port"
        return new Promise((resolve, reject) => {
            // NOTE  srilanka.constructor.name === 'Pocket'
            this.order.cost = srilanka.data["budget"]
            srilanka.status = "complete" // update Pocket{} / status
            setTimeout(() => resolve(this), 100)
        })
    })
        .purchase({ srilanka: pock.$get(`::srilanka`) })
        .then(({ order, projectName }) => {
            console.log("pock is", pock.$of(`::china`).$probe())
            return pock
                .$of(`::china`)
                .$update({ data: { assets: pock.$data(["assets"]) - order.cost } })
                .$update({ data: { project: "Naval Port Complete" } }, true, `::srilanka`)
                .$probe()
        })
        .then(({ data, status, id, campaign, task }) => {
            log(`navalPort/Probe update`, data, status, id, campaign, task)
        })

    // NOTE individual Probe{} status, same as `pock.pocket['b-r-i::srilanka'].getStatusAsync.then`
    pock.$probeStatusAsync(`::srilanka`).d.then((status) => {
        log(`srilanka/ status: ${status}`)
    })
}

// pock.$data()
// accessors
console.log("[pock.$get][data]", pock.$get("pocket-1::china").data)
console.log("[pock.$get][dataBank]", "pocket-1::china", pock.$get("pocket-1::china").dataBank)
