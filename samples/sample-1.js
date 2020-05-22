
const { log, warn } = require('../pocket/utils')
const Pocket = require('../pocket/Pocket.module')()
const DEBUG = true

const pk = new Pocket({ async: false, dispatcher: false }, DEBUG)
const data = {
    id: 'worldjobone', // sensitive
    tasks: [
        { task: 'china', data: { 'assets': 1, type: 'trillion' }, compaign: 'Donation' },
        { task: 'covid19', data: { 'assets': 100, type: 'million', message: 'in damages' }, compaign: 'Vaccine' },
        { task: 'world', data: { 'assets': 0 }, compaign: 'Justice' }]
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
