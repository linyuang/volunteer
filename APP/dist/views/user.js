// { "framework": "Weex" }
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

	var __weex_template__ = __webpack_require__(169)
	var __weex_style__ = __webpack_require__(170)
	var __weex_script__ = __webpack_require__(171)

	__weex_define__('@weex-component/834443da332ea8e36ae1628ac56caf18', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/834443da332ea8e36ae1628ac56caf18',undefined,undefined)

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var navigator = weex.requireModule('navigator');
	var BaseUrl = weex.config.bundleUrl;
	var ImageAssetsUrl = 'file:///android_asset/drawable/';
	var fileUrl = [{
	    name: '/index',
	    url: '/index.js'
	}, {
	    name: '/views/main',
	    url: '/views/main.js'
	}, {
	    name: '/views/testStore',
	    url: '/views/testStore.js'
	}, {
	    name: '/views/cover',
	    url: '/views/cover.js'
	}, {
	    name: '/views/star',
	    url: '/views/star.js'
	}, {
	    name: '/views/one',
	    url: '/views/one.js'
	}, {
	    name: '/views/two',
	    url: '/views/two.js'
	}, {
	    name: '/views/login',
	    url: '/views/login.js'
	}, {
	    name: '/views/nodeText',
	    url: '/views/nodeText.js'
	}, {
	    name: '/views/register',
	    url: '/views/register.js'
	}, {
	    name: '/views/setUserInformation',
	    url: '/views/setUserInformation.js'
	}, {
	    name: '/views/webInfo',
	    url: '/views/webInfo.js'
	}];

	function getUrlHead() {
	    if (BaseUrl == undefined && BaseUrl == '') {
	        modal.toast({ message: "BaseUrl是：" + BaseUrl });
	        return;
	    }
	    var nativeBase = void 0;
	    var isAndroidAssets = BaseUrl.indexOf('file://assets/') >= 0;
	    var isiOSAssets = BaseUrl.indexOf('file:///') >= 0 && BaseUrl.indexOf('WeexDemo.app') > 0;
	    if (isAndroidAssets) {
	        nativeBase = 'file://assets/dist';
	    } else {
	        if (isiOSAssets) {
	            nativeBase = BaseUrl.substring(0, BaseUrl.lastIndexOf('/'));
	        }
	    }
	    return nativeBase;
	}

	function getImagePath(path) {
	    var result = '';
	    switch (path) {
	        case 'cover':
	            result = 'Cover';
	            break;
	        case 'friend':
	            result = 'FriendPath';
	            break;
	        case 'header':
	            result = 'Header';
	            break;
	        case 'navigation':
	            result = 'NavigationBar';
	            break;
	        case 'register':
	            result = 'RegisteredPath';
	            break;
	        case 'user':
	            result = 'UserPath';
	            break;
	        case 'head':
	            result = 'UserHeadImage';
	            break;
	        default:
	            break;
	    }
	    return result;
	}

	exports.POP = function (callback) {
	    navigator.pop({
	        animated: "false"
	    }, callback);
	};

	exports.PUSH = function (url, callback) {
	    var urlHead = getUrlHead();
	    // modal.toast({message:"Url是："+ baseUrl + url});
	    fileUrl.forEach(function (item) {
	        if (url == item.name) {
	            navigator.push({
	                url: urlHead + item.url,
	                animated: "true"
	            }, callback);
	        }
	    });
	};

	exports.GETIMAGE = function (path, image) {
	    image = image ? image : 'setHead.jpg';
	    var PATHURL = getImagePath(path);
	    return ImageAssetsUrl + PATHURL + '/' + image;
	};

/***/ },
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
	        head: "setHead.jpg",
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

/***/ },
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "classList": [
	    "user"
	  ],
	  "children": [
	    {
	      "type": "div",
	      "classList": [
	        "head"
	      ],
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "titleText"
	          ],
	          "attr": {
	            "value": "个人"
	          }
	        }
	      ]
	    },
	    {
	      "type": "scroller",
	      "classList": [
	        "content"
	      ],
	      "attr": {
	        "showScrollbar": "false",
	        "scrollDirection": "vertical"
	      },
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "userInformationBox"
	          ],
	          "events": {
	            "click": function ($event) {this.Login($event)}
	          },
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "userImageBox"
	              ],
	              "children": [
	                {
	                  "type": "image",
	                  "classList": [
	                    "userImage"
	                  ],
	                  "attr": {
	                    "src": function () {return this.com_userHead()}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "text",
	              "classList": [
	                "userName"
	              ],
	              "attr": {
	                "value": function () {return this.UserInfo.name}
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "features"
	          ],
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "featuresBox"
	              ],
	              "repeat": {
	                "expression": function () {return this.featuresList},
	                "value": "featureItem"
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "classList": [
	                    "featureBox"
	                  ],
	                  "events": {
	                    "click": function ($event) {this.pathPush(this.featureItem,$event)}
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "classList": [
	                        "featureImageBox"
	                      ],
	                      "children": [
	                        {
	                          "type": "image",
	                          "classList": [
	                            "featureImage"
	                          ],
	                          "attr": {
	                            "src": function () {return this.featureItem.imageUrl}
	                          }
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "classList": [
	                        "featureNameBox"
	                      ],
	                      "children": [
	                        {
	                          "type": "text",
	                          "classList": [
	                            "featureName"
	                          ],
	                          "attr": {
	                            "value": function () {return this.featureItem.name}
	                          }
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "classList": [
	                        "rightArrowBox"
	                      ],
	                      "children": [
	                        {
	                          "type": "image",
	                          "classList": [
	                            "rightArrow"
	                          ],
	                          "attr": {
	                            "src": "file:///android_asset/drawable/right_arrow.png"
	                          }
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": function () {return ['loginOutBox', this.com_loginOut()]},
	      "children": [
	        {
	          "type": "div",
	          "classList": [
	            "loginOut"
	          ],
	          "events": {
	            "click": function ($event) {this.outLogin($event)}
	          },
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "loginOutText"
	              ],
	              "attr": {
	                "value": "退出登录"
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}

/***/ },
/* 170 */
/***/ function(module, exports) {

	module.exports = {
	  "user": {
	    "display": "flex",
	    "flex": 1
	  },
	  "head": {
	    "display": "flex",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "height": 100,
	    "backgroundColor": "#ffffff",
	    "borderBottomStyle": "solid",
	    "borderBottomColor": "#c3c3c3",
	    "borderBottomWidth": 2
	  },
	  "titleText": {
	    "fontSize": 35,
	    "fontWeight": "bold",
	    "color": "#000000"
	  },
	  "content": {
	    "flex": 1,
	    "flexDirection": "column",
	    "backgroundColor": "#eeeeee"
	  },
	  "userInformationBox": {
	    "flexDirection": "column",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "width": 750,
	    "height": 375,
	    "backgroundColor": "#ADFF2F"
	  },
	  "userImageBox": {
	    "justifyContent": "center",
	    "alignItems": "center",
	    "width": 200,
	    "height": 200,
	    "backgroundColor": "#ffffff",
	    "borderRadius": 100
	  },
	  "userImage": {
	    "width": 200,
	    "height": 200
	  },
	  "userName": {
	    "marginTop": 30,
	    "fontSize": 30
	  },
	  "features": {
	    "flex": 1,
	    "paddingTop": 50
	  },
	  "featuresBox": {
	    "flexDirection": "column",
	    "width": 750,
	    "backgroundColor": "#ffffff"
	  },
	  "featureBox": {
	    "flexDirection": "row",
	    "alignItems": "center",
	    "width": 750,
	    "height": 100,
	    "borderBottomColor": "#eeeeee",
	    "borderBottomWidth": 2,
	    "borderBottomStyle": "solid"
	  },
	  "featureImageBox": {
	    "flex": 1,
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "featureImage": {
	    "width": 32,
	    "height": 32
	  },
	  "featureNameBox": {
	    "flex": 8,
	    "justifyContent": "center"
	  },
	  "featureName": {
	    "fontSize": 30,
	    "color": "#000000"
	  },
	  "rightArrowBox": {
	    "flex": 1,
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "rightArrow": {
	    "width": 18,
	    "height": 30
	  },
	  "loginOutBox": {
	    "width": 750,
	    "height": 160,
	    "justifyContent": "center",
	    "alignItems": "center",
	    "backgroundColor": "#eeeeee"
	  },
	  "loginOut": {
	    "width": 750,
	    "height": 100,
	    "justifyContent": "center",
	    "alignItems": "center",
	    "backgroundColor": "#ff0000"
	  },
	  "loginOutText": {
	    "fontSize": 40,
	    "fontWeight": "bold",
	    "color": "#ffffff"
	  },
	  "loginOutHidden": {
	    "position": "absolute",
	    "left": -750
	  }
	}

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	var _api = __webpack_require__(8);

	var _api2 = _interopRequireDefault(_api);

	var _router = __webpack_require__(7);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var user_login = new BroadcastChannel('Login');
	var user_userInfo = new BroadcastChannel('SetUserInfo');

	module.exports = {
	    data: function () {return {
	        path: 'user',
	        isLogin: false,
	        UserInfo: {
	            head: "login.png",
	            name: ""
	        },
	        featuresList: [{
	            imageUrl: 'file:///android_asset/drawable/pen.png',
	            name: '个人简历'
	        }, {
	            imageUrl: 'file:///android_asset/drawable/heart.png',
	            name: '爱心历程'
	        }, {
	            imageUrl: 'file:///android_asset/drawable/UserPath/news_72px.png',
	            name: '我的消息'
	        }]
	    }},
	    methods: {
	        upData: function upData() {
	            var _this = this;
	            _api2.default.GETITEM("Login", function (event) {
	                if (event.result == "success") {
	                    _this.isLogin = typeof event.data == "string" ? Boolean(event.data) : event.data;
	                }
	            });
	            _api2.default.GETITEM("UserInfo", function (event) {
	                if (event.result == "success") {
	                    _this.UserInfo = typeof event.data == "string" ? JSON.parse(event.data) : event.data;
	                    _api2.default.TIP("更新成功，数据为：" + event.data);
	                }
	            });
	        },
	        tip: function tip() {
	            _api2.default.TIP(this.path);
	        },
	        Login: function Login() {
	            if (!this.isLogin) {
	                _router2.default.PUSH('/views/login');
	            } else {
	                _router2.default.PUSH('/views/setUserInformation');
	            }
	        },
	        getKeys: function getKeys() {
	            _api2.default.GETKEYS(function (e) {
	                if (e.result == "success") {
	                    _api2.default.TIP(e.data.join(''));
	                }
	            });
	            _api2.default.GETITEM('timeOut', function (e) {
	                _api2.default.TIP('e.result => ' + e.result + ',e.data => ' + e.data);
	            });
	        },
	        pathPush: function pathPush(obj) {
	            var isLogin = this.isLogin;
	            if (!isLogin) {
	                _api2.default.TOAST('请先登录');
	            } else {
	                var name = obj.name;
	                switch (name) {
	                    case '个人简历':
	                        _router2.default.PUSH('/views/setUserInformation');
	                        break;
	                    case '爱心历程':
	                        _api2.default.TOAST('该功能还在开发');
	                        break;
	                    case '我的消息':
	                        _api2.default.TOAST('该功能还在开发');
	                        break;
	                    default:
	                        break;
	                }
	            }
	        },
	        outLogin: function outLogin() {
	            var _this = this;
	            var keys = [];
	            _api2.default.GETKEYS(function (event) {
	                if (event.result == 'success') {
	                    keys = event.data;
	                    keys.forEach(function (item) {
	                        _api2.default.REMOVEITEM(item, function (res) {
	                            if (res.result == 'success') {
	                                _this.isLogin = false;
	                                _this.UserInfo = {
	                                    head: "setHead.jpg",
	                                    name: ""
	                                };
	                            }
	                        });
	                    });
	                }
	            });
	        },
	        com_userHead: function com_userHead() {
	            var _this = this;
	            return _router2.default.GETIMAGE('head', _this.UserInfo.head);
	        },
	        com_loginOut: function com_loginOut() {
	            var _this = this;
	            return _this.isLogin ? "loginOutShow" : "loginOutHidden";
	        }
	    },
	    created: function created() {
	        var _this = this;
	        _this.upData();
	        user_login.onmessage = function (event) {
	            if (event.data == "loginSuccess") {
	                _this.upData();
	            }
	        };
	        user_userInfo.onmessage = function (event) {
	            if (event.data == "setInfoSuccess") {
	                _this.upData();
	            }
	        };
	    }
	};}
	/* generated by weex-loader */


/***/ }
/******/ ]);