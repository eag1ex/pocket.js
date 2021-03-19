const { v4 } = require('uuid')
const { uniqBy } = require('./pocket/utils')
const arr = [{ a: 1, id: 1 }, { a: 2, id: 1 }, { b: 1, id: 1 }, { b: 2, id: 2 }, { b: 2, id: undefined }]

console.log(uniqBy(arr, 'a'))
return 
const Pocket = require('./pocket/Pocket.module').PocketModule()
const DEBUG = true
const pc = new Pocket({ async: false, dispatcher: false }, DEBUG)
const data = {
    id: 'abc123',
    // NOTE each task is a pocket
    // PocketSet[] => task name and id are required to create new Probe
    tasks: [{ task: 'required', data: { 'value': 'lala' } }, { task: 'grab', data: { 'value': 'lala' } }]
}

async function init() {

    if (!pc.$payload(data).d) {
        console.log(' payload not send')
    } else {

        pc.$get('abc123::grab').getStatusAsync.then(z => {
            console.log('getStatusAsync 1', z)
        })
        // prob['data']={ order: 20, value: 0 }
    
        // prob.getStatusAsync.then(z=>{
        //   console.log('getStatusAsync',z)
        // })

        // setTimeout(()=>{
        pc.$update({ 'status': 'complete', compaign: 'cocacola' }, false, '::required')
        // },500)

        pc.$get('abc123::required').getStatusAsync.then(z => {
            console.log('getStatusAsync 1', z)
        })

        setTimeout(() => {
            pc.$update({ status: 'complete' }, false, 'abc123::grab')
        }, 300)
     
        // setTimeout(()=>{
            
        //     pc.$get('abc123::grab').status = 'complete'
        // },2000)
        console.log('pc activeTasks', pc.$activeTasks().d)
    }
    
    // setTimeout(()=>{
    pc.$ready('abc123').d.then(z => {
        console.log('pocketSet [abc123] ready', z)
        //  },2000)
    })
}
init()

function testProbe() {
    const Probe = require('./pocket/probe')(null)

    const config = {
        id: 'cocacola::drink',
        task: 'drink',
        data: { order: 10, value: 0 },
        compaign: 'charity'
    }
    const prob = new Probe(config)
    prob.getStatusAsync.then(z => {
        console.log('getStatusAsync', z)
    })
    prob['data'] = { order: 20, value: 0 }

    prob.getStatusAsync.then(z => {
        console.log('getStatusAsync', z)
    })
    // setTimeout(()=>{
    prob['status'] = 'complete'
    // },1000)
  
    prob.getStatusAsync.then(z => {
        console.log('getStatusAsync /last', z)
    })
}
// testProbe()

const test = Object.values(['mike', ''].reduce((n, el, i, all) => {
    if (el !== undefined) n[el] = true
    return n
}, {}))// .shift()

console.log('test', test)
