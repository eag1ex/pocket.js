`use strict`

process.on('uncaughtException', function (err) {
    console.log('sample-1.js uncaughtException/error', err)
})

/**
 * Example, exchange of data regarding `china => covid19 => world`
 */
const { log, warn } = require('../index').utils
const Pocket = require('../index').Pocket

// const Pocket = require('../index').Pocket
const DEBUG = true

const pock = new Pocket({ async: false, dispatcher: true, withDataBank: true }, DEBUG)

const data = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: 'pocket-1', // Belt and Road Initiative
    tasks: [

        {
            ref: 'abc',
            task: 'china',
            data: { 'assets': 10, type: 'billions', info: 'benefactor' },
            compaign: 'Belt_and_Road_Initiative'
        },
        {
            task: 'srilanka',
            ref: 'efg',
            data: { 'budget': 1.4, type: 'billions', project: 'naval port' },
            compaign: 'Belt_and_Road_Initiative'
        }
        // {
        //     task: 'kenya', data: { 'budget': 3.2, type: 'billions', project:'railway' },
        //     compaign: 'Belt_and_Road_Initiative'
        // },
        // {
        //     task: 'laos', data: { 'budget': 5.95, type: 'billions', project:'railway' },
        //     compaign: 'Belt_and_Road_Initiative'
        // }
    ]
}

// pock.$projectSetAsync(`b-r-i`).then(z=>[
//     log(`projectSetAsync is now set :)`,z)
// ])

// pock.$ready(`pocket-1`).d.then(z=>{
//       console.log('pocket-1 ready',z)
// })

// pock.$projectSetAsync(`pocket-1`).then(z=>{
//     console.log(`projectSetAsync ready`,z)
// })

if (pock.$project(data, false, 'update').d) {

    const data = {
        // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
        id: 'pocket-1', // Belt and Road Initiative
        tasks: [

            {
                task: 'china', 
                data: { value: 1, message: 'some data' },
                status: 'complete',
                compaign: 'Belt_and_Road_Initiative'
            },
            {
                status: 'complete',
                task: 'srilanka',
                data: { 'budget': 1.4, type: 'billions', project: 'naval port' },
                compaign: 'Belt_and_Road_Initiative'
            }
        ]
    }

    pock.$project(data, false, 'update')

    const l = pock.$compute(function(probe, id) {
        // this.error = 'error!'        
    }).$filter(function() {
        return true
    }).d
    console.log(pock.$error(`::china`))
    return
    pock
        .$select(`pocket-1`)
        // .$of(`::china`) 
        // .$update({ data: { assets: 10.55 }})
        .$compute(function(probe, id) {        
            this.data = 'new data'
        })
    console.log('list', pock.$list())  

    function newEnclosure(cb) {
        const t = (new function () {
            this.project = null
            this.order = {
                cost: 0 // updated dynamicly
            }
            this.purchase = cb
        }())
        return Object.assign({}, t)
    }

    function facilitate(cb) {
        return (new function () {
            this.fees = 1000
            this.update = (...args) => {
                return cb(...args)
            }
        }())
    }

    newEnclosure(async function ({ srilanka }) {
        this.projectName = 'Naval Port'
        return new Promise((resolve, reject) => {
            // NOTE  srilanka.constructor.name === 'Pocket'
            this.order.cost = srilanka.data['budget']
            srilanka.status = 'complete' // update Pocket{} / status
            setTimeout(() => resolve(this), 100)
        })
    }).purchase({ srilanka: pock.$get(`::srilanka`) })
        .then(({ order, projectName }) => {
            return pock.$of(`::china`)
                .$update({ data: { assets: pock.$data(['assets']) - order.cost } })
                .$update({ data: { project: 'Naval Port Complete' } }, true, `::srilanka`).$probe()
        }).then(({ data, status, id, compaign, task }) => {
            log(`navalPort/Probe update`, data, status, id, compaign, task)
        })
        
    // NOTE individual Probe{} status, same as `pock.pocket['b-r-i::srilanka'].getStatusAsync.then`
    pock.$probeStatusAsync(`::srilanka`).d.then(status => {
        log(`srilanka/ status: ${status}`)
    })

    facilitate(({ kenya }) => {
        kenya.update({ fees: this.fees, project: 'railway not complete' }, true)
            .status = 'complete'
        return kenya
    }).update({ kenya: pock.$probe(`::kenya`) })
        .getStatusAsync.then(status => {
            log(`kenya/railway Probe{} status: ${status}`)
        })      

    // setTimeout(()=>{
      
    // },1000)
  
    // pock.$select(`b-r-i`).$ready().d.then(z=>{

    // })

    // console.log('srilanka',pock.$get(`::srilanka`))     
    // .$update({status:'complete'}) 
    // log(`::china/task`,pock.$of(`::china`).$cached())
    
    //       //  .$update({ data: { assets: 0 } }, true)
    //      //   .$update({status:'complete'})
    //     pock.$of(`${data.id}::china`)
    //      .$update({ data: { assets: 100 } }, true)
    //      .$transfer() 

    //     setTimeout(()=>{
    //         pock.$of(`${data.id}::china`).$to(`${data.id}::covid19`,false)
    //                 .$update({status:'complete'})
    //     },90)

    // pock.$probeStatusAsync(`${data.id}::china`).d.then(z=>{
    //     log('china/getStatusAsync',z)
    // })

    // pock.$ready(data.id).d.then(z => {
    //    log('Pocket ready', z)
    // })
    
    // log(`world`, pock.$get(`${data.id}::world`).d)
    // log(`worldProbe`, worldProbe.d['data'])
    // log(`chinaProbe`, chinaProbe.d)
}

// setTimeout(() => {
//     pk.$update('abc123::grab', { status: 'complete' })
// }, 300)

// console.log('pc activeTasks', pk.$activeTasks())
