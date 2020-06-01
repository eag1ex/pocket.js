!function(t,e){for(var r in e)t[r]=e[r]}(exports,/******/function(t){// webpackBootstrap
/******/ // The module cache
/******/var e={};
/******/
/******/ // The require function
/******/function r(n){
/******/
/******/ // Check if module is in cache
/******/if(e[n])
/******/return e[n].exports;
/******/
/******/ // Create a new module (and put it into the cache)
/******/var i=e[n]={
/******/i:n,
/******/l:!1,
/******/exports:{}
/******/};
/******/
/******/ // Execute the module function
/******/
/******/
/******/ // Return the exports of the module
/******/return t[n].call(i.exports,i,i.exports,r),
/******/
/******/ // Flag the module as loaded
/******/i.l=!0,i.exports;
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
/******/r.d=function(t,e,n){
/******/r.o(t,e)||
/******/Object.defineProperty(t,e,{enumerable:!0,get:n})
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
/******/var n=Object.create(null);
/******/
/******/if(r.r(n),
/******/Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));
/******/return n;
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
/***/function(t,e,r){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e,r){return(i="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,r){var n=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=m(t)););return t}(t,e);if(n){var i=Object.getOwnPropertyDescriptor(n,e);return i.get?i.get.call(r):i.value}})(t,e,r||t)}function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,i=!1,s=void 0;try{for(var o,a=t[Symbol.iterator]();!(n=(o=a.next()).done)&&(r.push(o.value),!e||r.length!==e);n=!0);}catch(t){i=!0,s=t}finally{try{n||null==a.return||a.return()}finally{if(i)throw s}}return r}}(t,e)||l(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){var r;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=l(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,i=function(){};return{s:i,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,o=!0,a=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return o=t.done,t},e:function(t){a=!0,s=t},f:function(){try{o||null==r.return||r.return()}finally{if(a)throw s}}}}function l(t,e){if(t){if("string"==typeof t)return h(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(t,e):void 0}}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function d(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function p(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function f(t,e,r){return e&&p(t.prototype,e),r&&p(t,r),t}function y(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");var r,n;t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&(r=t,n=e,(Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(r,n))}function b(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=m(t);if(e){var i=m(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return g(this,r)}}function g(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function m(t){return(m=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}e.PocketModule=function(){
// const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE
var t=r(1),e=t.objectSize,n=t.log,s=t.onerror,l=t.warn,h=t.isArray,p=t.isObject,g=t.isPromise,v=t.validID,_=r(7),k=r(9)(),j=r(11).Probe,O=function(t){y(r,t);var e=b(r);function r(t,n){return d(this,r),e.call(this,t,n)}return f(r,[{key:"$payload",value:function(t,e,n){var o=this,a=function(t){return o.d=t,o},u=void 0!==e?e:this.async;// override if set
return u&&g(t)?a(t.then((function(t){return i(m(r.prototype),"$payload",o).call(o,t,!1,n)}),(function(t){return t}))):this.async||g(t)?(this.debug&&s("[payload] with opts.async=true, data must be a promise, or do not set async when not a promise"),a(!!u&&Promise.reject())):a(i(m(r.prototype),"$payload",this).call(this,t,!1,n))}
/**
       * ### $project
       * - `an alias on $payload(...), can use either`
       * - refer to `$payload` for specifications :)
       */},{key:"$project",value:function(){return this.$payload.apply(this,arguments)}
/**
        * ### $ready
        * - resolves currently active `$payload(...)`
        * - `after completion of Pocket, instance data for all Probes is deleted`
        * - can be called even before project was declared thanks to callback dispather `$projectSetAsync()`
        * @param {*} payloadID ,required
        */},{key:"$ready",value:function(t){var e,n=this;
// in case it was called the second time, when already resolved!
return this._$ready_resolved?Promise.reject("$ready already resolved"):(this._$ready_resolved=!1,e=this.$projectSetAsync(t).then((function(t){var e=t.projectID;return i(m(r.prototype),"$ready",n).call(n,e).then((function(t){return n.deletePocketSet(e),n._$ready_resolved=!0,t}),(function(t){return Promise.reject(t)}))}),(function(t){return Promise.reject(t)})),n.d=e,n)}}]),r}(function(t){y(i,t);var r=b(i);function i(t,e){var s;return d(this,i),(s=r.call(this,t,e)).dispatcher&&s.dispatcher.initListener().subscribe((function(t,e){var r=t||{},i=r.probe,o=r.status;"error"===o&&s.debug&&n("[dispatcher] probe id:".concat(i.id," error")),"open"===o&&s.debug&&n("[dispatcher] probe id:".concat(i.id," created")),"complete"===o&&s.debug&&n("[dispatcher] probe id:".concat(i.id," completed"))})),s}// ───────────────────────────────────────────────────────────────────────────────────────
//   :::::: U S E R   A P P L I C A T I O N   C A L L I N G   M E T H O D S : :  :   :    : 
// ───────────────────────────────────────────────────────────────────────────────────────

/**
     * ### $payload
     * - you can also use it on concurent payloads to existing `projectID`, once initial project is created overy other call will update each Probe{}.data/status, based on payloadData
     * @param {*} data `required`
     * @param {*} async `override current opts.sync for this payload`
     * @param {*} type optional, new/update, `update`: if we call on an existing project we can update `data/status properties` of all assigned tasks at once
     * 
     * - `initialize new payload, for as many tasks`
     * - `sets a multi task with instructions:`
     * - `data = {
            id: '', // 1 id for all tasks
            tasks: [{ taskName: '', data: '', compaign: '' }]
        }`
       * - `call distributor and setDefer`
     */return f(i,[{key:"$payload",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"new";this.d=null;var n=null;// validate payload format
if(!p(e))return!1;var i=Object.keys(e);// must match all keys
if(i.every((function(t){return-1===["id","tasks"].indexOf(t)})))return this.debug&&s("[$payload] id and tasks are required"),!1;if(!h(e.tasks))return this.debug&&s("[$payload] data.tasks must be an array"),!1;if(e.id=this.validProjectID(e.id),!e.id)return this.debug&&s("[$payload] data.id invalid"),!1;if(this.payloadData[e.id]&&(!r||"new"===r))return this.debug&&l("[$payload] this payload.id already exists"),!1;var o,a=void 0===this.payloadData[e.id],u=c(e.tasks.values());// because there is no data set as of yet
// NOTE validate our pocket values before generating each `new Probe()`
try{var d=function(){var i=o.value;return i.task?// validate task 
t.idRegexValid(i.task)&&-1===i.task.indexOf("::")?"update"!==r||a?(t.payloadData[e.id]||(t.payloadData[e.id]={value:[],status:"open",timestamp:(new Date).getTime()}),t.payloadData[e.id].value.filter((function(t){return-1!==t.task.indexOf(i.task)})).length?(t.debug&&l('the same task "'.concat(i.task,'" already exists on the payload, you must choose uniq')),"continue"):(t.payloadData[e.id].value.push(i),void(t.lastPocketTimestamp=t.payloadData[e.id].timestamp))):(i.data&&t.$update({data:i.data},!1,"::".concat(i.task)),i.status&&t.$update({status:i.status},!1,"::".concat(i.task)),t.$status("::".concat(i.task))&&(n=!0),"continue"):(t.debug&&l("[$payload] invalid taskName, failed idRegexValid validation"),"continue"):(t.debug&&l("[$payload] task must be set for your tasks"),"continue")};for(u.s();!(o=u.n()).done;)d();// only when updating existance of Probe{}
}catch(t){u.e(t)}finally{u.f()}return"update"===r&&this.payloadData[e.id]&&!a?n:!!this.payloadData[e.id]&&(this.lastProjectID(e.id),this.distributor().setDefer(e.id),// NOTE required in order for $projectSetAsync to retrun callback to resolve our promise
this.projectSetDispatcher(e.id).initListener().next({projectID:e.id}),!0)}
/**
       * ### $projectSetAsync
       * - usage: to call before `$project()/$payload()` were even called
       * - for example you have loaded same `Pocket` instance in another part of your code, now checking for it  in future before even created, this method can `await $projectSetAsync(projectID)` and continue with already set `$project(...).$get(..).$update(..)` etc
       * @param {*} projectID required, this is your `$project/$payload` id
       */},{key:"$projectSetAsync",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=this;return this._projectSetAsync[t]||(
/**
         * will subscribe when called the first time and set our simple promise then will resolve once the `$payload` is succesfull
         */
this._projectSetAsync[t]=_(),this.projectSetDispatcher(t).initListener().subscribe((function(t,r){e._projectSetAsync[r].resolve(t),this.del()}))),this._projectSetAsync[t].promise()}
/**
       * ### $projectSet
       * - use it to check if project already available, it is similar to `$projectSetAsync` but not a promise, returns current status, not in future
       * @param {*} projectID required
       */},{key:"$projectSet",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t=this.validProjectID(t),!!this.payloadData[t]}
/**
       * ### $probeStatusAsync
       * - return last probe status, this is a dynamic Promise, creates new promise every time status is changed, so then it needs to bu called again to get latest update
       * @param {*} probeID 
       */},{key:"$probeStatusAsync",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=function(e){return t.d=e,t};return r((e=this.lastProbeID(e))?this.pocket[e].getStatusAsync:null)}
/**
       * ### $get
        * - `get probe by 'id::taskName'`
        * - `returns instance`
        *  methods:`{get,all}` props: `{id,data,tasks,status}`
        * @param {*} probeID required, example format: `${payload.id}::taskName`
        * @param {*} self = false optional, in case you want to chain, and access `Probe{}` through `...).d`
       */},{key:"$get",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=function(e){return t.d=e,r?t:t.d};return this.d=null,n((e=this.lastProbeID(e))?this.pocket[e]:null)}
/**
       * ### $update
       * - update Probe/task, for convenience, so we dont have do this, example: `pc.$get('abc123::grab').status='complete'`
       * @param {*} dataFrom required, must specify what to update on Probe{}, example: `dataFrom:{data:'coke',status:'complete',compaign:'cocacola'}`
       * @prop {*} mergeData optional if `true` will merge: `Object.assing({},probe[id].data,mergeData['data'])`
       * @param {*} probeID required, example format: `${payload.id}::taskName`
       */},{key:"$update",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return this._setUpdate(t,e,r,"update")}
/**
       * ### $set
       * - as name suggest sets up new new data for Probe/task, it derives from `$update` 
       * @param {*} dataFrom required, must specify what to set on Probe{}, example: `dataFrom:{data:'coke',status:'complete',compaign:'cocacola'}`
       * - we should only use `$set` for initialization, this action also calls `clearStoreTransfers`
       * @param {*} probeID required, example format: `${payload.id}::taskName`
       */},{key:"$set",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return this._setUpdate(t,null,e,"set")}
/**
       * ### $activeTasks
       * - list any active tasks for assigned Probes
       * @param {*} payloadID optional, when set will only filter thru given job id (NOT Probe{} ID!)
       */},{key:"$activeTasks",value:function(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=function(e){return t.d=e,t};if(r=this.lastProjectID(r),!e(this.pocket))return n([]);var i=Object.entries(this.pocket).reduce((function(e,n){var i=u(n,2),s=i[0],o=i[1];return 0===s.indexOf(r||"")&&r&&t.payloadData[r]?e.push(o.task):r||e.push(o.task),e}),[]);return n(i)}},{key:"$ready",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(this.d=null,!(t=this.lastProjectID(t)))throw"payloadID must be set";if(!this._ready[t])throw"ready[payloadID] is not set, maybe you called it before $payload()";return this._ready[t].promise()}
// ──────────────────────────────────────────────────────
//   :::::: E N D : :  :   :    :     :        :          
// ──────────────────────────────────────────────────────  
// extends  `$update` and `$set`
},{key:"_setUpdate",value:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"update",o=function(t){return e.d=t,e},c=this.lastProbeID(n);if(!c)return this.debug&&s("[$update] must specify id"),o(!1);if(!p(t))return this.debug&&l("[$update] dataFrom must be an "),o(!1);if(!this.pocket[c])return this.debug&&s("[$update] this.pocket with id:".concat(c," not found")),o(!1);var h=!1;// reorder dataFrom, make sure if `status` exists, it is shifted to last position, so the Probe{} doent change state before other values got chance to do so, nice!
// we need to convert dataFrom{} to dataFrom[]>array to achieve this
t=Object.entries(t).reduce((function(t,r){var n=u(r,2),i=n[0],s=n[1],o=e.probeProps.indexOf(i);// new order
return e.probeProps[o]===i&&t.push({inx:o,data:a({},i,s)}),t}),[]);for(var d=0;d<t.length;d++)if(void 0!==(t[d]||{}).data){var f=u(Object.entries(t[d].data)[0],2),y=f[0],b=f[1];void 0===this.pocket[c][y]?this.debug&&l("[$update] not a valid prop/value: { ".concat(y,":").concat(this.pocket[c][y]," }")):("data"===y&&(this.pocket[c][y]=!0===r?Object.assign({},this.pocket[c][y],b):b),"status"!==y&&"ref"!==y||(this.pocket[c][y]=b),h=!0)}// when setting new data, using `$set()` we should clear any cached Probes and realated data
// if(updated && type==='update') { }
return h&&"set"===i&&(this.clearStoreTransfers(c),this.$transfer_lastID===c&&(this.$transfer_lastID=""),this._$cached_data[c]&&delete this._$cached_data[c]),o(h)}
/**
       * - sets defer for `$ready()` initially after calling payload 
       * @param {*} id required
       */},{key:"setDefer",value:function(t){var r=this;if(!(t=v(t)))throw"id must be set";if(this._ready[t]||(this._ready[t]=_()),!e(this.pocket)){var n="[setDefer] probe is empty, so nothing set, id:".concat(t);return this.debug&&s(n),this._ready[t].reject(n),null}var i=Object.values(this.pocket).filter((function(e){return-1!==e.id.indexOf(t)}));if(!i.length){var o="[setDefer] no pocketSet found for id:".concat(t," ");return this.debug&&s(o),this._ready[t].reject(o),null}try{
/**
           * IMPORTANT:
           * when our pocketSet for each this.pocket[id] is marked 'complete'
           * `Probe().resolve(...)` is called, and Promise.all is waiting for `pocketSet` to complete
           */
return Promise.all(i.map((function(t){return t.sq.promise()}))).then((function(e){var n=e.map((function(t){return function(t){var e={};if(!p(t))return null;for(var n=0;n<r.probeProps.length;n++){var i=r.probeProps[n];t[i]&&(e[i]=t[i])}return e}(t.probe)})).filter((function(t){return!!t}));r._ready[t].resolve(n)}),(function(t){
// should unlikely happen since we dont have any rejects set
s("[setDefer] Promise.all",t)})),!0}catch(t){s("[setDefer]",t)}return!1}
/**
       * - distribute payloadData, each to `new Probe()`
       */},{key:"distributor",value:function(){for(var t=0,e=Object.entries(this.payloadData);t<e.length;t++){var r=u(e[t],2),n=r[0],i=r[1];if(!(this.lastPocketTimestamp>i.timestamp)&&"complete"!==i.status&&"send"!==i.status&&"error"!==i.status)// no new entries
// omit done
{var a,l=c(i.value.values());try{for(l.s();!(a=l.n()).done;){var h=o({id:n},a.value);this.setProbe(h)||s("probe for id:".concat(n," already exists"))}}catch(t){l.e(t)}finally{l.f()}}}return this}
/**
       * - every new probe `id` must be: format `id:::taskName`
       * required: `{id,task}`
       * optional: `{compaign}`
       * @param {*} opts
       */},{key:"setProbe",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!t.id||!t.task)throw"id and task both must be set";if(!v(t.id))throw"opts.id not valid";var e="".concat(t.id,"::").concat(t.task);if(this.pocket[e])return this.debug&&n("[setProbe] probe: ".concat(e," already set")),null;try{t.id=e;var r=null!==this.dispatcher?this._emit.bind(this):null,i=new this.Probe(t,r,this.debug);this.pocket[e]=i}catch(t){return s(t),null}return this.pocket[e]}
/**
       * set new probe model
       * - every new task has a set of requirements. Once status is `complete` and data available, probe sends a dispatch with probe information `(if opts.dispatcher===true)`.
       * methods:`{get,all}` props: `{id,data,task,status,compaign}`
       * 
       *  @param {*} opts.id required
       *  @param {*} opts.task required
       *  @param {*} opts.compaign optional
       * 
       * - `Probe` is resolved once `sq.resolve()` is called, sq => `Simple Q` our plugin
       */},{key:"_emit",
/**
       * - emit extends with `Dispatcher` to be used by every new Probe{} as an emitter `(if opts.dispatcher===true)`
       * @param {*} obj required
       */
value:function(t){if(!t)return null;if(!this.dispatcher)return null;try{return this.dispatcher.initListener().next(t),!0}catch(t){return s("[_emit] dispatcher did not emit"),null}}
/**
       * - delete completed `pocketSet`
       */},{key:"deletePocketSet",value:function(t){if(Object.values(this.pocket).length)for(var e=0,r=Object.values(this.pocket);e<r.length;e++){var n=r[e];this._$cached_data[n.id]&&delete this._$cached_data[n.id],n.id.includes(t)&&delete this.pocket[n.id]}this.payloadData[t]&&delete this.payloadData[t],this._ready[t]&&delete this._ready[t],// these  two are together
void 0!==this._projectSetDispatcher[t]&&delete this._projectSetDispatcher[t],this._projectSetAsync[t]&&delete this._projectSetAsync[t],this._lastFilterList[t]&&delete this._lastFilterList[t],// empty self
this.clearStoreTransfers(t)}},{key:"Probe",get:function(){return j()}}]),i}(k));return r(12)(O)}},
/* 1 */
/***/function(t,e,r){
/* eslint-disable no-proto */
// node.js/browser detection
/**
 * @Utils
 * my own lodash/like `Utils`
 */
e.uniq=t=>t.filter((t,e,r)=>r.indexOf(t)===e),e.objectSize=t=>t&&Object.prototype===t.__proto__?Object.entries(t).length:0,e.last=t=>t&&Array.prototype===t.__proto__?t[t.length-1]:null,e.copyBy=(t,e)=>e.reduce((e,r,n)=>(void 0!==t[r]&&(e[r]=t[r]),e),{}),e.validID=t=>t?(t||"").toString().toLowerCase():null,e.isNumber=t=>void 0!==t&&t.__proto__===Number.prototype,e.isPromise=t=>Promise.prototype===(t||{}).__proto__,e.uniq=t=>t.filter((t,e,r)=>r.indexOf(t)===e),e.isObject=t=>!!t&&(Object.prototype===t.__proto__||t instanceof Object),e.isArray=t=>!!t&&Array.prototype===t.__proto__,e.isString=t=>!!t&&String.prototype===t.__proto__,e.isFunction=t=>"function"==typeof t,e.copy=t=>{if(!t)return t;try{return JSON.parse(JSON.stringify(t))}catch(t){return t.toString()}}
/**
* - accepting object of messages, example: `{'001':['my message',001],...}`
* - returns : {'001':{message,code},...}
*/,e.errorMessages=t=>{const e={};for(let[r,n]of Object.entries(t))e[r]={message:n[0],code:r};return e};{
// when executing normally with node
const t=r(2),n=r(6);e.log=function(...e){e=(e=[].concat("[Pocket]",e)).map(e=>t.inspect(e,!1,3,!0)),console.log.apply(null,e)},e.warn=function(...e){e=(e=[].concat("[warning]",e)).map(e=>n.cyan(t.inspect(e,!1,2,!1),!0)),console.warn.apply(null,e)},e.onerror=function(...e){e=(e=[].concat("[error]",e)).map(e=>n.red(t.inspect(e,!1,2,!1),!0)),console.log("  "),console.error.apply(null,e),console.log("  ")}}
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
var n=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),r={},n=0;n<e.length;n++)r[e[n]]=Object.getOwnPropertyDescriptor(t,e[n]);return r},i=/%[sdj%]/g;e.format=function(t){if(!g(t)){for(var e=[],r=0;r<arguments.length;r++)e.push(a(arguments[r]));return e.join(" ")}r=1;for(var n=arguments,s=n.length,o=String(t).replace(i,(function(t){if("%%"===t)return"%";if(r>=s)return t;switch(t){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return t}})),u=n[r];r<s;u=n[++r])y(u)||!_(u)?o+=" "+u:o+=" "+a(u);return o},
// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
e.deprecate=function(r,n){if(void 0!==t&&!0===t.noDeprecation)return r;
// Allow for deprecating things in the process of starting up.
if(void 0===t)return function(){return e.deprecate(r,n).apply(this,arguments)};var i=!1;return function(){if(!i){if(t.throwDeprecation)throw new Error(n);t.traceDeprecation?console.trace(n):console.error(n),i=!0}return r.apply(this,arguments)}};var s,o={};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function a(t,r){
// default options
var n={seen:[],stylize:c};
// legacy...
return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),f(r)?
// legacy...
n.showHidden=r:r&&
// got an "options" object
e._extend(n,r),
// set default options
m(n.showHidden)&&(n.showHidden=!1),m(n.depth)&&(n.depth=2),m(n.colors)&&(n.colors=!1),m(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=u),l(n,t,n.depth)}function u(t,e){var r=a.styles[e];return r?"["+a.colors[r][0]+"m"+t+"["+a.colors[r][1]+"m":t}function c(t,e){return t}function l(t,r,n){
// Provide a hook for user-specified inspect functions.
// Check that value is an object with an inspect function on it
if(t.customInspect&&r&&O(r.inspect)&&
// Filter out the util module, it's inspect function is special
r.inspect!==e.inspect&&(!r.constructor||r.constructor.prototype!==r)){var i=r.inspect(n,t);return g(i)||(i=l(t,i,n)),i}
// Primitive types cannot have properties
var s=function(t,e){if(m(e))return t.stylize("undefined","undefined");if(g(e)){var r="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(r,"string")}return b(e)?t.stylize(""+e,"number"):f(e)?t.stylize(""+e,"boolean"):
// For some reason typeof null is "object", so special case here.
y(e)?t.stylize("null","null"):void 0}(t,r);if(s)return s;
// Look up the keys of the object.
var o=Object.keys(r),a=function(t){var e={};return t.forEach((function(t,r){e[t]=!0})),e}(o);
// IE doesn't make error fields non-enumerable
// http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
if(t.showHidden&&(o=Object.getOwnPropertyNames(r)),j(r)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return h(r);
// Some type of object without properties can be shortcutted.
if(0===o.length){if(O(r)){var u=r.name?": "+r.name:"";return t.stylize("[Function"+u+"]","special")}if(v(r))return t.stylize(RegExp.prototype.toString.call(r),"regexp");if(k(r))return t.stylize(Date.prototype.toString.call(r),"date");if(j(r))return h(r)}var c,_="",D=!1,P=["{","}"];
// Make Array say that they are Array
return p(r)&&(D=!0,P=["[","]"]),
// Make functions say that they are functions
O(r)&&(_=" [Function"+(r.name?": "+r.name:"")+"]"),
// Make RegExps say that they are RegExps
v(r)&&(_=" "+RegExp.prototype.toString.call(r)),
// Make dates with properties first say the date
k(r)&&(_=" "+Date.prototype.toUTCString.call(r)),
// Make error with message first say the error
j(r)&&(_=" "+h(r)),0!==o.length||D&&0!=r.length?n<0?v(r)?t.stylize(RegExp.prototype.toString.call(r),"regexp"):t.stylize("[Object]","special"):(t.seen.push(r),c=D?function(t,e,r,n,i){for(var s=[],o=0,a=e.length;o<a;++o)$(e,String(o))?s.push(d(t,e,r,n,String(o),!0)):s.push("");return i.forEach((function(i){i.match(/^\d+$/)||s.push(d(t,e,r,n,i,!0))})),s}(t,r,n,a,o):o.map((function(e){return d(t,r,n,a,e,D)})),t.seen.pop(),function(t,e,r){return t.reduce((function(t,e){return e.indexOf("\n"),t+e.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60?r[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+r[1]:r[0]+e+" "+t.join(", ")+" "+r[1]}
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
(c,_,P)):P[0]+_+P[1]}function h(t){return"["+Error.prototype.toString.call(t)+"]"}function d(t,e,r,n,i,s){var o,a,u;if((u=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]}).get?a=u.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):u.set&&(a=t.stylize("[Setter]","special")),$(n,i)||(o="["+i+"]"),a||(t.seen.indexOf(u.value)<0?(a=y(r)?l(t,u.value,null):l(t,u.value,r-1)).indexOf("\n")>-1&&(a=s?a.split("\n").map((function(t){return"  "+t})).join("\n").substr(2):"\n"+a.split("\n").map((function(t){return"   "+t})).join("\n")):a=t.stylize("[Circular]","special")),m(o)){if(s&&i.match(/^\d+$/))return a;(o=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=t.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=t.stylize(o,"string"))}return o+": "+a}function p(t){return Array.isArray(t)}function f(t){return"boolean"==typeof t}function y(t){return null===t}function b(t){return"number"==typeof t}function g(t){return"string"==typeof t}function m(t){return void 0===t}function v(t){return _(t)&&"[object RegExp]"===D(t)}function _(t){return"object"==typeof t&&null!==t}function k(t){return _(t)&&"[object Date]"===D(t)}function j(t){return _(t)&&("[object Error]"===D(t)||t instanceof Error)}function O(t){return"function"==typeof t}function D(t){return Object.prototype.toString.call(t)}function P(t){return t<10?"0"+t.toString(10):t.toString(10)}e.debuglog=function(r){if(m(s)&&(s=t.env.NODE_DEBUG||""),r=r.toUpperCase(),!o[r])if(new RegExp("\\b"+r+"\\b","i").test(s)){var n=t.pid;o[r]=function(){var t=e.format.apply(e,arguments);console.error("%s %d: %s",r,n,t)}}else o[r]=function(){};return o[r]},e.inspect=a,
// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},
// Don't use 'blue' not visible on cmd.exe
a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",
// "name": intentionally not styling
regexp:"red"},e.isArray=p,e.isBoolean=f,e.isNull=y,e.isNullOrUndefined=function(t){return null==t},e.isNumber=b,e.isString=g,e.isSymbol=function(t){return"symbol"==typeof t},e.isUndefined=m,e.isRegExp=v,e.isObject=_,e.isDate=k,e.isError=j,e.isFunction=O,e.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||// ES6 symbol
void 0===t},e.isBuffer=r(4);var w=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// 26 Feb 16:19:34
function S(){var t=new Date,e=[P(t.getHours()),P(t.getMinutes()),P(t.getSeconds())].join(":");return[t.getDate(),w[t.getMonth()],e].join(" ")}
// log is just a thin wrapper to console.log that prepends a timestamp
function $(t,e){return Object.prototype.hasOwnProperty.call(t,e)}e.log=function(){console.log("%s - %s",S(),e.format.apply(e,arguments))},
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
if(!e||!_(e))return t;for(var r=Object.keys(e),n=r.length;n--;)t[r[n]]=e[r[n]];return t};var x="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function I(t,e){
// `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
// Because `null` is a special error value in callbacks which means "no error
// occurred", we error-wrap so the callback consumer can distinguish between
// "the promise rejected with null" or "the promise fulfilled with undefined".
if(!t){var r=new Error("Promise was rejected with a falsy value");r.reason=t,t=r}return e(t)}e.promisify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');if(x&&t[x]){var e;if("function"!=typeof(e=t[x]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(e,x,{value:e,enumerable:!1,writable:!1,configurable:!0}),e}function e(){for(var e,r,n=new Promise((function(t,n){e=t,r=n})),i=[],s=0;s<arguments.length;s++)i.push(arguments[s]);i.push((function(t,n){t?r(t):e(n)}));try{t.apply(this,i)}catch(t){r(t)}return n}return Object.setPrototypeOf(e,Object.getPrototypeOf(t)),x&&Object.defineProperty(e,x,{value:e,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(e,n(t))},e.promisify.custom=x,e.callbackify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');
// We DO NOT return the promise as it gives the user a false sense that
// the promise is actually somehow related to the callback's execution
// and that the callback throwing will reject the promise.
function r(){for(var r=[],n=0;n<arguments.length;n++)r.push(arguments[n]);var i=r.pop();if("function"!=typeof i)throw new TypeError("The last argument must be of type Function");var s=this,o=function(){return i.apply(s,arguments)};
// In true node style we process the callback on `nextTick` with all the
// implications (stack, `uncaughtException`, `async_hooks`)
e.apply(this,r).then((function(e){t.nextTick(o,null,e)}),(function(e){t.nextTick(I,e,o)}))}return Object.setPrototypeOf(r,Object.getPrototypeOf(e)),Object.defineProperties(r,n(e)),r}}).call(this,r(3))
/***/},
/* 3 */
/***/function(t,e){
// shim for using process in browser
var r,n,i=t.exports={};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
function s(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(t){if(r===setTimeout)
//normal enviroments in sane situations
return setTimeout(t,0);
// if setTimeout wasn't available but was latter defined
if((r===s||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{
// when when somebody has screwed with setTimeout but no I.E. maddness
return r(t,0)}catch(e){try{
// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
return r.call(null,t,0)}catch(e){
// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:s}catch(t){r=s}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(t){n=o}}();var u,c=[],l=!1,h=-1;function d(){l&&u&&(l=!1,u.length?c=u.concat(c):h=-1,c.length&&p())}function p(){if(!l){var t=a(d);l=!0;for(var e=c.length;e;){for(u=c,c=[];++h<e;)u&&u[h].run();h=-1,e=c.length}u=null,l=!1,function(t){if(n===clearTimeout)
//normal enviroments in sane situations
return clearTimeout(t);
// if clearTimeout wasn't available but was latter defined
if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{
// when when somebody has screwed with setTimeout but no I.E. maddness
n(t)}catch(e){try{
// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
return n.call(null,t)}catch(e){
// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs setTimeout
return n.call(this,t)}}}(t)}}
// v8 likes predictible objects
function f(t,e){this.fun=t,this.array=e}function y(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];c.push(new f(t,e)),1!==c.length||l||a(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",// empty string to avoid regexp issues
i.versions={},i.on=y,i.addListener=y,i.once=y,i.off=y,i.removeListener=y,i.removeAllListeners=y,i.emit=y,i.prependListener=y,i.prependOnceListener=y,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},
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
/***/function(t,e){var r=e.bash_codes={BLACK:{text:"[0;30m",underline:"[4;30m",background:"[40m",bold:"[1;30m",hi_text:"[0;90m",hi_bold:"[1;90m",hi_background:"[0;100m"},RED:{text:"[0;31m",bold:"[1;31m",underline:"[4;31m",background:"[41m",hi_text:"[0;91m",hi_bold:"[1;91m",hi_background:"[0;101m"},GREEN:{text:"[0;32m",bold:"[1;32m",underline:"[4;32m",background:"[42m",hi_text:"[0;92m",hi_bold:"[1;92m",hi_background:"[0;102m"},YELLOW:{text:"[0;33m",bold:"[1;33m",underline:"[4;33m",background:"[43m",hi_text:"[0;93m",hi_bold:"[1;93m",hi_background:"[0;103m"},BLUE:{text:"[0;34m",bold:"[1;34m",underline:"[4;34m",background:"[44m",hi_text:"[0;94m",hi_bold:"[1;94m",hi_background:"[0;104m"},PURPLE:{text:"[0;35m",bold:"[1;35m",underline:"[4;35m",background:"[45m",hi_text:"[0;95m",hi_bold:"[1;95m",hi_background:"[0;105m"},CYAN:{text:"[0;36m",bold:"[1;36m",underline:"[4;36m",background:"[46m",hi_text:"[0;96m",hi_bold:"[1;96m",hi_background:"[0;106m"},WHITE:{text:"[0;37m",bold:"[1;37m",underline:"[4;37m",background:"[47m",hi_text:"[0;97m",hi_bold:"[1;97m",hi_background:"[0;107m"}};e.colors={BLACK:"BLACK",RED:"RED",GREEN:"GREEN",YELLOW:"YELLOW",BLUE:"BLUE",PURPLE:"PURPLE",CYAN:"CYAN",WHITE:"WHITE"};var n=e.styles={bold:"bold",underline:"underline",background:"background",hi_text:"hi_text",hi_bold:"hi_bold",hi_background:"hi_background"},i=e.REMOVE_COLOR="[0m";function s(t,e,r){return o(r?e.hi_text:e.text,t)}function o(t,e){return t+e+i}
/***/
// various logical inconsistencies in the code below - renderColor and wrap seem like they should be combined, but I'm letting wrap basically stand on its own
// in case anyone wants access to explicitly handle background or underline stuff. I feel like those are a bit more special-casey, and generally speakign
// users are going to want to quickly turn a word or phrase into a single color without worrying about background or underline. So the .colorName methods
// are just syntactic sugar.
e.wrap=function(t,e,i){return o(r[e.toUpperCase()][n[i]||"text"],t)},e.black=function(t,e){return s(t,r.BLACK,e)},e.red=function(t,e){return s(t,r.RED,e)},e.green=function(t,e){return s(t,r.GREEN,e)},e.yellow=function(t,e){return s(t,r.YELLOW,e)},e.blue=function(t,e){return s(t,r.BLUE,e)},e.purple=function(t,e){return s(t,r.PURPLE,e)},e.cyan=function(t,e){return s(t,r.CYAN,e)},e.white=function(t,e){return s(t,r.WHITE,e)}},
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
t.exports=()=>{const{objectSize:t,warn:e,onerror:n,validID:i,copy:s,log:o,isString:a}=r(1);return class{
/**
         * @param {*} opts.async, when set, allow $payload(`data`) to be async object
         * @param {*} opts.dispatcher, when set to true, loads external library `Dispatcher`
         * @param {*} debug optional
         */
constructor(t={},e){this.debug=e||!1,this.async=(t||{}).async||null,
// when set enables dispatcher to communicate directly with `probe.js`
this.dispatcher=(t||{}).dispatcher?r(10)():null,this.pocket={},// example this.pocket[`abc::taskName`] returns Probe{} Instance
this.payloadData={},// each payload by id
this.lastPocketTimestamp=0,this._lastProjectID=null,// last cached reference
this._lastProbeID=null,// last cached reference
this._$cached_data={/** id:{} */},// stores last captured data when calling `$data(..)`
this.$transfer_lastID="",// set when we call `$transfer()` and reset after `$to()`
this._ready={},// collect all ready example: `{id:Promise}`
this.d=void 0,// NOTE user reference data, carefull when using selectors from previous target, always access last
this._projectSet={/** projectID:promise */},this._transferCached=[],this._projectSetDispatcher={/** id:dispatcher */},this._projectSetAsync={/** id:SQ */},// collect all $projectSetAsync promisses
this._lastFilterList={/** id:[probes] */}}
/**
         * ### projectSetDispatcher
         * - create new dispather to act as a callback for setting new projects in future
         * - works with `$projectSetAsync`
         * @param {*} projectID 
         */projectSetDispatcher(t){return t?(this._projectSetDispatcher[t]||this._projectSetDispatcher[t]||(this._projectSetDispatcher[t]=r(10)(t)),this._projectSetDispatcher[t]):(this.debug&&n("[projectSetDispatcher] projectID must be set"),null)}
/**
         * @param {*} projectID
         * @returns array [Probe{},...] of selected project
         */projectProbeList(t){return Object.entries(this.pocket).filter(([e,r])=>0===e.indexOf(t)).map(([t,e])=>e)}
/**
         * ### clearStoreTransfers
         * - clear any pending transfers
         * @param {*} projectID required
         */clearStoreTransfers(t=""){if(!t)return;let e=!1;return this._transferCached.length&&this._transferCached.forEach((r,n)=>{const{fromProbeID:i}=r||{};i&&-1!==i.indexOf(t)&&(this._transferCached.splice(n,1),e=!0,this.debug&&o(`[clearStoreTransfers] transferCached for probeID: ${i} has been removed`))}),e}
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
         */accessLastValidTransfer(e=100){if(!this._transferCached.length)return{};this._transferCached.sort((t,e)=>t.timestamp-e.timestamp);const r=s(this._transferCached).reduce((t,r,n)=>{const{timestamp:i}=r,s=(new Date).getTime()+e;
// calculate max wait between transfers, so if we have timeout we can only wait as long as `fromAverageTimeHasPast` 
return s>i&&s-i-e<=e&&(t=r,
// delete found cache
this._transferCached.splice(n,1)),t},{});return t(r)?r:{}}
/**
         * ### selectByTask
         * - works with `PocketSelectors class`, when `::taskNames, taskName` are specified, extracts full probeID by matching previous pointer reference and updates `lastProbeID()`        
         * - returns valid probeID or null
         * @param {*} probeID {*} required, but optional
         */selectByTask(t="",r=null){if(t=a(t)?t:"",!this.idRegexValid(t)&&t)return null;if(t.indexOf(":")>0&&!this.pocket[t])return this.debug&&e("[selectByTask] when using '::' prefix selector, it should come at 0 index"),null;if(t.split(":").length>3||2===t.split(":").length)return this.debug&&e(`[selectByTask] wrong taskName :${t}, allowed prefix is '::taskName'`),null;// if a match we receive below updated `_lastProbeID` 
if(r&&this.lastProbeID(t,!0),this.pocket[t])return r&&this.lastProbeID(t),t;// we have a valid ref so use that
/**
             * - generate valid probeID `${projectID}::${probeTaskName}` //
             */const n=(t=>{const e=t.split("::")[1]||t;// in case we are using prefixed taskName, example "::cocacola"
return(this._lastProbeID||"").indexOf(e)>0&&e?this._lastProbeID:this._lastProjectID&&e?this._lastProjectID+"::"+e:this._lastProbeID})(t);return n?r&&this.lastProbeID(n):this.debug&&e("[selectByTask] newProbeID was not found from taskOrProbeID: "+t),n}
/**
         * ### lastProjectID
         * - every project is a job initiated by payload, so `payload.id === lastProjectID()`
         */lastProjectID(t="",e=null){return!t&&this._lastProjectID&&(t=this._lastProjectID),t&&(t=this.validProjectID(t,e)),t&&this.payloadData[t]&&(this._lastProjectID=t),this.payloadData[t]&&t||null}
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
         */validProjectID(t,e=null){return(t=i(t))?(t||"").split(" ").length>1?null:this.idRegexValid(t)?t:null:null}
/**
         * ### validProbe
         * - returns a valid probe
         * @param {*} probeID required
         */validProbe(t,r=null){return(t=i(t))?this.idRegexValid(t)?-1===t.indexOf("::")?null:this.pocket[t]?t:(this.debug&&null===r&&e("[get] did not find probe with probeID "+t),null):void 0:null}
/**
         * ### dataPropSelector
         * - works with `$data()` and `$cached()` user selectors 
         * - refer to `PocketSelectors` module
         * @param {*} probeID required
         * @param {*} dataProp optional
         * @param {*} self optional
         * @param {*} probeData{} required our referencing probeData{}
         */dataPropSelector(r="data()",n="",i={},s=!1,o={}){let a
/**
             * NOTE if calling via `$cached()`,  `probeData` already comes as `this._$cached_data` so dont need to cache  it again!
             */;try{
/**
                  * NOTE IMPORTANT
                  * assembly order: `dataProp < probeData > selectedData`
                  * if are asking for multiple, example `selectedData:{a,b,value:1111}`, will return those available 
                  * as an Object{}. But if asking for only 1 `selectedData:{value:1111}`, will return the value `11111`, only because we know what we asked for initially
                  */
return a=Object.entries(i).reduce((t,[e,r],n)=>(void 0!==o[e]&&(t[e]=o[e]),t),{}),t(a)||(a=void 0),
// selct only value if `dataProp` === `selectedData` is size ( 1 + 1 === 2 )
t(a)+t(i)===2&&(a=Object.values(a).shift()),
// if coming from `$data()` we cache our data 
"data()"===r&&(this._$cached_data[n]=a),s?this:a}catch(t){return this.debug&&e("[$data] no dataProp found on probeID: "+n),"data()"===r&&(this._$cached_data[n]=a),s?this:a}}idRegexValid(t){return!new RegExp(/[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi,"gi").test(t)||null}
/**
         * ### probeProps
         * - `each probe props that can be available and send on ready`
         * - `order is important, keep 'status' last`
         * - only updatable props are: `'compaign', 'data', 'status'(limited)`
         */get probeProps(){return["compaign","data","task","ref","id","status"]}}}
/***/},
/* 10 */
/***/function(t,e){
/**
 * requirejs global event handler
 */
t.exports=function(t,e=null){return new function(){const r="[dispatcher]";this.uid=(t||"").toString()||(new Date).getTime(),this.debug=e,this.cbQueue={},this.dispatchInstance={},this.initListener=()=>(this.Dispatch(),this)
/**
         * @next
         * send next data to the `batchReady` callback
         * @param {*} data # optional
         */,this.next=(t=null)=>(this.dispatchInstance[this.uid]?this.dispatchInstance[this.uid].next(t):this.debug&&console.log({message:r+" for uid not available",uid:this.uid}),this)
/**
     * @Dispatch
     * master listener, sends all event callbacks to `batchReady`
     * @param {*} cb
     */,this.Dispatch=()=>{if(this.dispatchInstance[this.uid])return this;const t=this;return this.dispatchInstance[this.uid]||(this.dispatchInstance[this.uid]=new function(){this.uid=t.uid,this.data=null,this.next=e=>{"cb"!==(e||{}).type&&(this.data=e
/**
                         * @next
                         * acts as a reverse callback, it sends back the `cb` from `batchReady`
                         */),"cb"!==(e||{}).type?this.data?"function"==typeof t.cbQueue[t.uid]&&t.cbQueue[t.uid].call(t,this.data,t.uid):this.debug&&console.log(r+" no callback data"):"function"==typeof e.cb&&(
// when calling next before batchReady is initiated
// collect cb from .next
t.cbQueue[t.uid]||(t.cbQueue[t.uid]=e.cb),this.data&&e.cb.call(t,this.data,t.uid))}}),this},this.del=()=>(delete this.cbQueue[this.uid],delete this.dispatchInstance[this.uid],!this.cbQueue[this.uid]&&this.dispatchInstance[this.uid],this)
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
const{isString:t,warn:e,log:n,isNumber:i,onerror:s,last:o,copy:a,isObject:u}=r(1),c=r(7);// nice and simple promise/defer by `eaglex.net`
return class{
/**
         * @param {*} opts.id required, case sensitive, all will be toLowerCase() 
         * @param {*} opts.task once set cannot be changed
         * @param {*} opts.compaign optional, once set cannot be changed
         * @param {*} opts.data optional any value except undefind, cannot be change once status set to `complete` or send
         * @param {*} opts.status required to control Probe actions
         * @param {*} emitter optional, dispatcher/emmiter available if not null
         * @param {*} debug 
         */
constructor(e={},r,n){if(this.debug=n||!1,(i(e.id)||e.id)&&(e.id=e.id.toString()),!e.task||!t(e.task))throw"task as string is required";this._id=null,this._ref=null,this._task=null,this._status=null,this._data=null,this._compaign=null,this._dataIndex=0,this._statusIndex=0,this._statusAsync=[],// dynamic promise changer
this.emitter=r||null,this.task=e.task,this.id=e.id,this.status="open",
// assign initial data if differs from default
e.ref!==this._ref&&(this.ref=e.ref),e.data!==this._data&&(this.data=e.data),e.compaign&&(this.compaign=e.compaign)}
/**
         * nice and easy, save some coding, and added security
         */get sq(){return this._sq||(this._sq=c()),this._sq}set id(t){if(this._id)return void(this.debug&&e("cannot update already set id: "+this._id));if(!t)throw"id is required";if(t.split(" ").length>1)throw"each id cannot have spaces";if(-1===t.indexOf("::"))throw"each id must be of format id::taskName";if(-1!==t.indexOf(":::"))throw"each id must be of format id::taskName";
// validate chars
const r=/[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi;if(new RegExp(r,"gi").test(t))throw"your id is invalid, allowed chars: "+r;if(-1===(t=t.replace(/ /gi,"_").toLowerCase()).indexOf(this._task))throw"wrong id setup, your id should make up the taks name, example: id='cocacola::drink'";this._id=t}get id(){return this._id}get ref(){return this._ref}
/**
         * - acceps string, can only be set when status isnt complete
         * - can be used to find your Pocket by particular `ref`
         */set ref(r){r&&(t(r)?"complete"!==this.status&&"send"!==this._compaign.status&&(this._ref=r):e("[ref] must be a string"))}get compaign(){return this._compaign}set compaign(r){void 0!==r&&(this._compaign?this.debug&&e("cannot update already set compaign "+this._compaign):r&&(t(r)?this._compaign=r:this.debug&&e("compaign must be a string",r)))}set task(r){if(void 0===r)return;if(this._task)return void(this.debug&&e("cannot update already set task"));if(!r)return;if(!t(r))return void(this.debug&&e("task must be a string"));if(-1!==r.indexOf("::"))throw"task seperator :: is restricted";if(r.split(" ").length>1)throw"task cannot have spaces, use seperators: _+";const n=/[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi;if(new RegExp(n,"gi").test(r))throw"your task is invalid, allowed chars: "+n;this._task=r.replace(/ /gi,"_").toLowerCase();// every task must be valid with required 
}get task(){return this._task}set data(t){if(void 0!==t)return"complete"===this.status||"send"===this.status?(
// NOTE this can also happen if you are using $transfer().$to from `PocketModule` that is a delayed
this.debug&&e("you cannot update data once the status is complete or send"),null):(this._dataIndex++,"open"===this.status&&null!==this._data&&this._dataIndex>1&&(this.status="updated"),void(this._data=t));
/**
            * cannot be updated uppon status is send || complete
            */}get data(){return this._data}
/**
         * ### update
         * - update data of current Probe{}.data
         * @param {*} data:any, required
         * @param {*} merge:Boolean, optional for merging object to this.data
         */update(t,r=null){return"complete"===this.status||"send"===this.status?(this.debug&&e("[Probe][update] cannot update data on complete status"),this):!u(t)&&r?(this.debug&&e("[Probe][update] cannot update none object 'data' with option 'merge=true' set"),this):(u(t)&&r?this.data=Object.assign({},this.data,t):void 0!==t&&(this.data=t),this)}
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
(r=>{try{
// meaning do not allow any status changes beond `updated`
if(this.statusStackOrder[r].value>2&&!0===this.statusStackOrder[r].set)return!1}catch(t){s("statusStackOrder invalid status")}if("complete"===this._status||"send"===this._status)return this.debug&&e("cannot update status if already complete, id:"+this.id),!1;switch(r){case"open":if("updated"===this._status){this.debug&&e("cannot set status back to open once set to updated");break}this._status=r,this.statusStackOrder[r].set=!0,this.onOpenStatus(t),// emit probe when status opens
this.setStatusAsync=r;break;case"updated":if("complete"===this._status){this.debug&&e("cannot update status to 'updated' then previously set to 'complete'");break}this._dataIndex>0&&(this._status=r,this.statusStackOrder[r].set=!0,this.setStatusAsync=r,this.debug&&n(`id:${this.id}, data updated`));break;case"complete":this.statusStackOrder[r].set=!0,this.setStatusAsync=r,
// setTimeout(()=>{
this._status=r,this.onComplete(t);// resolve probe when status complete
//  })
break;case"send":if("complete"!==this._status){this.debug&&e("cannot update status to 'send' then previously not set to 'complete'");break}this._status=r,this.statusStackOrder[r].set=!0,this.setStatusAsync=r;break;case"error":if("complete"===this._status)return;
// when we have error we need to inform what happen, and close the Probe
this.statusStackOrder[r].set=!0,this.setStatusAsync=r,this.onComplete(t);// resolve probe when status complete                     
break;default:this.debug&&e(`id:${this.id},  you set invalid status: ${r}, nothing changed`)}})(t)}
/**
         * - works with `statusAsync`
         * - (1.) setter creates our new sq() promise every time, and allows use or resolve 
         * - to use example: setStatusAsync.resolve()
         */set setStatusAsync(t){
// 'v'  set to anything to initiate setter
const e={timestamp:(new Date).getTime(),p:c()};this._statusAsync.push(e)}get setStatusAsync(){const t=o(this._statusAsync.sort((t,e)=>t.timestamp-e.timestamp).map(t=>t.p));// << we are unly returning
return t.resolve(a(this.status)),t}
/**
         * ### statusAsync
         * - dynamic promise resolver with `Simple Q` from `eaglex.net`
         * - works with `setStatusAsync` setter/getter
         * - return last 'resolve' status from last `timestamp` setting
         */get getStatusAsync(){return this.setStatusAsync.promise()}
/**
         * - alias of `getStatusAsync`
         * @readonly
         */get statusAsync(){return this.getStatusAsync}all(){return{ref:this.ref,compaign:this.compaign,data:this.data,id:this.id,task:this.task,status:this.status}}
/**
         * status watch, when current status changes execute send
         * @param {*} status
         */onComplete(t){("complete"===t||"error"===t)&&"send"!==this._status&&this._dataIndex>0&&(this.emitter&&setTimeout(()=>{this.emitter({probe:this,status:t})}),this.sq.resolve({probe:this.all()}),this._status="send")}
/**
         * do something on open task, this means we start request for data
         * @param {*} status
         */onOpenStatus(t){"open"===t&&this.emitter&&setTimeout(()=>{this.emitter({probe:this,status:"open"})})}}}
/***/},
/* 12 */
/***/function(t,e,r){
/**
 * ### PocketSelectors
 * - Extends PocketModule using selectors for better access to Probes
 * - allow selecttion to refference by, example:  `taskName`, `::taskName` and `${projectID}::taskName`, thanks to `selectByTask()` method
 */
t.exports=t=>{const{copy:e,warn:n,isArray:i,onerror:s,objectSize:o,isString:a,uniq:u,isFunction:c}=r(1);return class extends t{constructor(t,e){super(t,e)}
// extending original `$probeStatusAsync`
$probeStatusAsync(t=""){
// allow use of short ref names example: `::cocalola`
t=this.selectByTask(t,!0);let e=this.lastProbeID(t);return super.$probeStatusAsync(e)}
// extending original `$get`
$get(t,e){
// allow use of short ref names example: `::cocalola`
t=this.selectByTask(t,!0);let r=this.lastProbeID(t);return super.$get(r,e)}
/**
         * - return array of Probes matched by ref
         * @param {*} probeRef, required
         * @returns [Probe{},...] array
         */$getByRef(t=""){return Object.assign(this.pocket).filter(([e,r],n)=>r.ref===t)}
// extending original `$set`
$set(t,e){
// allow use of short ref names example: `::cocalola`
e=this.selectByTask(e,!0);let r=this.lastProbeID(e);return super.$set(t,r)}
/**
         * ### $probe
         * - return me as Probe{}, similar as $get(...), although does additional check for instanceOf Probe{}
         * @param {*} probeID 
         */$probe(t=""){
// allow use of short ref names example: `::cocalola`
t=this.selectByTask(t,!0);let e=this.lastProbeID(t);if(this.pocket[e]){if("Probe"===this.pocket[e].constructor.name)return this.pocket[e];this.debug&&s(`[$probe] probeID: ${t} is not an instance of Probe{}`)}else this.debug&&n("[$probe] not found for probeID: "+t)}
// extending original `$update`
$update(t,e,r){
// allow use of short ref names example: `::cocalola`
r=this.selectByTask(r,!0);let n=this.lastProbeID(r);return super.$update(t,e,n)}
/**
         * ### $select
         * - select current payloadID/project/job by id you are working on
         * @param {*} projectID optional/sensitive, selects new point of reference.
         */$select(t=""){// also updates last selector reference
return t=a(t)?t:"",this.lastProjectID(t),this}
/**
         * ### $filter
         * - filter works together with `$compute` or standalone when specified `.d` to return filtered `list`
         * @param {*} cb 
         * @param {*} projectID 
         */$filter(t,e){e=this.lastProjectID(e);// also updates last selector reference
const r=t=>(this.d=t,this);return c(t)?this.payloadData[e]?(this._lastFilterList[e]=[],this.projectProbeList(e).forEach((r,n)=>{const i=t.call(r,r);void 0===i||!0!==i&&1!==i||this._lastFilterList[e].push(r)}),r(this._lastFilterList[e])):(this.debug&&n("[$filter] no projectID found"),r(null)):r([])}
/**
         * ### $compute
         * - iterate thru each Probe{}/ instance in a callback, and make changes to it
         * @param {*} cb((probe, probeID)=>this/self.data) required
         * @param {*} projectID optional/sensitive, selects new point of reference.
         */$compute(t,e=""){e=this.lastProjectID(e);const r=t=>(
// delete last filtered list after it was consumed
t&&delete this._lastFilterList[e],this.d=t,this);return c(t)?this.payloadData[e]?(this._lastFilterList[e]||[]).length?(this._lastFilterList[e].forEach(e=>t.call(e,e)),r(this._lastFilterList[e])):(this.projectProbeList(e).forEach(e=>t.call(e,e)),r(this.projectProbeList(e))):(this.debug&&n("[$compute] no project found fo your/last id projectID:"+e),r(null)):(this.debug&&n("[$compute] cb must be a function"),r(null))}
/**
         * ### $list
         * - list active Probes{} by project id, should return all assigned probe/tasks regardless of status
         * - returns array[] of active Probe{}/tasks or []
         * @param {*} projectID optional/sensitive, selects new point of reference.
         * @param {*} cb((probe, probeID)=>) optional, when set will loop thru each Probe{} in callback
         * @param {*} type optional, set to `list`, will return latest Probes, that includes if initiated cb and made a few changes
         */$list(t="",e=null,r="self"){if(t=this.lastProjectID(t),!this.payloadData[t])return[];const n=()=>Object.entries(this.pocket).reduce((e,[r,n],i)=>(n.id.includes(t)&&e.push(n),e),[]);return c(e)?(this.projectProbeList(t).forEach(t=>e.call(t,t)),"self"!==r&&r?"list"===r?n():void 0:this):n()}
/**
         * ### $transfer
         * - select data from `fromProbeID` and hold it in `_transferCache`, until `$to(probeID)` is called
         * - warning, action removes `Probe[fromProbeID].data` and overrides it on Probe[probeID].data, only when `$to(probeID)` is called, simple as that!
         * @param {*} fromProbeID optional/sensitive, selects new point of reference.
         */$transfer(t=""){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),t=this.lastProbeID(t),this.pocket[t]?(this.storeTransfers(t,e(this.pocket[t].data)),
// NOTE needed for extra security to make sure it was called before we can update `$to()`
this.$transfer_lastID=t,this):(this.debug&&n("[$transfer] no Probe{} found for this id fromProbeID:"+t),this)}
/**
         * ### $to
         * - works together with `$transfer`, will transfer `data` from one Probe{} to another
         * if `_transferCache` is set, the cache is cleared.
         * @param {*} toProbeID optional/sensitive, points to Probe{} `data` will be packed, it is not previous reference pointer, but the next.
         * @param {*} pointToThisProbe to stay on the current pointer reference
         * @param {*} maxDelay, keep at minimum! Time between transaction can take place, relates to `fromAverageTimeHasPast` found in `accessLastValidTransfer()`
         */$to(t="",e=!0,r=100){if(
// allow use of short ref names example: `::cocalola`
t=this.selectByTask(t,e),
// if (!keepLastPointerReference) toProbeID = this.lastProbeID(toProbeID)
e&&(t=this.validProbe(t)),!t)return this.debug&&n("[$to] toProbeID is invalid"),this;if(!this.pocket[t])return this.debug&&n("[$to] no Probe{} found for this id toProbeID:"+t),this;if(this.$transfer_lastID){
// please note because this can be a delayed transaction, if you send `status=complete`
// the data will not be updated
const e=this.accessLastValidTransfer(r);if(o(e)){const{fromProbeID:r,data:n}=e;this.$transfer_lastID===r&&(this.pocket[r].data=null,// from $transfer 
this.pocket[t].data=n)}else this.debug&&n("[$to] no last valid transfer found");this.$transfer_lastID=""}return this}
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
         */$data(t=null/** {}||[] */,r="",n=!1){
// allow use of short ref names example: `::cocalola`
return r=this.selectByTask(r,!0),this.pocket[r]?(
// NOTE can provide as an array
i(t)&&(t||[]).length&&(t=u(t).reduce((t,e)=>(void 0!==e&&(t[e.trim()]=!0),t),{})),t&&o(t)?this.dataPropSelector("data()",r,t,n,e(this.pocket[r].data)):(this._$cached_data[r]=e(this.pocket[r].data),n?this:this._$cached_data[r])):n?this:void 0}
/**
         * ### cached
         * - grabs last cached `$data(...)` from Probe{}
         * @param {*} dataProp{}/String optional, know what you are asking for example: ` {assets:true}/ or > 'assets,values,somethingElse'`, it has catch error exception, so you wont receive any errors just `null`
         * will return all available matched within our `_$cached_data[probeID]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be retured
         * @param {*} probeID 
         */$cached(t={},e=""){if(e=this.selectByTask(e,!0),!this.pocket[e])return;const r=void 0!==this._$cached_data[e]&&null!==this._$cached_data[e];return r?(
// if you provided a string make it an object
a(t)&&(t||"").length&&(t=u(t.trim().replace(/ /gi,"").split(",")).reduce((t,e)=>(void 0!==e&&(t[e]=!0),t),{})),
// return cached data if its not an object, or undefined
!o(this._$cached_data[e])&&r?o(t)?void 0:this._$cached_data[e]:
// no selection at all, so just return whats available
t&&o(t)?this.dataPropSelector("cached()",e,t,!1,this._$cached_data[e]):void 0===this._$cached_data[e]?void 0:this._$cached_data[e]):void 0}
/**
         * ### $compaign
         * - returns Object copy of `Probe['compaign']` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */$compaign(t){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),this.pocket[t]?e(this.pocket[t].compaign):null}
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
         * ### $all
         * - return Object copy of all setters: `{id,status,compaign,task,data}` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */$all(t){
// allow use of short ref names example: `::cocalola`
return t=this.selectByTask(t,!0),this.pocket[t]?e(this.pocket[t].all()):null}}}
/***/}
/******/]));