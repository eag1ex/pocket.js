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
const pocket = new Pocket({ 
    onChange:true,
    async: false, 
    dispatcher: true, 
    completeOnNull:true,deleteWithDelay:0 }, DEBUG)

const data1 = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: 'pocket-1', // Belt and Road Initiative
    tasks: [
        {
            task: 'china',
            data: 'abc',
            campaign: 'Belt_and_Road_Initiative',
          //  status:'updated'
            //error:'first err'
        },
        {
            task: 'usa',
             data: 'abc',
            campaign: 'Belt_and_Road_Initiative',
          //  status:'updated'
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
             data: 'efg',
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


/**
 * the problem exists when we call multi declaration and data is no updated within the second $architect
 */
const datas = [data1, data2]

let loop = (inx) => {
    if (!datas[inx]) return

    if (datas[inx]) {
        const d = datas[inx]
        console.log('calling id', d.id)
        pocket.$architect(() => {
            // when assigning project `data` must also specify if `async` and `type`
            d.async = false
            d.type = 'update'
            return {
                project: d,
                asset: { name: 'dispatch', value: { data: true } }, // must provide both
                // tell architect we want to keep persistant values
                // if `project:true/or asset:true` we want to persist previous value, do not overide
                // defaults to `false` for both
              // cache: { project: false, asset: true }
            }
        })
        // .$select(d.id)
        // .$architect(() => {
        //         d.async = false
        //         d.type = 'update'
        //         d.tasks = [
        //             {
        //                 task: 'china',
        //                 data: 'abc',
        //                // status:'complete'
        //                 //campaign: 'Belt_and_Road_Initiative',
        //                 //error:'first err'
        //             }
        //         ]
        //     return { project: d }
        // })
        .$condition(function () {
            if (d) {
                d.type = 'update'
                d.tasks = [
                    {
                        task: 'china',
                        data: 'abc',
                      //  status:'complete'
                        //campaign: 'Belt_and_Road_Initiative',
                        //error:'first err'
                    }
                ]
               // console.log('data/tasks', d.tasks)
               
                //console.log('what _lastProbeID', this)
               this.$architect(() => ({ project: d }))
             //  console.log('$architect is?', this.d)
              // console.log('what projectID', this.$projectID, d.id)
              
              // console.log('probe??',this.$get(`::china`))
            } 
        },d.id)
            .$filter(function(){
                //console.log('$filter is', this)
                return this.campaign ==='Belt_and_Road_Initiative'
            })
            .$filter(function(){
                //console.log('$filter is', this)
                return this.task ==='china'
            })
            .$compute(function(){
                console.log('what is this', this.id, this.task)
            //    setTimeout(()=>{
            //         this.data = 1
            //         this.status = 'complete'
            //    },3000)
               // 
                // this.status = 'complete'
                // works > pocket.$data(null, `::china`)
                // not work > this.data
                // console.log('what is this.data',this.data, pocket.$data(null, `::china`), this.id, d.id)
                //this.data ='hello'
                //this.status = 'complete'
                //console.log('each compute/status', this)
            })
            .$get(`pocket-2::china`).onChange(function(data,id){
                console.log('on change for', data)
            }, 'all')
    }

    //setTimeout(() => {
        console.log('next loop')
        inx = inx +1
        loop(inx)     
   // }, 500)
   
}
loop(0)

// .$compute(function(){
  
// })

