// { "framework": "Vue" }
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(9);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _slicedToArray2 = __webpack_require__(12);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _entries = __webpack_require__(68);

	var _entries2 = _interopRequireDefault(_entries);

	var _getIterator2 = __webpack_require__(64);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _index = __webpack_require__(73);

	var _index2 = _interopRequireDefault(_index);

	var _api = __webpack_require__(8);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var modal = weex.requireModule('modal');
	var storage = weex.requireModule('storage');
	var picker = weex.requireModule('picker');

	exports.TIP = function (text) {
	    if (_index2.default.state.Development == "false") {
	        return;
	    }
	    modal.alert({
	        message: text
	    });
	};

	exports.TOAST = function (text) {
	    // if(Store.state.Development == "false"){
	    //     return;
	    // }
	    modal.toast({
	        message: text
	    });
	};

	exports.SETITEM = function (key, value, callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.setItem(key, value, CALLBACK);
	};

	exports.GETITEM = function (key, callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.getItem(key, CALLBACK);
	};

	exports.GETKEYS = function (callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.getAllKeys(CALLBACK);
	};

	exports.REMOVEITEM = function (key, callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.removeItem(key, CALLBACK);
	};

	exports.STORAGELENGTH = function (callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.length(CALLBACK);
	};

	exports.StarStorageSet = function (obj) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(obj)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
	                key = _step$value[0],
	                value = _step$value[1];

	            storage.setItem(key, value, function (event) {
	                if (event.result == 'success') modal.toast({ message: '设置数据 ' + event.result });
	            });
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	};

	exports.PICK = function (options, callback) {
	    options = options ? options : {
	        index: 0,
	        items: [0]
	    };
	    picker.pick(options, callback);
	};

	exports.PICKDATE = function (options, callback) {
	    options = options ? options : {
	        value: "2017-01-01",
	        min: "1917-01-01"
	    };
	    _api2.default.TOAST((0, _stringify2.default)(options));
	    picker.pickDate(options, callback);
	};

	exports.PICKTIME = function (options, callback) {
	    picker.pickTime(options, callback);
	};

	exports.ERRORTIP = function (obj) {
	    var RuleErrorTip = {
	        tooLong: '字段过长，请控制在6-30位之间',
	        tooShort: '字段过短，请控制在6-30位之间',
	        errorString: '字段中含有\' , * & # % < > = (空格) 中文 等违规字符，请删除',
	        errorString_rich: "字段中含有 < > 违规字符，请删除",
	        repeatUserName: '该账号已被注册，请重新输入',
	        repeatEmail: '该邮箱已被注册，请重新输入',
	        repeatPassword: '密码不一致，请重新输入',
	        errorEmail: '该邮箱不正确，请重新输入',
	        errorPhone: '您输入的手机号错误，请重新输入',
	        voidUserName: '账号不能为空',
	        voidPassword: '密码不能为空',
	        rightString: ''
	    };
	    return RuleErrorTip[obj.errorType];
	};

	exports.GETHEAD = function (obj) {
	    var url = 'http://192.168.191.1:8080/Yuc/YucResource/';
	    var head = obj["head"];
	    var img = String(head).indexOf('\\') > -1 ? String(head).substr(String(head).lastIndexOf('\\') + 1) : String(head);
	    switch (obj['type']) {
	        case 'user':
	            url = url + 'User/Head/' + img;
	            break;
	        case 'org':
	            url = url + 'Community/Head/' + img;
	            break;
	        case 'act':
	            url = url + 'Activity/' + img;
	            break;
	        case 'admin':
	            url = url + 'Admin/Head/' + img;
	            break;
	        default:
	            break;
	    }
	    return url;
	};

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(9);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _slicedToArray2 = __webpack_require__(12);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _entries = __webpack_require__(68);

	var _entries2 = _interopRequireDefault(_entries);

	var _getIterator2 = __webpack_require__(64);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _index = __webpack_require__(73);

	var _index2 = _interopRequireDefault(_index);

	var _api = __webpack_require__(8);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var modal = weex.requireModule('modal');
	var storage = weex.requireModule('storage');
	var picker = weex.requireModule('picker');

	exports.TIP = function (text) {
	    if (_index2.default.state.Development == "false") {
	        return;
	    }
	    modal.alert({
	        message: text
	    });
	};

	exports.TOAST = function (text) {
	    // if(Store.state.Development == "false"){
	    //     return;
	    // }
	    modal.toast({
	        message: text
	    });
	};

	exports.SETITEM = function (key, value, callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.setItem(key, value, CALLBACK);
	};

	exports.GETITEM = function (key, callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.getItem(key, CALLBACK);
	};

	exports.GETKEYS = function (callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.getAllKeys(CALLBACK);
	};

	exports.REMOVEITEM = function (key, callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.removeItem(key, CALLBACK);
	};

	exports.STORAGELENGTH = function (callback) {
	    var CALLBACK = callback ? callback : function () {};
	    storage.length(CALLBACK);
	};

	exports.StarStorageSet = function (obj) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(obj)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
	                key = _step$value[0],
	                value = _step$value[1];

	            storage.setItem(key, value, function (event) {
	                if (event.result == 'success') modal.toast({ message: '设置数据 ' + event.result });
	            });
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	};

	exports.PICK = function (options, callback) {
	    options = options ? options : {
	        index: 0,
	        items: [0]
	    };
	    picker.pick(options, callback);
	};

	exports.PICKDATE = function (options, callback) {
	    options = options ? options : {
	        value: "2017-01-01",
	        min: "1917-01-01"
	    };
	    _api2.default.TOAST((0, _stringify2.default)(options));
	    picker.pickDate(options, callback);
	};

	exports.PICKTIME = function (options, callback) {
	    picker.pickTime(options, callback);
	};

	exports.ERRORTIP = function (obj) {
	    var RuleErrorTip = {
	        tooLong: '字段过长，请控制在6-30位之间',
	        tooShort: '字段过短，请控制在6-30位之间',
	        errorString: '字段中含有\' , * & # % < > = (空格) 中文 等违规字符，请删除',
	        errorString_rich: "字段中含有 < > 违规字符，请删除",
	        repeatUserName: '该账号已被注册，请重新输入',
	        repeatEmail: '该邮箱已被注册，请重新输入',
	        repeatPassword: '密码不一致，请重新输入',
	        errorEmail: '该邮箱不正确，请重新输入',
	        errorPhone: '您输入的手机号错误，请重新输入',
	        voidUserName: '账号不能为空',
	        voidPassword: '密码不能为空',
	        rightString: ''
	    };
	    return RuleErrorTip[obj.errorType];
	};

	exports.GETHEAD = function (obj) {
	    var url = 'http://192.168.191.1:8080/Yuc/YucResource/';
	    var head = obj["head"];
	    var img = String(head).indexOf('\\') > -1 ? String(head).substr(String(head).lastIndexOf('\\') + 1) : String(head);
	    switch (obj['type']) {
	        case 'user':
	            url = url + 'User/Head/' + img;
	            break;
	        case 'org':
	            url = url + 'Community/Head/' + img;
	            break;
	        case 'act':
	            url = url + 'Activity/' + img;
	            break;
	        case 'admin':
	            url = url + 'Admin/Head/' + img;
	            break;
	        default:
	            break;
	    }
	    return url;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(11)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(13);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(64);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(60);
	module.exports = __webpack_require__(62);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	var global        = __webpack_require__(27)
	  , hide          = __webpack_require__(30)
	  , Iterators     = __webpack_require__(19)
	  , TO_STRING_TAG = __webpack_require__(57)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(17)
	  , step             = __webpack_require__(18)
	  , Iterators        = __webpack_require__(19)
	  , toIObject        = __webpack_require__(20);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(24)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(21)
	  , defined = __webpack_require__(23);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(22);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(25)
	  , $export        = __webpack_require__(26)
	  , redefine       = __webpack_require__(40)
	  , hide           = __webpack_require__(30)
	  , has            = __webpack_require__(41)
	  , Iterators      = __webpack_require__(19)
	  , $iterCreate    = __webpack_require__(42)
	  , setToStringTag = __webpack_require__(56)
	  , getPrototypeOf = __webpack_require__(58)
	  , ITERATOR       = __webpack_require__(57)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(27)
	  , core      = __webpack_require__(11)
	  , ctx       = __webpack_require__(28)
	  , hide      = __webpack_require__(30)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 27 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(29);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(31)
	  , createDesc = __webpack_require__(39);
	module.exports = __webpack_require__(35) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(32)
	  , IE8_DOM_DEFINE = __webpack_require__(34)
	  , toPrimitive    = __webpack_require__(38)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(35) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(33);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(35) && !__webpack_require__(36)(function(){
	  return Object.defineProperty(__webpack_require__(37)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(36)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(33)
	  , document = __webpack_require__(27).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(33);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30);

/***/ },
/* 41 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(43)
	  , descriptor     = __webpack_require__(39)
	  , setToStringTag = __webpack_require__(56)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(30)(IteratorPrototype, __webpack_require__(57)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(32)
	  , dPs         = __webpack_require__(44)
	  , enumBugKeys = __webpack_require__(54)
	  , IE_PROTO    = __webpack_require__(51)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(37)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(55).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(31)
	  , anObject = __webpack_require__(32)
	  , getKeys  = __webpack_require__(45);

	module.exports = __webpack_require__(35) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(46)
	  , enumBugKeys = __webpack_require__(54);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(41)
	  , toIObject    = __webpack_require__(20)
	  , arrayIndexOf = __webpack_require__(47)(false)
	  , IE_PROTO     = __webpack_require__(51)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(20)
	  , toLength  = __webpack_require__(48)
	  , toIndex   = __webpack_require__(50);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(49)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 49 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(49)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(52)('keys')
	  , uid    = __webpack_require__(53);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(27)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27).document && document.documentElement;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(31).f
	  , has = __webpack_require__(41)
	  , TAG = __webpack_require__(57)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(52)('wks')
	  , uid        = __webpack_require__(53)
	  , Symbol     = __webpack_require__(27).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(41)
	  , toObject    = __webpack_require__(59)
	  , IE_PROTO    = __webpack_require__(51)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(23);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(61)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(24)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(49)
	  , defined   = __webpack_require__(23);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(63)
	  , ITERATOR  = __webpack_require__(57)('iterator')
	  , Iterators = __webpack_require__(19);
	module.exports = __webpack_require__(11).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(22)
	  , TAG = __webpack_require__(57)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(60);
	module.exports = __webpack_require__(66);

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(32)
	  , get      = __webpack_require__(67);
	module.exports = __webpack_require__(11).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(63)
	  , ITERATOR  = __webpack_require__(57)('iterator')
	  , Iterators = __webpack_require__(19);
	module.exports = __webpack_require__(11).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	module.exports = __webpack_require__(11).Object.entries;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(26)
	  , $entries = __webpack_require__(71)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(45)
	  , toIObject = __webpack_require__(20)
	  , isEnum    = __webpack_require__(72).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 72 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 73 */
/***/ function(module, exports) {

	"use strict";

	exports.state = {
	    Login: "false",
	    SaveIf: "false",
	    Development: "true",
	    UserInfo: {
	        userId: "",
	        userName: "",
	        password: "",
	        head: "login.jpg",
	        name: "",
	        sex: "",
	        birth: "",
	        identity: "",
	        address: "",
	        email: "",
	        phone: "",
	        time: "",
	        quotation: ""
	    }
	};

/***/ }
/******/ ]);