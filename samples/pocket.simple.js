/* eslint-disable */

// can use production/bundle after running: /$ npm run build:umd
const Pocket = require("../build/index")

//const Pocket = require("../index").Pocket
const pock = new Pocket({ async: false, dispatcher: true, withDataBank: true, onChange: true, deleteWithDelay: 0, completeOnNull: true }, true)

const data = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: "pocket-1", // Belt and Road Initiative
    tasks: [
        {
            task: "china",
            ref: "abc",
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

// this will check data assignments follow format principles then assign it to Pocket
const onSet = pock.$project(data, false, "update").d

if (onSet) {
    pock.$filter(function (probe) {
        // filter by probe data attributes
        return true
    }).d // access computed data , or continue chaining

    /** we only have initiated single Pocket so dont need to select it, refer to pocket.advance.js */
    pock.$filter((probe) => {
        // select all probe tasks
        return true
    })
        .$compute(function (probe, id) {
            // run thru all probe tasks based on filter condition
            console.log("probe.task", probe.task)
            this.data = "any new data type 1"
            if (probe.task === "china") this.status = "complete"
        })
        .$filter((probe) => {
            return probe.task === "srilanka"
        })
        .$compute(function (probe, id) {
            // run thru all probe tasks based on filter condition
            console.log("probe.task", probe.task)
            this.data = "any new data type 2"
            this.status = "complete"
        })
}

// observe all changes of china pocket
pock.$get(`pocket-1::china`).onChange(function (data, id) {
    console.log("pocket-1::china onChange", data.status, id)
}, "all")

// observe all pocket changes
pock.$get(`pocket-1`).onChange(function (data, id) {
    console.log("pocket-1 onChange", data.status.id)
}, "all")

// pocket-1 will only resolve if all Probe tasks have been set as complete
pock.$ready(`pocket-1`, true)
    .d.then((z) => {
        console.log("pocket-1 ready", z)
    })
    .catch((err) => {
        console.log("ups", err)
    })

// accessors
// console.log("[pock.$get][data]", pock.$get("pocket-1::china").data)
// console.log("[pock.$get][dataBank]", "pocket-1::china", pock.$get("pocket-1::china").dataBank)
