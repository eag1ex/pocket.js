
### Pocket
####  [ Developed by Eaglex ](http://eaglex.net)

##### LICENSE

* LICENCE: CC BY-NC-ND
* SOURCE: https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode

  
#### About

*  _Lightweight_ Pocket data redistribution controller - way of asking for something and getting it back by assignment.
- **Status Set Order**: `open > updated > complete > send > error`
* You assign tasks associated to individual `Pockets`controlled by main `PocketModule`, once all  in your payload are `complete`, `await ready(id)` can be resolved.


#### Why use it

* Your data project is assignment driven, requires tasks to complete each jobs
* You specify `tasks`, and receive results by assignment
* Re/Distribution of data/scheduled assignments


#### Stack

* Node.js, ES6, JavaScript, data-management, Promise, prototype, Istanbul/nyc, Eslint, Mocha/Chai, Custom Utils, debug/error exception handling.


#### About the code:

-  `PocketModule` manages each `new Pocket()`, when `pocket.js` status `=complete` is set, `emit/dispatcher` for data is initiated. Final results payload are returned in `ready(id)` Promise

- Well documented with debug: logging and error messages, using `errors.js` to identify all important messages by `id`
- Good catch exceptions
- In depth `Mocha` tests.


#### Test / Mocha and coverage
- To run a Mocha test: `npm run mocha`
- To run full coverage test with Instanbul: `npm run test`
- Coverage can be found in `./coverage/index.html`


#### Start / Examples
- Ready case examples available in `./examples.js` or `npm run example`
```sh
const DEBUG = true
const opts = {async:true} // when setting async:true, call return payload as Promise
const pc = new Pocket(opts, DEBUG)
const data = {
id: 'abc123',
// NOTE each task is a pocket
// task name and id are required to create new Pocket
tasks: [{ task: 'required', data: { 'value': 'lala' } }, { task: 'grab', data: { 'value': 'lala' } }]
}
async function  init(){
// `abc123` assignment example
if (!await pc.payload(Promise.resolve(data))) {
console.log('error, payload not send')
} else {
pc.pocket['abc123::required'].data = 'new data' // status > 'updated'
pc.pocket['abc123::required'].status = 'complete'
// console.log(pc.$get('abc123::required'))
pc.pocket['abc123::grab'].data = 'new data'
pc.pocket['abc123::grab'].status = 'complete'
// console.log(pc.$get('abc123::grab'))
}

setTimeout(()=>{
// when both tasks are complete

pc.ready('abc123').then(z => {
console.log('pocketSet [abc123] ready', z)
},2000)
})
}
init()
```
#### TODO

*  **(add)** add typescript support in the later version.

##### Contact

* Have questions, or would like to submit feedback, `contact me at: https://eaglex.net/app/contact?product=Pocket`