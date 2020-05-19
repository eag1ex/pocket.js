`use strict`

const assert = require('assert');
const chai = require('chai');

const should = chai.should();
const expect = chai.expect;

// asset
const { log } = require('../pocket/utils')
const Pocket = require('../index')()
const DEBUG = false

// asset: https://mochajs.org/
// asset: https://www.chaijs.com/


describe('async PocketSet should succeed with tasks: [required, final]', function () {

    const pc = new Pocket({ async: true }, DEBUG)
    const payloadData = {
        id: 'jobOne',
        // NOTE each task is a pocket
        // task name and id are required to create new Pocket
        tasks: [{ task: 'required', data: { 'value': 'lala' } }, { task: 'final', data: { 'value': 'lala' } }]
    }
    const asyncData = pc.payload(Promise.resolve(payloadData))
    let payloadOK = null



    // initialize payload
    before(function (done) {
        asyncData.then(z => {
            payloadOK = z
            done()
        }, err => {
            payloadOK = err
            done(err)
        })
    });



    it(`Pocket payloadData should be a Promise`, function () {
       expect(asyncData.__proto__ === Promise.prototype).to.equal(true)
       return asyncData
    })


    it(`Pocket payloadData should resolve===true`, function () {
        expect(payloadOK).to.equal(true)
        return asyncData
    })


    describe(`PocketSet tasks should perform status check and data update`, async function () {
        await asyncData

        const tasks = payloadData.tasks
        const job = payloadData.id

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i].task
            const pocket = pc.$get(`${job}::${task}`)

            it(`task: ${task}, status 'open', ok`, function (done) {
                assert.equal(pocket.status, 'open')
                expect(pocket.data).not.equal(null)
                done()
            })

            it(`task: ${task}, should update status`, function (done) {
                pocket.data = "new data"
                expect(pocket.status).equal('updated')
                done()
            })
        }
    })

    describe(`PocketSet tasks status should set 'complete', then 'send'`, async function () {
        await asyncData
        const tasks = payloadData.tasks
        const job = payloadData.id

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i].task
            const pocketID = `${job}::${task}`
            const pocket = pc.$get(pocketID)

            it(`pocket: ${pocketID} from complete to send`, function (done) {
                pocket.status = 'complete'
                expect(pc.pocket[pocketID].status).equal('send')
                done()
            })
        }

        it(`PocketSet: ${payloadData.id} is send, ready and purged`, function (done) {

            pc.ready(payloadData.id).then(z => {

                expect(z).to.have.lengthOf(2);
                expect(pc.$get(z.id)).equal(null)
                done()

            }, done)
        })
    })


})