module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

exports.PocketModule = function () {
  // const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE
  var _require = __webpack_require__(1),
      objectSize = _require.objectSize,
      log = _require.log,
      onerror = _require.onerror,
      warn = _require.warn,
      isArray = _require.isArray,
      isObject = _require.isObject,
      isPromise = _require.isPromise,
      validID = _require.validID;

  var sq = __webpack_require__(7); // nice and simple promise/defer by `eaglex.net`


  var PocketLibs = __webpack_require__(9)();

  var newProbe = __webpack_require__(11).Probe;
  /**
   * TODO ADD to $update `// action/[merge], action/+-*` using regEx
   */


  var PocketModule = /*#__PURE__*/function (_PocketLibs) {
    _inherits(PocketModule, _PocketLibs);

    var _super = _createSuper(PocketModule);

    function PocketModule(opts, debug) {
      var _this;

      _classCallCheck(this, PocketModule);

      _this = _super.call(this, opts, debug);

      if (_this.dispatcher) {
        _this.dispatcher.initListener().subscribe(function (z, id) {
          var _ref = z || {},
              probe = _ref.probe,
              status = _ref.status;

          if (status === 'error') {
            // NOTE dispatch data out
            if (_this.debug) log("[dispatcher] probe id:".concat(probe.id, " error"));
          }

          if (status === 'open') {
            if (_this.debug) log("[dispatcher] probe id:".concat(probe.id, " created"));
          }

          if (status === 'complete') {
            // NOTE dispatch data out
            if (_this.debug) log("[dispatcher] probe id:".concat(probe.id, " completed"));
          }
        });
      }

      return _this;
    } // ───────────────────────────────────────────────────────────────────────────────────────
    //   :::::: U S E R   A P P L I C A T I O N   C A L L I N G   M E T H O D S : :  :   :    : 
    // ───────────────────────────────────────────────────────────────────────────────────────
    //

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
     */


    _createClass(PocketModule, [{
      key: "$payload",
      value: function $payload() {
        var _this2 = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var async = arguments.length > 1 ? arguments[1] : undefined;
        var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'new';
        this.d = null;
        var isUpdated = null; // validate payload format

        if (!isObject(data)) return false;
        var keys = Object.keys(data); // must match all keys

        if (keys.every(function (el) {
          return ['id', 'tasks'].indexOf(el) === -1;
        })) {
          if (this.debug) onerror("[$payload] id and tasks are required");
          return false;
        }

        if (!isArray(data['tasks'])) {
          if (this.debug) onerror("[$payload] data.tasks must be an array");
          return false;
        }

        data.id = this.validProjectID(data.id);

        if (!data.id) {
          if (this.debug) onerror("[$payload] data.id invalid");
          return false;
        }

        if (this.payloadData[data.id] && (!type || type === 'new')) {
          if (this.debug) warn("[$payload] this payload.id already exists");
          return false;
        }

        var initialProject = this.payloadData[data.id] === undefined; // because there is no data set as of yet
        // NOTE validate our pocket values before generating each `new Probe()`

        var _iterator = _createForOfIteratorHelper(data['tasks'].values()),
            _step;

        try {
          var _loop = function _loop() {
            var val = _step.value;

            if (!val['task']) {
              if (_this2.debug) warn('[$payload] task must be set for your tasks');
              return "continue";
            } // validate task 


            if (!_this2.idRegexValid(val['task']) || val['task'].indexOf('::') !== -1) {
              if (_this2.debug) warn('[$payload] invalid taskName, failed idRegexValid validation');
              return "continue";
            }

            if (type === 'update' && !initialProject) {
              if (val['data']) _this2.$update({
                data: val['data']
              }, false, "::".concat(val['task']));
              if (val['status']) _this2.$update({
                status: val['status']
              }, false, "::".concat(val['task']));
              if (_this2.$status("::".concat(val['task']))) isUpdated = true; // NOTE after update, payloadData will differ from new Probe{} data
              // NOTE do not update `payloadData` it is redundant if we donot need it for anything, only update Probes{}
              /// this.payloadData[data.id]['value']
              // an existing project do not everride

              return "continue";
            }

            if (!_this2.payloadData[data.id]) _this2.payloadData[data.id] = {
              value: [],
              status: 'open',
              timestamp: new Date().getTime()
            };

            var exists = _this2.payloadData[data.id]['value'].filter(function (z) {
              return z.task.indexOf(val.task) !== -1;
            });

            if (exists.length) {
              if (_this2.debug) warn("the same task \"".concat(val.task, "\" already exists on the payload, you must choose uniq"));
              return "continue";
            }

            _this2.payloadData[data.id]['value'].push(val);

            _this2.lastPocketTimestamp = _this2.payloadData[data.id]['timestamp'];
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _ret = _loop();

            if (_ret === "continue") continue;
          } // only when updating existance of Probe{}

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (type === 'update' && this.payloadData[data.id] && !initialProject) return isUpdated;

        if (this.payloadData[data.id]) {
          this.lastProjectID(data.id);
          this.distributor().setDefer(data.id); // NOTE required in order for $projectSetAsync to retrun callback to resolve our promise

          this.projectSetDispatcher(data.id).initListener().next({
            projectID: data.id
          });
          return true;
        } else return false;
      }
      /**
       * ### $projectSetAsync
       * - usage: to call before `$project()/$payload()` were even called
       * - for example you have loaded same `Pocket` instance in another part of your code, now checking for it  in future before even created, this method can `await $projectSetAsync(projectID)` and continue with already set `$project(...).$get(..).$update(..)` etc
       * @param {*} projectID required, this is your `$project/$payload` id
       */

    }, {
      key: "$projectSetAsync",
      value: function $projectSetAsync() {
        var projectID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var self = this;

        if (this._projectSetAsync[projectID]) {
          return this._projectSetAsync[projectID].promise();
        }
        /**
         * will subscribe when called the first time and set our simple promise then will resolve once the `$payload` is succesfull
         */


        this._projectSetAsync[projectID] = sq();
        this.projectSetDispatcher(projectID).initListener().subscribe(function (z, id) {
          self._projectSetAsync[id].resolve(z);

          this.del(); // deletes projectSetDispatcher of self 
        });
        return this._projectSetAsync[projectID].promise();
      }
      /**
       * ### $projectSet
       * - use it to check if project already available, it is similar to `$projectSetAsync` but not a promise, returns current status, not in future
       * @param {*} projectID required
       */

    }, {
      key: "$projectSet",
      value: function $projectSet() {
        var projectID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        projectID = this.validProjectID(projectID);
        if (this.payloadData[projectID]) return true;
        return false;
      }
      /**
       * ### $probeStatusAsync
       * - return last probe status, this is a dynamic Promise, creates new promise every time status is changed, so then it needs to bu called again to get latest update
       * @param {*} probeID 
       */

    }, {
      key: "$probeStatusAsync",
      value: function $probeStatusAsync() {
        var _this3 = this;

        var probeID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var returnAs = function returnAs(val) {
          _this3.d = val;
          return _this3;
        };

        probeID = this.lastProbeID(probeID);
        if (!probeID) return returnAs(null);
        return returnAs(this.pocket[probeID].getStatusAsync);
      }
      /**
       * ### $get
        * - `get probe by 'id::taskName'`
        * - `returns instance`
        *  methods:`{get,all}` props: `{id,data,tasks,status}`
        * @param {*} probeID required, example format: `${payload.id}::taskName`
        * @param {*} self = false optional, in case you want to chain, and access `Probe{}` through `...).d`
       */

    }, {
      key: "$get",
      value: function $get() {
        var _this4 = this;

        var probeID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var self = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var returnAs = function returnAs(val) {
          _this4.d = val;
          return self ? _this4 : _this4.d;
        };

        this.d = null;
        probeID = this.lastProbeID(probeID);
        if (!probeID) return returnAs(null);else return returnAs(this.pocket[probeID]);
      }
      /**
       * ### $update
       * - update Probe/task, for convenience, so we dont have do this, example: `pc.$get('abc123::grab').status='complete'`
       * @param {*} dataFrom required, must specify what to update on Probe{}, example: `dataFrom:{data:'coke',status:'complete',compaign:'cocacola'}`
       * @prop {*} mergeData optional if `true` will merge: `Object.assing({},probe[id].data,mergeData['data'])`
       * @param {*} probeID required, example format: `${payload.id}::taskName`
       */

    }, {
      key: "$update",
      value: function $update(dataFrom) {
        var mergeData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var probeID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        return this._setUpdate(dataFrom, mergeData, probeID, 'update');
      }
      /**
       * ### $set
       * - as name suggest sets up new new data for Probe/task, it derives from `$update` 
       * @param {*} dataFrom required, must specify what to set on Probe{}, example: `dataFrom:{data:'coke',status:'complete',compaign:'cocacola'}`
       * - we should only use `$set` for initialization, this action also calls `clearStoreTransfers`
       * @param {*} probeID required, example format: `${payload.id}::taskName`
       */

    }, {
      key: "$set",
      value: function $set(dataFrom) {
        var probeID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        return this._setUpdate(dataFrom, null, probeID, 'set');
      }
      /**
       * ### $activeTasks
       * - list any active tasks for assigned Probes
       * @param {*} payloadID optional, when set will only filter thru given job id (NOT Probe{} ID!)
       */

    }, {
      key: "$activeTasks",
      value: function $activeTasks() {
        var _this5 = this;

        var payloadID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var returnAs = function returnAs(val) {
          _this5.d = val;
          return _this5;
        };

        payloadID = this.lastProjectID(payloadID);
        if (!objectSize(this.pocket)) return returnAs([]);
        var tasks = Object.entries(this.pocket).reduce(function (n, _ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              probeID = _ref3[0],
              probe = _ref3[1];

          if (probeID.indexOf(payloadID || '') === 0 && payloadID && _this5.payloadData[payloadID]) n.push(probe['task']);else if (!payloadID) n.push(probe['task']);
          return n;
        }, []);
        return returnAs(tasks);
      }
    }, {
      key: "$ready",
      value: function $ready() {
        var payloadID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        this.d = null;
        payloadID = this.lastProjectID(payloadID);
        if (!payloadID) throw "payloadID must be set";
        if (!this._ready[payloadID]) throw "ready[payloadID] is not set, maybe you called it before $payload()";
        return this._ready[payloadID].promise();
      } //
      // ──────────────────────────────────────────────────────
      //   :::::: E N D : :  :   :    :     :        :          
      // ──────────────────────────────────────────────────────  
      // extends  `$update` and `$set`

    }, {
      key: "_setUpdate",
      value: function _setUpdate(dataFrom) {
        var _this6 = this;

        var mergeData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var probeID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
        var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'update';

        var returnAs = function returnAs(val) {
          _this6.d = val;
          return _this6;
        };

        var id = this.lastProbeID(probeID);

        if (!id) {
          if (this.debug) onerror("[$update] must specify id");
          return returnAs(false);
        }

        if (!isObject(dataFrom)) {
          if (this.debug) warn("[$update] dataFrom must be an ");
          return returnAs(false);
        }

        if (!this.pocket[id]) {
          if (this.debug) onerror("[$update] this.pocket with id:".concat(id, " not found"));
          return returnAs(false);
        }

        var updated = false; // reorder dataFrom, make sure if `status` exists, it is shifted to last position, so the Probe{} doent change state before other values got chance to do so, nice!
        // we need to convert dataFrom{} to dataFrom[]>array to achieve this

        dataFrom = Object.entries(dataFrom).reduce(function (n, _ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              key = _ref5[0],
              value = _ref5[1];

          var pos = _this6.probeProps.indexOf(key); // new order


          if (_this6.probeProps[pos] === key) n.push({
            inx: pos,
            data: _defineProperty({}, key, value)
          });
          return n;
        }, []);

        for (var inx = 0; inx < dataFrom.length; inx++) {
          if ((dataFrom[inx] || {})['data'] === undefined) continue;

          var _Object$entries$ = _slicedToArray(Object.entries(dataFrom[inx]['data'])[0], 2),
              key = _Object$entries$[0],
              value = _Object$entries$[1];

          if (this.pocket[id][key] !== undefined) {
            if (key === 'data') {
              if (mergeData === true) this.pocket[id][key] = Object.assign({}, this.pocket[id][key], value);else this.pocket[id][key] = value;
            }

            if (key === 'status' || key === 'ref') this.pocket[id][key] = value;
            updated = true;
            continue;
          } else {
            if (this.debug) warn("[$update] not a valid prop/value: { ".concat(key, ":").concat(this.pocket[id][key], " }"));
          }
        } // when setting new data, using `$set()` we should clear any cached Probes and realated data


        if (updated && type === 'set') {
          this.clearStoreTransfers(id);
          if (this.$transfer_lastID === id) this.$transfer_lastID = '';
          if (this._$cached_data[id]) delete this._$cached_data[id];
        } // if(updated && type==='update') { }


        return returnAs(updated);
      }
      /**
       * - sets defer for `$ready()` initially after calling payload 
       * @param {*} id required
       */

    }, {
      key: "setDefer",
      value: function setDefer(id) {
        var _this7 = this;

        id = validID(id);
        if (!id) throw 'id must be set';
        if (!this._ready[id]) this._ready[id] = sq();

        if (!objectSize(this.pocket)) {
          var msg = "[setDefer] probe is empty, so nothing set, id:".concat(id);
          if (this.debug) onerror(msg);

          this._ready[id].reject(msg);

          return null;
        }

        var pocketSet = Object.values(this.pocket).filter(function (z) {
          return z.id.indexOf(id) !== -1;
        });

        if (!pocketSet.length) {
          var _msg = "[setDefer] no pocketSet found for id:".concat(id, " ");

          if (this.debug) onerror(_msg);

          this._ready[id].reject(_msg);

          return null;
        }

        try {
          var userOutput = function userOutput(pock) {
            var output = {};
            if (!isObject(pock)) return null;

            for (var i = 0; i < _this7.probeProps.length; i++) {
              var prop = _this7.probeProps[i];
              if (pock[prop]) output[prop] = pock[prop];
            }

            return output;
          };
          /**
           * IMPORTANT:
           * when our pocketSet for each this.pocket[id] is marked 'complete'
           * `Probe().resolve(...)` is called, and Promise.all is waiting for `pocketSet` to complete
           */


          Promise.all(pocketSet.map(function (z) {
            return z.sq.promise();
          })).then(function (z) {
            var output = z.map(function (p) {
              return userOutput(p.probe);
            }).filter(function (n) {
              return !!n;
            });

            _this7._ready[id].resolve(output);
          }, function (err) {
            // should unlikely happen since we dont have any rejects set
            onerror("[setDefer] Promise.all", err);
          });
          return true;
        } catch (err) {
          onerror("[setDefer]", err);
        }

        return false;
      }
      /**
       * - distribute payloadData, each to `new Probe()`
       */

    }, {
      key: "distributor",
      value: function distributor() {
        for (var _i2 = 0, _Object$entries = Object.entries(this.payloadData); _i2 < _Object$entries.length; _i2++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
              key = _Object$entries$_i[0],
              el = _Object$entries$_i[1];

          if (this.lastPocketTimestamp > el['timestamp']) continue; // no new entries
          // omit done

          if (el.status === 'complete' || el.status === 'send' || el.status === 'error') continue;

          var _iterator2 = _createForOfIteratorHelper(el.value.values()),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var value = _step2.value;

              var pl = _objectSpread({
                id: key
              }, value);

              var pocketSet = this.setProbe(pl);
              if (!pocketSet) onerror("probe for id:".concat(key, " already exists"));
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        return this;
      }
      /**
       * - every new probe `id` must be: format `id:::taskName`
       * required: `{id,task}`
       * optional: `{compaign}`
       * @param {*} opts
       */

    }, {
      key: "setProbe",
      value: function setProbe() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (!opts.id || !opts.task) throw 'id and task both must be set';
        if (!validID(opts.id)) throw 'opts.id not valid';
        var uid = "".concat(opts.id, "::").concat(opts.task);

        if (this.pocket[uid]) {
          if (this.debug) log("[setProbe] probe: ".concat(uid, " already set"));
          return null;
        }

        try {
          opts.id = uid;
          var emitter = this.dispatcher !== null ? this._emit.bind(this) : null;
          var p = new this.Probe(opts, emitter, this.debug);
          this.pocket[uid] = p;
        } catch (err) {
          onerror(err);
          return null;
        }

        return this.pocket[uid];
      }
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
       */

    }, {
      key: "_emit",

      /**
       * - emit extends with `Dispatcher` to be used by every new Probe{} as an emitter `(if opts.dispatcher===true)`
       * @param {*} obj required
       */
      value: function _emit(obj) {
        if (!obj) return null;
        if (!this.dispatcher) return null;

        try {
          this.dispatcher.initListener().next(obj);
          return true;
        } catch (err) {
          onerror("[_emit] dispatcher did not emit");
          return null;
        }
      }
      /**
       * - delete completed `pocketSet`
       */

    }, {
      key: "deletePocketSet",
      value: function deletePocketSet(id) {
        if (Object.values(this.pocket).length) {
          for (var _i3 = 0, _Object$values = Object.values(this.pocket); _i3 < _Object$values.length; _i3++) {
            var poc = _Object$values[_i3];
            if (this._$cached_data[poc.id]) delete this._$cached_data[poc.id];
            if (poc.id.includes(id)) delete this.pocket[poc.id];
          }
        }

        if (this.payloadData[id]) delete this.payloadData[id];
        if (this._ready[id]) delete this._ready[id]; // these  two are together

        if (this._projectSetDispatcher[id] !== undefined) delete this._projectSetDispatcher[id];
        if (this._projectSetAsync[id]) delete this._projectSetAsync[id];
        if (this._lastFilterList[id]) delete this._lastFilterList[id]; // empty self

        this.clearStoreTransfers(id);
      }
    }, {
      key: "Probe",
      get: function get() {
        return newProbe();
      }
    }]);

    return PocketModule;
  }(PocketLibs);

  var PocketModuleExt = /*#__PURE__*/function (_PocketModule) {
    _inherits(PocketModuleExt, _PocketModule);

    var _super2 = _createSuper(PocketModuleExt);

    function PocketModuleExt(opts, debug) {
      _classCallCheck(this, PocketModuleExt);

      return _super2.call(this, opts, debug);
    }

    _createClass(PocketModuleExt, [{
      key: "$payload",
      value: function $payload(data, async, type) {
        var _this8 = this;

        var returnAs = function returnAs(val) {
          _this8.d = val;
          return _this8;
        };

        var asAsync = async !== undefined ? async : this.async; // override if set

        if (asAsync && isPromise(data)) return returnAs(data.then(function (z) {
          return _get(_getPrototypeOf(PocketModuleExt.prototype), "$payload", _this8).call(_this8, z, false, type);
        }, function (err) {
          return err;
        }));
        if (!this.async && !isPromise(data)) return returnAs(_get(_getPrototypeOf(PocketModuleExt.prototype), "$payload", this).call(this, data, false, type));else {
          if (this.debug) onerror("[payload] with opts.async=true, data must be a promise, or do not set async when not a promise");
          if (asAsync) return returnAs(Promise.reject());else return returnAs(false);
        }
      }
      /**
       * ### $project
       * - `an alias on $payload(...), can use either`
       * - refer to `$payload` for specifications :)
       */

    }, {
      key: "$project",
      value: function $project() {
        return this.$payload.apply(this, arguments);
      }
      /**
        * ### $ready
        * - resolves currently active `$payload(...)`
        * - `after completion of Pocket, instance data for all Probes is deleted`
        * - can be called even before project was declared thanks to callback dispather `$projectSetAsync()`
        * @param {*} payloadID ,required
        */

    }, {
      key: "$ready",
      value: function $ready(payloadID) {
        var _this9 = this;

        // in case it was called the second time, when already resolved!
        if (this["_$ready_resolved"]) {
          return Promise.reject("$ready already resolved");
        }

        this["_$ready_resolved"] = false;

        var returnAs = function returnAs(val) {
          _this9.d = val;
          return _this9;
        }; // we wrap it if on ready project so it allows declaring `${$ready()}` even before $project was created, cool ha!


        var p = this.$projectSetAsync(payloadID).then(function (_ref6) {
          var projectID = _ref6.projectID;
          return _get(_getPrototypeOf(PocketModuleExt.prototype), "$ready", _this9).call(_this9, projectID).then(function (z) {
            _this9.deletePocketSet(projectID);

            _this9["_$ready_resolved"] = true;
            return z;
          }, function (err) {
            return Promise.reject(err);
          });
        }, function (err) {
          return Promise.reject(err);
        });
        return returnAs(p);
      }
    }]);

    return PocketModuleExt;
  }(PocketModule);

  var PocketSelectors = __webpack_require__(12)(PocketModuleExt);

  return PocketSelectors;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto */
// node.js/browser detection

/**
 * @Utils
 * my own lodash/like `Utils`
 */

exports.uniq = (arr) => arr.filter((v, i, all) => all.indexOf(v) === i)
exports.objectSize = (obj) => (obj && (Object.prototype === (obj).__proto__)) ? Object.entries(obj).length : 0
exports.last = (arr) => (arr && Array.prototype === (arr).__proto__) ? arr[arr.length - 1] : null
exports.copyBy = (obj, refs) => refs.reduce((n, el, i) => {
    if (obj[el] !== undefined) n[el] = obj[el]
    return n
}, {})
exports.validID = (id) => !(id || '') ? null : (id || '').toString().toLowerCase()
exports.isNumber = (n) => n !== undefined ? (n).__proto__ === Number.prototype : false
exports.isPromise = (defer) => Promise.prototype === (defer || {}).__proto__
exports.uniq = (arr) => arr.filter((el, i, all) => all.indexOf(el) === i)
exports.isObject = (obj) => !obj ? false : (Object.prototype === (obj).__proto__ || (obj) instanceof Object)
exports.isArray = (arr) => !arr ? false : Array.prototype === (arr).__proto__
exports.isString = (str) => !str ? false : String.prototype === (str).__proto__
exports.isFunction = (el) => typeof el === 'function'

exports.copy = (data) => {
    if (!data) return data
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (err) {
        return err.toString()
    }
}

/**
* - accepting object of messages, example: `{'001':['my message',001],...}`
* - returns : {'001':{message,code},...}
*/
exports.errorMessages = (messages) => {
    const msgs = {}
    for (let [k, v] of Object.entries(messages)) {
        msgs[k] = { message: v[0], code: k }
    }
    return msgs
}
// NOTE for compilation we have `es2015` set
if (false) {} else {
    // when executing normally with node
    const util = __webpack_require__(2)
    const color = __webpack_require__(6)

    exports.log = function (...args) {
        args = [].concat('[Pocket]', args)
        args = args.map(z => util.inspect(z, false, 3, true))
        console.log.apply(null, args)
    }
    exports.warn = function (...args) {
        args = [].concat('[warning]', args)
        args = args.map(z => color.cyan(util.inspect(z, false, 2, false), true))
        console.warn.apply(null, args)
    }
    exports.onerror = function (...args) {
        args = [].concat('[error]', args)
        args = args.map(z => color.red(util.inspect(z, false, 2, false), true))
        console.log('  ')
        console.error.apply(null, args)
        console.log('  ')
    }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(4);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


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
exports.inherits = __webpack_require__(5);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb, null, ret) },
            function(rej) { process.nextTick(callbackifyOnRejected, rej, cb) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var bash_codes = exports.bash_codes = {
	"BLACK" : {
		"text" : "\033[0;30m",
		"underline": "\033[4;30m",
		"background": "\033[40m",
		"bold":"\033[1;30m",
		"hi_text":"\033[0;90m",
		"hi_bold" : "\033[1;90m",
		"hi_background" : "\033[0;100m"
	},
	"RED" : {
		"text" : "\033[0;31m",
		"bold":"\033[1;31m",
		"underline": "\033[4;31m",
		"background": "\033[41m",
		"hi_text":"\033[0;91m",
		"hi_bold" : "\033[1;91m",
		"hi_background" : "\033[0;101m"
	},
	"GREEN" : {
		"text" : "\033[0;32m",
		"bold":"\033[1;32m",
		"underline": "\033[4;32m",
		"background": "\033[42m",
		"hi_text":"\033[0;92m",
		"hi_bold" : "\033[1;92m",
		"hi_background" : "\033[0;102m"
	},
	"YELLOW" : {
		"text" : "\033[0;33m",
		"bold":"\033[1;33m",
		"underline": "\033[4;33m",
		"background": "\033[43m",
		"hi_text":"\033[0;93m",
		"hi_bold" : "\033[1;93m",
		"hi_background" : "\033[0;103m"
	},
	"BLUE" : {
		"text" : "\033[0;34m",
		"bold":"\033[1;34m",
		"underline": "\033[4;34m",
		"background": "\033[44m",
		"hi_text":"\033[0;94m",
		"hi_bold" : "\033[1;94m",
		"hi_background" : "\033[0;104m"
	},
	"PURPLE" : {
		"text" : "\033[0;35m",
		"bold":"\033[1;35m",
		"underline": "\033[4;35m",
		"background": "\033[45m",
		"hi_text":"\033[0;95m",
		"hi_bold" : "\033[1;95m",
		"hi_background" : "\033[0;105m"
	},
	"CYAN" : {
		"text" : "\033[0;36m",
		"bold":"\033[1;36m",
		"underline": "\033[4;36m",
		"background": "\033[46m",
		"hi_text":"\033[0;96m",
		"hi_bold" : "\033[1;96m",
		"hi_background" : "\033[0;106m"
	},
	"WHITE" : {
		"text" : "\033[0;37m",
		"bold":"\033[1;37m",
		"underline": "\033[4;37m",
		"background": "\033[47m",
		"hi_text":"\033[0;97m",
		"hi_bold" : "\033[1;97m",
		"hi_background" : "\033[0;107m"
	}
};

exports.colors = {
	BLACK: "BLACK",
	RED: "RED",
	GREEN: "GREEN",
	YELLOW: "YELLOW",
	BLUE: "BLUE",
	PURPLE: "PURPLE",
	CYAN: "CYAN",
	WHITE: "WHITE"
};

var styles = exports.styles = {
	bold: "bold",
	underline: "underline",
	background: "background",
	hi_text: "hi_text",
	hi_bold: "hi_bold",
	hi_background: "hi_background"
};

var REMOVE_COLOR = exports.REMOVE_COLOR = "\033[0m";


// various logical inconsistencies in the code below - renderColor and wrap seem like they should be combined, but I'm letting wrap basically stand on its own
// in case anyone wants access to explicitly handle background or underline stuff. I feel like those are a bit more special-casey, and generally speakign
// users are going to want to quickly turn a word or phrase into a single color without worrying about background or underline. So the .colorName methods
// are just syntactic sugar.
exports.wrap = function(str, color, style) {
	var c = bash_codes[color.toUpperCase()];
	var s = styles[style] || "text";
	
	return render(c[s], str);
};

exports.black = function(str, hi) {
	return renderColor(str, bash_codes.BLACK, hi);
};

exports.red = function(str, hi) {
	return renderColor(str, bash_codes.RED, hi);
};

exports.green = function(str, hi) {
	return renderColor(str, bash_codes.GREEN, hi);
};

exports.yellow = function(str, hi) {
	return renderColor(str, bash_codes.YELLOW, hi);
};

exports.blue = function(str, hi) {
	return renderColor(str, bash_codes.BLUE, hi);
};

exports.purple = function(str, hi) {
	return renderColor(str, bash_codes.PURPLE, hi);
};

exports.cyan = function(str, hi) {
	return renderColor(str, bash_codes.CYAN, hi);
};

exports.white = function(str, hi) {
	return renderColor(str, bash_codes.WHITE, hi);
};


function renderColor(str, color, hi) {
	return render(hi ? color.hi_text : color.text, str);
}

function render(code, str) {
	return code + str + REMOVE_COLOR;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8)

/***/ }),
/* 8 */
/***/ (function(module, exports) {

`use strict`
/**
 * SimpleQ
 * Developer: Eaglex ( http://eaglex.net ) 
 * License: CC BY-SA ( https://creativecommons.org/licenses/by/4.0/legalcode )
 * - Simple Promise defer
 */
function SimpleQ() {
    
    return new function() {
        const promises = {}     
        let __deferSet = null   
        const defer =  new Promise((resolve, reject) => {
            promises['resolve']= resolve      
            promises['reject']= reject     
        })

        this.resolve = (data = null) => {
            if (__deferSet) return this // already set
            promises['resolve'](data)
            __deferSet = true
            return this
        }

        this.reject = (data = null) => {
            if (__deferSet) return this // already set
            promises['reject'](data)
           __deferSet = true
            return this
        }

        this.promise = () =>  defer     
    }
}

module.exports = SimpleQ

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * ### PocketLibs
 * - Top of the stack class of `PocketModule`, all `opt` initial `properties` are set here
 */
module.exports = () => {
    const { objectSize, warn, onerror, validID, copy, log, isString } = __webpack_require__(1)
    return class PocketLibs {
        /**
         * @param {*} opts.async, when set, allow $payload(`data`) to be async object
         * @param {*} opts.dispatcher, when set to true, loads external library `Dispatcher`
         * @param {*} debug optional
         */
        constructor(opts = {}, debug) {
            this.debug = debug || false
            this.async = (opts || {}).async || null
            // when set enables dispatcher to communicate directly with `probe.js`
            this.dispatcher = (opts || {}).dispatcher ? __webpack_require__(10)() : null
            this.pocket = {} // example this.pocket[`abc::taskName`] returns Probe{} Instance
            this.payloadData = {}// each payload by id
            this.lastPocketTimestamp = 0
            this._lastProjectID = null // last cached reference
            this._lastProbeID = null // last cached reference
            this._$cached_data = {/** id:{} */ }// stores last captured data when calling `$data(..)`
            this.$transfer_lastID = '' // set when we call `$transfer()` and reset after `$to()`
            this._ready = {} // collect all ready example: `{id:Promise}`
            this.d = undefined // NOTE user reference data, carefull when using selectors from previous target, always access last
            this._projectSet = {/** projectID:promise */ }
            this._transferCached = [ /** {timestamp,fromProbeID,data} */]
            this._projectSetDispatcher = {/** id:dispatcher */ }
            this._projectSetAsync = {/** id:SQ */ } // collect all $projectSetAsync promisses
            this._lastFilterList = {/** id:[probes] */ }
        }

        /**
         * ### projectSetDispatcher
         * - create new dispather to act as a callback for setting new projects in future
         * - works with `$projectSetAsync`
         * @param {*} projectID 
         */
        projectSetDispatcher(projectID) {
            if (!projectID) {
                if (this.debug) onerror(`[projectSetDispatcher] projectID must be set`)
                return null
            }
            if (this._projectSetDispatcher[projectID]) return this._projectSetDispatcher[projectID]
            if (!this._projectSetDispatcher[projectID]) this._projectSetDispatcher[projectID] = __webpack_require__(10)(projectID)
            return this._projectSetDispatcher[projectID]
        }

        /**
         * @param {*} projectID
         * @returns array [Probe{},...] of selected project
         */
        projectProbeList(projectID) {
            return Object.entries(this.pocket).filter(([id, probe]) => id.indexOf(projectID) === 0).map(([id, probe]) => probe)
        }

        /**
         * ### clearStoreTransfers
         * - clear any pending transfers
         * @param {*} projectID required
         */
        clearStoreTransfers(projectID = '') {
            if (!projectID) return
            let cleared = false
            if (this._transferCached.length) {
                this._transferCached.forEach((element, i) => {
                    const { fromProbeID } = element || {}
                    if (!fromProbeID) return
                    if (fromProbeID.indexOf(projectID) !== -1) {
                        this._transferCached.splice(i, 1)
                        cleared = true
                        if (this.debug) log(`[clearStoreTransfers] transferCached for probeID: ${fromProbeID} has been removed`)
                    }
                })
            }
            return cleared
        }
        /**
         * ### storeTransfers
         * - caches pending transfers when using `$transfer` with `$to()`
         * - access last data by timestamp
         * @param {*} fromProbeID  required
         * @param {*} data required
         */
        storeTransfers(fromProbeID, data) {
            this._transferCached.push({ timestamp: new Date().getTime(), fromProbeID, data })
            return this._transferCached
        }

        /**
         * ### accessLastValidTransfer
         * returns latest transfer that is inRange from `fromAverageTimeHasPast` in `ms` vs current Date.getTime
         * - removes _transferCached that was found 
         */
        accessLastValidTransfer(fromAverageTimeHasPast = 100) {
            if (!this._transferCached.length) return {}

            this._transferCached.sort((a, b) => a.timestamp - b.timestamp)
            const transferCachedCopy = copy(this._transferCached)

            const coundCache = transferCachedCopy.reduce((n, el, i) => {
                const { timestamp } = el

                // calculate max wait between transfers, so if we have timeout we can only wait as long as `fromAverageTimeHasPast` 
                const currentOffset = new Date().getTime() + fromAverageTimeHasPast
                const diff = (currentOffset - timestamp) - fromAverageTimeHasPast
                const timeInRange = (currentOffset > timestamp) && diff <= fromAverageTimeHasPast
                if (timeInRange) {
                    n = el
                    // delete found cache
                    this._transferCached.splice(i, 1)
                }
                return n
            }, {})

            if (!objectSize(coundCache)) return {}
            else return coundCache
        }

        /**
         * ### selectByTask
         * - works with `PocketSelectors class`, when `::taskNames, taskName` are specified, extracts full probeID by matching previous pointer reference and updates `lastProbeID()`        
         * - returns valid probeID or null
         * @param {*} probeID {*} required, but optional
         */
        selectByTask(taskOrProbeID = '', updateLastProbeID = null) {
            taskOrProbeID = !isString(taskOrProbeID) ? '' : taskOrProbeID
            if (!this.idRegexValid(taskOrProbeID) && taskOrProbeID) return null
            if (taskOrProbeID.indexOf(':') > 0 && !this.pocket[taskOrProbeID]) {
                if (this.debug) warn(`[selectByTask] when using '::' prefix selector, it should come at 0 index`)
                return null
            }

            if (taskOrProbeID.split(":").length > 3 || taskOrProbeID.split(":").length === 2) {
                if (this.debug) warn(`[selectByTask] wrong taskName :${taskOrProbeID}, allowed prefix is '::taskName'`)
                return null
            }

            if (updateLastProbeID) this.lastProbeID(taskOrProbeID, true) // if a match we receive below updated `_lastProbeID` 
            if (this.pocket[taskOrProbeID]) {
                if (updateLastProbeID) this.lastProbeID(taskOrProbeID)
                return taskOrProbeID // we have a valid ref so use that
            }

            /**
             * - generate valid probeID `${projectID}::${probeTaskName}` //
             */
            const dynamicProbeID = (name) => {
                const n = name.split("::")[1] || name // in case we are using prefixed taskName, example "::cocacola"
                const matchByProbeID = (this._lastProbeID || '').indexOf(n) > 0
                if (matchByProbeID && n) return this._lastProbeID
                else if (this._lastProjectID && n) return this._lastProjectID + `::` + n
                return this._lastProbeID
            }

            const newProbeID = dynamicProbeID(taskOrProbeID)
            if (!newProbeID) {
                if (this.debug) warn(`[selectByTask] newProbeID was not found from taskOrProbeID: ${taskOrProbeID}`)
            } else if (updateLastProbeID) this.lastProbeID(newProbeID)
            return newProbeID
        }

        /**
         * ### lastProjectID
         * - every project is a job initiated by payload, so `payload.id === lastProjectID()`
         */
        lastProjectID(projectID = '', debug = null) {
            if (!projectID && this._lastProjectID) projectID = this._lastProjectID
            if (projectID) projectID = this.validProjectID(projectID, debug)
            if (projectID && this.payloadData[projectID]) this._lastProjectID = projectID
            if (!this.payloadData[projectID]) return null
            if (!projectID) return null
            return projectID
        }

        /**
         * ### lastProbeID
         * - return last reference to probeID
         * - cache with `_lastProbeID`
         * @param {*} probeID 
         */
        lastProbeID(probeID = '', debug = null) {
            if (!probeID && this._lastProbeID) probeID = this._lastProbeID
            if (probeID) probeID = this.validProbe(probeID, debug)
            if (probeID && this.pocket[probeID]) this._lastProbeID = probeID
            if (!probeID) return null
            if (!this.pocket[probeID]) return null
            return probeID
        }

        /**
         * ### validProjectID
         * - `test if projectID is valid`
         * - return valid id
         * @param {*} id required
         */
        validProjectID(id, debug = null) {
            id = validID(id)
            if (!id) return null
            if ((id || '').split(' ').length > 1) return null
            if (!this.idRegexValid(id)) return null
            return id
        }

        /**
         * ### validProbe
         * - returns a valid probe
         * @param {*} probeID required
         */
        validProbe(probeID, debug = null) {
            probeID = validID(probeID)
            if (!probeID) return null
            if (!this.idRegexValid(probeID)) return
            if (probeID.indexOf(`::`) === -1) return null
            if (!this.pocket[probeID]) {
                if (this.debug && debug === null) warn(`[get] did not find probe with probeID ${probeID}`)
                return null
            }
            return probeID
        }

        /**
         * ### dataPropSelector
         * - works with `$data()` and `$cached()` user selectors 
         * - refer to `PocketSelectors` module
         * @param {*} probeID required
         * @param {*} dataProp optional
         * @param {*} self optional
         * @param {*} probeData{} required our referencing probeData{}
         */
        dataPropSelector(type = 'data()', probeID = '', dataProp = {}, self = false, probeData = {}) {
            let selectedData
            /**
             * NOTE if calling via `$cached()`,  `probeData` already comes as `this._$cached_data` so dont need to cache  it again!
             */
            try {
                /**
                  * NOTE IMPORTANT
                  * assembly order: `dataProp < probeData > selectedData`
                  * if are asking for multiple, example `selectedData:{a,b,value:1111}`, will return those available 
                  * as an Object{}. But if asking for only 1 `selectedData:{value:1111}`, will return the value `11111`, only because we know what we asked for initially
                  */
                selectedData = Object.entries(dataProp).reduce((n, [k, val], i) => {
                    if (probeData[k] !== undefined) n[k] = probeData[k]
                    return n
                }, {})

                if (!objectSize(selectedData)) selectedData = undefined

                // selct only value if `dataProp` === `selectedData` is size ( 1 + 1 === 2 )
                if (objectSize(selectedData) + objectSize(dataProp) === 2) selectedData = Object.values(selectedData).shift()

                // if coming from `$data()` we cache our data 
                if (type === 'data()') this._$cached_data[probeID] = selectedData
                return self ? this : selectedData
            } catch (err) {
                if (this.debug) warn(`[$data] no dataProp found on probeID: ${probeID}`)
                if (type === 'data()') this._$cached_data[probeID] = selectedData
                return self ? this : selectedData
            }
        }

        idRegexValid(str) {
            const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
            const regx = new RegExp(pat, 'gi')
            if (regx.test(str)) {
                // NOT ALWAYS NEEDED TO DISPLAY THE ERROR
                // if (this.debug) onerror(`your id is invalid, allowed chars: ${pat}`)
                return null
            }
            return true
        }

        /**
         * ### probeProps
         * - `each probe props that can be available and send on ready`
         * - `order is important, keep 'status' last`
         * - only updatable props are: `'compaign', 'data', 'status'(limited)`
         */
        get probeProps() {
            return ['compaign', 'data', 'task', 'ref', 'id', 'status']
        }
    }
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * requirejs global event handler
 */
module.exports = function (uid, debug = null) {
    return (new function () {
        const plugin = `[dispatcher]`
        this.uid = (uid || '').toString() || new Date().getTime()
        this.debug = debug
        this.cbQueue = {}
        this.dispatchInstance = {}

        this.initListener = () => {
            this.Dispatch()
            return this
        }
        /**
         * @next
         * send next data to the `batchReady` callback
         * @param {*} data # optional
         */
        this.next = (data = null) => {
            if (this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid].next(data)
            else {
                if (this.debug) console.log({ message: `${plugin} for uid not available`, uid: this.uid })
            }
            return this
        }

        /**
     * @Dispatch
     * master listener, sends all event callbacks to `batchReady`
     * @param {*} cb
     */
        this.Dispatch = () => {
            if (this.dispatchInstance[this.uid]) return this
            const self = this
            const D = function () {
                this.uid = self.uid
                this.data = null

                this.next = (data) => {
                    if ((data || {}).type !== 'cb') this.data = data
                    /**
                         * @next
                         * acts as a reverse callback, it sends back the `cb` from `batchReady`
                         */
                    if ((data || {}).type === 'cb') {
                        if (typeof data.cb === 'function') {
                            // when calling next before batchReady is initiated
                            // collect cb from .next
                            if (!self.cbQueue[self.uid]) self.cbQueue[self.uid] = data.cb
                            if (this.data) data.cb.call(self, this.data, self.uid)
                        }

                        return
                    }

                    if (this.data) {
                        if (typeof self.cbQueue[self.uid] === 'function') {
                            self.cbQueue[self.uid].call(self, this.data, self.uid)
                        }
                    } else {
                        if (this.debug) console.log(`${plugin} no callback data`)
                    }
                }
            }

            if (!this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid] = new D()
            return this
        }

        this.del = () => {
            delete this.cbQueue[this.uid]
            delete this.dispatchInstance[this.uid]

            if (!this.cbQueue[this.uid] && !this.dispatchInstance[this.uid]) {
                // if (this.debug) console.log(`cbQueue and dispatchInstance for uid ${this.uid} deleted`)
            }
            return this
        }

        /**
     * @subscribe
     * wait for callbacks forwarded from Dispatch and returned in callback of this method
     * - Dispatch must be set initially before you call `subscribe`
     * @param {*} cb #required
     */
        this.subscribe = (cb) => {
            const isFN = typeof cb === 'function'
            if (!isFN) {
                if (this.debug) console.log(`${plugin}[batchReady] cb must be set`)
                return this
            }
            if (!this.dispatchInstance[this.uid]) {
                // this means batchReady was executed prior to `Dispatch`, because it has forward with next
                // it will get executed anyway
                this.Dispatch()
            }
            if (this.dispatchInstance[this.uid]) this.dispatchInstance[this.uid].next({ type: 'cb', cb })
            return this
        }
    }(uid, debug))
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Set new probe model
 * - every new task has a set of requirements controlled by `statusStackOrder` in status setter. Once status is `complete` and data available, information is send and probe is blocked.
 * methods:`{get,all}` props: `{id,data,tasks,status}`
 */
exports.Probe = () => {
    // const messageCODE = require('./errors') // DISPLAY MESSAGES WITH CODE
    const { isString, warn, log, isNumber, onerror, last, copy, isObject } = __webpack_require__(1)
    const sq = __webpack_require__(7) // nice and simple promise/defer by `eaglex.net`
    return class Probe {
        /**
         * @param {*} opts.id required, case sensitive, all will be toLowerCase() 
         * @param {*} opts.task once set cannot be changed
         * @param {*} opts.compaign optional, once set cannot be changed
         * @param {*} opts.data optional any value except undefind, cannot be change once status set to `complete` or send
         * @param {*} opts.status required to control Probe actions
         * @param {*} emitter optional, dispatcher/emmiter available if not null
         * @param {*} debug 
         */
        constructor(opts = {}, emitter, debug) {
            this.debug = debug || false
            if (isNumber(opts.id) || opts.id) opts.id = opts.id.toString()
            if (!opts.task || !isString(opts.task)) throw ('task as string is required')
            this._id = null
            this._ref = null
            this._task = null
            this._status = null
            this._data = null
            this._compaign = null
            this._dataIndex = 0
            this._statusIndex = 0
            this._statusAsync = [/** {timestamp:promise} */] // dynamic promise changer
            this.emitter = emitter || null
            this.task = opts.task
            this.id = opts.id
            this.status = 'open'

            // assign initial data if differs from default
            if (opts.ref !== this._ref) this.ref = opts.ref
            if (opts.data !== this._data) this.data = opts.data
            if (opts.compaign) this.compaign = opts.compaign
        }

        /**
         * nice and easy, save some coding, and added security
         */
        get sq() {
            if (this[`_sq`]) return this[`_sq`]
            this[`_sq`] = sq()
            return this[`_sq`]
        }

        set id(v) {
            if (this._id) {
                if (this.debug) warn(`cannot update already set id: ${this._id}`)
                return
            }
            if (!v) throw ('id is required')
            if (v.split(' ').length > 1) throw ('each id cannot have spaces')
            if (v.indexOf(`::`) === -1) throw ('each id must be of format id::taskName')
            if (v.indexOf(`:::`) !== -1) throw ('each id must be of format id::taskName')

            // validate chars
            const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
            const regx = new RegExp(pat, 'gi')
            if (regx.test(v)) throw (`your id is invalid, allowed chars: ${pat}`)

            v = v.replace(/ /gi, '_').toLowerCase()

            if (v.indexOf(this._task) === -1) {
                throw (`wrong id setup, your id should make up the taks name, example: id='cocacola::drink'`)
            }

            this._id = v
        }

        get id() {
            return this._id
        }

        get ref() {
            return this._ref
        }

        /**
         * - acceps string, can only be set when status isnt complete
         * - can be used to find your Pocket by particular `ref`
         */
        set ref(v) {
            if (!v) return
            if (!isString(v)) {
                warn(`[ref] must be a string`)
                return
            }
            if (this.status === 'complete' || this._compaign.status === 'send') return
            this._ref = v
        }

        get compaign() {
            return this._compaign
        }

        set compaign(v) {
            if (v === undefined) return
            if (this._compaign) {
                if (this.debug) warn(`cannot update already set compaign ${this._compaign}`)
                return
            }
            if (!v) return
            if (!isString(v)) {
                if (this.debug) warn(`compaign must be a string`, v)
                return
            }

            this._compaign = v
        }

        set task(v) {
            if (v === undefined) return
            if (this._task) {
                if (this.debug) warn(`cannot update already set task`)
                return
            }

            if (!v) return
            if (!isString(v)) {
                if (this.debug) warn(`task must be a string`)
                return
            }
            if (v.indexOf("::") !== -1) throw ('task seperator :: is restricted')
            if (v.split(' ').length > 1) throw ('task cannot have spaces, use seperators: _+')
            const pat = /[`~!@#$%^&*()\=?;'",.<>\{\}\[\]\\\/]/gi
            const regx = new RegExp(pat, 'gi')
            if (regx.test(v)) throw (`your task is invalid, allowed chars: ${pat}`)

            this._task = v.replace(/ /gi, '_').toLowerCase()// every task must be valid with required 
        }

        get task() {
            return this._task
        }

        set data(v) {
            if (v === undefined) return
            /**
            * cannot be updated uppon status is send || complete
            */
            const complete = this.status === 'complete' || this.status === 'send'
            if (complete) {
                // NOTE this can also happen if you are using $transfer().$to from `PocketModule` that is a delayed
                if (this.debug) warn(`you cannot update data once the status is complete or send`)
                return null
            }

            this._dataIndex++
            if (this.status === 'open' && this._data !== null && this._dataIndex > 1) this.status = 'updated'
            this._data = v
        }

        get data() {
            return this._data
        }

        /**
         * ### update
         * - update data of current Probe{}.data
         * @param {*} data:any, required
         * @param {*} merge:Boolean, optional for merging object to this.data
         */
        update(data, merge = null) {
            if (this.status === 'complete' || this.status === 'send') {
                if (this.debug) warn(`[Probe][update] cannot update data on complete status`)
                return this
            }
            if (!isObject(data) && merge) {
                if (this.debug) warn(`[Probe][update] cannot update none object 'data' with option 'merge=true' set`)
                return this
            }
            if (isObject(data) && merge) this.data = Object.assign({}, this.data, data)
            else if (data !== undefined) this.data = data
            return this
        }

        /**
         * forward motion `status` update is allowed
         * `value`: importance que
         * `set`: if status already set
         */
        get statusStackOrder() {
            return {
                open: { value: 1, set: false },
                updated: { value: 2, set: false },
                complete: { value: 3, set: false },
                send: { value: 4, set: false },
                error: { value: 5, set: false }
            }
        }

        /**
         * allow status: open | updated | complete | send | error
         * `open`: status is set when pocked is initialized
         * `updated`: status is set when data is updated
         * `complete`: status is set when you want to complete and discard probe
         * `send`: once the status was set `complete` data is resolved first then status is set as `send`.
         * and Probe is locked, cannot be interacted with. Follow the strategic order set by `statusStackOrder`
         * `error` acts like complete, it will resolve() last available data and block the Probe
         */
        get status() {
            return this._status
        }

        set status(v) {
            // order of status and allowed values
            ((stat) => {
                try {
                    // meaning do not allow any status changes beond `updated`
                    if (this.statusStackOrder[stat].value > 2 && this.statusStackOrder[stat].set === true) return false
                } catch (err) {
                    onerror('statusStackOrder invalid status')
                }

                if (this._status === 'complete' || this._status === 'send') {
                    if (this.debug) warn(`cannot update status if already complete, id:${this.id}`)
                    return false
                }

                switch (stat) {
                    case 'open':
                        if (this._status === 'updated') {
                            if (this.debug) warn(`cannot set status back to open once set to updated`)
                            break
                        }
                        this._status = stat
                        this.statusStackOrder[stat].set = true
                        this.onOpenStatus(v) // emit probe when status opens
                        this.setStatusAsync = stat
                        break

                    case 'updated':
                        if (this._status === 'complete') {
                            if (this.debug) warn(`cannot update status to 'updated' then previously set to 'complete'`)
                            break
                        }

                        if (this._dataIndex > 0) {
                            this._status = stat
                            this.statusStackOrder[stat].set = true
                            this.setStatusAsync = stat
                            if (this.debug) log(`id:${this.id}, data updated`)
                        }

                        break

                    case 'complete':

                        this.statusStackOrder[stat].set = true
                        this.setStatusAsync = stat
                        // setTimeout(()=>{
                        this._status = stat
                        this.onComplete(v) // resolve probe when status complete
                        //  })

                        break

                    case 'send':
                        if (this._status !== 'complete') {
                            if (this.debug) warn(`cannot update status to 'send' then previously not set to 'complete'`)
                            break
                        }
                        this._status = stat
                        this.statusStackOrder[stat].set = true
                        this.setStatusAsync = stat
                        break

                    case 'error':
                        if (this._status === 'complete') return
                        // when we have error we need to inform what happen, and close the Probe

                        this.statusStackOrder[stat].set = true
                        this.setStatusAsync = stat
                        this.onComplete(v) // resolve probe when status complete                     
                        break

                    default:
                        if (this.debug) warn(`id:${this.id},  you set invalid status: ${stat}, nothing changed`)
                }
            })(v)
        }

        /**
         * - works with `statusAsync`
         * - (1.) setter creates our new sq() promise every time, and allows use or resolve 
         * - to use example: setStatusAsync.resolve()
         */
        set setStatusAsync(v) {
            // 'v'  set to anything to initiate setter
            const timestamp = new Date().getTime()
            const p = { timestamp, p: sq() }
            this._statusAsync.push(p)
        }

        get setStatusAsync() {
            const lastPromise = last(this._statusAsync.sort((a, b) => a.timestamp - b.timestamp).map(z => z['p']))
            lastPromise.resolve(copy(this.status)) // << we are unly returning
            return lastPromise
        }

        /**
         * ### statusAsync
         * - dynamic promise resolver with `Simple Q` from `eaglex.net`
         * - works with `setStatusAsync` setter/getter
         * - return last 'resolve' status from last `timestamp` setting
         */
        get getStatusAsync() {
            return this.setStatusAsync.promise()
        }

        /**
         * - alias of `getStatusAsync`
         * @readonly
         */
        get statusAsync() {
            return this.getStatusAsync
        }

        all() {
            return { ref: this.ref, compaign: this.compaign, data: this.data, id: this.id, task: this.task, status: this.status }
        }

        /**
         * status watch, when current status changes execute send
         * @param {*} status
         */
        onComplete(status) {
            if ((status === 'complete' || status === 'error') && this._status !== 'send' && this._dataIndex > 0) {

                if (this.emitter) {
                    setTimeout(() => {
                        this.emitter({ probe: this, status })
                    })
                }

                this.sq.resolve({ probe: this.all() })
                this._status = 'send'
            }
        }

        /**
         * do something on open task, this means we start request for data
         * @param {*} status
         */
        onOpenStatus(status) {
            if (status === 'open') {
                // return this probe and update it when its complete
                if (this.emitter) {
                    setTimeout(() => {
                        this.emitter({ probe: this, status: 'open' })
                    })
                }
            }
        }
    }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * ### PocketSelectors
 * - Extends PocketModule using selectors for better access to Probes
 * - allow selecttion to refference by, example:  `taskName`, `::taskName` and `${projectID}::taskName`, thanks to `selectByTask()` method
 */
module.exports = (PocketModule) => {
    const { copy, warn, isArray, onerror, objectSize, isString, uniq, isFunction } = __webpack_require__(1)
    return class PocketSelectors extends PocketModule {
        constructor(opts, debug) {
            super(opts, debug)
        }

        // extending original `$probeStatusAsync`
        $probeStatusAsync(probeID = '') {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            return super.$probeStatusAsync(lastProbeID)
        }

        // extending original `$get`
        $get(probeID, self) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            return super.$get(lastProbeID, self)
        }

        /**
         * - return array of Probes matched by ref
         * @param {*} probeRef, required
         * @returns [Probe{},...] array
         */
        $getByRef(probeRef = '') {
            return Object.assign(this.pocket).filter(([id, probe], inx) => probe.ref === probeRef)
        }

        // extending original `$set`
        $set(dataFrom, probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            return super.$set(dataFrom, lastProbeID)
        }

        /**
         * ### $probe
         * - return me as Probe{}, similar as $get(...), although does additional check for instanceOf Probe{}
         * @param {*} probeID 
         */
        $probe(probeID = '') {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            if (!this.pocket[lastProbeID]) {
                if (this.debug) warn(`[$probe] not found for probeID: ${probeID}`)
                return undefined
            }

            if (this.pocket[lastProbeID].constructor.name !== 'Probe') {
                if (this.debug) onerror(`[$probe] probeID: ${probeID} is not an instance of Probe{}`)
                return undefined
            }

            return this.pocket[lastProbeID]
        }

        // extending original `$update`
        $update(dataFrom, mergeData, probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            let lastProbeID = this.lastProbeID(probeID)
            return super.$update(dataFrom, mergeData, lastProbeID)
        }

        /**
         * ### $select
         * - select current payloadID/project/job by id you are working on
         * @param {*} projectID optional/sensitive, selects new point of reference.
         */
        $select(projectID = '') {
            projectID = !isString(projectID) ? '' : projectID
            this.lastProjectID(projectID) // also updates last selector reference
            return this
        }

        /**
         * ### $filter
         * - filter works together with `$compute` or standalone when specified `.d` to return filtered `list`
         * @param {*} cb 
         * @param {*} projectID 
         */
        $filter(cb, projectID) {
            projectID = this.lastProjectID(projectID) // also updates last selector reference

            const returnAs = (val) => {
                this.d = val
                return this
            }

            if (!isFunction(cb)) return returnAs([])

            if (!this.payloadData[projectID]) {
                if (this.debug) warn(`[$filter] no projectID found`)
                return returnAs(null)
            }
            this._lastFilterList[projectID] = []
            this.projectProbeList(projectID).forEach((probe, inx) => {
                const matchFound = cb.call(probe, probe)
                if (matchFound !== undefined && (matchFound === true || matchFound === 1)) {
                    this._lastFilterList[projectID].push(probe)
                }
            })
            return returnAs(this._lastFilterList[projectID])
        }

        /**
         * ### $compute
         * - iterate thru each Probe{}/ instance in a callback, and make changes to it
         * @param {*} cb((probe, probeID)=>this/self.data) required
         * @param {*} projectID optional/sensitive, selects new point of reference.
         */
        $compute(cb, projectID = '') {
            projectID = this.lastProjectID(projectID)
            const returnAs = (val) => {
                // delete last filtered list after it was consumed
                if (val) delete this._lastFilterList[projectID]
                this.d = val
                return this
            }

            if (!isFunction(cb)) {
                if (this.debug) warn(`[$compute] cb must be a function`)
                return returnAs(null)
            }

            if (!this.payloadData[projectID]) {
                if (this.debug) warn(`[$compute] no project found fo your/last id projectID:${projectID}`)
                return returnAs(null)
            }
            if ((this._lastFilterList[projectID] || []).length) {
                this._lastFilterList[projectID].forEach(probe => cb.call(probe, probe))
                return returnAs(this._lastFilterList[projectID])
            } else {
                this.projectProbeList(projectID).forEach(probe => cb.call(probe, probe))
                return returnAs(this.projectProbeList(projectID))
            }
        }

        /**
         * ### $list
         * - list active Probes{} by project id, should return all assigned probe/tasks regardless of status
         * - returns array[] of active Probe{}/tasks or []
         * @param {*} projectID optional/sensitive, selects new point of reference.
         * @param {*} cb((probe, probeID)=>) optional, when set will loop thru each Probe{} in callback
         * @param {*} type optional, set to `list`, will return latest Probes, that includes if initiated cb and made a few changes
         */
        $list(projectID = '', cb = null, type = 'self') {
            projectID = this.lastProjectID(projectID)
            if (!this.payloadData[projectID]) return []
            const list = () => {
                return Object.entries(this.pocket).reduce((n, [key, val], inx) => {
                    if (val.id.includes(projectID)) n.push(val)
                    return n
                }, [])
            }
            if (isFunction(cb)) {
                this.projectProbeList(projectID).forEach(probe => cb.call(probe, probe))
                if (type === 'self' || !type) return this
                if (type === 'list') return list()
            } else {
                return list()
            }
        }

        /**
         * ### $transfer
         * - select data from `fromProbeID` and hold it in `_transferCache`, until `$to(probeID)` is called
         * - warning, action removes `Probe[fromProbeID].data` and overrides it on Probe[probeID].data, only when `$to(probeID)` is called, simple as that!
         * @param {*} fromProbeID optional/sensitive, selects new point of reference.
         */
        $transfer(fromProbeID = '') {
            // allow use of short ref names example: `::cocalola`
            fromProbeID = this.selectByTask(fromProbeID, true)
            fromProbeID = this.lastProbeID(fromProbeID)
            if (!this.pocket[fromProbeID]) {
                if (this.debug) warn(`[$transfer] no Probe{} found for this id fromProbeID:${fromProbeID}`)
                return this
            }
            this.storeTransfers(fromProbeID, copy(this.pocket[fromProbeID]['data']))
            // NOTE needed for extra security to make sure it was called before we can update `$to()`
            this.$transfer_lastID = fromProbeID
            return this
        }

        /**
         * ### $to
         * - works together with `$transfer`, will transfer `data` from one Probe{} to another
         * if `_transferCache` is set, the cache is cleared.
         * @param {*} toProbeID optional/sensitive, points to Probe{} `data` will be packed, it is not previous reference pointer, but the next.
         * @param {*} pointToThisProbe to stay on the current pointer reference
         * @param {*} maxDelay, keep at minimum! Time between transaction can take place, relates to `fromAverageTimeHasPast` found in `accessLastValidTransfer()`
         */
        $to(toProbeID = '', pointToThisProbe = true, maxDelay = 100) {

            // allow use of short ref names example: `::cocalola`
            toProbeID = this.selectByTask(toProbeID, pointToThisProbe)
            // if (!keepLastPointerReference) toProbeID = this.lastProbeID(toProbeID)
            if (pointToThisProbe) toProbeID = this.validProbe(toProbeID)
            if (!toProbeID) {
                if (this.debug) warn(`[$to] toProbeID is invalid`)
                return this
            }
            if (!this.pocket[toProbeID]) {
                if (this.debug) warn(`[$to] no Probe{} found for this id toProbeID:${toProbeID}`)
                return this
            }
            if (this.$transfer_lastID) {
                // please note because this can be a delayed transaction, if you send `status=complete`
                // the data will not be updated
                const lastValidTransfer = this.accessLastValidTransfer(maxDelay)
                if (objectSize(lastValidTransfer)) {
                    const { fromProbeID, data } = lastValidTransfer
                    if (this.$transfer_lastID === fromProbeID) {
                        this.pocket[fromProbeID]['data'] = null // from $transfer 
                        this.pocket[toProbeID]['data'] = data // $to 
                    }
                } else {
                    if (this.debug) warn(`[$to] no last valid transfer found`)
                }
                this.$transfer_lastID = ''
            }
            return this
        }

        /**
         * ### $of
         * - points to Probe{} be reference
         * @param {*} probeID optional/sensitive, select new point of reference
         */
        $of(probeID = '') {
            // allow use of short ref names example: `::cocalola`
            this.selectByTask(probeID, true)
            return this
        }

        /**
         * ### $data
         * - returns Object copy of `Probe['data']`
         * @param {*} dataProp optional, if you know what you are asking for example: `{assets:true}`,or `array['assets]`, it has catch error exception, so you wont receive any errors just `null`
         * will return all available matched within our `Probe{}['data]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be retured
         * @param {*} probeID optional/sensitive, select new point of reference
         * @param {*} self optional,if you want to $cached() last data enquiry and return `self` to keep chaining, nice!
         */
        $data(dataProp = null/** {}||[] */, probeID = '', self = false) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return self ? this : undefined

            // NOTE can provide as an array
            if (isArray(dataProp) && (dataProp || []).length) {
                dataProp = uniq(dataProp).reduce((n, el) => {
                    if (el !== undefined) n[el.trim()] = true
                    return n
                }, {})
            }

            if (!dataProp || !objectSize(dataProp)) {
                this._$cached_data[probeID] = copy(this.pocket[probeID]['data'])
                return self ? this : this._$cached_data[probeID]
            }
            return this.dataPropSelector("data()", probeID, dataProp, self, copy(this.pocket[probeID]['data']))
        }

        /**
         * ### cached
         * - grabs last cached `$data(...)` from Probe{}
         * @param {*} dataProp{}/String optional, know what you are asking for example: ` {assets:true}/ or > 'assets,values,somethingElse'`, it has catch error exception, so you wont receive any errors just `null`
         * will return all available matched within our `_$cached_data[probeID]`. Multiples of `dataProp{}/([])/(',')` will return an object, if only one specified, only value will be retured
         * @param {*} probeID 
         */
        $cached(dataProp = {}, probeID = '') {
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return undefined
            const hasValue = this._$cached_data[probeID] !== undefined && this._$cached_data[probeID] !== null
            if (!hasValue) return undefined
            // if you provided a string make it an object
            if (isString(dataProp) && (dataProp || '').length) {
                dataProp = uniq(dataProp.trim().replace(/ /gi, '').split(',')).reduce((n, el) => {
                    if (el !== undefined) n[el] = true
                    return n
                }, {})
            }
            // return cached data if its not an object, or undefined
            if (!objectSize(this._$cached_data[probeID]) && hasValue) {
                if (objectSize(dataProp)) return undefined // our cache not an object, but we are asking for dataProp reference, so should return undefined
                else return this._$cached_data[probeID]
            }
            // no selection at all, so just return whats available
            if (!dataProp || !objectSize(dataProp)) {
                return this._$cached_data[probeID] === undefined ? undefined : this._$cached_data[probeID]
            } else return this.dataPropSelector("cached()", probeID, dataProp, false, this._$cached_data[probeID])
        }

        /**
         * ### $compaign
         * - returns Object copy of `Probe['compaign']` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */
        $compaign(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['compaign'])
        }

        /**
         * ### $ref
         * - returns Probe{}.ref
         * @param {*} probeID optional/sensitive, select new point of reference
         */
        $ref(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['ref'])
        }

        /**
        * ### $status
        * - returns Object copy of `Probe['status']` 
        * @param {*} probeID optional/sensitive, select new point of reference
        */
        $status(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['status'])
        }

        /**
         * ### $task
         * - returns Object copy of `Probe['task']` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */
        $task(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID]['task'])
        }

        /**
         * ### $all
         * - return Object copy of all setters: `{id,status,compaign,task,data}` 
         * @param {*} probeID optional/sensitive, select new point of reference
         */
        $all(probeID) {
            // allow use of short ref names example: `::cocalola`
            probeID = this.selectByTask(probeID, true)
            if (!this.pocket[probeID]) return null
            return copy(this.pocket[probeID].all())
        }
    }
}


/***/ })
/******/ ]);