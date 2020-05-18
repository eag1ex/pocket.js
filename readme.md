### Pocket 
#### - [ Developed by Eaglex ](http://eaglex.net)

##### LICENSE

* LICENCE: CC BY-NC-ND
* SOURCE: https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode


#### About
* Pocket data redistribution controller, a way of asking for something and getting it back by assignment.
* You assing tasks to Pocket id, each task is associated to individual Pocket, and controlled via PocketSet, once all tasks in your payload are completed, a ready callback is initiated.


#### Why use it
* Your data project is assignment driven, and requires tasks to complete each job
* Ask for a task, and receive a result by job assignment


#### Stack
* Node.js, ES6, Javascript, data-management, Promise, prototype, Istanbul/nyc, eslint, Mocha/Chai, custom/Utils, debug/error exception handling.

#### About the code:
- PocketModule manages each `new Pocket()`, when `pocket.js` job status `complete` is set the data is send via emit/dispatcher, final results for each payload are returned in `ready(id).then` promise
- Well documented with debug: logging and error messages, using `errors.js` to identify all inportant messages by `id`

#### Start / Examples
- Ready case examples awailable in `./examples.js` or `npm run example`
```sh

  const pc = new Pocket({},DEBUG)
  const data = {
    id: 'abc123',
    tasks: [{ task: 'required', data: { 'value': 'lala' } }, { task: 'final', data: { 'value': 'hola' } }]
  }

  // `abc123` assignment example  
  if (!pc.payload(data)) {
    console.log(' payload not send')
    } else {
        // console.log(`payload send`)
        pc.pocket['abc123::required'].data = 'new data'
        pc.pocket['abc123::required'].status = 'complete'
        // console.log(pc.$get('abc123::todo'))

        pc.pocket['abc123::final'].data = 'new data'
        pc.pocket['abc123::final'].status = 'complete'
        // console.log(pc.$get('abc123::grab'))
    }

    // resolve for this `abc123` assignment
    pc.ready('abc123').then(z => {
        console.log('pocketSet [abc123] ready',z)
    })
}
```

#### Test / Mocha and coverage


#### TODO

*  **(add)** add typescript support in the later version.


##### Contact
* Have questions, or would like to submit feedback, `contact me at: https://eaglex.net/app/contact?product=Pocket`