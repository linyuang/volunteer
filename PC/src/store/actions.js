// import {postLogin,postUserNameAsk,postEmailAsk,postRegister,postSetInfo,postHeadFile,
//   postSendActivity,postUpLoadPoster,postReturnActivity,postReturnAllActivity,postUnableActivity,postFinishActivity,
//   postReturnJoinTable,getLocalOrgActData,getLocalPeopleList,postJoinPass,postAdminLogin,postAdminGetUsers,postAdminGetOrgs,
//   postAdminGetAct,postAdminFreezeAct,postAdminEnableAct} from './request'
import * as Req from './request'

export function LOGIN ({commit},body){
  return Req.postLogin(body)
    .then((res) => {
      return res;
    })
}

export function USERNAMEASK({state},body ) {
  console.log(body);
  return Req.postUserNameAsk(body)
    .then((res) => {
      return res["INFO"];
    });
}

export function EMAILASK({state},body) {
  return Req.postEmailAsk(body)
    .then((res) => {
      return res["INFO"];
    });
}

export function REGISTER({state},body) {
  return Req.postRegister(body)
    .then((res) => {
      return res["INFO"];
    });
}

export function SETINFO({state},body) {
  // console.log('SETINFO的body:'+ body);
  return Req.postSetInfo(body)
    .then((res) => {
      return res;
    });
}

export function UPLOADHEAD({state},file) {
  console.log("UPLOADHEAD的=>",file);
  return Req.postHeadFile(file)
    .then((res) => {
      return res;
    });
}

export function SENDACTIVITY({},body) {
  return Req.postSendActivity(body)
    .then((res) => {
      return res;
    })
}

export function UPLOADPOSTER({},file) {
  return Req.postUpLoadPoster(file)
    .then((res) => {
      return res;
    })
}
//返回一个活动（展示活动的详细内容）
export function RETURNACTIVITY({},body) {
  return Req.postReturnActivity(body)
    .then((res) => {
      return res;
    })
}

export function RETURNALLACTIVITY({},body) {
  return Req.postReturnAllActivity(body)
    .then((res) => {
      return res;
    })
}

export function UNABLEACTIVITY({},body) {
  return Req.postUnableActivity(body)
    .then((res) => {
      return res;
    })
}

export function FINISHACTIVITY({},body) {
  return Req.postFinishActivity(body)
    .then((res) => {
      return res;
    })
}

export function GETCOMMUNITY({},body) {
  return Req.postGetCommunity(body)
    .then((res) => {
      return res;
    })
}

export function RETURNJOINTABLE({},body) {
  return Req.postReturnJoinTable(body)
    .then((res) => {
      return res;
    })
}

export function JOINPASS({},body) {
  return Req.postJoinPass(body)
    .then((res) => {
      return res;
    })
}

export function JOINACT({},body) {
  return Req.postJoinAct(body)
    .then((res) => {
      return res;
    })
}

export function DELETEJOIN({},body) {
  return Req.postDeleteAct(body)
    .then((res) => {
      return res;
    })
}

export function ADMINLOGIN({},body) {
  return Req.postAdminLogin(body)
    .then((res) => {
      return res;
    })
}

export function ADMINGETORGS({},body) {
  return Req.postAdminGetOrgs(body)
    .then((res) => {
      return res;
    })
}

export function ADMINFREEZEORG({},body) {
  return Req.postAdminFreezeOrg(body)
    .then((res) => {
      return res;
    })
}

export function ADMINENABLEORG({},body) {
  return Req.postAdminEnableOrg(body)
    .then((res) => {
      return res;
    })
}

export function ADMINGETUSERS({},body) {
  return Req.postAdminGetUsers(body)
    .then((res) => {
      return res;
    })
}

export function ADMINFREEZEUSER({},body) {
  return Req.postAdminFreezeUser(body)
    .then((res) => {
      return res;
    })
}

export function ADMINENABLEUSER({},body) {
  return Req.postAdminEnableUser(body)
    .then((res) => {
      return res;
    })
}

export function ADMINGETACT({},body) {
  return Req.postAdminGetAct(body)
    .then((res) => {
      return res;
    })
}

export function ADMINFREEZEACT({},body) {
  return Req.postAdminFreezeAct(body)
    .then((res) => {
      return res;
    })
}

export function ADMINENABLEACT({},body) {
  return Req.postAdminEnableAct(body)
    .then((res) => {
      return res;
    })
}

export function GETLOCALORGACTLIST() {
  return Req.getLocalOrgActData()
    .then((res) => {
      return res;
    })
}

export function GETLOCALPEOPLELIST() {
  return Req.getLocalPeopleList()
    .then((res) => {
      return res;
    })
}

export function IMAGEURL({state},body) {
  const ProdURL = 'http://localhost:8080/Yuc/YucResource/';
  const DeveLURL = 'http://192.168.191.1:8080/Yuc/YucResource/';
  let url = (state.ProductionMode) ? ProdURL : DeveLURL;
  let head = body["head"];
  let img = String(head).substr(String(head).lastIndexOf('\\') + 1);
  console.log(img);
  switch (body['type']){
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
  console.log('头像链接：'+url);
  return url;
}
