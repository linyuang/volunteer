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

	var __weex_template__ = __webpack_require__(163)
	var __weex_style__ = __webpack_require__(164)
	var __weex_script__ = __webpack_require__(165)

	__weex_define__('@weex-component/d02050a3df6403959dd028df13f20327', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/d02050a3df6403959dd028df13f20327',undefined,undefined)

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "classList": [
	    "header"
	  ],
	  "children": [
	    {
	      "type": "div",
	      "classList": [
	        "back"
	      ],
	      "events": {
	        "click": "Back"
	      },
	      "children": [
	        {
	          "type": "image",
	          "classList": function () {return ['backImage', this.backImageShow()]},
	          "attr": {
	            "src": function () {return this.backImage}
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "title"
	      ],
	      "children": [
	        {
	          "type": "text",
	          "classList": [
	            "titleText"
	          ],
	          "attr": {
	            "value": function () {return this.titleText}
	          }
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": [
	        "menu"
	      ],
	      "events": {
	        "click": "menu"
	      },
	      "children": [
	        {
	          "type": "image",
	          "classList": function () {return ['menuImage', this.menuImageShow()]},
	          "attr": {
	            "src": function () {return this.menuImage}
	          }
	        }
	      ]
	    }
	  ]
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
	  "header": {
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "width": 750,
	    "height": 100,
	    "backgroundColor": "#000000",
	    "borderBottomWidth": 2,
	    "borderBottomStyle": "solid",
	    "borderBottomColor": "#c3c3c3"
	  },
	  "back": {
	    "flex": 1,
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "menu": {
	    "flex": 1,
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "backImage": {
	    "width": 20,
	    "height": 36
	  },
	  "backImageHidden": {
	    "position": "absolute",
	    "left": -750
	  },
	  "menuImage": {
	    "width": 35,
	    "height": 35
	  },
	  "menuImageHidden": {
	    "position": "absolute",
	    "left": -750
	  },
	  "title": {
	    "flex": 6,
	    "justifyContent": "center",
	    "alignItems": "center"
	  },
	  "titleText": {
	    "fontSize": 35,
	    "fontWeight": "bold",
	    "color": "#ffffff"
	  }
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	var _router = __webpack_require__(7);

	var _router2 = _interopRequireDefault(_router);

	var _api = __webpack_require__(8);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
	    data: function () {return {
	        head: {},
	        titleText: 'xxx',
	        backShow: 'visible',
	        menuShow: 'visible',
	        backImage: 'file:///android_asset/drawable/back.png',
	        menuImage: 'file:///android_asset/drawable/more.png'
	    }},
	    methods: {
	        Back: function Back() {
	            var _this = this;
	            if (_this.backShow != 'visible') {
	                return;
	            }
	            _router2.default.POP();
	        },
	        menu: function menu() {
	            var _this = this;
	            if (_this.menuShow != 'visible') {
	                return;
	            }
	        },
	        subOption: function subOption() {
	            var _this = this;
	            var Head = this.head;
	            _this.backShow = Head.backShow;
	            _this.menuShow = Head.menuShow;
	            if (Head.titleText == '') {
	                _api2.default.GETITEM('webInfo', function (event) {
	                    if (event.result == 'success') {
	                        var info = typeof event.data == 'string' ? JSON.parse(event.data) : event.data;
	                        _this.titleText = info["type"] == 'org' ? '组织介绍' : '活动介绍';
	                    }
	                });
	            } else {
	                _this.titleText = Head.titleText;
	            }
	        },
	        backImageShow: function backImageShow() {
	            var _this = this;
	            return _this.backShow == 'visible' ? 'backImageShow' : 'backImageHidden';
	        },
	        menuImageShow: function menuImageShow() {
	            var _this = this;
	            return _this.menuShow == 'visible' ? 'menuImageShow' : 'menuImageHidden';
	        }
	    },
	    created: function created() {
	        this.subOption();
	    }
	};}
	/* generated by weex-loader */


/***/ },
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
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _api = __webpack_require__(8);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var stream = weex.requireModule('stream');
	var BaseURL = 'http://192.168.191.1:8080/';
	//登录链接
	var LoginUrl = BaseURL + 'Yuc/user/login';
	//注册链接
	var RegisterUrl = BaseURL + 'Yuc/user/register';
	//账号验证
	var UserNameAskUrl = BaseURL + 'Yuc/user/register/userName/vaild';
	//邮箱验证
	var EmailAskUrl = BaseURL + 'Yuc/user/register/email/vaild';

	//首页——获取推荐活动
	var GetHomeActs = BaseURL + '';
	//首页——获取组织列表
	var GetOrgList = BaseURL + '';

	//公告——获取活动列表
	var GetActList = BaseURL + '';

	//盟友——获取用户好友列表
	var GetFriendList = BaseURL + '';

	//个人——用户信息更新
	var SetInfoUrl = BaseURL + 'Yuc/user/update';

	function getUrl(type) {
	    var result = '';
	    switch (type) {
	        case 'login':
	            result = LoginUrl;
	            break;
	        case 'register':
	            result = RegisterUrl;
	            break;
	        case 'userNameAsk':
	            result = UserNameAskUrl;
	            break;
	        case 'emailAsk':
	            result = EmailAskUrl;
	            break;
	        case 'setInfo':
	            result = SetInfoUrl;
	            break;
	        case 'getHomeActs':
	            result = GetHomeActs;
	            break;
	        case 'getOrgList':
	            result = GetOrgList;
	            break;
	        case 'getActList':
	            result = GetActList;
	            break;
	        case 'getFriendList':
	            result = GetFriendList;
	            break;
	        default:
	            result = BaseURL;
	            break;
	    }
	    return result;
	}

	exports.FETCHGET = function (type, rope, callback) {
	    var URL = getUrl(type);
	    return stream.fetch({
	        method: 'GET',
	        url: URL + rope,
	        type: 'text'
	    }, callback);
	};

	exports.FETCHPOST = function (type, body, callback) {
	    var URL = getUrl(type);
	    _api2.default.TIP('对应链接：' + URL);
	    return stream.fetch({
	        method: 'POST',
	        url: URL,
	        type: 'json',
	        body: body
	    }, callback);
	};

/***/ },
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(4)
	var __weex_style__ = __webpack_require__(5)
	var __weex_script__ = __webpack_require__(6)

	__weex_define__('@weex-component/header', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})


/***/ },
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "classList": [
	    "setUserInformation"
	  ],
	  "children": [
	    {
	      "type": "header",
	      "attr": {
	        "head": function () {return this.Head}
	      }
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
	            "userHeadImageBox"
	          ],
	          "events": {
	            "touchend": function ($event) {this.bodyTouch($event)}
	          },
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "UHIRound"
	              ],
	              "events": {
	                "touchend": function ($event) {this.headImageTouch($event)}
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "classList": [
	                    "UHImage"
	                  ],
	                  "attr": {
	                    "src": function () {return this.headImageUrl()}
	                  }
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "userInformationInputBox"
	          ],
	          "repeat": {
	            "expression": function () {return this.UserInformation.Text},
	            "value": "informationItem"
	          },
	          "events": {
	            "touchend": function ($event) {this.bodyTouch($event)}
	          },
	          "children": [
	            {
	              "type": "div",
	              "classList": [
	                "normalInputBox"
	              ],
	              "shown": function () {return this.com_normalInputShow(this.informationItem)},
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "UITitle"
	                  ],
	                  "attr": {
	                    "value": function () {return this.informationItem.name}
	                  }
	                },
	                {
	                  "type": "input",
	                  "id": function () {return this.informationItem.type},
	                  "classList": function () {return ['UIInput', this.com_inputBorder(this.informationItem)]},
	                  "attr": {
	                    "type": "text",
	                    "value": function () {return this.informationItem.inputValue},
	                    "disabled": function () {return this.com_disabled()},
	                    "autofocus": "false",
	                    "placeholder": function () {return this.informationItem.placeholder}
	                  },
	                  "events": {
	                    "input": function ($event) {this.userInput(this.informationItem,$event)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "errorTip"
	                  ],
	                  "attr": {
	                    "value": function () {return this.com_errorTip(this.informationItem)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "radioSelectBox"
	              ],
	              "shown": function () {return this.com_RadioSelectShow(this.informationItem)},
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "UITitle"
	                  ],
	                  "attr": {
	                    "value": function () {return this.informationItem.name}
	                  }
	                },
	                {
	                  "type": "div",
	                  "classList": [
	                    "radiosBox"
	                  ],
	                  "children": [
	                    {
	                      "type": "div",
	                      "classList": [
	                        "radioBox"
	                      ],
	                      "events": {
	                        "click": function ($event) {this.radioSelect(this.informationItem,this.item,$event)}
	                      },
	                      "repeat": {
	                        "expression": function () {return this.informationItem.items},
	                        "value": "item"
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "classList": function () {return ['round', this.com_radioSelect(this.informationItem,this.item)]}
	                        },
	                        {
	                          "type": "text",
	                          "classList": [
	                            "radioTxT"
	                          ],
	                          "attr": {
	                            "value": function () {return this.item.name}
	                          }
	                        }
	                      ]
	                    }
	                  ]
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "errorTip"
	                  ],
	                  "attr": {
	                    "value": function () {return this.com_errorTip(this.informationItem)}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "classList": [
	                "pickerBox"
	              ],
	              "shown": function () {return this.com_pickerShow(this.informationItem)},
	              "children": [
	                {
	                  "type": "text",
	                  "classList": [
	                    "UITitle"
	                  ],
	                  "attr": {
	                    "value": function () {return this.informationItem.name}
	                  }
	                },
	                {
	                  "type": "text",
	                  "id": function () {return this.informationItem.type},
	                  "classList": function () {return ['UIInput', this.com_pickerTxTColor(this.informationItem),this.com_inputBorder(this.informationItem)]},
	                  "events": {
	                    "click": function ($event) {this.pickerInput(this.informationItem,$event)}
	                  },
	                  "attr": {
	                    "value": function () {return this.com_pickerValue(this.informationItem)}
	                  }
	                },
	                {
	                  "type": "text",
	                  "classList": [
	                    "errorTip"
	                  ],
	                  "attr": {
	                    "value": function () {return this.com_errorTip(this.informationItem)}
	                  }
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "classList": [
	            "buttonBox"
	          ],
	          "events": {
	            "touchend": function ($event) {this.bodyTouch($event)}
	          },
	          "children": [
	            {
	              "type": "div",
	              "classList": function () {return ['button', this.com_submitTouch()]},
	              "events": {
	                "touchend": function ($event) {this.submitTouch($event)}
	              },
	              "children": [
	                {
	                  "type": "text",
	                  "classList": function () {return ['buttonTxT', this.com_submitTextTouch()]},
	                  "attr": {
	                    "value": function () {return this.com_submitTexT()}
	                  }
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "classList": function () {return ['selectHeadImage', this.com_headImageTouch()]},
	      "children": [
	        {
	          "type": "scroller",
	          "classList": [
	            "headImagesBox"
	          ],
	          "attr": {
	            "showScrollbar": "false",
	            "scrollDirection": "horizontal"
	          },
	          "children": [
	            {
	              "type": "image",
	              "classList": [
	                "headImage"
	              ],
	              "repeat": {
	                "expression": function () {return this.HeadImages},
	                "value": "imageItem"
	              },
	              "attr": {
	                "src": function () {return this.getHeadImages(this.imageItem)}
	              },
	              "events": {
	                "touchend": function ($event) {this.headImageSelect(this.imageItem,$event)}
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	}

/***/ },
/* 164 */
/***/ function(module, exports) {

	module.exports = {
	  "setUserInformation": {
	    "flex": 1,
	    "flexDirection": "column",
	    "alignItems": "center",
	    "backgroundColor": "#ffffff"
	  },
	  "content": {
	    "flex": 1,
	    "flexDirection": "column",
	    "alignItems": "center",
	    "overflowY": "auto"
	  },
	  "userHeadImageBox": {
	    "justifyContent": "center",
	    "alignItems": "center",
	    "width": 750,
	    "height": 400
	  },
	  "UHIRound": {
	    "width": 200,
	    "height": 200,
	    "borderRadius": 100
	  },
	  "UHImage": {
	    "width": 200,
	    "height": 200
	  },
	  "userInformationInputBox": {
	    "flexDirection": "column",
	    "alignItems": "center",
	    "width": 750,
	    "padding": 20
	  },
	  "normalInputBox": {
	    "width": 650,
	    "height": 175
	  },
	  "radioSelectBox": {
	    "width": 650,
	    "height": 175
	  },
	  "pickerBox": {
	    "width": 650,
	    "height": 175
	  },
	  "UITitle": {
	    "width": 650,
	    "height": 50,
	    "fontSize": 30,
	    "color": "#000000",
	    "marginTop": 20
	  },
	  "UIInput": {
	    "width": 650,
	    "height": 80,
	    "paddingLeft": 10,
	    "fontSize": 30,
	    "lineHeight": 80
	  },
	  "trueInput": {
	    "borderWidth": 2,
	    "borderStyle": "solid",
	    "borderTopColor": "rgba(0,0,0,0)",
	    "borderLeftColor": "rgba(0,0,0,0)",
	    "borderRightColor": "rgba(0,0,0,0)",
	    "borderBottomColor": "#3f3f3f"
	  },
	  "errorInput": {
	    "borderWidth": 2,
	    "borderStyle": "solid",
	    "borderTopColor": "#ff0000",
	    "borderLeftColor": "#ff0000",
	    "borderRightColor": "#ff0000",
	    "borderBottomColor": "#ff0000"
	  },
	  "CanInput": {
	    "backgroundColor": "#ffffff",
	    "color": "#000000"
	  },
	  "UnInput": {
	    "backgroundColor": "#ffffff",
	    "color": "#e3e3e3"
	  },
	  "errorTip": {
	    "width": 650,
	    "height": 30,
	    "lineHeight": 30,
	    "fontSize": 25,
	    "color": "#ff0000"
	  },
	  "radiosBox": {
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "width": 450,
	    "height": 80
	  },
	  "radioBox": {
	    "flex": 1,
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "width": 100,
	    "height": 100
	  },
	  "round": {
	    "width": 20,
	    "height": 20,
	    "borderRadius": 10,
	    "borderColor": "#5b5b5b",
	    "borderWidth": 2,
	    "borderStyle": "solid"
	  },
	  "radioSelect": {
	    "backgroundColor": "#00ff00"
	  },
	  "radioUnSelect": {
	    "backgroundColor": "#ffffff"
	  },
	  "radioTxT": {
	    "marginLeft": 20,
	    "fontSize": 30
	  },
	  "pickerUnInput": {
	    "color": "#afafaf"
	  },
	  "pickerInput": {
	    "color": "#000000"
	  },
	  "buttonBox": {
	    "flexDirection": "row",
	    "justifyContent": "center",
	    "alignItems": "center",
	    "width": 650,
	    "height": 200
	  },
	  "button": {
	    "justifyContent": "center",
	    "alignItems": "center",
	    "width": 300,
	    "height": 100,
	    "borderRadius": 10
	  },
	  "buttonTxT": {
	    "fontSize": 50,
	    "fontWeight": "bold",
	    "color": "#000000"
	  },
	  "change": {
	    "backgroundColor": "#ff6600"
	  },
	  "UnTounch": {
	    "backgroundColor": "#eeeeee"
	  },
	  "sumbit": {
	    "backgroundColor": "#00ff00"
	  },
	  "textTouch": {
	    "color": "#ffffff"
	  },
	  "unTextTouch": {
	    "color": "#000000"
	  },
	  "selectHeadImage": {
	    "flexDirection": "column",
	    "justifyContent": "center",
	    "width": 750,
	    "height": 300,
	    "backgroundColor": "rgba(0,0,0,0.7)"
	  },
	  "selectHeadImageShow": {
	    "position": "fixed",
	    "bottom": 0
	  },
	  "selectHeadImageHidden": {
	    "position": "absolute",
	    "left": -750
	  },
	  "headImagesBox": {
	    "flexDirection": "row",
	    "height": 200
	  },
	  "headImage": {
	    "width": 200,
	    "height": 200,
	    "marginRight": 10
	  }
	}

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	var _stringify = __webpack_require__(9);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _header = __webpack_require__(159);

	var _header2 = _interopRequireDefault(_header);

	var _router = __webpack_require__(7);

	var _router2 = _interopRequireDefault(_router);

	var _api = __webpack_require__(8);

	var _api2 = _interopRequireDefault(_api);

	var _fetch = __webpack_require__(155);

	var _fetch2 = _interopRequireDefault(_fetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var setInfo_user = new BroadcastChannel('SetUserInfo');
	module.exports = {
	    data: function () {return {
	        Head: {
	            titleText: '个人简历',
	            backShow: 'visible',
	            menuShow: 'hidden'
	        },
	        LocalUserInfo: {},
	        UserInformation: {
	            headImage: {
	                type: "head",
	                url: "setHead.jpg"
	            },
	            Text: [{
	                name: "真实姓名：",
	                type: "name",
	                placeholder: "请输入真实姓名",
	                inputValue: "",
	                isRule: true,
	                errorType: '',
	                isFocus: false
	            }, {
	                name: "性别：",
	                type: "sex",
	                placeholder: "请选择您的性别",
	                inputValue: "",
	                isRule: true,
	                errorType: '',
	                isFocus: false,
	                items: [{
	                    name: '男',
	                    value: '0'
	                }, {
	                    name: '女',
	                    value: '1'
	                }]
	            }, {
	                name: "出生日期：",
	                type: "birth",
	                placeholder: "请输入您的出生日期",
	                inputValue: "",
	                isRule: true,
	                errorType: '',
	                isFocus: false
	            }, {
	                name: "现所在地：",
	                type: "address",
	                placeholder: "请输入您的现所在地",
	                inputValue: "",
	                isRule: true,
	                errorType: '',
	                isFocus: false
	            }, {
	                name: "手机：",
	                type: "phone",
	                placeholder: "请输入您的手机号",
	                inputValue: "",
	                isRule: true,
	                errorType: '',
	                isFocus: false
	            }, {
	                name: "身份：",
	                type: "identity",
	                placeholder: "请选择您的身份",
	                inputValue: "",
	                isRule: true,
	                errorType: '',
	                isFocus: false,
	                items: [{
	                    name: '学生党',
	                    value: '0'
	                }, {
	                    name: '上班族',
	                    value: '1'
	                }]
	            }, {
	                name: "志愿服务年限：",
	                type: "time",
	                placeholder: "请输入您志愿服务年限",
	                inputValue: "",
	                isRule: true,
	                errorType: '',
	                isFocus: false
	            }, {
	                name: "自我介绍：",
	                type: "quotation",
	                placeholder: "请用一句话介绍自己",
	                inputValue: "",
	                isRule: true,
	                errorType: '',
	                isFocus: false
	            }]
	        },
	        HeadImages: [{
	            type: "head",
	            url: "1.jpg"
	        }, {
	            type: "head",
	            url: "2.jpg"
	        }, {
	            type: "head",
	            url: "3.jpg"
	        }, {
	            type: "head",
	            url: "4.jpg"
	        }, {
	            type: "head",
	            url: "5.jpg"
	        }, {
	            type: "head",
	            url: "6.jpg"
	        }, {
	            type: "head",
	            url: "7.jpg"
	        }, {
	            type: "head",
	            url: "8.jpg"
	        }],
	        IsHeadImageTouch: false,
	        IsChange: true,
	        IsChangeTouch: false
	    }},
	    methods: {
	        upDataUserInfo: function upDataUserInfo() {
	            var _this = this;
	            _api2.default.GETITEM("UserInfo", function (event) {
	                if (event.result == "success") {
	                    _this.LocalUserInfo = typeof event.data == "string" ? JSON.parse(event.data) : event.data;
	                    _this.updataUserInformation();
	                }
	            });
	        },
	        updataUserInformation: function updataUserInformation() {
	            var _this = this;
	            var showUserInfo = _this.UserInformation;
	            showUserInfo.headImage["url"] = _this.LocalUserInfo[showUserInfo.headImage.type];
	            showUserInfo.Text.forEach(function (item) {
	                item.inputValue = _this.LocalUserInfo[item.type];
	            });
	        },
	        headImageUrl: function headImageUrl() {
	            var _this = this;
	            var userHead = _this.UserInformation.headImage;
	            var url = '';
	            if (userHead.url.indexOf('http') > -1) {
	                url = userHead.url;
	            } else {
	                url = _router2.default.GETIMAGE(userHead.type, userHead.url);
	            }
	            return url;
	        },
	        bodyTouch: function bodyTouch() {
	            var _this = this;
	            var inputs = _this.UserInformation.Text;
	            _this.IsHeadImageTouch = false;
	            inputs.forEach(function (item) {
	                if (item.type != 'sex' && item.type != 'identity' && item.type != 'birth') {
	                    _this.$el(item.type).blur();
	                }
	            });
	        },
	        headImageTouch: function headImageTouch() {
	            if (!this.IsChange) {
	                this.inputTip();
	                return;
	            }
	            this.IsHeadImageTouch = !this.IsHeadImageTouch;
	        },

	        submitTouch: function submitTouch() {
	            var _this = this;
	            if (!_this.IsChange) {
	                _this.inputTip();
	                return;
	            }
	            var body = 'json=';
	            var result = {};
	            var userInfo = _this.UserInformation;
	            _this.bodyTouch();
	            _this.IsChange = false;
	            result["userName"] = _this.LocalUserInfo["userName"];
	            result[userInfo.headImage.type] = userInfo.headImage.url;
	            userInfo.Text.forEach(function (item) {
	                result[item.type] = item.inputValue;
	            });
	            body += (0, _stringify2.default)(result);
	            _api2.default.TIP(body);
	            _fetch2.default.FETCHPOST('setInfo', body, function (res) {
	                if (res.ok) {
	                    var return_Data = typeof res.data == "string" ? JSON.parse(res.data) : res.data;
	                    _api2.default.TIP(res.data);
	                    if (return_Data["INFO"].code == "407") {
	                        _api2.default.TIP("修改成功");
	                        _api2.default.SETITEM("UserInfo", result, function (event) {
	                            if (event.result == "success") {
	                                _this.IsChange = true;
	                                setInfo_user.postMessage("setInfoSuccess");
	                            }
	                        });
	                    } else {
	                        _api2.default.TIP("修改失败");
	                    }
	                }
	            });
	        },
	        getHeadImages: function getHeadImages(obj) {
	            var url = _router2.default.GETIMAGE(obj.type, obj.url);
	            return url;
	        },
	        headImageSelect: function headImageSelect(obj) {
	            var _this = this;
	            _this.UserInformation.headImage.url = obj.url;
	            _this.IsHeadImageTouch = false;
	        },
	        radioSelect: function radioSelect(fatherObj, child0bj) {
	            if (!this.IsChange) {
	                this.inputTip();
	                return;
	            }
	            if (fatherObj.type == 'sex') {
	                fatherObj.inputValue = child0bj.value;
	                _api2.default.TOAST(fatherObj.inputValue);
	            } else {
	                fatherObj.inputValue = child0bj.name;
	                _api2.default.TOAST(fatherObj.inputValue);
	            }
	        },
	        userInput: function userInput(obj, event) {
	            obj.inputValue = event.value;
	            if (!this.errorStringTest(obj)) {
	                obj.isRule = true;
	                obj.errorType = 'rightString';
	            } else {
	                obj.isRule = false;
	                obj.errorType = 'errorString_rich';
	            }
	            switch (obj.type) {
	                case 'phone':
	                    this.phoneTest(obj);
	                    break;
	                default:
	                    break;
	            }
	        },
	        errorStringTest: function errorStringTest(obj) {
	            var TxTRule = /[<].{0,1000}[>]/;
	            return TxTRule.test(obj.inputValue) ? true : false;
	        },
	        phoneTest: function phoneTest(obj) {
	            var phoneRule = /(13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7}/;
	            if (phoneRule.test(obj.inputValue)) {
	                obj.isRule = true;
	                obj.errorType = 'rightString';
	            } else {
	                obj.isRule = false;
	                obj.errorType = 'errorPhone';
	            }
	            return phoneRule.test(value) ? true : false;
	        },
	        pickerInput: function pickerInput(obj) {
	            var _this = this;
	            if (!_this.IsChange) {
	                _this.inputTip();
	                return;
	            }
	            switch (obj.type) {
	                case 'birth':
	                    _this.birthInput();
	                    break;
	                default:
	                    break;
	            }
	        },
	        birthInput: function birthInput() {
	            var _this = this;
	            var options = {
	                value: "2017-01-01",
	                min: "1917-01-01"
	            };
	            var arr = [];
	            _api2.default.PICKDATE(options, function (res) {
	                _api2.default.TOAST(res.result + ',' + res.data);
	                arr = res.data.split('-');
	                _this.UserInformation.Text[2].inputValue = arr.join("");
	            });
	        },

	        inputTip: function inputTip() {
	            _api2.default.TOAST("正在提交修改中，请耐心等待");
	        },
	        com_disabled: function com_disabled() {
	            return !this.IsChange;
	        },
	        com_inputBorder: function com_inputBorder(obj) {
	            return obj.isRule ? 'trueInput' : 'errorInput';
	        },
	        com_normalInputShow: function com_normalInputShow(obj) {
	            var normalRule = /(name|address|phone|time|quotation)/;
	            return normalRule.test(obj.type) ? true : false;
	        },
	        com_RadioSelectShow: function com_RadioSelectShow(obj) {
	            var RadioRule = /(sex|identity)/;
	            return RadioRule.test(obj.type) ? true : false;
	        },
	        com_pickerShow: function com_pickerShow(obj) {
	            var pickerRule = /(birth)/;
	            return pickerRule.test(obj.type) ? true : false;
	        },
	        com_radioSelect: function com_radioSelect(fatherObj, obj) {
	            var result = '';
	            switch (fatherObj.type) {
	                case 'sex':
	                    result = fatherObj.inputValue == obj.value ? 'radioSelect' : 'radioUnSelect';
	                    break;
	                case 'identity':
	                    result = fatherObj.inputValue == obj.name ? 'radioSelect' : 'radioUnSelect';
	                    break;
	                default:
	                    break;
	            }
	            return result;
	        },
	        com_inputStyle: function com_inputStyle() {
	            return this.IsChange ? "CanInput" : "UnInput";
	        },
	        com_pickerTxTColor: function com_pickerTxTColor(obj) {
	            if (obj.inputValue == '') {
	                return 'pickerUnInput';
	            } else {
	                return 'pickerInput';
	            }
	        },

	        com_pickerValue: function com_pickerValue(obj) {
	            var _this = this;
	            if (obj.inputValue == '') {
	                return obj.placeholder;
	            } else {
	                var result = '';
	                switch (obj.type) {
	                    case 'birth':
	                        result = _this.com_birth(obj);
	                        break;
	                    default:
	                        break;
	                }
	                return result;
	            }
	        },
	        com_birth: function com_birth(obj) {
	            if (obj.inputValue != '') {
	                var _value = obj.inputValue;
	                var year = Number(_value.substr(0, 4));
	                var month = Number(_value.substr(4, 2));
	                var day = Number(_value.substr(6, 2));
	                return year + '年' + month + '月' + day + '日';
	            }
	        },
	        com_errorTip: function com_errorTip(obj) {
	            return _api2.default.ERRORTIP(obj);
	        },
	        com_headImageTouch: function com_headImageTouch() {
	            return this.IsHeadImageTouch ? "selectHeadImageShow" : "selectHeadImageHidden";
	        },

	        com_submitTouch: function com_submitTouch() {
	            return this.IsChange ? "sumbit" : "UnTounch";
	        },

	        com_submitTextTouch: function com_submitTextTouch() {
	            return this.IsChange ? "textTouch" : "unTextTouch";
	        },
	        com_submitTexT: function com_submitTexT() {
	            return this.IsChange ? "提交" : "正在提交";
	        }
	    },
	    created: function created() {
	        this.upDataUserInfo();
	    }
	};}
	/* generated by weex-loader */


/***/ }
/******/ ]);