/* eslint-disable */

// can use production/bundle after running: /$ npm run build:umd
// const Pocket = require("../build/index")

const Pocket = require("../index").Pocket
const pock = new Pocket({ async: false, dispatcher: true, withDataBank: true, onChange: true, deleteWithDelay: 0, completeOnNull: true }, true)

const data1 = {
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

const data2 = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: "pocket-2", // Belt and Road Initiative
    tasks: [
        {
            ref: "abc",
            task: "china2",
            data: { assets: 10, type: "billions", info: "benefactor" },
            campaign: "Belt_and_Road_Initiative"
        },
        {
            task: "srilanka2",
            ref: "efg",
            data: { budget: 1.4, type: "billions", project: "naval port" },
            campaign: "Belt_and_Road_Initiative"
        }
    ]
}

// this will check data assignments follow format principles then assign it to Pocket
const onSet1 = pock.$project(data1, false, "update").d
const onSet2 = pock.$project(data2, false, "update").d

if (onSet1 && onSet2) {
    // by default Pocket $select by last assignment (pocket-2)
    pock
        .$compute(function (probe) {
            console.log("probe:id", probe.id)
            // do something
            // this.error = 'error!'
        })
        .$filter(function (probe) {
            // filter by probe data attributes
            return true
        }).d // access computed data , or continue chaining

    // continue later in code to access desired pocket
    pock.$select(`pocket-1`)
        .$filter((probe) => {
            return probe.task === "china"
        })
        .$compute(function (probe, id) {
            // run thru all probe tasks based on filter condition
            console.log("pocket-1/probe.task", probe.task)
            this.data = "any new data type 1"
            this.status = "complete"
        })
        .$select(`pocket-2`)
        .$filter((probe) => {
            return true
        })
        .$compute(function (probe, id) {
            // run thru all probe tasks based on filter condition
            console.log("pocket-2/probe.task", probe.task)
            this.data = "any new data type 2"
            this.status = "complete"
        })

    //.$update({ data: { assets: 10.55 } }) << higher priority over
}

// observe all changes of china pocket
pock.$get(`pocket-1::china`).onChange(function (data, id) {
    console.log("pocket-1::china onChange", data.status, id)
}, "all")

// observe all pocket changes
pock.$get(`pocket-1`).onChange(function (data, id) {
    console.log("pocket-1 onChange", data.status.id)
}, "all")

// catch results when all of pocket-1 probe tasks have completed
// pocket-1 did not complete because we have set .$filter oen one task only
pock.$ready(`pocket-1`, true)
    .d.then((z) => {
        console.log("pocket-1 ready", z)
    })
    .catch((err) => {
        console.log("ups", err)
    })

// catch results when all of pocket-2 probe tasks have completed
// this pocket has completed all tasks

pock.$ready(`pocket-2`, true)
    .d.then((z) => {
        console.log("pocket-2 ready", z)
    })
    .catch((err) => {
        console.log("ups", err)
    })

// accessors
// console.log("[pock.$get][data]", pock.$get("pocket-1::china").data)
// console.log("[pock.$get][dataBank]", "pocket-1::china", pock.$get("pocket-1::china").dataBank)
