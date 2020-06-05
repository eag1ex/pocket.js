
### Pocket.js (P/p)
####  [ Developed by Eaglex ](http://eaglex.net)

##### LICENSE

* LICENCE: CC BY-NC-ND
* SOURCE: https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode

  
#### About

*  Easy to use and sophisticated Pocket.js redistribution controller, allowing you to probe data with status management. 
* Well documented, clean beautified code.
* You assign tasks associated to individual `Probes` controlled by `Pocket.js`, once your payload status is: `complete`, `await ready(id)` can be resolved.


#### Why use it

* Project is status driven, requires tasks to complete
* Specify `tasks`, and receive results by assignment
* Manage each task Probe/task states and resolutions
* Re/Distribution of data/scheduled assignments to different areas of your code
* Creative flexibility - *make your work easier and justifiable*, simply more fun
* Easy to use, user friendly, chaining methology

#### Stack

* Node.js, ES6, JavaScript, data-management, state/management, Promise, prototyping, class chaining, Istanbul/nyc, Eslint, Mocha/Chai, Custom Utils, debug/error exception handling, user/friendly logging.


#### About the code:

-  `PocketModule` manages each `new Probe()`, when status `=complete` is set, `sq.resolve()` and dispatch is initiated. Final results are returned in `await $ready(payloadID)`

- Well documented with debug logging
- Good catch exceptions
- In depth `Mocha` tests with good nyc/Instanbul coverage.


#### What is a Pocket
- `Pocket > Probe`: Main/parent module managing each new payload and `Probe` until resolved, give tools access to user.

#### What is a Probe
- `Probe < Pocket`: Child module doesnt know about Pocket, status/state managed so when `complete`, Pocket intercepts it, and waits until all tasks `complete`. Can be used independantly if needed.


#### Test / Mocha and coverage
- To run a Mocha test: `npm run mocha`
- To run full coverage test with Instanbul: `npm run test`
- Coverage can be found in `./coverage/index.html`

#### Examples
Working examples can be found at `'./samples/**`


#### PocketModule config/opts and status logic:
- `PocketModule.opts{}`: available options on constructor to be set with instance creation.
    - `opts.architect:Boolean`: when set loads additional Architect class with available methods
    - `opts.async:Boolean`: when set will handle `await payload(asyncData)` as Promise. 
    - `opts.dispatcher:Boolean`: when set will load `Dispatcher module`, in to Pocket instance, and allow additional live on-change logging and direct communication with each Probe, currently this feature is limited to only logging, must set `debug:true` to see it in action. `[dispatcher]...`.
    - `debug:Boolean`: will log additional messages on what is happening, good for debuging :)!

- `Probe status logic`: each Probe has `status`, which gives it the required interation behaviour through out each payload. Status list, runs in forward motion, once the status is set to `complete` nothing can be changed:
    - `open`: When new Probe is created, fisrt status is created automaticly, it status will remain the same until `Probe.data` property is updated, it can never be set back to `open`.
    - `updated`: status is set automaticly once first `Probe.data` is updated to any true value, it can be re updated, once initial `data` was previously set
    - `complete`: when Probe/task is done, `Probe.sq.resolve()` is called, and nothing more can be done.
    - `send`: automaticly set after `Probe.sq.resolve()` is called, cannot be set manualy, it is used to identify last status
    - `error` works same as `complete`, with small difference... it is set last in `statusStackOrder`


#### PocketModule methods:
- **$payload( data ).d:Boolean** : top level method to initiate requested tasks, returns true when succesfull, and false on error.
    - `data.id:String`: payload.id that identifies this job
    - `data.tasks:Array[]`: specifies required format/data of tasks to perform. Specifications for this can be found in `./samples/**`

- **$probeStatusAsync( probeID ).d:promise** : returns last status changed via async method, the promise is reset everytime new status is updated, so it can be called many times, returns status name
    - `probeID`: must provide probeID example: `${payloadID}::${task}`

- **Probe.getStatusAsync** : same as ^^above^^, method can be called on each Probe/task instance, good for checking latest status in question, where its needed :) 

- **$get( probeID ):Probe**: returns an active instance of your Probe/task => `$get(probeID).status='complete'`, you can also use it instead of `$update()`
    - `probeID:String`: provided format must be, example: `${payloadID}::${task}`


- **$update( dataFrom, mergeData,probeID).d:Boolean** : will select currently available Probe/task by `id`, and update its data, only available fields found on Probe can be updated according to setter/getter requirements 
    - `probeID:String`: required probeID, each probe `probeID` makes up: `${payload.id}::${task}`, dynamicly created uppon `$payload(..)===true`
    - `dataFrom:{}`: avaialble fields example: `dataFrom:{data:'some cola', compaign:'cocacola',status:'complete'}`, will perform an update on Probe[id][data],Probe[id][compaign], etc. Validation is sensitive.
    - `mergeData`: when specified and `dataFrom.data` field is set,  will merge both


- **$activeTasks( payloadID ).d:Array**: returns an `array['taskA','tastB']` from current job payload, will only be available before `$ready(..)` is resolved, and before PocketSet tasks are completed.


- **$ready(payloadID).d:Promise**: last calling method, when your `Pocket` tasks are completed, example: `Probe[id][status]='complete'` only then, will it resolve(), otherwise pending Probe's will remain and `$ready()` will expire, this is the desired effect, most logical behaviour.

- *Final note: All user/interaction methods are prefixed with '$'*
- *Note: Most user $methods require `...).d` for access to values, to allows chaining*


#### PocketModule selectors:
- `Probe{} selectors list:`
- **$removeProject(projectID)**: removes the project in case not alredy removed
- **$projectSet(projectID)**: tells if project already created
- **$of(probeID = ''):self**: selects pointer to Probe{} 
- **$probeStatusAsync(probeID).d:Promise**: resolves promise when status changes
- **$project(data)/$payload(data,async, type = 'new')**: alias of $payload
- **$getByRef(probeRef):[Array]**: returns an array of probes that match the Probe.ref
- **$probe(probeID):Probe{}**: returns Probe{} by id
- **$select(projectID):self**: sets pointer to the project
- **$filter(cb, projectID):self**: filters probes that match condition true, in a callbacl
- **$compute(cb, projectID = ''):self**: loops thru each probe (if previously filtered/or all) that can be munipulated
- **$list(projectID = '', cb = null, type = 'self'):Array[]**:
- **$transfer(fromProbeID = ''):self**:
- **$to(toProbeID = '', pointToThisProbe = true, maxDelay = 100):self**:
- **$data(dataProp:{}||[] , probeID = '', self = false)**:
- **$cached(dataProp = {}, probeID = ''):{}**:
- **$compaign(probeID):string**:
- **$ref(probeID)**: 
- **$status(probeID):String**:
- **$task(probeID):string**:
- **$error(probeID):[]**:
- **$all(probeID):probeGetters**:
- **$architect(cb, projectID)**: more construct way of setting up a project and allowing few external assets to be used. This is an imported class, activated when `opt.architect=true` 
- **$asset(assetName, projectID)**: can access the asset declared in `$architect`, activated when `opt.architect=true` 


#### Code/extentions
for comments/and linting use: 
- `Document This`
- `Add jsdoc comments`


#### Acronyms and common definitions
- What is a Pocket:

#### Start / Examples
- Ready case examples available in `./examples.js` or `npm run example`
```sh

```
#### TODO on premium release:

*  **(add)** typescript support in later version.
*  **(add)** browser version support.
*  **(add)** history state management.

##### Contact

* Have questions, or would like to submit feedback, `contact me at: https://eaglex.net/app/contact?product=Pocket.js`