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
const pocket = new Pocket({ architect:true, async: true, dispatcher: true, completeOnNull:false }, DEBUG)

const data1 = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: 'pocket-1', // Belt and Road Initiative
    tasks: [
        {
            task: 'china',
            data: 'a',
            campaign: 'Belt_and_Road_Initiative',
            status:'updated'
            //error:'first err'
        }
    ]
}
const data2 = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: 'pocket-2', // Belt and Road Initiative
    tasks: [
        {
            task: 'china',
            data: 'a',
            campaign: 'Belt_and_Road_Initiative',
            //error:'first err'
        }
    ]
}

pocket.$ready(`pocket-1`, true).d.then(z => {
    console.log('pocket-1 ready', z)
})
pocket.$ready(`pocket-2`, true).d.then(z => {
    console.log('pocket-2 ready', z)
})


 pocket.$architect(() => {
    // when assigning project `data` must also specify if `async` and `type`
    data1.async = false
    data1.type = 'update'
    return {
        project: data1,
        asset: { name: 'dispatch', value: { data: true } }, // must provide both

        // tell architect we want to keep persistant values
        // if `project:true/or asset:true` we want to persist previous value, do not overide
        // defaults to `false` for both
       // cache: { project: false, asset: true }
    }
}).$condition(function () {
    if (data1) {
        data1.type = 'update'
        this.$architect(() => ({ project: data1 }))
        console.log('what _lastProbeID', this.d)
        //console.log('what _lastProbeID', this)
        // return => defaults to Pocket/self
    }
})

pocket.$architect(() => {
    // when assigning project `data` must also specify if `async` and `type`
    data2.async = false
    data2.type = 'update'
    return {
        project: data2,
        asset: { name: 'dispatch', value: { data: true } }, // must provide both

        // tell architect we want to keep persistant values
        // if `project:true/or asset:true` we want to persist previous value, do not overide
        // defaults to `false` for both
       // cache: { project: false, asset: true }
    }
}).$condition(function () {
    if (data2) {
        data1.type = 'update'
        this.$architect(() => ({ project: data2 }))
        // return => defaults to Pocket/self
        console.log('what _lastProbeID', this.d)
    }
})


pocket.$select('pocket-1').$compute(function(){
    this.status = 'complete'
    //console.log('each compute/status', this)
})

pocket.$select('pocket-2').$compute(function(){
    this.status = 'complete'
    //console.log('each compute/status', this)
})

// .$compute(function(){
  
// })

