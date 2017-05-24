import Axios from 'axios'
import state from './state'

const ProdURL = 'http://localhost:8080/Yuc/';
const DeveLURL = 'http://192.168.191.1:8080/Yuc/';
let BaseURL = (state.ProductionMode) ? ProdURL : DeveLURL;
const LoginUrl = BaseURL + 'community/login';
const RegisterUrl = BaseURL + 'community/register';
const UserNameAskUrl = BaseURL + 'community/userNameVaild';
const EmailAskUrl = BaseURL + 'community/emailVaild';
const SetInfoUrl = BaseURL + 'community/update';
const HeadUrl = BaseURL + 'community/head';
const SendActivity = BaseURL + 'activity/add';
const UpLoadPoster = BaseURL + 'activity/upload';
const ReturnActivity = BaseURL + 'activity/getActivityById';
const ReturnAllActivity = BaseURL + 'activity/queryByCommunity';
const UnableActivity = BaseURL + 'activity/unable';
const FinishActivity = BaseURL + 'activity/finish';

//组织获取报名列表;
const ReturnJoinTable = BaseURL + 'apply/getInterview';
//组织通过报名(批量通过)
const JoinPass = BaseURL + 'apply/interview';
//报名活动
const JoinAct = BaseURL + '/apply/add';
//取消报名
const DeleteJoin = BaseURL + '/apply/delete';

const AdminLogin = BaseURL + '/admin/login';
const AdminGetOrgs = BaseURL + '/community/getCommunitiesFromApp';
const AdminFreezeOrg = BaseURL + '/community/unable';
const AdminEnableOrg = BaseURL + '/community/enable';
const AdminGetUsers = BaseURL + '/user/getusers';
const AdminFreezeUser = BaseURL + '/user/unable';
const AdminEnableUser = BaseURL + '/user/enable';
const AdminGetAct = BaseURL + '/activity/getactivities';
const AdminFreezeAct = BaseURL + '/activity/unable';
const AdminEnableAct = BaseURL + '/activity/enable';


const header = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
const token = document.querySelector('meta[name="_csrf"]').getAttribute('content');

// http request 拦截器
// Axios.interceptors.request.use(
//   config => {
//     if (_this.$store.state.COMMUNITYLOGIN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers.Authorization = `token ${_this.$store.state.COMMUNITYLOGIN}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });
//
// // http response 拦截器
// Axios.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // 返回 401 清除token信息并跳转到登录页面
//           _this.$store.commit("CLEARTOKEN");
//           _this.$router.push('/login');
//       }
//     }
//     return Promise.reject(error.response.data);   // 返回接口返回的错误信息
//   });

const LocalURL = './static/json/';
const orgAct = 'orgActList.json';
const peopleList = 'actPeopleList.json';

function GET(Url) {
  return Axios({
    method:'get',
    url:Url,
  })
    .then((response) => {
    // console.log(response);
      if(response.status == 200){
        return response.data;
      }
    })
}

function getUrl(type) {
  let result='';
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
    case 'head':
      result = HeadUrl;
      break;
    case 'sendActivity':
      result = SendActivity;
      break;
    case 'upLoadPoster':
      result = UpLoadPoster;
      break;
    case 'returnActivity':
      result = ReturnActivity;
      break;
    case 'returnAllActivity':
      result = ReturnAllActivity;
      break;
    case 'unableActivity':
      result = UnableActivity;
      break;
    case 'finishActivity':
      result = FinishActivity;
      break;
    case 'returnTable':
      result = ReturnJoinTable;
      break;
    case 'joinPass':
      result = JoinPass;
      break;
    case 'joinAct':
      result = JoinAct;
      break;
    case 'deleteJoin':
      result = DeleteJoin;
      break;
    case 'adminLogin':
      result = AdminLogin;
      break;
    case 'adminGetOrgs':
      result = AdminGetOrgs;
      break;
    case 'adminFreezeOrg':
      result = AdminFreezeOrg;
      break;
    case 'adminEnableOrg':
      result = AdminEnableOrg;
      break;
    case 'adminGetUsers':
      result = AdminGetUsers;
      break;
    case 'adminFreezeUser':
      result = AdminFreezeUser;
      break;
    case 'adminEnableUser':
      result = AdminEnableUser;
      break;
    case 'adminGetAct':
      result = AdminGetAct;
      break;
    case 'adminFreezeAct':
      result = AdminFreezeAct;
      break;
    case 'adminEnableAct':
      result = AdminEnableAct;
      break;
    default :
      result = BaseURL;
      break;
  }
  return result;
}

export function POST(Url,body) {
  console.log("post请求的body:"+ body);
  console.log("post的url:"+Url);
  console.log("header:"+header+",token:"+token);
  return Axios({
    method:'post',
    url:Url,
    data:body,
    headers:{
      header:header,
      token:token
    },
    responseType:'text'
  })
    .then((response) => {
    let result = '';
    if(response.status == 200){
      console.log("response.data:"+JSON.stringify(response.data));
      result = (typeof response.data == 'string') ? JSON.parse(response.data) : response.data;
    }
    return result;
    })
    .catch((error) => {
    console.log(error);
    })
}

export function POSTFILE(Url,file) {
  console.log("post的url:"+Url);
  console.log("POSTFILE的file =>",file);
  return Axios({
    method:'post',
    url:Url,
    data:file,
    headers:{
      // 'Content-Type': false,
      // 'Process-Data': false,
      contentType:false,
      processData:false,
      header:header,
      token:token
    },
    responseType:'text',
  })
    .then((response) => {
      let result = '';
      if(response.status == 200){
        console.log("response.data:"+JSON.stringify(response.data));
        result = (typeof response.data == 'string') ? JSON.parse(response.data) : response.data;
      }
      return result;
    })
    .catch((error) => {
      console.log(error);
    })
}

export function postLogin (body) {
  let Url = getUrl('login');
  console.log("postLogin的body:"+body);
  return POST(Url,body);
}

export function postUserNameAsk(body) {
  let Url = getUrl('userNameAsk');
  return POST(Url,body);
}

export function postEmailAsk(body) {
  let Url = getUrl('emailAsk');
  return POST(Url,body);
}

export function postRegister(body) {
  let Url = getUrl('register');
  return POST(Url,body);
}

export function postSetInfo(body) {
  // console.log("postSetInfo的body:"+body);
  let Url = getUrl('setInfo');
  return POST(Url,body);
}

export function postHeadFile(file) {
  let Url = getUrl('head');
  return POSTFILE(Url,file);
}

export function postSendActivity(body) {
  let Url = getUrl('sendActivity');
  return POST(Url,body);
}

export function postUpLoadPoster(file) {
  let Url = getUrl('upLoadPoster');
  return POSTFILE(Url,file);
}

export function postReturnActivity(body) {
  let Url = getUrl('returnActivity');
  return POST(Url,body);
}

export function postReturnAllActivity(body) {
  let Url = getUrl('returnAllActivity');
  return POST(Url,body);
}

export function postUnableActivity(body) {
  let Url = getUrl('unableActivity');
  return POST(Url,body);
}

export function postFinishActivity(body) {
  let Url = getUrl('finishActivity');
  return POST(Url,body);
}

export function postReturnJoinTable(body) {
  let Url = getUrl('returnTable');
  return POST(Url,body);
}

export function postJoinPass(body) {
  let Url = getUrl('joinPass');
  return POST(Url,body);
}

export function postJoinAct(body) {
  let Url = getUrl('joinAct');
  return POST(Url,body);
}

export function postDeleteAct(body) {
  let Url = getUrl('deleteJoin');
  return POST(Url,body);
}


export function postAdminLogin(body) {
  let Url = getUrl('adminLogin');
  return POST(Url,body);
}

export function postAdminGetOrgs(body) {
  let Url = getUrl('adminGetOrgs');
  return POST(Url,body);
}

export function postAdminFreezeOrg(body) {
  let Url = getUrl('adminFreezeOrg');
  return POST(Url,body);
}

export function postAdminEnableOrg(body) {
  let Url = getUrl('adminEnableOrg');
  return POST(Url,body);
}

export function postAdminGetUsers(body) {
  let Url = getUrl('adminGetUsers');
  return POST(Url,body);
}

export function postAdminFreezeUser(body) {
  let Url = getUrl('adminFreezeUser');
  return POST(Url,body);
}

export function postAdminEnableUser(body) {
  let Url = getUrl('adminEnableUser');
  return POST(Url,body);
}

export function postAdminGetAct(body) {
  let Url = getUrl('adminGetAct');
  return POST(Url,body);
}

export function postAdminFreezeAct(body) {
  let Url = getUrl('adminFreezeAct');
  return POST(Url,body);
}

export function postAdminEnableAct(body) {
  let Url = getUrl('adminEnableAct');
  return POST(Url,body);
}






export function getLocalOrgActData() {
  let Url = LocalURL + orgAct;
  return GET(Url);
}

export function getLocalPeopleList() {
  let Url = LocalURL + peopleList;
  return GET(Url);
}
