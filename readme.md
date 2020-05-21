
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

-  `PocketModule` manages each `new Pocket()`, when `pocket.js` status `=complete` is set, `emit/dispatcher` for data is initiated. Final results payload are returned in `ready(payloadID)` Promise

- Well documented with debug: logging and error messages, using `errors.js` to identify all important messages by `id`
- Good catch exceptions
- In depth `Mocha` tests.

#### Pocket methods, settings and requirements:
- `PocketModule.opts{}`: available options on constructor to be set with instance creation.
    - `opts.async:Boolean`: when set will handle `await payload(asyncData)` as Promise. 
    - `opts.dispatcher:Boolean`: when set will load `Dispatcher module`, in to our instance, and allow additional live on-change loggin and dirrect communication with each Pocket, currently this feature is limited to only display messages, must set `debug:true` to see it in action. `[dispatcher]...`.
    - `debug:Boolean`: will log additional messages on what is happening, good for debuging :)!

- `Pocket status process/system`: each Pocket has `status`, which gives it the required interation behaviour through out each payload. Status list, runs in forward motion, once the status is set 'completed' nothing can be changed:
    - `open`: When new Pocket is created, new fisrt status is created automaticly, this status will remain the same until `Pocket.data` property setter is updated, it can never be set back to `open`.
    - `updated`: status is set automaticly once first `Pocket.data` is updated to any true value, it can be re updated, once initial `data` was previously set
    - `complete`: when given Pocket/task is done, `Pocket.sq.resolve()` is called, and nothing can be done the Pocket
    - `send`: automaticly set after `Pocket.sq.resolve()` is called, cannot be set manualy, it is used to identify last status
    - `error` works same as `complete`, with small difference... it is set last in `statusStackOrder`

- *$payload( data ):Boolean* : top level method to initiate requested tasks, returns true when succesfull, and false on error.
    - `data.id:String`: payload id that identifies this payload
    - `data.tasks:Array[]`: specifies required format of tasks to perform. Specifications for this can be found in `./example.js` and in `./samples/**`


- *$get( pocketID ):Pocket*: will return an active instance of your Pocket/task => `$get(pocketID).status='complete'`, you can also use it instead of `$update()`
    - `pocketID:String`: provided format must be, example: `${payloadID}::${task}`


- *$update(pocketID, dataFrom, mergeData):Boolean* : will select currently available Pocket/tast by `id`, and update its data, only available fields found on Pocket cen be updated according to setter/getter requirements 
    - `pocketID:String`: required PocketID, each pocket `pocketID` makes up this format: `${payload.id}::${task}`, dynamicly created uppon `$payload(..)===true`
    - `dataFrom:{}`: format of `dataFrom` and avaialble fields example: `dataFrom:{data:'some cola', compaign:'cocacola',status:'complete'}`, will perform an update on Pocket[id][data],Pocket[id][compaign], etc. Validation is sensitive.
    - `mergeData`: when specified and `dataFrom.data` field is set,  will merge both


- *$activeTasks( payloadID ):Array*: returns an `array['taskA','tastB']` of current job payload, will only be available before `$ready(..)` is resolved, and before PocketSet tasks are completed.


- *$ready(payloadID):Promise*: last calling method, when all your `PocketSet` tasks have been completed, example: `Pocket[id][status]='complete'` only then, it will resolve(), otherwise pending Pocket/tasks will remain and `$ready()` will expire, this is the desired effect, most logical behaviour.

- **Final notes: All user/interaction methods are prefixed with '$'**



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