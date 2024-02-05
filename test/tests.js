/* eslint-disable */

;`use strict`

const assert = require("assert")
const chai = require("chai")
//const should = chai.should();
const expect = chai.expect

// asset
// const { log } = require('../Pocket/utils')
const { Pocket, Probe } = require("../index")
const DEBUG = false

// help: https://mochajs.org/
// help: https://www.chaijs.com/

describe("PocketSet/asyncData should succeed with tasks: [required, final]", function () {
    const pc = new Pocket({ async: true, deleteWithDelay: 0 }, DEBUG)
    const payloadData = {
        id: "job-two",
        // NOTE each task is a probe
        // task name and id are required to create new Probe
        tasks: [
            { task: "required", data: { value: 0, type: "payment" } },
            { task: "final", data: { value: 0, type: "fee" } }
        ]
    }
    const asyncData = pc.$payload(Promise.resolve(payloadData)).d
    let payloadOK = null

    // initialize payload
    beforeEach(function (done) {
        asyncData.then(
            (z) => {
                payloadOK = z
                done()
            },
            (err) => {
                payloadOK = err
                done(err)
            }
        )
    })

    it(`$payload() should be a Promise`, function (done) {
        expect(asyncData.__proto__ === Promise.prototype).to.equal(true)
        done()
    })

    it(`$payload() should resolve===true`, function (done) {
        expect(payloadOK).to.equal(true)
        done()
    })

    ////////////////// start all other test
    setTimeout(function () {
        describe(`PocketSet tasks should perform status check and data update`, function () {
            const tasks = payloadData.tasks
            const job = payloadData.id

            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i].task
                const probeID = `${job}::${task}`
                const probe = pc.$get(probeID)

                it(`task: ${task}, status 'open', ok`, function (done) {
                    assert.equal(probe.status, "open")
                    expect(pc.$get(probeID).data).not.equal(null)
                    done()
                })

                it(`task: ${task}, should update status`, function (done) {
                    probe.data = {
                        value: 10000,
                        fee: 500
                    }
                    expect(pc.$get(probeID).status).equal("updated")
                    done()
                })
            }
        })

        describe(`PocketSet should NOT repeat same tasks on pending jobs`, function () {
            // await asyncData

            const plData = {
                id: "job-two",
                // NOTE each task is a probe
                // task name and id are required to create new Probe
                tasks: [
                    { task: "required", data: { value: -1, type: "payment" } },
                    { task: "final", data: { value: 0, type: "fee" } }
                ]
            }

            const payload = pc.$payload(plData, false).d

            it(`$payload(...) cannot not be set over existing tasks`, function (done) {
                expect(payload).true
                done()
            })

            for (let i = 0; i < plData.tasks.length; i++) {
                const item = plData.tasks[i]
                const probeID = `${plData.id}::${item.task}`

                it(`Probe/task: '${probeID}' id cannot be changed`, function (done) {
                    pc.$get(probeID).id = "wrong"
                    expect(pc.pocket[probeID].id).not.equal("wrong")
                    done()
                })

                it(`Probe/task: '${probeID}' status cannot be set to 'open'`, function (done) {
                    pc.$get(probeID).status = "open"
                    expect(pc.pocket[probeID].status).not.equal("open")
                    done()
                })

                it(`Probe/task: '${probeID}' status cannot be set to 'send' directly`, function (done) {
                    pc.$get(probeID).status = "send"
                    expect(pc.pocket[probeID].status).not.equal("send")
                    done()
                })

                it(`Probe/task: '${probeID}' task cannot be changed`, function (done) {
                    pc.$get(probeID).task = "wrong"
                    expect(pc.pocket[probeID].task).not.equal("wrong")
                    done()
                })
            }
        })

        describe(`Probe/task should not update 'data' if status is set to 'complete'`, function () {
            const tasks = payloadData.tasks
            const job = payloadData.id

            it(`first pocket: ${tasks[0].task} should set status to 'error' and complete/send`, function (done) {
                const probeID = `${job}::${tasks[0].task}`
                const probe = pc.$get(probeID)
                probe.status = "error"
                expect(pc.pocket[probeID].status).equal("send")
                done()
            })

            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i].task
                const probeID = `${job}::${task}`
                const probe = pc.$get(probeID)
                it(`pocket: ${probeID} 'data' not updated`, function (done) {
                    probe.status = "complete"
                    probe.data = false
                    expect(pc.pocket[probeID].data).not.equal(false)
                    done()
                })
            }
        })

        describe(`PocketSet tasks status should update and be ready`, function () {
            const tasks = payloadData.tasks
            const job = payloadData.id

            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i].task
                const probeID = `${job}::${task}`
                const probe = pc.$get(probeID)

                it(`pocket: ${probeID} from complete to 'send'`, function (done) {
                    probe.status = "complete"
                    expect(pc.$get(probeID).status).equal("send")
                    done()
                })
            }

            describe(`Probe/task in PocketSet id: '${payloadData.id}', should:`, function () {
                let resolvePromise = null
                let rejectPromise = null

                let readyData = new Promise((resolve, reject) => {
                    resolvePromise = resolve
                    rejectPromise = reject
                })
                // afterEach(function(){

                // })

                //: ${payloadData.id} is send, ready, and disposed, with valid data
                it(`be ready/resolved`, function (done) {
                    pc.$ready(payloadData.id).d.then(
                        (z) => {
                            expect(z).to.have.lengthOf(2)
                            resolvePromise(z)
                            done()
                        },
                        (err) => {
                            rejectPromise(err)
                            done(err)
                        }
                    )
                    // expect(pc.$get(z.id)).null
                })

                it(`have valid data from each task`, function (done) {
                    readyData.then((z) => {
                        z.forEach((el, inx) => {
                            expect(el["data"]["value"]).equal(10000)
                            expect(el["data"]["fee"]).equal(500)
                        })
                        done()
                    }, done)
                })

                it(`each Probe instance should already be disposed`, function (done) {
                    readyData.then((z) => {
                        z.forEach((el, inx) => {
                            expect(pc.pocket[el.id]).undefined
                        })
                        done()
                    }, done)
                })
            })
        })
        run()
    }, 100)
    /// end of setTimeout
})

describe("PocketSet/Data should succeed with tasks: [start, end]", function () {
    const pc = new Pocket({ async: false, dispatcher: true, deleteWithDelay: 0 }, DEBUG)
    let payloadData = null

    describe(`should fail executing user $methods`, function () {
        before(async function () {
            return (payloadData = {
                //id: 'job-one',
                tasks: [
                    { task: "start", data: { value: 0, type: "payment" } },
                    { task: "end", data: { value: 10000000000, type: "gift" } }
                ]
            })
        })

        it(`$payload() should fail`, function (done) {
            expect(pc.$payload(payloadData).d).to.be.false
            done()
        })

        it(`no new Pocket() should exist`, function (done) {
            expect(Object.entries(pc.pocket)).to.have.lengthOf(0)
            done()
        })

        it(`$update() should fail`, function (done) {
            expect(pc.$update().d).to.be.false
            expect(pc.$update("1").d).to.be.false
            expect(pc.$update("1", "").d).to.be.false
            done()
        })

        it(`$get() should fail`, function (done) {
            expect(pc.$get()).to.be.null
            done()
        })

        it(`$activeTasks() be empty`, function (done) {
            expect(pc.$activeTasks().d).to.have.lengthOf(0)
            done()
        })

        it(`$ready() promise should fail`, function (done) {
            try {
                pc.$ready(null, false, true).d.catch((err) => {
                    expect(err).to.be("payloadID must be set")
                })

                pc.$ready("wrong", false, true).d.catch((err) => {
                    expect(err).to.be("payloadID must be set")
                })

                done()
            } catch (err) {
                console.log("$ready() promise is ", err)
            }
        })
    })

    describe(`should set $payload() and new Pocket/tasks`, function () {
        before(async function () {
            return (payloadData = {
                id: "job-one",
                tasks: [
                    { task: "start", data: { value: 0, type: "payment" } },
                    { task: "end", data: { value: 10000000000, type: "gift" } }
                ]
            })
        })

        it(`$payload() success`, function (done) {
            expect(pc.$payload(payloadData).d).to.be.true
            done()
        })

        it(`new Pockets/task set with status='open'`, function (done) {
            for (let key in pc.pocket) expect(pc.pocket[key].status).equal("open")
            done()
        })

        describe(`Pocket/task 'start' should:`, function () {
            it(`add value '5000'`, function (done) {
                const probeID = `${payloadData.id}::start`
                pc.$get(probeID).data = Object.assign({}, pc.$get(probeID).data, { value: 5000 })
                expect(pc.$get(probeID).data).to.have.property("value")
                expect(pc.$get(probeID).data["value"]).to.equal(5000)
                done()
            })

            it(`change status to updated`, function (done) {
                const probeID = `${payloadData.id}::start`
                expect(pc.$get(probeID).status).to.equal("updated")
                done()
            })

            it(`$activeTasks() display current [2] tasks`, function (done) {
                expect(pc.$activeTasks().d).to.have.lengthOf(2)
                expect(pc.$activeTasks(payloadData.id).d).to.have.lengthOf(2)
                done()
            })
        })

        describe(`Pocket/task 'end' should:`, function () {
            it(`combine values from Pocket/task 'start'`, function (done) {
                // initial payload data
                const probeID = `${payloadData.id}::end`
                const startValue = pc.$get(`${payloadData.id}::start`).data["value"]
                const endValue = pc.$get(probeID).data.value
                const newData = Object.assign({}, pc.$get(probeID).data, { value: startValue + endValue })
                pc.$update({ data: Object.assign({}, pc.$get(probeID).data, newData) }, null, probeID).d
                expect(pc.$get(probeID).data)
                    .to.have.property("value")
                    .equal(startValue + endValue)
                done()
            })

            it(`have status: 'updated'`, function (done) {
                const probeID = `${payloadData.id}::end`
                expect(pc.$get(probeID).status).to.equal("updated")
                done()
            })
        })

        describe(`both Probe/tasks [start,end] should`, function () {
            describe(`complete => send => ready`, function () {
                it(`task 'start'`, function (done) {
                    const probeID = `${payloadData.id}::start`
                    pc.$get(probeID).status = "complete"
                    expect(pc.$get(probeID).status).to.equal("send")
                    done()
                })

                it(`task 'end'`, function (done) {
                    const probeID = `${payloadData.id}::end`
                    pc.$get(probeID).status = "complete"
                    expect(pc.$get(probeID).status).to.equal("send")
                    done()
                })

                it(`PocketSet id:'job-one' should be ready`, function (done) {
                    pc.$ready(payloadData.id).d.then((z) => {
                        z.forEach((el, i) => {
                            expect(el).to.have.property("data")
                        })
                        expect(Object.entries(pc.pocket)).to.have.lengthOf(0)
                        done()
                    }, done)
                })
            })
        })
    })
})

// NOTE test `Probe.js intependantly, outside PocketModule, for all states`
describe(`Independant new Probe({}) tests`, function () {
    const config = {
        id: "cocacola::drink",
        task: "drink",
        data: { order: 10, value: 0 },
        campaign: "charity"
    }

    const prob = new Probe(config)

    describe(`Probe/id: ${config.id} should:`, function () {
        it(`fail to change campaign name`, function (done) {
            prob.campaign = "Donald Trump"
            expect(prob.campaign).not.equal(`Donald Trump`)
            done()
        })

        it(`fail to change id`, function (done) {
            prob.id = "cocacola::drink"
            expect(prob.campaign).not.equal(`Donald Trump`)
            done()
        })

        it(`fail to change id`, function (done) {
            prob.id = "cocacola::drink"
            expect(prob.campaign).not.equal(`Donald Trump`)
            done()
        })

        it(`status should change to 'updated when data is updated again'`, function (done) {
            prob.data = { order: 50, value: 0 }
            expect(prob.status).equal(`updated`)
            done()
        })

        it(`status should change to 'complete => send'`, function (done) {
            prob.status = "complete"
            prob.getStatusAsync.then((z) => {
                expect(prob.status === z && z === "send" ? "send" : prob.status).equal(`send`)
                done()
            })
        })

        it(`status not change any status once complete/send`, function (done) {
            prob.status = "open"

            expect(prob.status).equal(`send`)
            prob.status = "updated"
            expect(prob.status).equal(`send`)
            prob.status = "error"
            expect(prob.status).equal(`send`)
            done()
        })
    })
})
