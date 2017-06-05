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

/***/ }
/******/ ]);