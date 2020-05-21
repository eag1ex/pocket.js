
const Pocket = require('./pocket/Pocket.module')()
const DEBUG = true
const pc = new Pocket({async:false, disposeAfterReady:true}, DEBUG)
const data = {
    id: 'abc123',
    // NOTE each task is a pocket
    // PocketSet[] => task name and id are required to create new Pocket
    tasks: [{ task: 'required', data: { 'value': 'lala' },compaign:'newCompaignName' }, { task: 'grab', data: { 'value': 'lala' } }]
}

async function init(){

    if (!pc.payload(data)) {
        console.log(' payload not send')
    } else {
       
        setTimeout(()=>{
            pc.$get('abc123::required').data='new data'
        },500)
        setTimeout(()=>{
            pc.$get('abc123::required').status = 'complete'
        },1000)
      
        setTimeout(()=>{
            pc.$get('abc123::required').data='another data'
        },300)

        setTimeout(()=>{
            
            pc.$get('abc123::grab').status = 'complete'
        },2000)
       console.log('pc activeTasks', pc.activeTasks())
    }
    
    //setTimeout(()=>{
        pc.ready('abc123').then(z => {
            console.log('pocketSet [abc123] ready', z)
      //  },2000)
    })
}
init()


