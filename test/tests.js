`use strict`

const assert = require('assert');
const chai = require('chai');

const should = chai.should();
const expect = chai.expect;

// asset
const {log} = require('../pocket/utils')
const Pocket = require('../index')()
const DEBUG = false


describe('async PocketSet should succeed with tasks: [required, final]', function () {

const pc = new Pocket({async:true}, DEBUG)

const payloadData = {
    id: 'jobOne',
    // NOTE each task is a pocket
    // task name and id are required to create new Pocket
    tasks: [{ task: 'required', data: { 'value': 'lala' } }, { task: 'final', data: { 'value': 'lala' } }]
}
const asyncData =  pc.payload(Promise.resolve(payloadData))
let payloadOK = null
// if (!pc.payload(data)) {
//     console.log(' payload not send')
// } else {
//     // console.log(`payload send`)
//     pc.pocket['abc123::todo'].data = 'new data'
//     pc.pocket['abc123::todo'].status = 'complete'
//     // console.log(pc.$get('abc123::todo'))

//     pc.pocket['abc123::grab'].data = 'new data'
//     pc.pocket['abc123::grab'].status = 'complete'
//     // console.log(pc.$get('abc123::grab'))
// }


    // initialize payload
    before(function (done) {
        asyncData.then(z=>{
            payloadOK = z
            done()
        },err=>{
            payloadOK = err
            done()
        })  
    }); 



    it(`Pocket payloadData should be Promise`,function(done){
        expect(asyncData.__proto__=== Promise.prototype).to.equal(true)  
        done() 
    })

        
    it(`Pocket payloadData should resolve===true`,function(done){
        expect(payloadOK).to.equal(true)   
        done() 
    })


    // beforeEach(async function(done) {
    //    await pc.payload(Promise.resolve(payloadData))
    //    done()
    // });


 
  
    // create order
    // before(function (done) {
    //   chai.request(server)
    //     .get(`/order?id=${orderID}&bread=5&milk=2&apples=3&soup=3`)
    //     .end(function (err, res) {
    //       orderResp = res.body
    //       done();
    //     });
    // });
    
    describe(`Pocket tasks should have status 'open' with initial data set`,function(){

        it(`task 'required', status 'open' and data set`, function (done) {
            const job = payloadData.id
            const task = 'required'
            // pc.pocket[`${job}::${task}`].data = 'new data'
            const pocket = pc.$get(`${job}::${task}`)
            assert.equal(pocket.status, 'open')
            expect(pocket.data).not.equal(null)
            done()
        })

        it(`task 'final', status 'open' and data set`, function (done) {
            const job = payloadData.id
            const task = 'final'
            const pocket = pc.$get(`${job}::${task}`)
            assert.equal(pocket.status, 'open')
            expect(pocket.data).not.equal(null)
            done()
        })

        it(`both tasks 'required, final', should be updated`, function (done) {
            const job = payloadData.id
            const pocketIDA = `${job}::required`
            const pocketA = pc.$get(pocketIDA)
            pocketA.data = 'new data'

            const pocketIDB = `${job}::final`
            const pocketB = pc.$get(pocketIDB)
            pocketB.data = 'new data'

            expect(pocketA.data).equal(pc.pocket[pocketIDA].data)
            expect(pocketB.data).equal(pc.pocket[pocketIDB].data)       
            done()
        })

        it(`both tasks 'required, final', should be completed and ready`, function (done) {
            const job = payloadData.id
            const pocketIDA = `${job}::required`
            const pocketA = pc.$get(pocketIDA)
            pocketA.data = 'new data'

            const pocketIDB = `${job}::final`
            const pocketB = pc.$get(pocketIDB)
            pocketB.data = 'new data'

            expect(pocketA.data).equal(pc.pocket[pocketIDA].data)
            expect(pocketB.data).equal(pc.pocket[pocketIDB].data)       
            done()
        })


    })
   
})