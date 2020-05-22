
const { log, warn } = require('../pocket/utils')
const Pocket = require('../pocket/Pocket.module')()
const DEBUG = true

const pk = new Pocket({ async: false, dispatcher: false }, DEBUG)
const data = {
    id: 'new-world-order', // sensitive
    tasks: [
        { task: 'china', data: { 'assets': 1, type: 'trillion', message:'profits from covid-19' }, compaign: 'Dominance' },
        { task: 'covid19', data: { 'assets': 500, type: 'billions', message: 'in damages' }, compaign: 'Vaccine' },
        { task: 'world', data: { 'assets': 500, type:'billions', message:'in damages' }, compaign: 'Claim' }]
}

if (!pk.$payload(data)) log('payload not send')
else {

    pk.$update('abc123::required', { 'status': 'complete', compaign: 'cocacola' })


    setTimeout(() => {
        pk.$update('abc123::grab', { status: 'complete' })
    }, 300)


    console.log('pc activeTasks', pk.$activeTasks())
}


pk.$ready('abc123').then(z => {
    console.log('pocketSet [abc123] ready', z)
})
