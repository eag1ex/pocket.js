module.exports=
/******/function(t){// webpackBootstrap
/******/ // The module cache
/******/var e={};
/******/
/******/ // The require function
/******/function r(i){
/******/
/******/ // Check if module is in cache
/******/if(e[i])
/******/return e[i].exports;
/******/
/******/ // Create a new module (and put it into the cache)
/******/var s=e[i]={
/******/i,
/******/l:!1,
/******/exports:{}
/******/};
/******/
/******/ // Execute the module function
/******/
/******/
/******/ // Return the exports of the module
/******/return t[i].call(s.exports,s,s.exports,r),
/******/
/******/ // Flag the module as loaded
/******/s.l=!0,s.exports;
/******/}
/******/
/******/
/******/ // expose the modules object (__webpack_modules__)
/******/
/******/
/******/
/******/ // Load entry module and return exports
/******/return r.m=t,
/******/
/******/ // expose the module cache
/******/r.c=e,
/******/
/******/ // define getter function for harmony exports
/******/r.d=function(t,e,i){
/******/r.o(t,e)||
/******/Object.defineProperty(t,e,{enumerable:!0,get:i})
/******/},
/******/
/******/ // define __esModule on exports
/******/r.r=function(t){
/******/"undefined"!=typeof Symbol&&Symbol.toStringTag&&
/******/Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})
/******/,Object.defineProperty(t,"__esModule",{value:!0})},
/******/
/******/ // create a fake namespace object
/******/ // mode & 1: value is a module id, require it
/******/ // mode & 2: merge all properties of value into the ns
/******/ // mode & 4: return value when already ns object
/******/ // mode & 8|1: behave like require
/******/r.t=function(t,e){
/******/if(
/******/1&e&&(t=r(t)),8&e)return t;
/******/if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;
/******/var i=Object.create(null);
/******/
/******/if(r.r(i),
/******/Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(i,s,function(e){return t[e]}.bind(null,s));
/******/return i;
/******/},
/******/
/******/ // getDefaultExport function for compatibility with non-harmony modules
/******/r.n=function(t){
/******/var e=t&&t.__esModule?
/******/function(){return t.default}:
/******/function(){return t};
/******/
/******/return r.d(e,"a",e),e;
/******/},
/******/
/******/ // Object.prototype.hasOwnProperty.call
/******/r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},
/******/
/******/ // __webpack_public_path__
/******/r.p="",r(r.s=0);
/******/}
/************************************************************************/
/******/([
/* 0 */
/***/function(t,e,r){function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function n(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],i=!0,s=!1,n=void 0;try{for(var a,o=t[Symbol.iterator]();!(i=(a=o.next()).done)&&(r.push(a.value),!e||r.length!==e);i=!0);}catch(t){s=!0,n=t}finally{try{i||null==o.return||o.return()}finally{if(s)throw n}}return r}}(t,e)||u(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=u(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var i=0,s=function(){};return{s,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,a=!0,o=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return a=t.done,t},e:function(t){o=!0,n=t},f:function(){try{a||null==r.return||r.return()}finally{if(o)throw n}}}}function u(t,e){if(t){if("string"==typeof t)return h(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(t,e):void 0}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,i=new Array(e);r<e;r++)i[r]=t[r];return i}function l(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function d(t,e){for(var r=0;r<e.length;r++){var i=e[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function p(t,e,r){return e&&d(t.prototype,e),r&&d(t,r),t}function f(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");var r,i;t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&(r=t,i=e,(Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(r,i))}function b(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,i=y(t);if(e){var s=y(this).constructor;r=Reflect.construct(i,arguments,s)}else r=i.apply(this,arguments);return g(this,r)}}function g(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}e.PocketModule=function(){
// const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE
var t=r(1),e=t.objectSize,i=t.log,s=t.onerror,u=t.warn,h=t.isArray,d=t.isObject,g=t.isPromise,y=t.validID,m=t.isString,_=r(7),v=r(9)(),k=r(11).Probe,j=function(t){f(r,t);var e=b(r);function r(t,i){return l(this,r),e.call(this,t,i)}
/**
     * ### $removeProject
     * - removes all Probes and references relating to `projectID`
     * @param {*} projectID 
     */return p(r,[{key:"$removeProject",value:function(t){return t=m(t)?t:"",t=this.lastProjectID(t),// also updates last selector reference
this.deletePocketSet(t),this}
/**
       * - you can also use it on concurent payloads to existing `projectID`, once initial project is created overy other call will update each Probe{}.data/status, based on payloadData
       * @param {*} data `required`
       * @param {*} async `override current opts.sync for this payload`
       * @param {*} type optional, new/update, `update`: if we call on an existing project we can update `data/status properties` of all assigned tasks at once
       * 
       * - `initialize new payload, for as many tasks`
       * - `sets a multi task with instructions:`
       * - `data = {
              id: '', // 1 id for all tasks
              tasks: [{ taskName: '', data: '', campaign: '' }]
          }`
         * - `call distributor and setDefer`
       * @extends payload
       */},{key:"$payload",value:function(t,e,r){var i=this,n=function(t){return i.d=t,i},a=void 0!==e?e:this.async;// override if set
return a&&g(t)?n(t.then((function(t){return i.payload(t,!1,r)}),(function(t){return t}))):a||g(t)?(this.debug&&s("[payload] with opts.async=true, data must be a promise, or do not set async when not a promise"),n(!!a&&Promise.reject())):n(this.payload(t,!1,r))}
/**
       * ### $project
       * - `an alias on $payload(...), can use either`
       * - refer to `$payload` for specifications :)
       * @extends $payload
       */},{key:"$project",value:function(){return this.$payload.apply(this,arguments)}
/**
        * - resolves currently active `$payload(...)`
        * - `after completion of Pocket, instance data for all Probes is deleted`
        * - can be called even before project was declared thanks to callback dispather `$projectSetAsync()`
        * @param {*} payloadID ,required
        * @param allowsMultiple optional, when set to true will allow multiple calls to resolved data
        * @extends ready
        */},{key:"$ready",value:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];try{var i=function(t){return e.d=t,e.d&&!r&&e.d.catch(u),e},n=this.lastProjectID(t,!1,null);// sofl validation for non existant `payloadID` if called before declaration of a project
// grab last assigned id incase provided none
// in case it was called the second time, when already resolved!
if(!t&&n&&(t=n),"complete"===this.projectsCache[t]&&!r)return i(Promise.reject("[$ready] project: ".concat(t," already complete")));if(void 0!==this._ready_method_set[t]&&!r){if(!0===this._ready_method_set[t])return i(Promise.reject("[$ready] project: ".concat(t," already complete, cannot recall same $ready")));if(!1===this._ready_method_set[t])return i(Promise.reject("[$ready] project: ".concat(t," you already declared $ready somewhere else, this call is ignored")))}if(!n)throw"payloadID must be set";// we wrap it if on ready project so it allows declaring `${$ready()}` even before $project was created, cool ha!
var a=this.$projectSetAsync(n).then((function(t){var r=t.projectID;return e.ready(r).then((function(t){
// NOTE to help problems with loops and using chaining with last selector
// will gradualy delete project with specified timeout
return e.deleteWithDelay?setTimeout((function(){e.deletePocketSet(r)}),e.deleteWithDelay):e.deletePocketSet(r),e.projectsCache[r]="complete",e._ready_method_set[n]=!0,t}),Promise.reject)}),Promise.reject);return this._ready_method_set[n]=!1,i(a)}catch(t){this.disableWarnings||s(t)}}}]),r}(function(t){f(g,t);var r=b(g);function g(t,e){var s;return l(this,g),(s=r.call(this,t,e)).dispatcher&&s.dispatcher.initListener().subscribe((function(t,e){var r=t||{},n=r.probe,a=r.status;"error"===a&&s.debug&&i("[dispatcher] probe id:".concat(n.id," error")),"open"===a&&s.debug&&i("[dispatcher] probe id:".concat(n.id," created")),"complete"===a&&s.debug&&i("[dispatcher] probe id:".concat(n.id," completed"))})),s}// ───────────────────────────────────────────────────────────────────────────────────────
//   :::::: U S E R   A P P L I C A T I O N   C A L L I N G   M E T H O D S : :  :   :    : 
// ───────────────────────────────────────────────────────────────────────────────────────

/**
     * @memberof $payload
     */return p(g,[{key:"payload",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"new";this.d=null;var i=null;// validate payload format
if(!d(e))return!1;var n=Object.keys(e);// must match all keys
if(n.every((function(t){return-1===["id","tasks"].indexOf(t)})))return this.debug&&s("[$payload] id and tasks are required"),!1;if(!h(e.tasks))return this.debug&&s("[$payload] data.tasks must be an array"),!1;if(e.id=this.validProjectID(e.id),!e.id)return this.debug&&s("[$payload] data.id invalid"),!1;if(this.payloadData[e.id]&&(!r||"new"===r))// if (this.debug) warn(`[$payload] this payload.id already exists`)
return this._lastProjectID=e.id,!0;var a=void 0===this.payloadData[e.id];// because there is no data set as of yet
// NOTE on update/new of project we need to reset $filter values, in case 
(this._lastFilterList[e.id]||[]).length&&(this._lastFilterList[e.id]=[]);// NOTE validate our pocket values before generating each `new Probe()`
var o,l=c(e.tasks.values());try{var p=function(){var s=o.value;if(!s.task)return t.debug&&u("[$payload] task must be set for your tasks"),"continue";// validate task 
if(!t.idRegexValid(s.task)||-1!==s.task.indexOf("::"))return t.debug&&u("[$payload] invalid taskName, failed idRegexValid validation"),"continue";var n="".concat(e.id,"::").concat(s.task);return"update"===r&&!a&&t.pocket[n]?(s.data&&(t.pocket[n].data=s.data),s.status&&(t.pocket[n].status=s.status),// NOTE in case we update status in case it wasnt provided but new data was assigned
// status should only be changed after data is set
!s.status&&s.data&&"open"===t.pocket[n].status&&(t.pocket[n].status="updated"),s.ref&&(t.pocket[n].ref=s.ref),s.error&&(t.pocket[n].error=s.error),s.campaign&&(t.pocket[n].campaign=s.campaign),i=!0,t._lastProjectID=e.id,"continue"):(t.payloadData[e.id]||(t.payloadData[e.id]={value:[],status:"open",timestamp:(new Date).getTime()}),t.payloadData[e.id].value.filter((function(t){return-1!==t.task.indexOf(s.task)})).length?(t.debug&&!t.disableWarnings&&u('the same task "'.concat(s.task,'" already exists on the payload, you must choose uniq')),"continue"):(t.payloadData[e.id].value.push(s),void(t.lastPocketTimestamp=t.payloadData[e.id].timestamp)))};for(l.s();!(o=l.n()).done;)p();// only when updating existance of Probe{}
}catch(t){l.e(t)}finally{l.f()}return"update"===r&&this.payloadData[e.id]&&!a?(this.projectsCache[e.id]="open",i):!!this.payloadData[e.id]&&(this.lastProjectID(e.id),this.projectsCache[e.id]="open",// means created project
this.distributor().setDefer(e.id),// NOTE required in order for $projectSetAsync to retrun callback to resolve our promise
this.projectSetDispatcher(e.id).initListener().next({projectID:e.id}),!0)}
/**
       * ### $projectSetAsync
       * - usage: to call before `$project()/$payload()/$architect` were called
       * - for example you have loaded same `Pocket` instance in another part of your code, now checking for it  in future before $project created. This method can `await $projectSetAsync(projectID)` and continue with already set `$project(...).$get(..).$update(..)` etc
       * @param {*} projectID required, this is your `$project/$payload` id
       */},{key:"$projectSetAsync",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=this;return t=this.lastProjectID(t,!1,null),this._projectSetAsync[t]||(
/**
         * will subscribe when called the first time and set our simple promise then resolve once the `$payload` is succesfull
         */
this._projectSetAsync[t]=_(),this.projectSetDispatcher(t).initListener().subscribe((function(t,r){e._projectSetAsync[r].resolve(t),this.del()}))),this._projectSetAsync[t].promise()}
/**
       * @memberof probeStatusAsync
       */},{key:"probeStatusAsync",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=function(e){return t.d=e,t};return r((e=this.lastProbeID(e))?this.pocket[e].getStatusAsync:null)}
/**
       * @memberof $update
       */},{key:"update",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return this._setUpdate(t,e,r,"update")}
/**
       * @memberof $set
       */},{key:"_set",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return this._setUpdate(t,null,e,"set")}
/**
       * - declated via $get
       * @memberof $get
       */},{key:"_get",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=function(e){return t.d=e,r?t:t.d};return this.d=null,i((e=this.lastProbeID(e))?this.pocket[e]:null)}
/**
       * ### $activeTasks
       * - list any active tasks for assigned Probes
       * @param {*} payloadID optional, when set will only filter thru given job id (NOT Probe{} ID!)
       */},{key:"$activeTasks",value:function(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",i=function(e){return t.d=e,t};if(r=this.lastProjectID(r),!e(this.pocket))return i([]);var s=Object.entries(this.pocket).reduce((function(e,i){var s=o(i,2),n=s[0],a=s[1];return 0===n.indexOf(r||"")&&r&&t.payloadData[r]?e.push(a.task):r||e.push(a.task),e}),[]);return i(s)}
/**
       * @memberof $ready
       */},{key:"ready",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(this.d=null,!this._ready[t])throw"ready[payloadID] is not set, maybe you called it before $payload()";return this._ready[t].promise()}
// ──────────────────────────────────────────────────────
//   :::::: E N D : :  :   :    :     :        :          
// ──────────────────────────────────────────────────────  
// extends  `$update` and `$set`
},{key:"_setUpdate",value:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"update",c=function(t){return e.d=t,e},h=this.lastProbeID(i);if(!h)return this.debug&&s("[$update] must specify id"),c(!1);if(!d(t))return this.debug&&u("[$update] dataFrom must be an Object"),c(!1);if(!this.pocket[h])return this.debug&&s("[$update] this.pocket with id:".concat(h," not found")),c(!1);var l=!1;this._lastProjectID=h,// reorder dataFrom, make sure if `status` exists, it is shifted to last position, so the Probe{} doent change state before other values got chance to do so, nice!
// we need to convert dataFrom{} to dataFrom[]>array to achieve this
t=Object.entries(t).reduce((function(t,r){var i=o(r,2),s=i[0],n=i[1],c=e.probeProps.indexOf(s);// new order
return e.probeProps[c]===s&&t.push({inx:c,data:a({},s,n)}),t}),[]);for(var p=0;p<t.length;p++)if(void 0!==(t[p]||{}).data){var f=o(Object.entries(t[p].data)[0],2),b=f[0],g=f[1];void 0===this.pocket[h][b]?this.debug&&u("[$update] not a valid prop/value: { ".concat(b,":").concat(this.pocket[h][b]," }")):("data"===b&&(this.pocket[h][b]=!0===r?Object.assign({},this.pocket[h][b],g):g),"status"!==b&&"ref"!==b&&"error"!==b&&"campaign"!==b||(this.pocket[h][b]=g),l=!0)}// when setting new data, using `$set()` we should clear any cached Probes and realated data
// if(updated && type==='update') { }
return l&&"set"===n&&(this.clearStoreTransfers(h),this.$transfer_lastID===h&&(this.$transfer_lastID=""),this._$cached_data[h]&&delete this._$cached_data[h]),c(l)}
/**
       * - sets defer for `$ready()` initially after calling payload 
       * @param {*} id required
       */},{key:"setDefer",value:function(t){var r=this;if(!(t=y(t)))throw"id must be set";if(this._ready[t]||(this._ready[t]=_()),!e(this.pocket)){var i="[setDefer] probe is empty, so nothing set, id:".concat(t);return this.debug&&s(i),this._ready[t].reject(i),null}var n=Object.values(this.pocket).filter((function(e){return-1!==e.id.indexOf(t)}));if(!n.length){var a="[setDefer] no pocketSet found for id:".concat(t," ");return this.debug&&s(a),this._ready[t].reject(a),null}try{
/**
           * IMPORTANT:
           * when our pocketSet for each this.pocket[id] is marked 'complete'
           * `Probe().resolve(...)` is called, and Promise.all is waiting for `pocketSet` to complete
           */
return Promise.all(n.map((function(t){return t.sq.promise()}))).then((function(e){var i=e.map((function(t){return function(t){var e={};if(!d(t))return null;for(var i=0;i<r.probeProps.length;i++){var s=r.probeProps[i];void 0!==t[s]&&null!==t[s]&&(e[s]=t[s])}return e}(t.probe)})).filter((function(t){return!!t}));r._ready[t].resolve(i)}),(function(t){
// should unlikely happen since we dont have any rejects set
s("[setDefer] Promise.all",t)})),!0}catch(t){s("[setDefer]",t)}return!1}
/**
       * - distribute payloadData, each to `new Probe()`
       */},{key:"distributor",value:function(){for(var t=0,e=Object.entries(this.payloadData);t<e.length;t++){var r=o(e[t],2),i=r[0],a=r[1];if(!(this.lastPocketTimestamp>a.timestamp)&&"complete"!==a.status&&"send"!==a.status&&"error"!==a.status)// no new entries
// omit done
{var u,h=c(a.value.values());try{for(h.s();!(u=h.n()).done;){var l=n({id:i},u.value);this.setProbe(l)||s("probe for id:".concat(i," already exists"))}}catch(t){h.e(t)}finally{h.f()}}}return this}
/**
       * - every new probe `id` must be: format `id:::taskName`
       * required: `{id,task}`
       * optional: `{campaign}`
       * @param {*} opts
       */},{key:"setProbe",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!t.id||!t.task)throw"id and task both must be set";if(!y(t.id))throw"opts.id not valid";var e="".concat(t.id,"::").concat(t.task);if(this.pocket[e])return this.debug&&i("[setProbe] probe: ".concat(e," already set")),null;try{t.id=e;var r=null!==this.dispatcher?this._emit.bind(this):null,n=new this.Probe(t,{disableWarnings:this.disableWarnings,
// disable some less relevant warning messages
onChange:this._onChange,emitter:r,completeOnNull:this.completeOnNull},this.debug);this.pocket[e]=n}catch(t){return s(t),null}return this.pocket[e]}
/**
       * set new probe model
       * - every new task has a set of requirements. Once status is `complete` and data available, probe sends a dispatch with probe information `(if opts.dispatcher===true)`.
       * methods:`{get,all}` props: `{id,data,task,status,campaign}`
       * 
       *  @param {*} opts.id required
       *  @param {*} opts.task required
       *  @param {*} opts.campaign optional
       * 
       * - `Probe` is resolved once `sq.resolve()` is called, sq => `Simple Q` our plugin
       * @memberof Probe.js module
       */},{key:"_emit",
/**
       * - emit extends with `Dispatcher` to be used by every new Probe{} as an emitter `(if opts.dispatcher===true)`
       * @param {*} obj required
       */
value:function(t){if(!t)return null;if(!this.dispatcher)return null;try{return this.dispatcher.initListener().next(t),!0}catch(t){return s("[_emit] dispatcher did not emit"),null}}
/**
       * - delete completed `pocketSet`
       */},{key:"deletePocketSet",value:function(t){if(t){if(Object.values(this.pocket).length)for(var e=0,r=Object.values(this.pocket);e<r.length;e++){var i=r[e];this._$cached_data[i.id]&&delete this._$cached_data[i.id],i.id.includes(t)&&delete this.pocket[i.id]}this.payloadData[t]&&delete this.payloadData[t],this._ready[t]&&delete this._ready[t],// these  two are together
void 0!==this._projectSetDispatcher[t]&&delete this._projectSetDispatcher[t],this._projectSetAsync[t]&&delete this._projectSetAsync[t],this._lastFilterList[t]&&delete this._lastFilterList[t];// from PocketArchitect dynamicly assigned
try{this.architectConfig[t]&&delete this.architectConfig[t]}catch(t){}// blah
// empty self
this.clearStoreTransfers(t)}}},{key:"Probe",get:function(){return k()}}]),g}(v)),D=r(12)(j);return r(13)(D)}},
/* 1 */
/***/function(t,e,r){
/* eslint-disable no-proto */
// node.js/browser detection
/**
 * @Utils
 * my own lodash/like `Utils`
 */
e.objectSize=t=>t&&Object.prototype===t.__proto__?Object.entries(t).length:0,e.last=t=>t&&Array.prototype===t.__proto__?t[t.length-1]:null,e.copyBy=(t,e)=>e.reduce((e,r,i)=>(void 0!==t[r]&&(e[r]=t[r]),e),{}),e.validID=t=>t?(t||"").toString().toLowerCase():null,e.isNumber=t=>void 0!==t&&t.__proto__===Number.prototype,e.isPromise=t=>Promise.prototype===(t||{}).__proto__,e.uniq=t=>t.filter((t,e,r)=>r.indexOf(t)===e),e.isObject=t=>!!t&&(Object.prototype===t.__proto__||t instanceof Object),e.isArray=t=>!!t&&Array.prototype===t.__proto__,e.isString=t=>!!t&&String.prototype===t.__proto__,e.isFunction=t=>"function"==typeof t,e.copy=t=>{if(!t)return t;try{return JSON.parse(JSON.stringify(t))}catch(t){return t.toString()}}
/**
* - accepting object of messages, example: `{'001':['my message',001],...}`
* - returns : {'001':{message,code},...}
*/,e.errorMessages=t=>{const e={};for(let[r,i]of Object.entries(t))e[r]={message:i[0],code:r};return e};{
// when executing normally with node
const t=r(2),i=r(6);e.log=function(...e){e=(e=[].concat("[Pocket]",e)).map(e=>t.inspect(e,!1,3,!0)),console.log.apply(null,e)},e.warn=function(...e){e=(e=[].concat("[warning]",e)).map(e=>i.cyan(t.inspect(e,!1,2,!1),!0)),console.warn.apply(null,e)},e.onerror=function(...e){e=(e=[].concat("[error]",e)).map(e=>i.red(t.inspect(e,!1,2,!1),!0)),console.log("  "),console.error.apply(null,e),console.log("  ")}}
/***/},
/* 2 */
/***/function(t,e,r){
/* WEBPACK VAR INJECTION */(function(t){// Copyright Joyent, Inc. and other Node contributors.
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var i=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),r={},i=0;i<e.length;i++)r[e[i]]=Object.getOwnPropertyDescriptor(t,e[i]);return r},s=/%[sdj%]/g;e.format=function(t){if(!y(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(o(arguments[r]));return e.join(" ")}r=1;for(var i=arguments,n=i.length,a=String(t).replace(s,(function(t){if("%%"===t)return"%";if(r>=n)return t;switch(t){case"%s":return String(i[r++]);case"%d":return Number(i[r++]);case"%j":try{return JSON.stringify(i[r++])}catch(t){return"[Circular]"}default:return t}})),c=i[r];r<n;c=i[++r])b(c)||!v(c)?a+=" "+c:a+=" "+o(c);return a},
// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
e.deprecate=function(r,i){if(void 0!==t&&!0===t.noDeprecation)return r;
// Allow for deprecating things in the process of starting up.
if(void 0===t)return function(){return e.deprecate(r,i).apply(this,arguments)};var s=!1;return function(){if(!s){if(t.throwDeprecation)throw new Error(i);t.traceDeprecation?console.trace(i):console.error(i),s=!0}return r.apply(this,arguments)}};var n,a={};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function o(t,r){
// default options
var i={seen:[],stylize:u};
// legacy...
return arguments.length>=3&&(i.depth=arguments[2]),arguments.length>=4&&(i.colors=arguments[3]),f(r)?
// legacy...
i.showHidden=r:r&&
// got an "options" object
e._extend(i,r),
// set default options
m(i.showHidden)&&(i.showHidden=!1),m(i.depth)&&(i.depth=2),m(i.colors)&&(i.colors=!1),m(i.customInspect)&&(i.customInspect=!0),i.colors&&(i.stylize=c),h(i,t,i.depth)}function c(t,e){var r=o.styles[e];return r?"["+o.colors[r][0]+"m"+t+"["+o.colors[r][1]+"m":t}function u(t,e){return t}function h(t,r,i){
// Provide a hook for user-specified inspect functions.
// Check that value is an object with an inspect function on it
if(t.customInspect&&r&&D(r.inspect)&&
// Filter out the util module, it's inspect function is special
r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var s=r.inspect(i,t);return y(s)||(s=h(t,s,i)),s}
// Primitive types cannot have properties
var n=function(t,e){if(m(e))return t.stylize("undefined","undefined");if(y(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}return g(e)?t.stylize(""+e,"number"):f(e)?t.stylize(""+e,"boolean"):
// For some reason typeof null is "object", so special case here.
b(e)?t.stylize("null","null"):void 0}(t,r);if(n)return n;
// Look up the keys of the object.
var a=Object.keys(r),o=function(t){var e={};return t.forEach((function(t,r){e[t]=!0})),e}(a);
// IE doesn't make error fields non-enumerable
// http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
if(t.showHidden&&(a=Object.getOwnPropertyNames(r)),j(r)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return l(r);
// Some type of object without properties can be shortcutted.
if(0===a.length){if(D(r)){var c=r.name?": "+r.name:"";return t.stylize("[Function"+c+"]","special")}if(_(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(k(r))return t.stylize(Date.prototype.toString.call(r),"date");if(j(r))return l(r)}var u,v="",P=!1,O=["{","}"];
// Make Array say that they are Array
return p(r)&&(P=!0,O=["[","]"]),
// Make functions say that they are functions
D(r)&&(v=" [Function"+(r.name?": "+r.name:"")+"]"),
// Make RegExps say that they are RegExps
_(r)&&(v=" "+RegExp.prototype.toString.call(r)),
// Make dates with properties first say the date
k(r)&&(v=" "+Date.prototype.toUTCString.call(r)),
// Make error with message first say the error
j(r)&&(v=" "+l(r)),0!==a.length||P&&0!=r.length?i<0?_(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),u=P?function(t,e,r,i,s){for(var n=[],a=0,o=e.length;a<o;++a)I(e,String(a))?n.push(d(t,e,r,i,String(a),!0)):n.push("");return s.forEach((function(s){s.match(/^\d+$/)||n.push(d(t,e,r,i,s,!0))})),n}(t,r,i,o,a):a.map((function(e){return d(t,r,i,o,e,P)})),t.seen.pop(),function(t,e,r){return t.reduce((function(t,e){return e.indexOf("\n"),t+e.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60?r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1]:r[0]+e+" "+t.join(", ")+" "+r[1]}
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
(u,v,O)):O[0]+v+O[1]}function l(t){return"["+Error.prototype.toString.call(t)+"]"}function d(t,e,r,i,s,n){var a,o,c;if((c=Object.getOwnPropertyDescriptor(e,s)||{value:e[s]}).get?o=c.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):c.set&&(o=t.stylize("[Setter]","special")),I(i,s)||(a="["+s+"]"),o||(t.seen.indexOf(c.value)<0?(o=b(r)?h(t,c.value,null):h(t,c.value,r-1)).indexOf("\n")>-1&&(o=n?o.split("\n").map((function(t){return"  "+t})).join("\n").substr(2):"\n"+o.split("\n").map((function(t){return"   "+t})).join("\n")):o=t.stylize("[Circular]","special")),m(a)){if(n&&s.match(/^\d+$/))return o;(a=JSON.stringify(""+s)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=t.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=t.stylize(a,"string"))}return a+": "+o}function p(t){return Array.isArray(t)}function f(t){return"boolean"==typeof t}function b(t){return null===t}function g(t){return"number"==typeof t}function y(t){return"string"==typeof t}function m(t){return void 0===t}function _(t){return v(t)&&"[object RegExp]"===P(t)}function v(t){return"object"==typeof t&&null!==t}function k(t){return v(t)&&"[object Date]"===P(t)}function j(t){return v(t)&&("[object Error]"===P(t)||t instanceof Error)}function D(t){return"function"==typeof t}function P(t){return Object.prototype.toString.call(t)}function O(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(r){if(m(n)&&(n=t.env.NODE_DEBUG||""),r=r.toUpperCase(),!a[r])if(new RegExp("\\b"+r+"\\b","i").test(n)){var i=t.pid;a[r]=function(){var t=e.format.apply(e,arguments);console.error("%s %d: %s",r,i,t)}}else a[r]=function(){};return a[r]},e.inspect=o,
// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
o.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},
// Don't use 'blue' not visible on cmd.exe
o.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",
// "name": intentionally not styling
regexp:"red"},e.isArray=p,e.isBoolean=f,e.isNull=b,e.isNullOrUndefined=function(t){return null==t},e.isNumber=g,e.isString=y,e.isSymbol=function(t){return"symbol"==typeof t},e.isUndefined=m,e.isRegExp=_,e.isObject=v,e.isDate=k,e.isError=j,e.isFunction=D,e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||// ES6 symbol
void 0===t},e.isBuffer=r(4);var w=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// 26 Feb 16:19:34
function S(){var t=new Date,e=[O(t.getHours()),O(t.getMinutes()),O(t.getSeconds())].join(":");return[t.getDate(),w[t.getMonth()],e].join(" ")}
// log is just a thin wrapper to console.log that prepends a timestamp
function I(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){console.log("%s - %s",S(),e.format.apply(e,arguments))},
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
e.inherits=r(5),e._extend=function(t,e){
// Don't do anything if add isn't an object
if(!e||!v(e))return t;for(var r=Object.keys(e),i=r.length;i--;)t[r[i]]=e[r[i]];return t};var $="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function x(t,e){
// `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
// Because `null` is a special error value in callbacks which means "no error
// occurred", we error-wrap so the callback consumer can distinguish between
// "the promise rejected with null" or "the promise fulfilled with undefined".
if(!t){var r=new Error("Promise was rejected with a falsy value");r.reason=t,t=r}return e(t)}e.promisify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');if($&&t[$]){var e;if("function"!=typeof(e=t[$]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,$,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var e,r,i=new Promise((function(t,i){e=t,r=i})),s=[],n=0;n<arguments.length;n++)s.push(arguments[n]);s.push((function(t,i){t?r(t):e(i)}));try{t.apply(this,s)}catch(t){r(t)}return i}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),$&&Object.defineProperty(e,$,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,i(t))},e.promisify.custom=$,e.callbackify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');
// We DO NOT return the promise as it gives the user a false sense that
// the promise is actually somehow related to the callback's execution
// and that the callback throwing will reject the promise.
function r(){for(var r=[],i=0;i<arguments.length;i++)r.push(arguments[i]);var s=r.pop();if("function"!=typeof s)throw new TypeError("The last argument must be of type Function");var n=this,a=function(){return s.apply(n,arguments)};
// In true node style we process the callback on `nextTick` with all the
// implications (stack, `uncaughtException`, `async_hooks`)
e.apply(this,r).then((function(e){t.nextTick(a,null,e)}),(function(e){t.nextTick(x,e,a)}))}return Object.setPrototypeOf(r,Object.getPrototypeOf(e)),Object.defineProperties(r,i(e)),r}}).call(this,r(3))
/***/},
/* 3 */
/***/function(t,e){
// shim for using process in browser
var r,i,s=t.exports={};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
function n(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function o(t){if(r===setTimeout)
//normal enviroments in sane situations
return setTimeout(t,0);
// if setTimeout wasn't available but was latter defined
if((r===n||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{
// when when somebody has screwed with setTimeout but no I.E. maddness
return r(t,0)}catch(e){try{
// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return r.call(null,t,0)}catch(e){
// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:n}catch(t){r=n}try{i="function"==typeof clearTimeout?clearTimeout:a}catch(t){i=a}}();var c,u=[],h=!1,l=-1;function d(){h&&c&&(h=!1,c.length?u=c.concat(u):l=-1,u.length&&p())}function p(){if(!h){var t=o(d);h=!0;for(var e=u.length;e;){for(c=u,u=[];++l<e;)c&&c[l].run();l=-1,e=u.length}c=null,h=!1,function(t){if(i===clearTimeout)
//normal enviroments in sane situations
return clearTimeout(t);
// if clearTimeout wasn't available but was latter defined
if((i===a||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{
// when when somebody has screwed with setTimeout but no I.E. maddness
i(t)}catch(e){try{
// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return i.call(null,t)}catch(e){
// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return i.call(this,t)}}}(t)}}
// v8 likes predictible objects
function f(t,e){this.fun=t,this.array=e}function b(){}s.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];u.push(new f(t,e)),1!==u.length||h||o(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",// empty string to avoid regexp issues
s.versions={},s.on=b,s.addListener=b,s.once=b,s.off=b,s.removeListener=b,s.removeAllListeners=b,s.emit=b,s.prependListener=b,s.prependOnceListener=b,s.listeners=function(t){return[]},s.binding=function(t){throw new Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(t){throw new Error("process.chdir is not supported")},s.umask=function(){return 0}},
/* 4 */
/***/function(t,e){t.exports=function(t){return t&&"object"==typeof t&&"function"==typeof t.copy&&"function"==typeof t.fill&&"function"==typeof t.readUInt8}
/***/},
/* 5 */
/***/function(t,e){"function"==typeof Object.create?
// implementation from standard node.js 'util' module
t.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:
// old school shim for old browsers
t.exports=function(t,e){t.super_=e;var r=function(){};r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t}
/***/},
/* 6 */
/***/function(t,e){var r=e.bash_codes={BLACK:{text:"[0;30m",underline:"[4;30m",background:"[40m",bold:"[1;30m",hi_text:"[0;90m",hi_bold:"[1;90m",hi_background:"[0;100m"},RED:{text:"[0;31m",bold:"[1;31m",underline:"[4;31m",background:"[41m",hi_text:"[0;91m",hi_bold:"[1;91m",hi_background:"[0;101m"},GREEN:{text:"[0;32m",bold:"[1;32m",underline:"[4;32m",background:"[42m",hi_text:"[0;92m",hi_bold:"[1;92m",hi_background:"[0;102m"},YELLOW:{text:"[0;33m",bold:"[1;33m",underline:"[4;33m",background:"[43m",hi_text:"[0;93m",hi_bold:"[1;93m",hi_background:"[0;103m"},BLUE:{text:"[0;34m",bold:"[1;34m",underline:"[4;34m",background:"[44m",hi_text:"[0;94m",hi_bold:"[1;94m",hi_background:"[0;104m"},PURPLE:{text:"[0;35m",bold:"[1;35m",underline:"[4;35m",background:"[45m",hi_text:"[0;95m",hi_bold:"[1;95m",hi_background:"[0;105m"},CYAN:{text:"[0;36m",bold:"[1;36m",underline:"[4;36m",background:"[46m",hi_text:"[0;96m",hi_bold:"[1;96m",hi_background:"[0;106m"},WHITE:{text:"[0;37m",bold:"[1;37m",underline:"[4;37m",background:"[47m",hi_text:"[0;97m",hi_bold:"[1;97m",hi_background:"[0;107m"}};e.colors={BLACK:"BLACK",RED:"RED",GREEN:"GREEN",YELLOW:"YELLOW",BLUE:"BLUE",PURPLE:"PURPLE",CYAN:"CYAN",WHITE:"WHITE"};var i=e.styles={bold:"bold",underline:"underline",background:"background",hi_text:"hi_text",hi_bold:"hi_bold",hi_background:"hi_background"},s=e.REMOVE_COLOR="[0m";function n(t,e,r){return a(r?e.hi_text:e.text,t)}function a(t,e){return t+e+s}
/***/
// various logical inconsistencies in the code below - renderColor and wrap seem like they should be combined, but I'm letting wrap basically stand on its own
// in case anyone wants access to explicitly handle background or underline stuff. I feel like those are a bit more special-casey, and generally speakign
// users are going to want to quickly turn a word or phrase into a single color without worrying about background or underline. So the .colorName methods
// are just syntactic sugar.
e.wrap=function(t,e,s){return a(r[e.toUpperCase()][i[s]||"text"],t)},e.black=function(t,e){return n(t,r.BLACK,e)},e.red=function(t,e){return n(t,r.RED,e)},e.green=function(t,e){return n(t,r.GREEN,e)},e.yellow=function(t,e){return n(t,r.YELLOW,e)},e.blue=function(t,e){return n(t,r.BLUE,e)},e.purple=function(t,e){return n(t,r.PURPLE,e)},e.cyan=function(t,e){return n(t,r.CYAN,e)},e.white=function(t,e){return n(t,r.WHITE,e)}},
/* 7 */
/***/function(t,e,r){t.exports=r(8)
/***/},
/* 8 */
/***/function(t,e){t.exports=
/**
 * SimpleQ
 * Developer: Eaglex ( http://eaglex.net ) 
 * License: CC BY-SA ( https://creativecommons.org/licenses/by/4.0/legalcode )
 * - Simple Promise defer
 */
function(){return new function(){const t={};let e=null;const r=new Promise((e,r)=>{t.resolve=e,t.reject=r});this.resolve=(r=null)=>(e||(// already set
t.resolve(r),e=!0),this),this.reject=(r=null)=>(e||(// already set
t.reject(r),e=!0),this),this.promise=()=>r}}
/***/},
/* 9 */
/***/function(t,e,r){
/**
 * ### PocketLibs
 * - Top of the stack class of `PocketModule`, all `opt` initial `properties` are set here
 */
t.exports=()=>{const{objectSize:t,warn:e,onerror:i,validID:s,copy:n,log:a,isString:o}=r(1);return class{
/**
         * @param {*} opts.async, when set, allow $payload(`data`) to be async object
         * @param {*} opts.dispatcher, when set to true, loads external library `Dispatcher`
         * @param {*} debug optional
         */
constructor(t={},e){this.debug=e||!1,this.async=(t||{}).async||null,this._onChange=(t||{}).onChange||null,// loads watch for changes Probe asset 
this.completeOnNull=(t||{}).completeOnNull||null,// Allow Probe to complete even if data is null
this.disableWarnings=(t||{}).disableWarnings,// disable some less relevant warning messages
// when set enables dispatcher to communicate directly with `probe.js`
this.dispatcher=(t||{}).dispatcher?r(10)():null,this.pocket={},// example this.pocket[`abc::taskName`] returns Probe{} Instance
this.payloadData={},// each payload by id
this.lastPocketTimestamp=0,this._lastProjectID=null,// last cached reference
this._lastProbeID=null,// last cached reference
this._$cached_data={/** id:{} */},// stores last captured data when calling `$data(..)`
this.$transfer_lastID="",// set when we call `$transfer()` and reset after `$to()`
this._ready={},// collect all ready example: `{id:Promise}`
this._ready_method_set={/** [id]:true */},// ignore subsequent calls to $ready method 
this.d=void 0,// NOTE user reference data, carefull when using selectors from previous target, always access last
this._projectSet={/** projectID:promise */},this._transferCached=[],this._projectSetDispatcher={/** id:dispatcher */},this._projectSetAsync={/** id:SQ */},// collect all $projectSetAsync promisses
this._lastFilterList={/** id:[probe references only] */},this.projectsCache={/** [id]:'open/complete' */},// keep reference of completed projects, this variable is never purged
this.deleteWithDelay=(t||{}).deleteWithDelay||1e3}
// NOTE abolished functional class, doesnt work well with es6 class
// createArchitect() {
//     if (this.architect && !this["architect_set"]) {
//         try {
//             const Architect = require('./Pocket.architect')()
//             Architect.prototype = Object.create(this)
//             Architect.prototype.constructor = Architect             
//             Object.assign(this, new Architect())
//         } catch (err) {
//             console.log(`[createArchitect] error`, err)
//         }
//         this["architect_set"] = true
//     }
// }
/**
         * - return latest Probe by reference from `this._lastFilterList[projectID]`
         * @param {*} projectID 
         */
// getProbesByFilterRef(projectID) {
//     if (!projectID) return []
//     if (!this._lastFilterList[projectID]) return []
//     return this._lastFilterList[projectID].reduce((n, ref, inx) => {
//         if (ref.id && ref.isNONE === undefined && this.pocket[ref.id]) n.push(this.pocket[ref.id])
//         else if (this.pocket[ref.id]) n.push({ id: ref.id, isNONE: true })
//         return n
//     }, []).filter(z => !!z)
// }
/**
         * ### projectSetDispatcher
         * - create new dispather to act as a callback for setting new projects in future. NOTE once project is created and using $architect /$project/$payload to update will not recreate `projectSetDispatcher`
         * - works with `$projectSetAsync`
         * @param {*} projectID 
         */
projectSetDispatcher(t){return t?(this._projectSetDispatcher[t]||this._projectSetDispatcher[t]||(this._projectSetDispatcher[t]=r(10)(t)),this._projectSetDispatcher[t]):(this.debug&&i("[projectSetDispatcher] projectID must be set"),null)}
/**
         * @param {*} projectID
         * @returns array [Probe{},...] of selected project
         */projectProbeList(t){return t?Object.entries(this.pocket).filter(([e])=>0===e.indexOf(t)).map(([t,e])=>e):[]}
/**
         * ### clearStoreTransfers
         * - clear any pending transfers
         * @param {*} projectID required
         */clearStoreTransfers(t=""){if(!t)return;let e=!1;return this._transferCached.length&&this._transferCached.forEach((r,i)=>{const{fromProbeID:s}=r||{};s&&-1!==s.indexOf(t)&&(this._transferCached.splice(i,1),e=!0,this.debug&&a(`[clearStoreTransfers] transferCached for probeID: ${s} has been removed`))}),e}
/**
         * ### storeTransfers
         * - caches pending transfers when using `$transfer` with `$to()`
         * - access last data by timestamp
         * @param {*} fromProbeID  required
         * @param {*} data required
         */storeTransfers(t,e){return this._transferCached.push({timestamp:(new Date).getTime(),fromProbeID:t,data:e}),this._transferCached}
/**
         * ### accessLastValidTransfer
         * returns latest transfer that is inRange from `fromAverageTimeHasPast` in `ms` vs current Date.getTime
         * - removes _transferCached that was found 
         */accessLastValidTransfer(e=100){if(!this._transferCached.length)return{};this._transferCached.sort((t,e)=>t.timestamp-e.timestamp);const r=n(this._transferCached).reduce((t,r,i)=>{const{timestamp:s}=r,n=(new Date).getTime()+e;
// calculate max wait between transfers, so if we have timeout we can only wait as long as `fromAverageTimeHasPast` 
return n>s&&n-s-e<=e&&(t=r,
// delete found cache
this._transferCached.splice(i,1)),t},{});return t(r)?r:{}}
/**
         * ### selectByTask
         * - works with `PocketSelectors class`, when `::taskNames, taskName` are specified, extracts full probeID by matching previous pointer reference and updates `lastProbeID()`        
         * - returns valid probeID or null
         * @param {*} probeID {*} required, but optional
         */selectByTask(t="",r=null){if(t=o(t)?t:"",!this.idRegexValid(t)&&t)return null;if(t.indexOf(":")>0&&!this.pocket[t])return this.debug&&e("[selectByTask] when using '::' prefix selector, it should come at 0 index"),null;if(t.split(":").length>3||2===t.split(":").length)return this.debug&&e(`[selectByTask] wrong taskName :${t}, allowed prefix is '::taskName'`),null;// if a match we receive below updated `_lastProbeID` 
if(r&&this.lastProbeID(t,!0),this.pocket[t])return r&&this.lastProbeID(t),t;// we have a valid ref so use that
/**
             * - generate valid probeID `${projectID}::${probeTaskName}` //
             */const i=(t=>{const e=t.split("::")[1]||t;// in case we are using prefixed taskName, example "::cocacola"
return(this._lastProbeID||"").indexOf(e)>0&&e?this._lastProbeID:this._lastProjectID&&e?this._lastProjectID+"::"+e:this._lastProbeID})(t);return i?r&&this.lastProbeID(i):this.debug&&e("[selectByTask] newProbeID was not found from taskOrProbeID: "+t),i}
/**
         * ### lastProjectID
         * - every project is a job initiated by payload, so `payload.id === lastProjectID()`
         * @param type strictly validate against scoped projecjID
         */lastProjectID(t="",e=null,r="strict"){return!t&&this._lastProjectID&&(t=this._lastProjectID),t&&(t=this.validProjectID(t,e)),t&&this.payloadData[t]&&(this._lastProjectID=t),(this.payloadData[t]||"strict"!==r)&&t?(t&&!this._lastProjectID&&(this._lastProjectID=t),t):null}
/**
         * ### lastProbeID
         * - return last reference to probeID
         * - cache with `_lastProbeID`
         * @param {*} probeID 
         */lastProbeID(t="",e=null){return!t&&this._lastProbeID&&(t=this._lastProbeID),t&&(t=this.validProbe(t,e)),t&&this.pocket[t]&&(this._lastProbeID=t),t&&this.pocket[t]?t:null}
/**
         * ### validProjectID
         * - `test if projectID is valid`
         * - return valid id
         * @param {*} id required
         */validProjectID(t,e=null){return(t=s(t))?(t||"").split(" ").length>1?null:this.idRegexValid(t)?t:null:null}
/**
         * ### validProbe
         * - returns a valid probe
         * @param {*} probeID required
         */validProbe(t,e=null){return(t=s(t))?this.idRegexValid(t)?-1===t.indexOf("::")?null:t:void 0:null}
/**
         * ### dataPropSelector
         * - works with `$data()` and `$cached()` user selectors 
         * - refer to `PocketSelectors` module
         * @param {*} probeID required
         * @param {*} dataProp optional
         * @param {*} self optional
         * @param {*} probeData{} required our referencing probeData{}
         */dataPropSelector(r="data()",i="",s={},n=!1,a={}){let o
/**
             * NOTE if calling via `$cached()`,  `probeData` already comes as `this._$cached_data` so dont need to cache  it again!
             */;try{
/**
                  * NOTE IMPORTANT
                  * assembly order: `dataProp < probeData > selectedData`
                  * if are asking for multiple, example `selectedData:{a,b,value:1111}`, will return those available 
                  * as an Object{}. But if asking for only 1 `selectedData:{value:1111}`, will return the value `11111`, only because we know what we asked for initially
                  */
return o=Object.entries(s).reduce((t,[e,r],i)=>(void 0!==a[e]&&(t[e]=a[e]),t),{}),t(o)||(o=void 0),
// selct only value if `dataProp` === `selectedData` is size ( 1 + 1 === 2 )
t(o)+t(s)===2&&(o=Object.values(o).shift()),
// if coming from `$data()` we cache our data 
"data()"===r&&(this._$cached_data[i]=o),n?this:o}catch(t){return this.debug&&e("[$data] no dataProp found on probeID: "+i),"data()"===r&&(this._$cached_data[i]=o),n?this:o}}idRegexValid(t){return!new RegExp(/[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi,"gi").test(t)||null}
/**
         * ### probeProps
         * - `each probe props that can be available and send on ready`
         * - `order is important, keep 'status' last`
         * - only updatable props are: `'campaign', 'data', 'error', 'ref', 'status'(limited)`
         */get probeProps(){return["campaign","data","task","ref","error","id","status"]}}}
/***/},
/* 10 */
/***/function(t,e){
/**
 * requirejs global event handler
 */
t.exports=function(t,e=null){return new function(t,e){const r="[dispatcher]";this.uid=(t||"").toString()||(new Date).getTime(),this.debug=e,this.cbQueue={},this.dispatchInstance={},this.initListener=()=>(this.Dispatch(),this)
/**
         * @next
         * send next data to the `batchReady` callback
         * @param {*} data # optional
         */,this.next=(t=null)=>(this.dispatchInstance[this.uid]?this.dispatchInstance[this.uid].next(t):this.debug&&console.log({message:r+" for uid not available",uid:this.uid}),this)
/**
         * @Dispatch
         * master listener, sends all event callbacks to `batchReady`
         */,this.Dispatch=()=>{if(this.dispatchInstance[this.uid])return this;const t=this;return this.dispatchInstance[this.uid]||(this.dispatchInstance[this.uid]=new function(){this.uid=t.uid,this.data=null,this.next=e=>{"cb"!==(e||{}).type&&(this.data=e
/**
                         * @next
                         * acts as a reverse callback, it sends back the `cb` from `batchReady`
                         */),"cb"!==(e||{}).type?this.data?"function"==typeof t.cbQueue[t.uid]&&t.cbQueue[t.uid].call(t,this.data,t.uid):this.debug&&console.log(r+" no callback data"):"function"==typeof e.cb&&(
// when calling next before batchReady is initiated
// collect cb from .next
t.cbQueue[t.uid]||(t.cbQueue[t.uid]=e.cb),this.data&&e.cb.call(t,this.data,t.uid))}}),this},this.isActive=()=>!!this.dispatchInstance[this.uid],this.del=()=>(delete this.cbQueue[this.uid],delete this.dispatchInstance[this.uid],!this.cbQueue[this.uid]&&this.dispatchInstance[this.uid],this)
/**
     * @subscribe
     * wait for callbacks forwarded from Dispatch and returned in callback of this method
     * - Dispatch must be set initially before you call `subscribe`
     * @param {*} cb #required
     */,this.subscribe=t=>"function"==typeof t?(this.dispatchInstance[this.uid]||
// this means batchReady was executed prior to `Dispatch`, because it has forward with next
// it will get executed anyway
this.Dispatch(),this.dispatchInstance[this.uid]&&this.dispatchInstance[this.uid].next({type:"cb",cb:t}),this):(this.debug&&console.log(r+"[batchReady] cb must be set"),this)}(t,e)}
/***/},
/* 11 */
/***/function(t,e,r){
/**
 * Set new probe model
 * - every new task has a set of requirements controlled by `statusStackOrder` in status setter. Once status is `complete` and data available, information is send and probe is blocked.
 * methods:`{get,all}` props: `{id,data,tasks,status}`
 */
e.Probe=()=>{
// const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE
const{isString:t,isArray:e,warn:i,log:s,isNumber:n,onerror:a,last:o,copy:c,isObject:u,isFunction:h}=r(1),l=r(7);// nice and simple promise/defer by `eaglex.net`
return class{
/**
         * @param {*} props.id required, case sensitive, all will be toLowerCase() 
         * @param {*} props.task once set cannot be changed
         * @param {*} props.campaign optional, once set cannot be changed
         * @param {*} props.data optional any value except undefind, cannot be change once status set to `complete` or send
         * @param {*} props.status required to control Probe actions
         * @param {*} opts.emitter optional, dispatcher/emmiter available if not null
         * @param {*} opts.completeOnNull override complete setting even if data was never set
         * @param {*} debug 
         */
constructor(e={},r={},i){if(this.debug=i||!1,(n(e.id)||e.id)&&(e.id=e.id.toString()),!e.task||!t(e.task))throw"task as string is required";this._id=null,this._error=[],this._ref=null,this._task=null,this._status=null,this._data=null,this._campaign=null,this._dataIndex=0,this._statusIndex=0,this._statusAsync=[],// dynamic promise changer
this.task=e.task,this.id=e.id,this.status="open",this._onChange=r.onChange||null,this._onchangeDispatch=null,// loads dispatcher when `opts.onChange=true` is set
this.emitter=r.emitter||null,this.completeOnNull=r.completeOnNull||null,// when true allows completion on data still at initial null state
this.disableWarnings=(r||{}).disableWarnings,// disable some less relevant warning messages
// assign initial data if differs from default
e.ref!==this._ref&&(this.ref=e.ref),e.data!==this._data&&(this.data=e.data),e.campaign&&(this.campaign=e.campaign),this._completeAsync=l()}
/**
         * nice and easy, save some coding, and added security
         */get sq(){return this._sq||(this._sq=l()),this._sq}set id(t){if(this._id)return void(this.debug&&i("cannot update already set id: "+this._id));if(!t)throw"id is required";if(t.split(" ").length>1)throw"each id cannot have spaces";if(-1===t.indexOf("::"))throw"each id must be of format id::taskName";if(-1!==t.indexOf(":::"))throw"each id must be of format id::taskName";
// validate chars
const e=/[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi;if(new RegExp(e,"gi").test(t))throw"your id is invalid, allowed chars: "+e;if(-1===(t=t.replace(/ /gi,"_").toLowerCase()).indexOf(this._task))throw"wrong id setup, your id should make up the taks name, example: id='cocacola::drink'";this._id=t}get id(){return this._id}
/**
         * - collect all errors in to an array
         * - no empty error values will be set
         */set error(t){t&&(!(t||[]).length&&e(t)||(
// in case data is in its initial status state = 'open' we need to update it to change `_dataIndex`
//  if (this.data === null) this.data = false
// NOTE  we now use `this.completeOnNull` so can ignore above logic
this._error.push(t),this._error=this._error.filter(t=>!!t),this.dispatchChange("error")))}
/**
         * @returns an arrays of errors or null
         */get error(){return this._error.length?this._error:null}get ref(){return this._ref}
/**
         * - acceps string, can only be set when status isnt complete
         * - can be used to find your Pocket by particular `ref`
         */set ref(e){e&&(t(e)?"complete"!==this.status&&"send"!==this._campaign.status&&(this._ref=e,this.dispatchChange("ref")):i("[ref] must be a string"))}get campaign(){return this._campaign}set campaign(e){void 0!==e&&(this._campaign?this.debug&&!this.disableWarnings&&i("cannot update already set campaign "+this._campaign):e&&(t(e)?(this._campaign=e,this.dispatchChange("campaign")):this.debug&&i("campaign must be a string",e)))}set task(e){if(void 0===e)return;if(this._task)return void(this.debug&&!this.disableWarnings&&i("cannot update already set task"));if(!e)return;if(!t(e))return void(this.debug&&i("task must be a string"));if(-1!==e.indexOf("::"))throw"task seperator :: is restricted";if(e.split(" ").length>1)throw"task cannot have spaces, use seperators: _+";const r=/[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi;if(new RegExp(r,"gi").test(e))throw"your task is invalid, allowed chars: "+r;this._task=e.replace(/ /gi,"_").toLowerCase();// every task must be valid with required 
}get task(){return this._task}set data(t){if(void 0!==t)return"complete"===this.status||"send"===this.status?(
// NOTE this can also happen if you are using $transfer().$to from `PocketModule` that is a delayed
this.debug&&!this.disableWarnings&&i("you cannot update data once the status is complete or send"),null):(this._dataIndex++,"open"===this.status&&null!==this._data&&this._dataIndex>1&&(this.status="updated"),this._data=t,void this.dispatchChange("data"));
/**
            * cannot be updated uppon status is send || complete
            */}get data(){return this._data}
/**
         * ### update
         * - update data of current Probe{}.data
         * @param {*} data:any, required
         * @param {*} merge:Boolean, optional for merging object to this.data
         */update(t,e=null){return"complete"===this.status||"send"===this.status?(this.debug&&!this.disableWarnings&&i("[Probe][update] cannot update data on complete status"),this):!u(t)&&e?(this.debug&&i("[Probe][update] cannot update none object 'data' with option 'merge=true' set"),this):(u(t)&&e?this.data=Object.assign({},this.data,t):void 0!==t&&(this.data=t),this)}
/**
         * forward motion `status` update is allowed
         * `value`: importance que
         * `set`: if status already set
         */get statusStackOrder(){return{open:{value:1,set:!1},updated:{value:2,set:!1},complete:{value:3,set:!1},send:{value:4,set:!1},error:{value:5,set:!1}}}
/**
         * allow status: open | updated | complete | send | error
         * `open`: status is set when pocked is initialized
         * `updated`: status is set when data is updated
         * `complete`: status is set when you want to complete and discard probe
         * `send`: once the status was set `complete` data is resolved first then status is set as `send`.
         * and Probe is locked, cannot be interacted with. Follow the strategic order set by `statusStackOrder`
         * `error` acts like complete, it will resolve() last available data and block the Probe
         */get status(){return this._status}set status(t){
// order of status and allowed values
(e=>{try{
// meaning do not allow any status changes beond `updated`
if(this.statusStackOrder[e].value>2&&!0===this.statusStackOrder[e].set)return!1}catch(t){a("statusStackOrder invalid status")}
// if (this._status === 'send' && (stat === 'complete' || stat ==='send')) {
//     if (this.debug) warn(`cannot update status if already complete, id:${this.id}`)
//     return false
// }
switch(e){case"open":if("updated"===this._status){this.debug&&i("cannot set status back to open once set to updated");break}this._status=e,this.statusStackOrder[e].set=!0,this.onOpenStatus(t),// emit probe when status opens
this.setStatusAsync=e,this.dispatchChange("status");break;case"updated":if("complete"===this._status){this.debug&&i("cannot update status to 'updated' then previously set to 'complete'");break}this._dataIndex>0&&(this._status=e,this.statusStackOrder[e].set=!0,this.setStatusAsync=e,this.dispatchChange("status"),this.debug&&s(`id:${this.id}, data updated`));break;case"complete":if(null===this.data&&!0!==this.completeOnNull){this.debug&&i("[status] cannot complete status because data is null, to complete you set data prop to false");break}this.statusStackOrder[e].set=!0,this.setStatusAsync=e,
// setTimeout(()=>{
this._status=e,this.dispatchChange("status"),this.onComplete(t);// resolve probe when status complete
//  })
break;case"send":if("complete"!==this._status){this.debug&&i("cannot update status to 'send' then previously not set to 'complete'");break}this._status=e,this.statusStackOrder[e].set=!0,this.setStatusAsync=e,this._completeAsync.resolve({status:this._status,id:this.id}),this.dispatchChange("status");break;case"error":if("complete"===this._status)return;
// when we have error we need to inform what happen, and close the Probe
this.statusStackOrder[e].set=!0,this.setStatusAsync=e,this.dispatchChange("status"),this.onComplete(t);// resolve probe when status complete                     
break;default:this.debug&&i(`id:${this.id},  you set invalid status: ${e}, nothing changed`)}})(t)}
/**
         * - works with `statusAsync`
         * - (1.) setter creates our new sq() promise every time, and allows use or resolve 
         * - to use example: setStatusAsync.resolve()
         */set setStatusAsync(t){
// 'v'  set to anything to initiate setter
const e={timestamp:(new Date).getTime(),p:l()};this._statusAsync.push(e)}get setStatusAsync(){const t=o(this._statusAsync.sort((t,e)=>t.timestamp-e.timestamp).map(t=>t.p));// << we are unly returning
return t.resolve(c(this.status)),t}
/**
         * ### statusAsync
         * - dynamic promise resolver with `Simple Q` from `eaglex.net`
         * - works with `setStatusAsync` setter/getter
         * - return last 'resolve' status from last `timestamp` setting
         */get getStatusAsync(){return this.setStatusAsync.promise()}
/**
         * - when status is set to complete or send, the promise will then be resolved
         * @returns {status, id}
         */get completeAsync(){return this._completeAsync.promise()}
/**
         * - alias of `getStatusAsync`
         * @readonly
         */get statusAsync(){return this.getStatusAsync}all(){return{error:this.error,ref:this.ref,campaign:this.campaign,data:this.data,id:this.id,task:this.task,status:this.status}}
/**
         * - can be used when `opts.onChange=true` is set
         * - changes are observed for `[ data,status,ref,error,campaign]`
         * @param {*} cb(data,id) callback returns updated value in real time
         * @returns self
         */onChange(t,e="all"){if(!this._onChange)return this.debug&&i("[onChange] to use need to set opts.onChange=true"),this;if(!h(t))return this.debug&&i("[onChange] cb must be a function"),this;if(!["all","data","status","ref","error","campaign"].includes(e))return this.debug&&i("[onChange] no watch available for "+e),this;const r=this;return this.onchangeDispatch?(this.onchangeDispatch.initListener().subscribe((function(i,s){
// NOTE data['changed'] // returned in dispatch only provided name of asset changed
// no point to carry data if we can access it direct
i.changed&&"all"===e?t.bind(r)(c(r.all()),s):i.changed===e&&void 0!==r[e]&&t.bind(r)(c(r[e]),s)})),this):(this.debug&&i("[onChange] onchangeDispatch no longer active"),this)}
/**
         * - works with onchangeDispatch, onChange 
         * - emmits next value to `onchangeDispatch` listener
         * @param {*} changedName required, provide name of Probe prop to alert dispatcher what has changed
         * @returns self
         */dispatchChange(t){return this._onChange&&this.onchangeDispatch?(this.onchangeDispatch.initListener().next({changed:t}),!0):null}
/**
         * initiates dispatcher to handle on change value of [data,status,ref,error,campaign]
         * @returns dispatcher instance
         */get onchangeDispatch(){return this._onChange?(this._onchangeDispatch||(this._onchangeDispatch=r(10)(this.id)),this._onchangeDispatch):(this.debug&&i("[onchangeDispatch] to use need to set opts.onChange=true"),null)}
/**
         * status watch, when current status changes execute send
         * @param {*} status
         */onComplete(t){"complete"!==t&&"error"!==t||"send"===this._status||!(this._dataIndex>0||!0===this.completeOnNull)||(this.emitter&&setTimeout(()=>{this.emitter({probe:this,status:t})}),this._status="send",this.sq.resolve({probe:this.all()}),setTimeout(()=>{
// in case delete listener when data complete     
this.onchangeDispatch&&this.onchangeDispatch.del()}))}
/**
         * do something on open task, this means we start request for data
         * @param {*} status
         */onOpenStatus(t){"open"===t&&this.emitter&&setTimeout(()=>{this.emitter({probe:this,status:"open"})})}}}
/***/},
/* 12 */
/***/function(t,e,r){
/** 
    * ### Architect
    * a more in depth project architecture setup, allowing more robust configuration, munipulation and data flows
*/
t.exports=t=>{const{objectSize:e,isFunction:i,onerror:s,warn:n,log:a,isString:o}=r(1);
// work with 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
/**
     * protected prototype exluded from `Architect`
     */function c(){this._architectVal=null,this.architect=Object.create(c.prototype,{value:{enumerable:!0,configurable:!0,get:()=>this._architectVal,set:t=>{e(t)&&(this._architectVal=t,a("[architect] updated"))}}})}return class extends t{constructor(t,e){super(t,e),this.architectConfig={};const r=new c;this.architectMod=r.architect}setArchitect(t,e){return void 0===this.architectConfig[t]&&(this.architectConfig[t]=this.architectMod),this.architectConfig[t].value=Object.assign({},this.architectConfig[t].value,e),this}getArchitect(t){return(this.architectConfig[t]||{}).value}
/** 
       * @param assetName string, specify the name you chose in your `$architect(...)` declaration,
       * @param asCallback when exists, return asset as callback
       * @param projectID optional, update selector and return desired asset
       * @returns if callback is returned the same value is returned
      */asset(t,e,r){if(!i(e))return this.debug&&n("[$asset] asCallback must be a function"),null;
// reserved names
if("project"===t||"cache"===t)return void(this.debug&&n("[$asset] 'project, cache' are  restricted"));const s=this.lastProjectID(r);// in case we are calling `$architect` on existing project
return r=this.validProjectID(s||r),this.getArchitect(r)?void 0!==this.getArchitect(r)[t]?e.call(this,this.getArchitect(r)[t]):(this.debug&&n("[$asset] assetName for architect doesnt exist"),null):(this.debug&&n("[$asset] architectConfig for assetName doesnt exist"),null)}
/** 
          * - can be used as a project setter same as `$payload` or `$project`, but with additional configuration
          * 
          * @param cb required, must return project settings: `{project:{payloadData}, asset:{value, name}, cache:{project, asset}}
          * @param projectID optional
          * @returns self
         */architect(t,r){if(!i(t))return this.debug&&s("[$architect] callback must be set"),this;const a=t.call(this/** ,?? */);if(!e(a))return this.debug&&s("[architect] must return a valid object settings {project, asset}, at least 1 is required"),this;const c=(a.project||{}).id,u=this.lastProjectID(r);if(!(// in case we are calling `$architect` on existing project
r=this.validProjectID(u||r||c)))return this.debug&&s("[$architect] if this is a new project, you must specify projectID"),this;const h=Object.entries(a).reduce((t,[e,r])=>(-1!==["project","asset","cache"].indexOf(e)&&(t[e]=r),t),{});
// default setting for `architect.cache` if getArchitect not stored
if((this.getArchitect(r)||{}).cache)h.cache=this.getArchitect(r).cache;else{const t={project:!1,asset:!1};h.cache||(h.cache=t),this.setArchitect(r,{cache:h.cache})}for(let t in h){const e=h[t],i=!0===h.cache[t]&&("project"===t||"asset"===t);
// get last cache overide
if("project"===t){
// item['async'] item['type'] .. can include `async` and `type` 
try{if(i&&this.getArchitect(r)[t])continue}catch(t){

}this.setArchitect(r,{project:this.$payload(e,e.async,e.type).d})}if("asset"===t){if(!o(e.name)||void 0===e.value)return this.debug&&n("[$architect] asset must include {value, name}"),this;if("project"===e.name||"cache"===e.name)return this.debug&&n('[$architect] asset props, "project, cache" are reserved'),this;try{if(i&&this.getArchitect(r)[e.name])continue}catch(t){

}
// if already exists, same assets will be overriten and new will be created
this.setArchitect(r,{[e.name]:e.value})}}return this}}}
/***/},
/* 13 */
/***/function(t,e,r){
/**
 * ### PocketSelectors
 * - Extends PocketModule using selectors for better access to Probes
 * - allow selecttion to refference by, example:  `taskName`, `::taskName` and `${projectID}::taskName`, thanks to `selectByTask()` method
 */
t.exports=t=>{const{copy:e,warn:i,isArray:s,onerror:n,objectSize:a,isString:o,uniq:c,isFunction:u}=r(1);return class extends t{constructor(t,e){super(t,e)}
/** 
         * - can be used as a project setter same as `$payload` or `$project`, but with additional configuration
         * @extends Architect
         * @param cb required, must return project settings: `{project:{payloadData}, asset:{value, name}}
         * @param projectID optional
         * @returns self
        */$architect(...t){return this.architect(...t)}
/** 
         * @param assetName string, specify the name you chose in your `$architect(...)` declaration
         * @param projectID optional, update selector and return desired asset
         * @returns asset by name or null
         * @extends Architect
        */$asset(...t){return this.asset(...t)}
/**
         * - check is probe exists on PocketModule
         * @param {*} probeID required, can specify `::taskName` or full id `{projectID}::{probeID}`
         * @returns boolean
         */$exists(t){return!!this.selectByTask(t)}
/**
         * @param projectID required
         * @returns boolean `true/false/null`, determined by project completion
         */$projectComplete(t){return this.projectsCache[t]?"complete"===this.projectsCache[t]:null}
/**
         * ### $projectSet
         * - use it to check if project already available, it is similar to `$projectSetAsync` but not a promise, returns current status, not in future
         * @param {*} projectID required
         */$projectSet(t=""){return t=this.validProjectID(t),!!this.payloadData[t]}
/**
         * - run conditional statement within callback, so we can keep chaining in the same block
         * @param cb required, inside callback access to self for PocketModule, or for Probe{}, depending on `projectID/probeID` id specified
         * @param `projectID/probeID` optional, specify either `projectID` or `probeID`, defaults to last `projectID`
         * @returns by default eturns Pocket/self, or any true value passed inside callback
         */$condition(t,e){if(!u(t))return this.debug&&i("[$condition] must provide callback"),this;let r="PocketSelf",s=null;// `ProbeSelf`
if(0===(e=o(e)?e:"").indexOf("::")){if(// if specified id is `probeID`
e=this.selectByTask(e,!0),r="ProbeSelf",!(e=this.lastProbeID(e)))return this.debug&&i("[$condition] probeID not found"),this;
// also updates last selector reference
}else{if(!this.lastProjectID(e))return this.debug&&i("[$condition] projectID not found"),this;r="PocketSelf";// if specified id is `projectID`
}if("PocketSelf"===r&&(s=this),"ProbeSelf"===r&&(s=this.$get(e)),!s)return this.debug&&i("[$condition] no valid self value"),this;// when using arrow function pass `(self)=>` in callback as well
return t.call(s,s)||this;// else return self
}
/**
         * @returns last selected projectID
         */get $projectID(){return this._lastProjectID}
/**
         * - return last probe status, this is a dynamic Promise, creates new promise every time status is changed, so then it needs to bu called again to get latest update
         * @param {*} probeID 
         * @extends probeStatusAsync
         */$probeStatusAsync(t=""){
// allow use of short ref names example: `::cocalola`
t=this.selectByTask(t,!0);let e=this.lastProbeID(t);return this.probeStatusAsync(e)}
/**
         * ### $get
          * - `get probe by 'id::taskName'`
          * - `returns instance`
          *  methods:`{get,all}` props: `{id,data,tasks,status}`
          * @param {*} probeID required, example format: `${payload.id}::taskName`
          * @param {*} self = false optional, in case you want to chain, and access `Probe{}` through `...).d`
          * @extends _get
         */$get(t,e){
// allow use of short ref names example: `::cocalola`
t=this.selectByTask(t,!0);let r,i=this.lastProbeID(t);try{if(r=this._get(i,e),!r)throw"ups"}catch(t){
// noop
r={onChange:()=>{}}}return r}
/**
         * - return array of Probes matched by ref
         * @param {*} probeRef, required
         * @returns [Probe{},...] array
         */$getByRef(t=""){return Object.assign(this.pocket).filter(([e,r],i)=>r.ref===t)}
/**
         * - as name suggest sets up new new data for Probe/task, it derives from `$update` 
         * @param {*} dataFrom required, must specify what to set on Probe{}, example: `dataFrom:{data:'coke',status:'complete',campaign:'cocacola'}`
         * - we should only use `$set` for initialization, this action also calls `clearStoreTransfers`
         * @param {*} probeID required, example format: `${payload.id}::taskName`
         * @extends _set
         */$set(t,e){
// allow use of short ref names example: `::cocalola`
e=this.selectByTask(e,!0);let r=this.lastProbeID(e);return this._set(t,r)}
/**
         * ### $probe
         * - return me as Probe{}, similar as $get(...), although does additional check for instanceOf Probe{}
         * @param {*} probeID 
         */$probe(t=""){
// allow use of short ref names example: `::cocalola`
t=this.selectByTask(t,!0);let e=this.lastProbeID(t);if(this.pocket[e]){if("Probe"===this.pocket[e].constructor.name)return this.pocket[e];this.debug&&n(`[$probe] probeID: ${t} is not an instance of Probe{}`)}else this.debug&&i("[$probe] not found for probeID: "+t)}
/**
         * update Probe/task, for convenience, so we dont have do this, example: `pc.$get('abc123::grab').status='complete'`
         * @param {*} dataFrom required, must specify what to update on Probe{}, example: `dataFrom:{data:'coke',status:'complete',campaign:'cocacola'}`
         * @param {*} mergeData optional if `true` will merge: `Object.assing({},probe[id].data,mergeData['data'])`
         * @param {*} probeID required, example format: `${payload.id}::taskName`
         * @extends update
         */$update(t,e,r){
// allow use of short ref names example: `::cocalola`
r=this.selectByTask(r,!0);let i=this.lastProbeID(r);return this.update(t,e,i)}
/**
         * ### $select
         * - select current payloadID/project/job by id you are working on
         * @param {*} projectID optional/sensitive, selects new point of reference.
         */$select(t=""){// also updates last selector reference
return t=o(t)?t:"",this.lastProjectID(t),this}
/**
         * ### $filter
         * - filter works together with `$compute` or standalone when specified `.d` to return filtered `list`
         * @param {*} cb 
         * @param {*} projectID 
         */$filter(t,e){e=this.lastProjectID(e);// also updates last selector reference
const r=t=>(this.d=(t||[]).filter(t=>void 0===t.isNONE),this);if(!u(t))return r([]);if(!this.payloadData[e])return this.debug&&i("[$filter] no projectID found"),r(null);
// when narrowing down $filter.$filter process, lets remember last action
let s=[];return(this._lastFilterList[e]||[]).length?s=this._lastFilterList[e]:(this._lastFilterList[e]=[],s=this.projectProbeList(e)),s.forEach((r,i)=>{if(r.isNONE)return;const s=t.call(r,r);if(!s)return this._lastFilterList[e]=this._lastFilterList[e].filter(t=>t.id!==r.id),void this._lastFilterList[e].push({id:r.id,isNONE:!0});void 0===s||!0!==s&&1!==s?this._lastFilterList[e].push({id:r.id,isNONE:!0}):this._lastFilterList[e].filter((t,e)=>(t||{}).id===r.id).length||this._lastFilterList[e].push(r)}),r(this._lastFilterList[e])}
/**
         * ### $compute
         * - iterate thru each Probe{}/ instance in a callback, and make changes to it
         * - note: you can only compute thru items that are not `complete`
         * @param {*} cb((probe, probeID)=>this/self.data) required
         * @param {*} projectID optional/sensitive, selects new point of reference.
         */$compute(t,e=""){e=this.lastProjectID(e);const r=t=>(
// delete last filtered list after it was consumed
t&&delete this._lastFilterList[e],this.d=t,this);if(!u(t))return this.debug&&i("[$compute] cb must be a function"),r(null);if(!this.payloadData[e])return this.debug&&i("[$compute] no project found fo your/last id projectID:"+e),r(null);let s=this._lastFilterList[e]||[];return s.length?(
// uniq
this._lastFilterList[e]=s=s.filter(t=>void 0===t.isNONE).filter(({id:t},e,r)=>1===r.filter(e=>t===e.id).length),s.forEach(e=>{
// compute method is designed to allow access to each Probe, but we do not want to allow looping thru assets that are already complete           
"complete"!==e.status&&"send"!==e.status&&t.call(e,e)}),r(this._lastFilterList[e])):(this.projectProbeList(e).forEach(e=>{
// compute method is designed to allow access to each Probe, but we do not want to allow looping thru assets that are already complete           
"complete"!==e.status&&"send"!==e.status&&t.call(e,e)}),r(this.projectProbeList(e)))}
/**
         * ### $list
         * - list active Probes{} by project id, should return all assigned probe/tasks regardless of status
         * - returns array[] of active Probe{}/tasks or []
         * @param {*} projectID optional/sensitive, selects new point of reference.
         * @param {*} cb((probe, probeID)=>) optional, when set will loop thru each Probe{} in callback
         * @param {*} type optional, set to `list`, will return latest Probes, that includes if initiated cb and made a few changes
         */$list(t="",e=null,r="self"){if(t=this.lastProjectID(t),!this.payloadData[t])return[];const i=()=>Object.entries(this.pocket).reduce((e,[r,i],s)=>(i.id.includes(t)&&e.push(i),e),[]);return u(e)?(this.projectProbeList(t).forEach(t=>{e(t.all());// no access to Probe/instance only copy
}),"self"!==r&&r?"list"===r?i():void 0:this):i()}
/**
         * ### $transfer
         * - select data from `fromProbeID` and hold it in `_transferCache`, until `$to(probeID)` is called
         * - warning, action removes `Probe[fromProbeID].data` and overrides it on Probe[probeID].data, only when `$to(probeID)` is called, simple as that!
         * @param {*} fromProbeID optional/sensitive, selects new point of reference.
         */$transfer(t=""){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),t=this.lastProbeID(t),this.pocket[t]?(this.storeTransfers(t,e(this.pocket[t].data)),
// NOTE needed for extra security to make sure it was called before we can update `$to()`
this.$transfer_lastID=t,this):(this.debug&&i("[$transfer] no Probe{} found for this id fromProbeID:"+t),this)}
/**
         * ### $to
         * - works together with `$transfer`, will transfer `data` from one Probe{} to another
         * if `_transferCache` is set, the cache is cleared.
         * @param {*} toProbeID optional/sensitive, points to Probe{} `data` will be packed, it is not previous reference pointer, but the next.
         * - will only work if `toProbeID` is not yet complete
         * @param {*} pointToThisProbe to stay on the current pointer reference
         * @param {*} maxDelay, keep at minimum! Time between transaction can take place, relates to `fromAverageTimeHasPast` found in `accessLastValidTransfer()`
         */$to(t="",e=!0,r=100){if(
// allow use of short ref names example: `::cocalola`
t=this.selectByTask(t,e),
// if (!keepLastPointerReference) toProbeID = this.lastProbeID(toProbeID)
e&&(t=this.validProbe(t)),!t)return this.debug&&i("[$to] toProbeID is invalid"),this;if(!this.pocket[t])return this.debug&&i("[$to] no Probe{} found for this id toProbeID:"+t),this;if(this.$transfer_lastID){
// please note because this can be a delayed transaction, if you send `status=complete`
// the data will not be updated
const e=this.accessLastValidTransfer(r);if(a(e)){const{fromProbeID:r,data:s}=e;if(this.$transfer_lastID===r){if("complete"===this.pocket[t].status||"send"===this.pocket[t].status)return this.debug&&i(`[$to] cannot transfer since toProbeID: ${t} is already complete`),this.$transfer_lastID="",this;this.pocket[r].data=null,// from $transfer 
this.pocket[t].data=s}}else this.debug&&i("[$to] no last valid transfer found");this.$transfer_lastID=""}return this}
/**
         * ### $of
         * - points to Probe{} be reference
         * @param {*} probeID optional/sensitive, select new point of reference
         */$of(t=""){
// allow use of short ref names example: `::cocalola`
return this.selectByTask(t,!0),this}
/**
         * ### $data
         * - returns Object copy of `Probe['data']`
         * @param {*} dataProp optional, if you know what you are asking for example: `{assets:true}`,or `array['assets]`, it has catch error exception, so you wont receive any errors just `null`
         * will return all available matched within our `Probe{}['data]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be retured
         * @param {*} probeID optional/sensitive, select new point of reference
         * @param {*} self optional,if you want to $cached() last data enquiry and return `self` to keep chaining, nice!
         */$data(t=null/** {}||[] */,r="",i=!1){
// allow use of short ref names example: `::cocalola`
return r=this.selectByTask(r,!0),this.pocket[r]?(
// NOTE can provide as an array
s(t)&&(t||[]).length&&(t=c(t).reduce((t,e)=>(void 0!==e&&(t[e.trim()]=!0),t),{})),t&&a(t)?this.dataPropSelector("data()",r,t,i,e(this.pocket[r].data)):(this._$cached_data[r]=e(this.pocket[r].data),i?this:this._$cached_data[r])):i?this:void 0}
/**
         * ### cached
         * - grabs last cached `$data(...)` from Probe{}
         * @param {*} dataProp{}/String optional, know what you are asking for example: ` {assets:true}/ or > 'assets,values,somethingElse'`, it has catch error exception, so you wont receive any errors just `null`
         * will return all available matched within our `_$cached_data[probeID]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be retured
         * @param {*} probeID 
         */$cached(t={},e=""){if(e=this.selectByTask(e,!0),!this.pocket[e])return;const r=void 0!==this._$cached_data[e]&&null!==this._$cached_data[e];return r?(
// if you provided a string make it an object
o(t)&&(t||"").length&&(t=c(t.trim().replace(/ /gi,"").split(",")).reduce((t,e)=>(void 0!==e&&(t[e]=!0),t),{})),
// return cached data if its not an object, or undefined
!a(this._$cached_data[e])&&r?a(t)?void 0:this._$cached_data[e]:
// no selection at all, so just return whats available
t&&a(t)?this.dataPropSelector("cached()",e,t,!1,this._$cached_data[e]):void 0===this._$cached_data[e]?void 0:this._$cached_data[e]):void 0}
/**
         * ### $campaign
         * - returns Object copy of `Probe['campaign']` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */$campaign(t){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),this.pocket[t]?e(this.pocket[t].campaign):null}
/**
         * ### $ref
         * - returns Probe{}.ref
         * @param {*} probeID optional/sensitive, select new point of reference
         */$ref(t){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),this.pocket[t]?e(this.pocket[t].ref):null}
/**
        * ### $status
        * - returns Object copy of `Probe['status']` 
        * @param {*} probeID optional/sensitive, select new point of reference
        */$status(t){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),this.pocket[t]?e(this.pocket[t].status):null}
/**
         * ### $task
         * - returns Object copy of `Probe['task']` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */$task(t){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),this.pocket[t]?e(this.pocket[t].task):null}
/**
         * ### $task
         * - returns Object copy of `Probe['task']` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */$error(t){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),this.pocket[t]?e(this.pocket[t].error):null}
/**
         * ### $all
         * - return Object copy of all setters: `{id,status,campaign,task,data}` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */$all(t){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),this.pocket[t]?e(this.pocket[t].all()):null}
/**
         * - changes are observed for `[data,status,ref,error,campaign]`
         * @param watchProp specify what property to watch, defaults to `all`
         * @param {*} probeID optional/sensitive, select new point of reference
         * @extends Probe.onChange
         */$onChange(t,e,r){return this._onChange?(r=this.selectByTask(r,!0),this.pocket[r]?(this.pocket[r].onChange(t,e),this):null):(this.debug&&i("[$onChange] opts.onChange=true must be enabled to use this feature"),this)}}}
/***/}
/******/]);