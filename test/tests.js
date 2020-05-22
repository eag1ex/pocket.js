`use strict`

const assert = require('assert');
const chai = require('chai');
//const should = chai.should();
const expect = chai.expect;

// asset
// const { log } = require('../pocket/utils')
const Pocket = require('../index')()
const DEBUG = false

// help: https://mochajs.org/
// help: https://www.chaijs.com/


describe('PocketSet/asyncData should succeed with tasks: [required, final]', function () {

    const pc = new Pocket({ async: true}, DEBUG)
    const payloadData = {
        id: 'job-two',
        // NOTE each task is a pocket
        // task name and id are required to create new Pocket
        tasks: [{ task: 'required', data: { 'value': 0, type: 'payment' }, }, { task: 'final', data: { 'value': 0, type: 'fee' } }]
    }
    const asyncData = pc.$payload(Promise.resolve(payloadData)).d
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
                id: 'job-two',
                // NOTE each task is a pocket
                // task name and id are required to create new Pocket
                tasks: [{ task: 'required', data: { 'value': -1, type: 'payment' }, }, { task: 'final', data: { 'value': 0, type: 'fee' } }]
            }

            const payload = pc.$payload(plData, false).d

            it(`$payload(...) cannot not be set over existing tasks`, function (done) {
                expect(payload).false
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

            it(`first pocket: ${tasks[0].task} should set status to 'error' and complete/send`, function (done) {
                const pocketID = `${job}::${tasks[0].task}`
                const pocket = pc.$get(pocketID)
                pocket.status = 'error'
                expect(pc.pocket[pocketID].status).equal('send')
                done()
            })

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

                    pc.$ready(payloadData.id).d.then(z => {
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
    }, 100);
    /// end of setTimeout
})

describe('PocketSet/Data should succeed with tasks: [start, end]', function () {

    const pc = new Pocket({ async: false, dispatcher:true }, DEBUG)
    let payloadData = null

    describe(`should fail executing user $methods`, function () {

        before(async function () {
            return payloadData = {
                //id: 'job-one',
                tasks: [{ task: 'start', data: { 'value': 0, type: 'payment' }, }, { task: 'end', data: { 'value': 10000000000, type: 'gift' } }]
            }
        })

        it(`$payload() should fail`, function (done) {
            expect(pc.$payload(payloadData).d).to.be.false;
            done()
        })

        it(`no new Pocket() should exist`, function (done) {
            expect(Object.entries(pc.pocket)).to.have.lengthOf(0);
            done()
        })

        it(`$update() should fail`, function (done) {
            expect(pc.$update().d).to.be.false;
            expect(pc.$update('1').d).to.be.false;
            expect(pc.$update('1','').d).to.be.false;
            done()
        })

        it(`$get() should fail`, function (done) {
            expect(pc.$get()).to.be.null;
            done()
        })

        it(`$activeTasks() be empty`, function (done) {
            expect(pc.$activeTasks().d).to.have.lengthOf(0)
            done()
        })   

        it(`$ready() promise should fail`, function (done) {
   
            expect(()=>pc.$ready().d).to.throw('payloadID must be set');
            expect(()=>pc.$ready('wrong').d).to.throw('ready[payloadID] is not set, maybe you called it before $payload()');
            done()
        })   

    })


    describe(`should set $payload() and new Pocket/tasks`, function () {
        before(async function () {
            return payloadData = {
                id: 'job-one',
                tasks: [{ task: 'start', data: { 'value': 0, type: 'payment' }, }, { task: 'end', data: { 'value': 10000000000, type: 'gift' } }]
            }
        })

        it(`$payload() success`, function (done) {
            expect(pc.$payload(payloadData).d).to.be.true;
            done()
        })

        it(`new Pockets/task set with status='open'`, function (done) {
            for (let key in pc.pocket) expect(pc.pocket[key].status).equal('open')
            done()
        })

        describe(`Pocket/task 'start' should:`, function () {
            it(`add value '5000'`, function (done) {
                const pocketID = `${payloadData.id}::start`
                pc.$get(pocketID).data = Object.assign({}, pc.$get(pocketID).data, { value: 5000 })
                expect(pc.$get(pocketID).data).to.have.property('value')
                expect(pc.$get(pocketID).data['value']).to.equal(5000);
                done()
            })

            it(`change status to updated`, function (done) {
                const pocketID = `${payloadData.id}::start`
                expect(pc.$get(pocketID).status).to.equal('updated')
                done()
            })

            it(`$activeTasks() display current [2] tasks`, function (done) {
                expect(pc.$activeTasks().d).to.have.lengthOf(2);
                expect(pc.$activeTasks(payloadData.id).d).to.have.lengthOf(2);
                done()
            })

        })

        describe(`Pocket/task 'end' should:`, function () {
            it(`combine values from Pocket/task 'start'`, function (done) {
                // initial payload data
                const pocketID = `${payloadData.id}::end`
                const startValue = pc.$get(`${payloadData.id}::start`).data['value']
                const endValue = pc.$get(pocketID).data.value
                const newData = Object.assign({}, pc.$get(pocketID).data, { value: startValue + endValue })
                pc.$update(pocketID,{ data: Object.assign({}, pc.$get(pocketID).data, newData) }).d
                expect(pc.$get(pocketID).data).to.have.property('value').equal(startValue + endValue)
                done()
            })

            it(`have status: 'updated'`, function (done) {
                const pocketID = `${payloadData.id}::end`
                expect(pc.$get(pocketID).status).to.equal('updated')
                done()
            })
        })

        describe(`both Pocket/tasks [start,end] should`, function () {
            describe(`complete => send => ready`, function () {
                it(`task 'start'`, function (done) {
                    const pocketID = `${payloadData.id}::start`
                    pc.$get(pocketID).status = 'complete'
                    expect(pc.$get(pocketID).status).to.equal('send')
                    done()
                })

                it(`task 'end'`, function (done) {
                    const pocketID = `${payloadData.id}::end`
                    pc.$get(pocketID).status = 'complete'
                    expect(pc.$get(pocketID).status).to.equal('send')
                    done()
                })

                it(`PocketSet id:'job-one' should be ready`, function (done) {
                    pc.$ready(payloadData.id).d.then(z => {
                        z.forEach((el, i) => {
                            expect(el).to.have.property('data')
                        })
                        expect(Object.entries(pc.pocket)).to.have.lengthOf(0);
                        done()
                    }, done)
                })
            })
        })
    })
})

/**

         * @param {*} opts.id required, case sensitive, all will be toLowerCase() 
         * @param {*} opts.task once set cannot be changed
         * @param {*} opts.compaign optional, once set cannot be changed
         * @param {*} opts.data optional any value except undefind, cannot be change once status set to `complete` or send
         * @param {*} opts.status required to control Pocket actions
         * @param {*} debug 
       
 */

// NOTE test `pocketJS.js intependantly, outside PocketModule, for all states`
describe(`Independant new PocketJS({}) tests`, function () {

    const PocketJS = require('../pocket/pocketJS')(false)
    const config = {
        id: 'cocacola::drink',
        task: 'drink',
        data: { order: 10, value: 0 },
        compaign: 'charity'
    }

    const poc = new PocketJS(config)

    describe(`PocketJS/id: ${config.id} should:`,function(){
        it(`fail to change compaign name`,function(done){
            poc.compaign = 'Donald Trump'
            expect(poc.compaign).not.equal(`Donald Trump`)
            done()
        })

        it(`fail to change id`,function(done){
            poc.id = 'cocacola::drink'
            expect(poc.compaign).not.equal(`Donald Trump`)
            done()
        })

        it(`fail to change id`,function(done){
            poc.id = 'cocacola::drink'
            expect(poc.compaign).not.equal(`Donald Trump`)
            done()
        })

        it(`status should change to 'updated when data is updated again'`,function(done){
            poc.data = { order: 50, value: 0 }
            expect(poc.status).equal(`updated`)
            done()
        })

        it(`status should change to 'complete => send'`,function(done){

            poc.status = 'complete'
            poc.getStatusAsync.then(z => {
                expect(poc.status === z && z === 'send' ? 'send' : poc.status).equal(`send`)
                done()
            })
        })

        it(`status not change any status once complete/send`,function(done){
            poc.status = 'open'
            expect(poc.status).equal(`send`)
            poc.status = 'updated'
            expect(poc.status).equal(`send`)
            poc.status = 'error'
            expect(poc.status).equal(`send`)
            done()
        })  
    })
})