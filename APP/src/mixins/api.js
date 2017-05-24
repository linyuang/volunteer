import Store from '../initialData/index'
import Apis from '../mixins/api'

const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');
const picker = weex.requireModule('picker');

exports.TIP = function (text) {
    if(Store.state.Development == "false"){
        return;
    }
    modal.alert({
        message:text
    })
};

exports.TOAST = function (text) {
    // if(Store.state.Development == "false"){
    //     return;
    // }
    modal.toast({
        message:text
    })
};

exports.SETITEM = function (key,value,callback) {
    let CALLBACK = (callback) ? callback : ()=>{};
    storage.setItem(key,value,CALLBACK);
};

exports.GETITEM = function (key,callback) {
    let CALLBACK = (callback) ? callback : ()=>{};
    storage.getItem(key,CALLBACK);
};

exports.GETKEYS = function (callback) {
    let CALLBACK = (callback) ? callback : ()=>{};
    storage.getAllKeys(CALLBACK);
};

exports.REMOVEITEM = function (key,callback) {
    let CALLBACK = (callback) ? callback : ()=>{};
    storage.removeItem(key,CALLBACK);
};

exports.STORAGELENGTH = function (callback) {
    let CALLBACK = (callback) ? callback : ()=>{};
    storage.length(CALLBACK);
};

exports.StarStorageSet = function(obj){
    for(let [key,value] of Object.entries(obj)){
        storage.setItem(key,value,event => {
            if(event.result == 'success')
            modal.toast({message:'设置数据 '+ event.result});
        })
    }
};

exports.PICK = function(options,callback){
    options = (options) ? options : {
            index:0,
            items:[0]
        };
    picker.pick(options,callback);
};

exports.PICKDATE = function (options,callback) {
    options = (options) ? options : {
            value:"2017-01-01",
            min:"1917-01-01"
        };
    Apis.TOAST(JSON.stringify(options));
    picker.pickDate(options,callback);
};

exports.PICKTIME = function(options,callback){
    picker.pickTime(options,callback);
};

exports.ERRORTIP = function (obj) {
    let RuleErrorTip ={
        tooLong:'字段过长，请控制在6-30位之间',
        tooShort:'字段过短，请控制在6-30位之间',
        errorString:'字段中含有\' , * & # % < > = (空格) 中文 等违规字符，请删除',
        errorString_rich:"字段中含有 < > 违规字符，请删除",
        repeatUserName:'该账号已被注册，请重新输入',
        repeatEmail:'该邮箱已被注册，请重新输入',
        repeatPassword:'密码不一致，请重新输入',
        errorEmail:'该邮箱不正确，请重新输入',
        errorPhone:'您输入的手机号错误，请重新输入',
        voidUserName:'账号不能为空',
        voidPassword:'密码不能为空',
        rightString:''
    };
    return RuleErrorTip[obj.errorType];
};