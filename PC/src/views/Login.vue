<template>
  <div class="login" :class="com_bgColor">
    <div class="loginBox">
      <div class="loginTitleBox" >
        <p class="loginTitle" v-text="com_titleTxT" @click="titleClick()"></p>
      </div>
      <div class="userInputBox" v-for="input in UserInputs">
        <div class="titleBox">
          <p class="inputTitle" v-text="input.title"></p>
        </div>
        <div class="inputBox">
          <input :ref="input.ref" class="userInput" :type="input.type" :value="input.value" :placeholder="input.placeholder" @focus="allFocus(input)" @input="inputALL(input)" @blur="allBlur(input)">
          <div class="inputTipImageBox">
            <img class="inputTipImage" :src="com_inputTipImg(input)" v-show="com_inputTipImgShow(input)">
          </div>
        </div>
        <div class="tipBox">
          <p class="inputTip" v-text="com_inputTip(input)" ></p>
        </div>
      </div>
      <div class="buttonBox">
        <button class="button orgButtonBg" v-text="RegisterButton" @click="register()" v-show="(LoginType == 1)"></button>
        <button class="button" :class="com_buttonBgColor" v-text="LoginButton" @click="login()"></button>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
      data(){
          return{
            LoginType:1,
            UserInputs:[
              {
                ref:"userName",
                type:"text",
                title:"账号：",
                placeholder:"请输入您的账号",
                value:"",
                isRule:true,
                errorType:'',
                isBlur:true
              },
              {
                ref:"password",
                type:"password",
                title:"密码：",
                placeholder:"请输入您的密码",
                value:"",
                isRule:true,
                errorType:'',
                isBlur:true
              }
            ],
            LoginSubmit:{
              isEnable:false
            },
            IsTrueImage:require('../assets/inputTrue_128px.png'),
            IsErrorImage:require('../assets/inputError_128px.png'),
            RegisterButton:"注册",
            LoginButton:"登录",
            InputTip:"你好"
          }
      },
      methods:{
          titleClick(){
            const _this = this;
            _this.LoginType = (_this.LoginType == 1) ? 0 : 1;
            console.log('loginType:'+_this.LoginType);
            _this.UserInputs.forEach((item) => {
              item.value = '';
            })
          },
          allFocus(obj){
            obj.isBlur = false;
          },
          inputALL(obj){
            let _this = this;
            _this.getInputValue(obj);
            switch (obj.ref){
              case "userName":
                  _this.userNameInput(obj);
                  break;
              case "password":
                  _this.passwordInput(obj);
                  break;
              default:
                  break;
            }
          },
          userNameInput(obj){
            const _this = this;
            if(!_this.errorString(obj)){
              obj.isRule = true;
              obj.errorType = '';
            }
          },
          passwordInput(obj){
            const _this = this;
            if(_this.errorString(obj)){
              obj.isRule = true;
              obj.errorType = '';
            }
          },
          getInputValue(obj){
            obj.value = this.$refs[obj.ref][0].value;
          },
          errorString(obj){
            const Rule = /[,#$= ]|[<].{0,1000}[>]|[\u4e00-\u9fa5]/;
            if(Rule.test(obj.value)){
                obj.isRule = false;
                obj.errorType = 'errorString';
                return true;
            }else {
                obj.isRule = true;
                obj.errorType = '';
                return false;
            }
          },
          allBlur(obj){
            const _this = this;
            obj.isBlur = true;
            _this.errorString(obj);
            _this.loginEnable();
          },
          register(){
              this.$router.push('/register');
          },
        loginEnable(){
          const _this = this;
          let index = 0;
          _this.UserInputs.forEach((item) => {
            if(item.isBlur && item.isRule && item.value != ""){
              index += 1;
            }else {
              if(index > 0){
                index -= 1;
              }
            }
          });
          if(index == 2){
             _this.LoginSubmit.isEnable = true;
          }
        },
        login(){
          let _this = this;
          if(!_this.LoginSubmit.isEnable){
              console.log("我还未激活");
            return;
          }
          let object = {};
          let body,tip;
          object["userName"] = this.UserInputs[0].value;
          object["password"] = this.UserInputs[1].value;
          body = 'json=' + JSON.stringify(object);
          console.log("第一个body:"+body);
          if(_this.LoginType == 1){
            this.$store.dispatch('LOGIN', body)
              .then((res) => {
                console.log("res:",res);
                let type = _this.LoginType;
                if(res["INFO"].code == 500 ){
                    if(res["COMMUNITY"].enable == 1){
                      alert('我登录成功；'+type);
                      _this.$store.commit("SET_COMMUNITYLOGIN",true);
                      _this.$store.commit("SET_COMMUNITYINFO",JSON.stringify(res["COMMUNITY"]));
                      _this.$store.commit("SET_COMMUNITYLOGINTYPE",type);
                      _this.$router.push('/home');
                    }else {
                      alert('您的账号已被冻结，请尽快联系客服');
                    }
                }else {
                  tip = (res["INFO"].code == 501) ? "该组织不存在" : "密码错误";
                  alert("登录失败，"+tip);
                }
              })
          }else {
            if(_this.LoginType == 0){
              this.$store.dispatch('ADMINLOGIN', body)
                .then((res) => {
                  let type = _this.LoginType;
                  if(res["INFO"].code == 600){
                      if(res["ADMIN"].enable == "1"){
                        alert('我登录成功；'+type);
                        _this.$store.commit("SET_COMMUNITYLOGIN",true);
                        _this.$store.commit("SET_COMMUNITYINFO",JSON.stringify(res["ADMIN"]));
                        _this.$store.commit("SET_COMMUNITYLOGINTYPE",type);
                        _this.$router.push('/home');
                      }else {
                        alert('该账号已被冻结');
                      }
                  }else {
                    tip = (res["INFO"].code == 501) ? "该管理员不存在" : "密码错误";
                    alert("登录失败，"+tip);
                  }
                })
            }
          }

        },
        upData() {
          const _this = this;
          let loginInfo = JSON.parse(_this.$store.state.CommunityInfo);
          if(loginInfo != ""){
            _this.UserInputs.forEach((item) => {
              item.value = loginInfo[item.ref];
            })
          }
        },
        com_inputTipImg(obj){
          return (obj.isRule) ? this.IsTrueImage : this.IsErrorImage;
        },
        com_inputTipImgShow(obj){
          return (!obj.isRule || (obj.isRule && obj.value != "" && obj.isBlur)) ? true : false;
        },
        com_inputTip(obj){
          return this.$store.state.RuleErrorTip[obj.errorType];
        }
      },
      computed:{
        //计算属性——登录标题
        com_titleTxT(){
          return (this.LoginType == 1) ? '组织登录' : '管理员登录';
        },
        //计算属性——返回对应的背景颜色
        com_bgColor(){
          return (this.LoginType == 1) ? 'orgLoginBg' : 'adminLoginBg'
        },
        //计算属性——返回对应的按钮颜色
        com_buttonBgColor(){
          return (this.LoginType == 1) ? 'orgButtonBg' : 'adminButtonBg'
        }
      }
//    created(){
//      this.upData();
//    }
  }
</script>
<style scoped>
  .login{
    display: flex;
    flex:1;
    justify-content: center;
    align-items: center;
    width: 16rem;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .orgLoginBg{
    background-color: #00A0E9;
  }
  .adminLoginBg{
    background-color: #F8B551;
  }
  .loginBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 6rem;
    height: 4rem;
    background-color: #ffffff;
    border-radius: 0.2rem;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .loginTitleBox{
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .loginTitle{
    color: #000000;
    font-size: 0.5rem;
  }
  .userInputBox{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 5rem;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .titleBox{
    display: flex;
    flex: 2;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 2;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: flex-start;
  }
  .inputTitle{
    font-size: 0.2rem;
  }
  .inputBox{
    display: flex;
    flex: 3;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 3;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-start;
    -webkit-align-items: center;
  }
  .userInput{
    display: flex;
    flex: 9;
    width: auto;
    height: 0.5rem;
    font-size: 0.2rem;
    padding-left: 0.1rem;
    border-radius: 0.02rem;
    border: 0.01rem solid #3f3f3f;

    display: -webkit-flex;
    -webkit-flex: 9;
  }
  .inputTipImageBox{
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .inputTipImage{
    width: 0.3rem;
    height: 0.3rem;
  }
  .tipBox{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: flex-start;
  }
  .inputTip{
    margin-top: 0.05rem;
    font-size: 0.1rem;
    color: #ff0000;
  }
  .buttonBox{
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    display: -webkit-flex;
    background-color: transparent;

    -webkit-flex: 1;
    -webkit-flex-direction: row;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
  }
  .button{
    width: 1.2rem;
    height: 0.5rem;
    font-size: 0.2rem;
    margin: 0 0.5rem;
    border-radius: 0.1rem;
    outline: none;
  }
  .orgButtonBg{
    background-color: #F19149;
  }
  .adminButtonBg{
    background-color: #00A0E9;
  }
</style>
