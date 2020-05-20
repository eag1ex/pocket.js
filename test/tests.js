`use strict`

const assert = require('assert');
const chai = require('chai');
//const should = chai.should();
const expect = chai.expect;

// asset
const { log } = require('../pocket/utils')
const Pocket = require('../index')()
const DEBUG = false

// help: https://mochajs.org/
// help: https://www.chaijs.com/

describe('PocketSet/asyncData should succeed with tasks: [required, final]', function () {

    const pc = new Pocket({ async: true, disposeAfterReady: true }, DEBUG)
    const payloadData = {
        id: 'jobone',
        // NOTE each task is a pocket
        // task name and id are required to create new Pocket
        tasks: [{ task: 'required', data: { 'value': 0, type: 'payment' }, }, { task: 'final', data: { 'value': 0, type: 'fee' } }]
    }
    const asyncData = pc.payload(Promise.resolve(payloadData))
    let payloadOK = null

    // initialize payload
    beforeEach(function (done) {
        asyncData.then(z => {
            payloadOK = z
            done()
        }, err => {
            payloadOK = err
            done(err)
        })
    });

    it(`payload() should be a Promise`, function (done) {
        expect(asyncData.__proto__ === Promise.prototype).to.equal(true)
        done()
    })

    it(`payload() should resolve===true`, function (done) {
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
                const pocketID = `${job}::${task}`
                const pocket = pc.$get(pocketID)

                it(`task: ${task}, status 'open', ok`, function (done) {
                    assert.equal(pocket.status, 'open')
                    expect(pc.$get(pocketID).data).not.equal(null)
                    done()
                })

                it(`task: ${task}, should update status`, function (done) {
                    pocket.data = {
                        'value': 10000,
                        'fee': 500
                    }
                    expect(pc.$get(pocketID).status).equal('updated')
                    done()
                })
            }
        })

        describe(`PocketSet should NOT repeat same tasks on pending jobs`, function () {
            // await asyncData

            const plData = {
                id: 'jobone',
                // NOTE each task is a pocket
                // task name and id are required to create new Pocket
                tasks: [{ task: 'required', data: { 'value': -1, type: 'payment' }, }, { task: 'final', data: { 'value': 0, type: 'fee' } }]
            }

            const payload = pc.payload(plData, false)

            it(`payload(...) cannot not be set over existing tasks`, function (done) {
                expect(payload).null
                done()
            })

            for (let i = 0; i < plData.tasks.length; i++) {
                const item = plData.tasks[i]
                const pocketID = `${plData.id}::${item.task}`

                it(`Pocket/task: '${pocketID}' id cannot be changed`, function (done) {
                    pc.$get(pocketID).id = 'wrong'
                    expect(pc.pocket[pocketID].id).not.equal('wrong')
                    done()
                })

                it(`Pocket/task: '${pocketID}' status cannot be set to 'open'`, function (done) {
                    pc.$get(pocketID).status = 'open'
                    expect(pc.pocket[pocketID].status).not.equal('open')
                    done()
                })

                it(`Pocket/task: '${pocketID}' status cannot be set to 'send' directly`, function (done) {
                    pc.$get(pocketID).status = 'send'
                    expect(pc.pocket[pocketID].status).not.equal('send')
                    done()
                })

                it(`Pocket/task: '${pocketID}' task cannot be changed`, function (done) {
                    pc.$get(pocketID).task = 'wrong'
                    expect(pc.pocket[pocketID].task).not.equal('wrong')
                    done()
                })
            }
        })

        describe(`Pocket/task should not update 'data' if status is set to 'complete'`, function () {

            const tasks = payloadData.tasks
            const job = payloadData.id

            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i].task
                const pocketID = `${job}::${task}`
                const pocket = pc.$get(pocketID)
                it(`pocket: ${pocketID} 'data' not updated`, function (done) {
                    pocket.status = 'complete'
                    pocket.data = false
                    expect(pc.pocket[pocketID].data).not.equal(false)
                    done()
                })
            }
        })

        describe(`PocketSet tasks status should update and be ready`, function () {
            const tasks = payloadData.tasks
            const job = payloadData.id

            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i].task
                const pocketID = `${job}::${task}`
                const pocket = pc.$get(pocketID)

                it(`pocket: ${pocketID} from complete to 'send'`, function (done) {
                    pocket.status = 'complete'
                    expect(pc.$get(pocketID).status).equal('send')
                    done()
                })
            }

            describe(`Pocket/task in PocketSet id: '${payloadData.id}', should:`, function () {
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

                    pc.ready(payloadData.id).then(z => {
                        expect(z).to.have.lengthOf(2);
                        resolvePromise(z)
                        done()
                    }, err => {
                        rejectPromise(err)
                        done(err)
                    })
                    // expect(pc.$get(z.id)).null              
                })
                it(`have valid data from each task`, function (done) {
                    readyData.then(z => {
                        z.forEach((el, inx) => {
                            expect(el['data']['value']).equal(10000)
                            expect(el['data']['fee']).equal(500)
                        })
                        done()
                    }, done)
                })

                it(`each Pocket instance should already be disposed`, function (done) {
                    readyData.then(z => {
                        z.forEach((el, inx) => {
                            expect(pc.pocket[el.id]).undefined
                        })
                        done()
                    }, done)
                })
            })
        })
        run();
    }, 1500);
    /// end of setTimeout
})