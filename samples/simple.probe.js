/* eslint-disable */

const Probe = require("../index").Probe

const config = {
    id: "cocacola::drink",
    task: "drink",
    data: { order: 10, value: 0 },
    campaign: "charity"
}

const prob = new Probe(config, { onChange: true, debug: true, withDataBank: true, completeOnNull: true })

prob.data = { order: 20, value: 0 }

// when setting complete, the last status send is automatically escalated.
prob.status = "complete"

// any changes to be notified
prob.onChange(function (d) {
    console.log("[prob.onChange]")
    console.log(this.data)
    console.log(this.status)
})

// get notified of any status changes
prob.getStatusAsync.then((z) => {
    console.log("prob.getStatusAsync", z)
})
