`use strict`

const assert = require('assert');
const chai = require('chai');
//const {run} = require ('mocha');
const should = chai.should();
const expect = chai.expect;

// asset
const { log } = require('../pocket/utils')
const Pocket = require('../index')()
const DEBUG = false

// asset: https://mochajs.org/
// asset: https://www.chaijs.com/


describe('PocketSet/asyncData should succeed with tasks: [required, final]', function () {

    const pc = new Pocket({ async: true }, DEBUG)
    const payloadData = {
        id: 'jobOne',
        // NOTE each task is a pocket
        // task name and id are required to create new Pocket
        tasks: [{ task: 'required', data: { 'value': 'lala' }, }, { task: 'final', data: { 'value': 'lala' } }]
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



    it(`Pocket payloadData should be a Promise`, function (done) {
        expect(asyncData.__proto__ === Promise.prototype).to.equal(true)
        done()
    })


    it(`Pocket payloadData should resolve===true`, function (done) {
        expect(payloadOK).to.equal(true)
        done()
    })

    ////////////////// start all other test
    // wait for asyncData
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
                    pocket.data = "new data"
                    expect(pc.$get(pocketID).status).equal('updated')
                    done()
                })
            }
        })

        describe(`PocketSet should NOT repeat same tasks on pending jobs`, function () {
            // await asyncData

            const payloadData = {
                id: 'jobOne',
                // NOTE each task is a pocket
                // task name and id are required to create new Pocket
                tasks: [{ task: 'required', data: { 'value': 'hola' } }, { task: 'final', data: { 'value': 'ha' } }]
            }

            const payload = pc.payload(payloadData, false)

            it(`PocketSet payload(...) should not be set on pending tasks`, function (done) {
                expect(payload).null
                done()
            })

            for (let i = 0; i < payloadData.tasks.length; i++) {
                const item = payloadData.tasks[i]
                const pocketID = `${payloadData.id}::${item.task}`

                it(`Pocket : ${item} id cannot be changed`,function(done){
                    console.log('what is pc.pocket[pocketID]', pc.pocket,pocketID)
                    pc.pocket[pocketID].id = 'wrong'
                    expect(pc.$get(pocketID).id).not.equal('wrong')
                    done()
                })

                it(`Pocket : ${item} task cannot be changed`,function(done){
                    pc.pocket[pocketID].task = 'wrong'
                    expect(pc.$get(pocketID).task).not.equal('wrong')
                    done()
                })

            }

        })

        describe(`#PocketSet tasks status should update and be ready`, function () {
            //await asyncData
            const tasks = payloadData.tasks
            const job = payloadData.id

            for (let i = 0; i < tasks.length; i++) {
                const task = tasks[i].task
                const pocketID = `${job}::${task}`
                const pocket = pc.$get(pocketID)

                it(`pocket: ${pocketID} from complete to send`, function (done) {
                    pocket.status = 'complete'
                    expect(pc.$get(pocketID).status).equal('send')
                    done()
                })
            }

            // it(`PocketSet: ${payloadData.id} is send, ready and purged`, function (done) {

            //     pc.ready(payloadData.id).then(z => {
            //         expect(z).to.have.lengthOf(2);
            //         expect(pc.$get(z.id)).null
            //         done()
            //     }, done)
            // })
        })

        run();
    }, 1000);
    /// end of setTimeout
})