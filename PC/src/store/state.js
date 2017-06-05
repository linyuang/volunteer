const state = {
  ProductionMode:false,
  CommunityLogin:false,
  CommunityInfo:'',
  CommunityLoginType:1,
  RuleErrorTip:{
    tooLong:'字段过长，请控制在6-30位之间',
    tooShort:'字段过短，请控制在6-30位之间',
    errorString:'字段中含有\' , * & # % < > = (空格)等违规字符，请删除',
    errorString_cn:"字段中含有\' , * & # % < > = (空格) 中文等违规字符，请删除",
    errorString_rich:"字段中含有 < > 违规字符，请删除",
    repeatUserName:'该账号已被注册，请重新输入',
    repeatEmail:'该邮箱已被注册，请重新输入',
    repeatPassword:'密码不一致，请重新输入',
    errorEmail:'该邮箱不正确，请重新输入',
    timeError:"时间格式有误，请重新输入",
    nullValue:'该值不能为空，请填写',
    imageFormat:"您上传的图片格式有误，请重新选择上传",
    rightString:''
  }
};
export default state;
