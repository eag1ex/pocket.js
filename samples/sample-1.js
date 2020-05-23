`use strict`

process.on('uncaughtException', function (err) {
    console.log('sample-1.js uncaughtException/error',err);
})


const { log, warn } = require('../pocket/utils')
const Pocket = require('../pocket/Pocket.module')()
const DEBUG = true

const pocket = new Pocket({ async: false, dispatcher: false, $getChain :true }, DEBUG)
const data = {
    id: 'new-world-order', // sensitive
    tasks: [
        {
            task: 'china', data: { 'assets': 100, type: 'billions', message: 'profits from covid-19' },
            compaign: 'Dominance'
        },
        {
            task: 'covid19', data: { 'assets': 0, type: 'billions', message: 'in damages' },
            compaign: 'Vaccine'
        },
        {
            task: 'world', data: { 'assets': 0, type: 'billions', message: 'in damages' },
            compaign: 'Claim'
        }]
}

if (pocket.$payload(data)) {

    // const worldProbe = pocket.$get(`${data.id}::world`,true) // grab created Pocket
    //     .$update({ data: { assets: 50 } }, true) // update it
    //    .$update({status:'complete'})
       // .$get() // get latest update data   

    // shortcut to above
    pocket.$of(`::covid19`)
           .$update({ data: { assets: 50 } })
            .$update({status:'complete'}) 

    
    //       //  .$update({ data: { assets: 0 } }, true)
    //      //   .$update({status:'complete'})
    //     pocket.$of(`${data.id}::china`)
    //      .$update({ data: { assets: 100 } }, true)
    //      .$transfer() 

    //     setTimeout(()=>{
    //         pocket.$of(`${data.id}::china`).$to(`${data.id}::covid19`,false)
    //                 .$update({status:'complete'})
    //     },90)



    pocket.$probeStatusAsync(`${data.id}::china`).d.then(z=>{
        log('china/getStatusAsync',z)
    })

    pocket.$ready(data.id).d.then(z => {
       log('Pocket ready', z)
    })

    
    //log(`world`, pocket.$get(`${data.id}::world`).d)
    //log(`worldProbe`, worldProbe.d['data'])
    //log(`chinaProbe`, chinaProbe.d)
}

    // setTimeout(() => {
    //     pk.$update('abc123::grab', { status: 'complete' })
    // }, 300)


    //console.log('pc activeTasks', pk.$activeTasks())




