
const Pocket = require('./pocket/Pocket.module')()
const DEBUG = true
const pc = new Pocket({async:true}, DEBUG)
const data = {
    id: 'abc123',
    // NOTE each task is a pocket
    // task name and id are required to create new Pocket
    tasks: [{ task: 'required', data: { 'value': 'lala' } }, { task: 'grab', data: { 'value': 'lala' } }]
}

async function init(){

    if (!await pc.payload(Promise.resolve(data))) {
        console.log(' payload not send')
    } else {
        // console.log(`payload send`)
        pc.pocket['abc123::required'].data = 'new data'
        pc.pocket['abc123::required'].status = 'complete'
       // console.log(pc.$get('abc123::required'))
    
         pc.pocket['abc123::grab'].data = 'new data'
        pc.pocket['abc123::grab'].status = 'complete'
        // console.log(pc.$get('abc123::grab'))
    }
    setTimeout(()=>{
        pc.ready('abc123').then(z => {
            console.log('pocketSet [abc123] ready', z)
        },2000)
    })
   

}
init()


