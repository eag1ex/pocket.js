const { log, warn } = require("x-utils-es/umd")

// const Pocket = require('../build/js/pocket_commonjs').PocketModule()
const Pocket = require("../index").Pocket

const DEBUG = true
const pocket = new Pocket(
    {
        async: false,
        onChange: true,
        dispatcher: true,
        disableWarnings: true, //  disable some less relevant warning messages
        completeOnNull: true,
        deleteWithDelay: 0
    },
    DEBUG
)

const data1 = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: "pocket-1", // Belt and Road Initiative
    tasks: [
        {
            task: "china",
            data: "000",
            campaign: "Belt_and_Road_Initiative"
            //  status:'updated'
            // error:'first err'
        },
        {
            task: "usa",
            // data: 'a',
            campaign: "Belt_and_Road_Initiative"
            //  status:'updated'
            // error:'first err'
        }
        // {
        //     task: 'poland',
        //      data: '000',
        //     //status:'complete'
        //     campaign: 'Belt_and_Road_Initiative',
        //     //error:'first err'
        // }
    ]
}
const data2 = {
    // source: `https://en.wikipedia.org/wiki/List_of_projects_of_the_Belt_and_Road_Initiative`
    id: "pocket-1", // Belt and Road Initiative
    tasks: [
        {
            task: "china",
            data: "000",
            campaign: "Belt_and_Road_Initiative"
            //  status:'updated'
            // error:'first err'
        },
        {
            task: "usa",
            //     data: 'efg',
            campaign: "Silk_Road"
            //  status:'updated'
            // error:'first err'
        }
    ]
}

/**
 * the problem exists when we call multi declaration and data is no updated within the second $architect
 */
const datas = [data1, data2]

let loop = (inx) => {
    if (!datas[inx]) return

    if (datas[inx] && !pocket.$projectComplete(datas[inx].id)) {
        const d = datas[inx]
        // console.log('calling id', d.id)
        pocket
            .$architect(() => {
                // when assigning project `data` must also specify if `async` and `type`
                // d.async = false
                d.type = "update"
                return {
                    project: {
                        ...d
                        //     tasks:  [{
                        //         task: 'china',
                        //        data: 'abc',
                        //         campaign: 'Belt_and_Road_Initiative',
                        //       //  status:'updated'
                        //         //error:'first err'
                        //     },
                        //     {
                        //         task: 'usa',
                        //    //     data: 'efg',
                        //         campaign: 'Silk_Road',
                        //       //  status:'updated'
                        //         //error:'first err'
                        //     },
                        //     {
                        //         task: 'poland',
                        //         data: '000',
                        //         //status:'complete'
                        //         campaign: 'test',
                        //         //error:'first err'
                        //     }

                        // ]
                    },
                    asset: { name: "dispatch", value: { data: true } } // must provide both
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
            // NOTE consecutive call to architect thru $condition() can only update existing items
            .$condition((self) => {
                if (d && inx === 1) {
                    // console.log('calling poland update')
                    d.type = "update"
                    //  d.id ='pocket-1'
                    d.tasks = [
                        // {
                        //     task: 'china',
                        //     data: 'efg',
                        //     //status:'complete'
                        //     //campaign: 'Belt_and_Road_Initiative',
                        //     //error:'first err'
                        // },
                        {
                            task: "poland",
                            data: "333"
                            // status:'complete'
                            // campaign: 'test',
                            // error:'first err'
                        }
                    ]
                    // console.log('data/tasks', d)

                    // console.log('what _lastProbeID', this)
                    self.$architect(() => ({ project: d }))
                    //  console.log('$architect is?', this.d)
                    // console.log('what projectID', this.$projectID, d.id)

                    // console.log('probe??',this.$get(`::china`))
                }
            }, d.id)
            .$filter((self) => {
                // console.log('$filter is', this)
                return self.campaign === "Belt_and_Road_Initiative" || self.campaign === "Silk_Road"
                // ||  this.campaign ==='test'
            })
            // .$filter(function(){
            //     //console.log('$filter is', this)
            //     return this.task ==='china'
            // })
            .$compute((self) => {
                console.log("what is this", self.data, self.task)
                // works > pocket.$data(null, `::china`)
                // not work > this.data
                // console.log('what is this.data',this.data, pocket.$data(null, `::china`), this.id, d.id)
                // this.data ='hello'
                // this.status = 'complete'
                // console.log('each compute/status', this)
            })

        // .$get(`::poland`).onChange(function(stat,id){
        //     console.log('on change for', this.task, stat)
        // }, 'status')
    }

    // setTimeout(() => {
    console.log("next loop")
    inx = inx + 1
    loop(inx)
    // }, 500)

    pocket
        .$ready(`pocket-1`, true)
        .d.then((z) => {
            //  z.
            console.log("pocket-1 ready", z)
        })
        .catch((err) => {
            console.log("ups", err)
        })
    pocket
        .$ready(`pocket-2`, true)
        .d.then((z) => {
            console.log("pocket-2 ready", z)
        })
        .catch((err) => {
            console.log("ups", err)
        })
}
loop(0)

// .$compute(function(){

// })
