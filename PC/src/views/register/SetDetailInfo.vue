<template>
  <div class="DetailInfo">
    <div class="upperPart">
      <div class="LeftPart">
        <div class="inputBox" v-for="Info in DetailInfo">
          <p class="inputTileTxT" v-text="Info.name"></p>
          <input class="input" :ref="Info.ref" type="text" v-model="Info.value" maxlength="31"
                 @focus="inputFocus(Info)" @input="inputCheck(Info)" @blur="inputBlur(Info)">
          <div class="inputTipImgBox">
            <img class="inputTipImg" :src="com_inputTipImage(Info)" alt="验证提示图片" v-show="com_inputTipImageShow(Info)">
          </div>
        </div>
      </div>
      <div class="RightPart">
        <img class="upLoadImage" :style="{backgroundImage:'url('+ HeadInfo.value + ')'}" @click="upLoadImage()">
        <p class="upLoadImageName" v-text="HeadInfo.trueName"></p>
        <input ref="imgFile" class="upLoadImageButton" type="file" v-bind="{'disabled':!HeadInfo.upLoadFinish}" accept="image/jpeg,image/png" @change="fileUpload()">
      </div>
    </div>
    <div class="centralPart">
      <p class="quotTitle" v-text="Quotation.name"></p>
      <textarea class="quotTxT" ref="Quotation.ref" name="introduction" cols="100" rows="0" v-model="Quotation.value"
                @focus="inputFocus(Quotation)" @input="inputCheck(Quotation)" @blur="inputBlur(Quotation)"></textarea>
      <div class="inputTipImgBox">
        <img class="inputTipImg" :src="com_inputTipImage(Quotation)" alt="验证提示图片" v-show="com_inputTipImageShow(Quotation)">
      </div>
    </div>
    <div class="lowerPart">
      <div class="submit" :class="com_submitEnable()" @click="submit()">提交</div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        DetailInfo:[
          {
            ref:"name",
            name:"组织名称：",
            value:"",
            isRule:true,
            errorType:"",
            isBlur:true
          },
          {
            ref:"setUp",
            name:"成立时间：",
            value:"",
            isRule:true,
            errorType:"",
            isBlur:true
          },
          {
            ref:"address",
            name:"组织地址：",
            value:"",
            isRule:true,
            errorType:"",
            isBlur:true
          }
        ],
        HeadInfo:{
          ref:"head",
          name:"组织logo",
          value:require('../../assets/setHead.jpg'),
          upLoadFinish:true,
          trueName:"上传logo"
        },
        Quotation:{
          ref:"quotation",
          name:"组织介绍：",
          value:"",
          isRule:true,
          errorType:"",
          isBlur:true
        },
        Submit:{
          isEnable:false
        },
        RuleErrorTip:{
          tooLong:'字段过长，请控制在6-30位之间',
          tooShort:'字段过短，请控制在6-30位之间',
          errorString:'字段中含有\' , * & # % < > = (空格)等违规字符，请删除',
          repeatUserName:'该账号已被注册，请重新输入',
          repeatEmail:'该邮箱已被注册，请重新输入',
          repeatPassword:'密码不一致，请重新输入',
          errorEmail:'该邮箱不正确，请重新输入',
          nullValue:'该值不能为空，请填写',
          rightString:''
        },
        inputTrue:require('../../assets/inputTrue_128px.png'),
        inputError:require('../../assets/inputError_128px.png')
      }
    },
    methods:{
      inputFocus(obj){
        obj.isBlur = false;
      },
      inputCheck(obj){
        let _this = this;
//        console.log(obj.isRule);
        switch (obj.ref){
          case 'name':
              _this.nameInput(obj);
              break;
          case "time":
              _this.timeInput(obj);
              break;
          case "address":
              _this.addressInput(obj);
              break;
          case "quotation":
              _this.quotationInput(obj);
          default:
              break;
        }
      },
      errorString (obj) {
          let normalRule = /[,#$= ]|[<].{0,1000}[>]/;
        let TxTRule = /[<].{0,1000}[>]/;
        let rule = (obj.ref == 'quotation') ? TxTRule : normalRule;
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
      stringLength (obj) {
        let value = obj.value;
        if(value.length >0 && value.length <= 30){
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
      nameInput(obj){
        let _this = this;
        if(!_this.errorString(obj)){
            if(!_this.stringLength(obj)){
              obj.isRule = true;
              obj.errorType = '';
            }
        }
      },
      timeInput(obj){
        let _this = this;
        if(!_this.errorString(obj)){
          if(!_this.stringLength(obj)){
            obj.isRule = true;
            obj.errorType = '';
          }
        }
      },
      addressInput(obj){
        let _this = this;
        if(!_this.errorString(obj)){
          if(!_this.stringLength(obj)){
            obj.isRule = true;
            obj.errorType = '';
          }
        }
      },
      upLoadImage(){
        const _this = this;
        _this.$refs.imgFile.click();
      },
      quotationInput(obj){
//          console.log("我进入quotationInput");
        let _this = this;
        if(!_this.errorString(obj)){
            obj.isRule = true;
            obj.errorType = '';
        }
      },
      inputBlur(obj){
        let _this = this;
        obj.isBlur = true;
        _this.submitEnable();
      },
      fileUpload(){
//          let form = this.$refs.form;
//          form.submit();
        let _this = this;
        let img = _this.$refs.imgFile.files[0];
        let file = new FormData();
        let upLoadFileType = img.type;
        let typeRule = /(image\/(png|jpeg))/;
        let HeadInfo = _this.HeadInfo;
        if(typeRule.test(upLoadFileType)){
//          console.log(img);
          file.append("file",img);
          file.append("userName","root16");
          HeadInfo.upLoadFinish = false;
          HeadInfo.value = window.URL.createObjectURL(img);
//          console.log("file=>",file);
          _this.$store.dispatch('UPLOADHEAD',file)
            .then((res) => {
              console.log(JSON.stringify(res));
              res = (typeof res == "string") ? JSON.parse(res) : res;
              if(res["INFO"].code == 508){
                HeadInfo.trueName = res["INFO"].message;
                HeadInfo.upLoadFinish = true;
              }else {
                alert("您的图片上传失败，请重新选择上传");
              }
            })
        }else {
          alert("您上次的文件并非'jpeg/png'文件，请重新选择上传");
        }
      },
      submitEnable(){
        let _this = this;
        let result = 0;
        _this.DetailInfo.forEach((item) => {
          if(item.isRule){
            result += 1;
          }else {
            if(_this.Submit.isEnable > 0){
              result -= 1;
            }
          }
        });
        if(result == 3 && (_this.Quotation.isRule && _this.Quotation.isBlur && _this.Quotation.value.length > 0) && (_this.HeadInfo.upLoadFinish && _this.HeadInfo.trueName != "")){
            _this.Submit.isEnable = true;
        }
      },
      submit(){
        let _this = this;
//        console.log((!_this.Submit.isEnable || _this.$refs.imgFile.files[0])+'');
//        console.log("isEnable:"+_this.Submit.isEnable);
        if(!_this.Submit.isEnable){
            alert("请先填写完以上的信息");
            return;
        }
        let result = {},body,LoginInfo;
        LoginInfo = (typeof _this.$store.state.CommunityInfo == "string") ? JSON.parse(_this.$store.state.CommunityInfo) : _this.$store.state.CommunityInfo;
        result["userName"] = LoginInfo.userName;
        _this.DetailInfo.forEach((item) => {
          result[item.ref] = item.value;
        });
        result["quotation"] = _this.Quotation.value.replace('%','%25').replace('$','%24').replace('@','%40');
        result["head"] = _this.HeadInfo.trueName;
        body = 'json=' + JSON.stringify(result);
        console.log("body=>"+body);
        _this.$store.dispatch("SETINFO",body)
          .then((res) => {
            console.log(JSON.stringify(res["INFO"]));
            if(res["INFO"].code == 509){
              _this.$router.push('/register/step3');
            }else {
              alert("修改不成功");
              console.log("修改不成功:")
            }
          })
      },
      com_upLoadImageName(){

      },
      com_inputTipImage(obj){
        return (obj.isRule) ? this.inputTrue : this.inputError;
      },
      com_inputTipImageShow(obj){
        return (!obj.isRule || (obj.isRule && obj.isBlur && obj.value.length > 0)) ? true : false;
      },
      com_submitEnable(){
        let _this = this;
        return (_this.Submit.isEnable) ? "submitEnable" : "submitUnable"
      }
    }
  }
</script>
<style scoped>
  .DetailInfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12rem;
    height: 5.6rem;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-align-items: center;
  }
  .upperPart{
    display: flex;
    flex: 4;
    flex-direction: row;
    width: 12rem;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 4;
    -webkit-flex-direction: row;
  }
  .centralPart{
    display: flex;
    flex: 5;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 12rem;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 5;
    -webkit-flex-direction: row;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .lowerPart{
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
  .LeftPart{
    display: flex;
    flex: 7;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-right: 0.5rem;
    width: auto;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex: 7;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: flex-end;
  }
  .RightPart{
    display: flex;
    flex: 3;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-left: 0.5rem;
    width: auto;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex: 3;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: flex-start;
  }
  .inputBox{
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 6rem;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: row;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .inputTileTxT{
    width: 2rem;
    height: 0.3rem;
    font-size: 0.2rem;
    text-align: right;
    line-height: 0.3rem;
  }
  .input{
    width: 4rem;
    height: 0.5rem;
    padding-left: 0.05rem;
    font-size: 0.25rem;
    border-radius: 0.05rem;
    border: 0.02rem solid #9e9e9e;
  }
  .inputTipImgBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 0.5rem;
    height: 0.5rem;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .inputTipImg{
    margin-left: 0.1rem;
    width: 0.3rem;
    height: 0.3rem;
  }
  .upLoadImage{
    width: 1.5rem;
    height: 1.5rem;
    background-size: cover;
    background-position: center center;
  }
  .upLoadImageName{
    width: 1.5rem;
    text-align: center;
    margin-top: 0.05rem;
    font-size: 0.1rem;
  }
  .upLoadImageButton{
    display: none;
    margin-top: 0.05rem;
    font-size: 0.1rem;
  }
  .quotTitle{
    font-size: 0.2rem;
  }
  .quotTxT{
    width: 5.5rem;
    height: 2.6rem;
    border-radius: 0.05rem;
    border: 0.02rem solid #9e9e9e;
  }
  .submit{
    width: 2rem;
    height: 0.5rem;
    border-radius: 0.05rem;
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.2rem;
  }
  .submitEnable{
    background-color: #ec6941;
    color: #ffffff;
  }
  .submitUnable{
    background-color: #e3e3e3;
    color: #000000;
  }
</style>
