/// <reference path="../types/index.d.ts"/>
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

 

 pocket.$architect(() => {
    // when assigning project `data` must also specify if `async` and `type`
    data.async = false
    data.type = 'new'
    return {
        project: data,
        asset: { name: 'dispatch', value: { data: true } }, // must provide both

        // tell architect we want to keep persistant values
        // if `project:true/or asset:true` we want to persist previous value, do not overide
        // defaults to `false` for both
        cache: { project: false, asset: true }
    }
}).$architect(() => {
    // when assigning project `data` must also specify if `async` and `type`
   // data.async = false
    //data.id = 'pocket-2'
    data.type = 'update'
    data.tasks = [
        {
            task: 'china',
           // data:'empty',
           // status:'complete',
            compaign: 'Belt_and_Road_Initiative'
        },
        {
            task: 'srilanka',
           // data: 'empty',
            compaign: 'Belt_and_Road_Initiative'
        }
    ]

    return {
        project: data,
        asset: { name: 'dispatch', value: null }, // must provide both

        // tell architect we want to keep persistant values
        // if `project:true/or asset:true` we want to persist previous value, do not overide
        // defaults to `false` for both
        //cache: { project: false, asset: false }
    }
})

.$condition(function(){
    //if(this.$projectID ==='pocket-1'){
        console.log('yey got projectID',this.$projectID)
   // }
})
// .$filter(function () {
//     return this.task === 'none'
// })
// .$filter(function () {
//     return this.task === 'srilanka'
// })
// .$filter(function () {
//     return this.compaign === 'Belt_and_Road_Initiative'
// })
pocket.$select('pocket-1').$compute(function(){
    this.status = 'complete'
    console.log('each compute/status', this.status)
})

// const list = pocket.$select(`pocket-2`).$filter(function () {
//     return this.task === 'none'
// }).$compute(function(){
//     console.log('each compute', this.task)
// }).d

// console.log('list2', list)
// .$asset('dispatch',(dispatch)=>{
//     console.log('dispatch',dispatch)
//         return dispatch
// })
// dispatcher.initListener().subscribe(function(d,id){
//     // add architect
//     // this.next()
// })