<template>
  <div class="BaseInfo">
    <div class="inputContentBox">
      <div class="inputContent" v-for="Info in BaseInfo">
        <div class="inputBox">
          <div class="inputValueBox">
            <input :ref="Info.ref" class="inputValue" :type="Info.type" :placeholder="Info.placeholder"
                   minlength="6" maxlength="31"
                   @focus="inputFocus(Info)" @input="ruleCheck(Info)" @blur="inputBlur(Info)"
            >
          </div>
          <div class="inputTipImageBox">
            <img v-show="inputImageShow(Info)" class="inputTipImage" :src="inputImage(Info)" alt="">
          </div>
        </div>
        <div class="inputTipBox">
          <p class="inputTip" v-text="inputTipTxT(Info)"></p>
        </div>
      </div>
      <div class="protocolBox">
        <input ref="checkbox" class="checkbox" type="checkbox" :disabled="!CheckBox.CanClick" @click="checkboxClick()">
        <p class="protocolTxT">我已阅读并接受</p>
        <a class="protocolLink" href="javaScript:;" v-text="protocolLinkTxT"></a>
      </div>
    </div>
    <div class="buttonBox">
      <div class="submit" @click="submitClick()">提交</div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        BaseInfo:[
          {
            ref:"userName",
            type:"text",
            value:"",
            placeholder:"请输入账号",
            isRule:true,
            errorType:"",
            isBlur:true
          },
          {
            ref:"password",
            type:"password",
            value:"",
            placeholder:"请输入密码",
            isRule:true,
            errorType:"",
            isBlur:true
          },
          {
            ref:"repeatPassword",
            type:"password",
            value:"",
            placeholder:"请重复密码",
            isRule:true,
            errorType:"",
            isBlur:true
          }
        ],
        RuleErrorTip:{
          tooLong:'字段过长，请控制在6-30位之间',
          tooShort:'字段过短，请控制在6-30位之间',
          errorString:'字段中含有\' , * & # % < > = (空格)等违规字符，请删除',
          repeatUserName:'该账号已被注册，请重新输入',
          repeatEmail:'该邮箱已被注册，请重新输入',
          repeatPassword:'密码不一致，请重新输入',
          errorEmail:'该邮箱不正确，请重新输入',
          rightString:''
        },
        CheckBox:{
          CanClick:false,
          Clicked:false
        },
        Submit:{
          CanClick:false
        },
        protocolLinkTxT:"《注册守则》",
        img_inputTrue:require('../../assets/inputTrue_128px.png'),
        img_inputError:require('../../assets/inputError_128px.png')
      }
    },
    methods:{
      getInputValue(obj){
        obj.value = this.$refs[obj.ref][0].value;
      },
      inputImage:function (obj) {
        let result = '';
        let _this = this;
        if(obj.isRule){
          if(obj.isBlur && obj.value != ''){
            result = _this.img_inputTrue;
          }else {
            result = '';
          }
        }else {
          result = _this.img_inputError;
        }
        return result;
      },
      inputImageShow(obj){
          return (!obj.isRule || (obj.isRule && obj.value.length >= 6 && obj.isBlur)) ? true : false;
      },
      inputTipTxT(obj){
        let tips = this.RuleErrorTip;
        return tips[obj.errorType];
      },
      inputFocus:function (obj) {
        obj.isBlur = false;
      },
      ruleCheck:function (obj) {
        let _this = this;
        _this.getInputValue(obj);
        switch (obj.ref){
          case 'userName':
            _this.userNameInput(obj);
            break;
          case 'password':
            _this.passwordInput(obj);
            break;
          case 'repeatPassword':
            _this.passwordRepeatInput(obj);
            break;
          case 'email':
            _this.emailInput(obj);
            break;
        }
      },
      errorString:function (obj) {
        let rule = /[,#$= ]|[<].{0,1000}[>]/;
        let result = rule.test(obj.value);
        if(result){
          obj.isRule = false;
          obj.errorType = 'errorString';
          return true;
        }else {
          obj.isRule = true;
          obj.errorType = 'rightString';
          return false;
        }
      },
      stringLength:function (obj) {
        let value = obj.value;
        if(value.length >= 6 && value.length <= 30){
          obj.isRule = true;
          obj.errorType = 'rightString';
          return false;
        }else {
          if (value.length > 30){
            obj.isRule = false;
            obj.errorType = 'tooLong';
          }
          return true;
        }
      },
      userNameInput(obj){
        let _this = this;
        if(_this.errorString(obj)){
        }else {
          if(_this.stringLength(obj)){
          }else {
            obj.isRule = true;
            obj.errorType = 'rightString';
          }
        }
      },
      passwordInput(obj){
        let _this = this;
        if(_this.errorString(obj)){
        }else {
          if(_this.stringLength(obj)){
          }else {
            obj.isRule = true;
            obj.errorType = 'rightString';
          }
        }
      },
      passwordRepeatInput:function (obj) {
        let _this = this;
        if(_this.errorString(obj)){
        }else {
          if(_this.stringLength(obj)){}
        }
      },
      emailInput:function (obj) {
        let _this = this;
        let emailRule = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if(_this.errorString(obj)){
        }else {
          if(_this.stringLength(obj)){
          }else {
            if(!emailRule.test(obj.value)){
              obj.isRule = false;
              obj.errorType = 'errorEmail';
            }else {
              obj.isRule = true;
              obj.errorType = 'rightString';
            }
          }
        }
      },
      inputBlur:function (obj) {
        let _this = this;
        obj.isBlur = true;
        switch (obj.ref){
          case 'userName':
            _this.userNameBlur(obj);
            _this.checkboxCheck();
            break;
          case 'password':
            _this.passwordBlur(obj);
            _this.checkboxCheck();
            break;
          case 'repeatPassword':
            _this.passwordRepeatBlur(obj);
            _this.checkboxCheck();
            break;
          case 'email':
            _this.emailBlur(obj);
            _this.checkboxCheck();
            break;
        }
      },
      userNameBlur(obj){
        let _this = this;
        if (!obj.isRule || obj.value.length == 0){
          return ;
        }
        if(_this.stringLength(obj) && obj.value.length < 6 && obj.value.length > 0){
          obj.isRule = false;
          obj.errorType = 'tooShort';
        }else {
          _this.userNameAsk(obj);
        }
      },
      passwordBlur(obj){
        let _this = this;
        if (!obj.isRule || obj.value.length == 0){
          return ;
        }
        if(_this.stringLength(obj) && obj.value.length < 6 && obj.value.length > 0){
          obj.isRule = false;
          obj.errorType = 'tooShort';
        }else {
          if (_this.BaseInfo[2].value != ''){
            if(_this.BaseInfo[2].errorType == 'repeatPassword'){
              _this.BaseInfo[2].isRule = true;
            }
            _this.passwordRepeatBlur(_this.BaseInfo[2]);
          }
        }
      },
      passwordRepeatBlur(obj){
        let _this = this;
        if (!obj.isRule || obj.value.length == 0){
          return ;
        }
        if(_this.stringLength(obj) && obj.value.length < 6 && obj.value.length > 0){
          obj.isRule = false;
          obj.errorType = 'tooShort';
        }else {
          if(obj.value != _this.BaseInfo[1].value){
            obj.isRule = false;
            obj.errorType = 'repeatPassword';
          }else {
            obj.isRule = true;
            obj.errorType = 'rightString';
          }
        }
      },
      emailBlur(obj){
        let _this = this;
        if (!obj.isRule || obj.value.length == 0){
          return ;
        }
        _this.emailAsk(obj);
      },
      userNameAsk(obj) {
        let body = obj.ref +'='+obj.value;
//                Apis.TIP('userNameAsk的body =>' + body);
//        console.log(this);
        this.$store.dispatch('USERNAMEASK',body)
          .then((res) => {
            let Data = (typeof res.data == 'string') ? JSON.parse(res) : res;
            if(Data.code == 503){
              obj.isRule = false;
              obj.errorType = 'repeatUserName';
            }else {
              obj.isRule = true;
              obj.errorType = 'rightString';
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      emailAsk (obj) {
        let body = obj.ref + '=' + obj.value;
//                Apis.TIP('emailAsk的body =>' + body);
        this.$store.dispatch('EMAILASK',{body})
          .then((res) => {
            let Data = (typeof res.data == 'string') ? JSON.parse(res) : res;
            if (Data.code == 404) {
              obj.isRule = false;
              obj.errorType = 'repeatEmail';
            } else {
              obj.isRule = true;
              obj.errorType = 'rightString';
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      checkboxCheck() {
        let _this = this;
        let checkIndex = 0;
        let checkObj = _this.CheckBox;
        _this.BaseInfo.forEach((item) => {
          if(item.value != '' && item.isRule && item.isBlur){
            checkIndex += 1;
          }else {
              if(checkIndex > 0){
                checkIndex -= 1;
              }
          }
//          console.log(checkIndex);
          checkObj.CanClick = (checkIndex == _this.BaseInfo.length) ? true : false;
//          console.log(checkObj.CanClick);
        })
      },
      checkboxClick () {
        this.CheckBox.Clicked = !this.CheckBox.Clicked;
        this.submitCheck();
      },
      submitCheck() {
        let _this = this;
        let submitObj = _this.Submit;
        let checkboxClicked = _this.CheckBox.Clicked;
        _this.BaseInfo.forEach((item) => {
          if(item.value != '' && item.isRule && item.isBlur && checkboxClicked){
            submitObj.CanClick = true;
          }else {
            submitObj.CanClick = false;
          }
        })
      },
      submitClick() {
        let _this = this;
        let submitObj = _this.Submit;
        if(!submitObj.CanClick){
          return;
        }
        let result = {};
        let body = '';
        _this.BaseInfo.forEach((item) => {
          if(item.ref != "passwordRepeat"){
            result[item.ref] = item.value;
          }
        });
        body = 'json=' + JSON.stringify(result);
        _this.$store.dispatch('REGISTER',body)
          .then((res) => {
            if(res.code == 506){
              console.log('注册成功');
              _this.$store.commit('SET_COMMUNITYINFO',JSON.stringify(result));
              _this.$router.push('/register/step2');
            }else {
              console.log('注册失败');
            }
          });
      },
    }
  }
</script>
<style scoped>
  .BaseInfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12rem;
    height: 5.6rem;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-align-items: center;
  }
  .inputContentBox{
    display: flex;
    flex: 6;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin-left: 1rem;
    width: 12rem;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 6;
    -webkit-flex-direction: column;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
  }
  .inputContent{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 7rem;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-justify-content: flex-end;
    -webkit-align-items: center;
  }
  .inputBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 5rem;
    height: 0.6rem;

    display:-webkit-flex;
    -webkit-flex-direction: row;
    -webkit-align-items: center;
  }
  .inputValueBox{
    display: flex;
    flex: 6;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: auto;
    height: 0.6rem;

    display: -webkit-flex;
    -webkit-flex: 6;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-start;
    -webkit-align-items: center;
  }
  .inputValue{
    padding-left: 0.1rem;
    width: 4rem;
    height: 0.5rem;
    font-size: 0.2rem;
    border-radius: 0.05rem;
    border: 0.01rem solid #000000;
  }
  .inputTipImageBox{
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    width: 1rem;
    height: 0.3rem;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: row;
    -webkit-align-items: center;
  }
  .inputTipImage{
    width: 0.3rem;
    height: 0.3rem;
  }
  .inputTipBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 5rem;
    height: 0.2rem;
    margin-top: 0.05rem;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-align-items: center;
  }
  .inputTip{
    font-size: 0.08rem;
    color: #ff0000;
  }
  .protocolBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 5rem;
    height: 0.4rem;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-align-items: center;
  }
  .checkbox{
    width: 0.2rem;
    height: 0.2rem;
  }
  .protocolTxT{
    margin-left: 0.05rem;
    font-size: 0.2rem;
  }
  .protocolLink{
    margin-left: 0.05rem;
    font-size: 0.2rem;
    text-decoration: none;
  }
  .buttonBox{
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 12rem;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: row;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .submit{
    width: 3rem;
    height: 0.6rem;
    font-size: 0.25rem;
    line-height: 0.6rem;
    text-align: center;
    background-color: #eeeeee;
    border-radius: .05rem;
  }
</style>
