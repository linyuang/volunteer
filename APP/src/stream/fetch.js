import Apis from '../mixins/api'

const stream = weex.requireModule('stream');
const BaseURL = 'http://192.168.191.1:8080/';
//登录链接
const LoginUrl = BaseURL + 'Yuc/user/login';
//注册链接
const RegisterUrl = BaseURL + 'Yuc/user/register';
//账号验证
const UserNameAskUrl = BaseURL + 'Yuc/user/register/userName/vaild';
//邮箱验证
const EmailAskUrl = BaseURL + 'Yuc/user/register/email/vaild';

//首页——获取推荐活动
const GetHomeActs = BaseURL + 'Yuc/activity/findTop';//610

//首页——获取组织列表
const GetOrgList = BaseURL + 'Yuc/community/getCommunitiesFromApp';

//公告——获取活动列表
const GetActList = BaseURL + 'Yuc/activity/getactivities';

//盟友——获取用户好友列表
const GetFriendList = BaseURL + '';

//个人——用户信息更新
const SetInfoUrl = BaseURL + 'Yuc/user/update';


function getUrl(type) {
    let result = '';
    switch (type){
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
        default :
            result = BaseURL;
            break;
    }
    return result;
}

exports.FETCHGET = function (type,rope,callback) {
    let URL = getUrl(type);
    return stream.fetch({
        method: 'GET',
        url:URL+rope,
        type: 'text'
    },callback)
};

exports.FETCHPOST = function (type,body,callback) {
    let URL = getUrl(type);
    // Apis.TIP('对应链接：' + URL);
    return stream.fetch({
        method: 'POST',
        url:URL,
        type: 'json',
        body:body
    },callback)
};

