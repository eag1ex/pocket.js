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
const pocket = new Pocket({ async: false, dispatcher: true, completeOnNull:false,deleteWithDelay:1000 }, DEBUG)

const data1 = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: 'pocket-1', // Belt and Road Initiative
    tasks: [
        {
            task: 'china',
           // data: 'a',
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
           // data: 'a',
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

const datas = [data1, data2]

let loop = (inx) => {
    if (datas[inx]) {
        const d = datas[inx]
        pocket.$architect(() => {
            // when assigning project `data` must also specify if `async` and `type`
            d.async = false
            d.type = 'update'
            return {
                project: data1,
                asset: { name: 'dispatch', value: { data: true } }, // must provide both
                // tell architect we want to keep persistant values
                // if `project:true/or asset:true` we want to persist previous value, do not overide
                // defaults to `false` for both
               // cache: { project: false, asset: true }
            }
        }, d.id).$condition(function () {
            if (d) {
                d.type = 'update'
                this.$architect(() => ({ project: d }))
                console.log('what _lastProbeID', this.d)
                //console.log('what _lastProbeID', this)
                // return => defaults to Pocket/self
            }
        }).$compute(function(){
            this.data ='hello'
            this.status = 'complete'
            //console.log('each compute/status', this)
        })

        setTimeout(() => {
            inx = inx - 1
            loop(inx)
        }, 500)

    }
    else {
        console.log('loop/done')
    }
}
loop(1)

// .$compute(function(){
  
// })

