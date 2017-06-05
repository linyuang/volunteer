const navigator = weex.requireModule('navigator');
const BaseUrl = weex.config.bundleUrl;
const ImageAssetsUrl = 'file:///android_asset/drawable/';
const fileUrl = [
    {
        name:'/index',
        url:'/index.js'
    },
    {
        name:'/views/main',
        url:'/views/main.js'
    },
    {
        name:'/views/testStore',
        url:'/views/testStore.js'
    },
    {
        name:'/views/cover',
        url:'/views/cover.js'
    },
    {
        name:'/views/star',
        url:'/views/star.js'
    },
    {
        name:'/views/one',
        url:'/views/one.js'
    },
    {
        name:'/views/two',
        url:'/views/two.js'
    },
    {
        name:'/views/login',
        url:'/views/login.js'
    },
    {
        name:'/views/nodeText',
        url:'/views/nodeText.js'
    },
    {
        name:'/views/register',
        url:'/views/register.js'
    },
    {
        name:'/views/setUserInformation',
        url:'/views/setUserInformation.js'
    },
    {
        name:'/views/webInfo',
        url:'/views/webInfo.js'
    }
];

function getUrlHead() {
    if (BaseUrl == undefined && BaseUrl == ''){
        modal.toast({message:"BaseUrl是：" + BaseUrl});
        return;
    }
    let nativeBase;
    let isAndroidAssets = BaseUrl.indexOf('file://assets/') >= 0;
    let isiOSAssets = BaseUrl.indexOf('file:///') >= 0 && BaseUrl.indexOf('WeexDemo.app') > 0;
    if (isAndroidAssets) {
        nativeBase = 'file://assets/dist';
    }
    else {
        if (isiOSAssets) {
            nativeBase = BaseUrl.substring(0, BaseUrl.lastIndexOf('/'));
        }
    }
    return nativeBase;
}

function getImagePath(path) {
    let result = '';
    switch (path){
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
        default :
            break;
    }
    return result;
}

exports.POP = function (callback) {
    navigator.pop({
        animated:"false"
    },callback)
};

exports.PUSH = function(url,callback) {
    let urlHead = getUrlHead();
    // modal.toast({message:"Url是："+ baseUrl + url});
    fileUrl.forEach(item => {
        if (url == item.name){
            navigator.push({
                url:urlHead + item.url,
                animated: "true"
            },callback)
        }
    })
};

exports.GETIMAGE = function (path,image) {
    image = (image) ? image : 'setHead.jpg';
    let PATHURL = getImagePath(path);
    return ImageAssetsUrl + PATHURL + '/' + image;
};