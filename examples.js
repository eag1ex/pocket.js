
const Pocket = require('./pocket/Pocket.module')()
const DEBUG = true
const pc = new Pocket({},DEBUG)
const data = {
    id: 'abc123',
    // NOTE each task is a pocket
    // task name and id are required to create new Pocket
    tasks: [{ task: 'todo', data: { 'value': 'lala' } }, { task: 'grab', data: { 'value': 'lala' } }]
}
if (!pc.payload(data)) {
    console.log(' payload not send')
} else {
    // console.log(`payload send`)
    pc.pocket['abc123::todo'].data = 'new data'
    pc.pocket['abc123::todo'].status = 'complete'
    // console.log(pc.$get('abc123::todo'))

    pc.pocket['abc123::grab'].data = 'new data'
    pc.pocket['abc123::grab'].status = 'complete'
    // console.log(pc.$get('abc123::grab'))
}

pc.ready('abc123').then(z => {
    console.log('pocketSet [abc123] ready',z)
})
