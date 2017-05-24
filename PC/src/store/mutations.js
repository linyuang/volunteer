export function SET_COMMUNITYLOGINTYPE(state,{type}) {
  state.CommunityLoginType = type;
}

export function SET_ORGDATA(state,{object}) {
  state.orgData = (typeof object == 'string') ? JSON.parse(object) : object;
}

export function SET_ORGBASEINFO(state,object) {
  let result = (typeof object == 'string') ? JSON.parse(object) : object;
  for(let [key,value] of Object.entries(result)){
    state.orgData[key] = value;
  }
}

export function SET_COMMUNITYLOGIN(state) {
  state.CommunityLogin = !state.CommunityLogin;
}

export function SET_COMMUNITYINFO(state,result) {
  console.log(result);
  state.CommunityInfo = result;
}

export function SET_USERNAMEISUSE(state,result) {
  state.USERNAMEISUSE = result;
}

export function CLEARTOKEN(state) {
  state.COMMUNITYLOGIN = "";
}
