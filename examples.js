
const Pocket = require('./pocket/Pocket.module')()
const DEBUG = true
const pc = new Pocket({async:false, disposeAfterReady:true}, DEBUG)
const data = {
    id: 'abc123',
    // NOTE each task is a pocket
    // task name and id are required to create new Pocket
    tasks: [{ task: 'required', data: { 'value': 'lala' },compaign:'newCompaignName' }, { task: 'grab', data: { 'value': 'lala' } }]
}

async function init(){

    if (!pc.payload(data)) {
        console.log(' payload not send')
    } else {
        
        const pocket1 = pc.$get('abc123::required')
        // console.log(`payload send`)
        pocket1.id = 'new data' 
   
        pocket1.status = 'complete'
        pocket1.data = false
        // setTimeout(()=>{

        // })
       // pc.pocket['abc123::required'].status = 'open'
        console.log(pc.$get('abc123::required'))
        
        // pc.pocket['abc123::grab'].task = null
        // pc.pocket['abc123::grab'].data = 'new data'
        pc.pocket['abc123::grab'].status = 'complete'
        // console.log(pc.$get('abc123::grab'))
    }
    
    //setTimeout(()=>{
        pc.ready('abc123').then(z => {
            console.log('pocketSet [abc123] ready', z)
      //  },2000)
    })
}
init()


