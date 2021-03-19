
process.on('uncaughtException', function (err) {
    console.log('sample-1.js uncaughtException/error', err)
})

/**
 * Example, exchange of data regarding `china => covid19 => world`
 */
const { log, warn, loop } = require('x-utils-es/umd')
const Pocket = require('../index').Pocket

// const Pocket = require('../index').Pocket
const DEBUG = true

const pock = new Pocket({ 
    async: false,
    onChange: true,
    dispatcher: true,
    disableWarnings: false, 
    completeOnNull: true,
    deleteWithDelay: 4000,
    withDataBank: true, // keeps probe data history updates in an array var {probe.dataBank[{data},...]}
    architect: false }, DEBUG)

const data = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: 'pocket-1', // Belt and Road Initiative
    tasks: [

        {
            ref: 'abc',
            task: 'china',
            data: { 'assets': 15, type: 'billions', info: 'benefactor' },
            compaign: 'Belt_and_Road_Initiative'
        },
        {
            task: 'srilanka',
            ref: 'efg',
            data: { 'budget': 1.5, type: 'billions', project: 'naval port' },
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

// pock.$project(data, false, 'new')

if (pock.$project(data, false, 'new').d) {

    loop(2, () => {

        const data = {
            // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
            id: 'pocket-1', // Belt and Road Initiative
            tasks: [
    
                {
                    task: 'china', 
                    data: { value: 1, message: 'some data' },
                    // status: 'complete',
                    compaign: 'Belt_and_Road_Initiative'
                },
                {
                    // status: 'complete',
                    task: 'srilanka',
                    data: { 'budget': 1.4, type: 'billions', project: 'naval port' },
                    compaign: 'Belt_and_Road_Initiative'
                }
            ]
        }
        pock.$project(data, false, 'update') 
            .$compute(function(probe, id) {
                // this.data = this.dataBank
                log(this.task)
                log('dataBank', this.dataBank)
                setTimeout(() => {
                    this.status = 'complete'
                }, 5000)
                // this.error = 'error!'        
            })
            .$onProbeComplete(function() {
                log('$onProbeComplete/task', this.task)
            }) 
    })
}
