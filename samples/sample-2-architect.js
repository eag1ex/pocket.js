`use strict`
/**
 * integration of architect
 */

process.on('uncaughtException', function (err) {
    console.log('sample-1.js uncaughtException/error', err)
})

const dispatcher = require('../libs/dispatcher')()
const { log, warn } = require('../index').utils
const Pocket = require('../index').Pocket

const DEBUG = true
const pocket = new Pocket({ architect:true, async: true, dispatcher: true }, DEBUG)

const data = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: 'pocket-1', // Belt and Road Initiative
    tasks: [
        {
            task: 'china',
            data: { 'assets': 10, type: 'billions', info: 'benefactor' },
            compaign: 'Belt_and_Road_Initiative'
        },
        {
            task: 'srilanka',
            data: { 'budget': 1.4, type: 'billions', project: 'naval port' },
            compaign: 'Belt_and_Road_Initiative'
        }
    ]
}

pocket.$architect(function () {
    // when assigning project `data` must also specify if `async` and `type`
    data.async = false
    data.type = 'new'
    return {
       // project: data,
       asset: { name: 'dispatch', value: { data: true } } // must provide both
    }
}, 'pocket-1')



console.log(pocket.$asset('dispatch','pocket-1'))
// dispatcher.initListener().subscribe(function(d,id){
//     // add architect
//     // this.next()
// })