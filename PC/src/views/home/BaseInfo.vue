<template>
  <div class="BaseInfo">
    <div class="mixInfoBox">
      <div class="textInfoBox">
        <div class="infoBox" v-for="item in com_orgData" v-show="!com_orgType">
          <div class="topBox">
            <p class="infoTile" v-text="item.name"></p>
            <p class="infoContent" v-text="item.value" v-show="!CanChange"></p>
            <input class="infoContent" type="text" v-show="CanChange"
                   v-bind="{'disabled':!CanChange}" :value="item.value" v-model="item.value"
                   @focus="inputFocus(item)" @input="inputCheck(item)" @blur="inputBlur(item)">
            <img class="inputTipImage" :src="inputTipImage(item)" alt="输入验证图片" v-show="inputTipImageShow(item)">
          </div>
          <div class="bottomBox">
            <p class="inputTip" v-text="inputTip(item)"></p>
          </div>
        </div>
      </div>
      <div class="headImageBox">
        <img class="headImage" :style="{backgroundImage:'url('+ HeadImage.url +')'}" @click="upLoadClick()">
        <div class="uLHeadImageBox">
          <p class="headImageName" v-text="HeadImage.name"></p>
          <input ref="upLoad" class="uLInput" type="file" accept="image/jpeg,image/png"
                 v-bind="{'disabled':(!CanChange || !HeadImage.isUpLoadFinish)}" @change="headImageChange()">
        </div>
      </div>
    </div>
    <div class="quotInfoBox">
      <p class="quotTitle" v-text="QuotInfo.name"></p>
      <pre class="quotInfo lineSize" v-show="!CanChange" v-text="QuotInfo.value"></pre>
      <textarea class="quotInfo" cols="100" rows="0"
                v-show="CanChange" v-bind="{'disabled':!CanChange}" v-model="QuotInfo.value"
                @focus="inputFocus(QuotInfo)" @input="inputCheck(QuotInfo)" @blur="inputBlur(QuotInfo)"
      ></textarea>
      <div class="quotInfoTipImageBox">
        <img class="inputTipImage" :src="inputTipImage(QuotInfo)" alt="输入验证图片" v-show="inputTipImageShow(QuotInfo)">
        <p class="quotInfoTip" v-text="inputTip(QuotInfo)"></p>
      </div>
    </div>
    <div class="buttonBox">
      <button class="button" v-bind="{'disabled':CanChange}" @click="change()">修改</button>
      <button class="button" v-bind="{'disabled':!CanChange}" @click="submit()">提交</button>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        CanChange:false,
        OutSchoolInfo:[
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
        InSchoolInfo:[
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
            name:"组织归属：",
            value:"",
            isRule:true,
            errorType:"",
            isBlur:true
          }
        ],
        HeadImage:{
          ref:"head",
          name:"组织logo",
          url:"",
          trueName:"",
          isChange:false,
          isUpLoadFinish:true
        },
        QuotInfo:{
          ref:"quotation",
          name:"组织介绍：",
          value:"",
          isRule:true,
          errorType:"",
          isBlur:true
        },
        NewInfo:{},
        submitEnable:false,
        inputTrue:require('../../assets/inputTrue_128px.png'),
        inputError:require('../../assets/inputError_128px.png')
      }
    },
    methods:{
      upLoadClick(){
        this.$refs.upLoad.click();
      },
      upDataInfo(){
        let _this = this;
        let orgInfo =JSON.parse(_this.$store.state.CommunityInfo);
//        console.log('orgInfo',orgInfo);
//        let org = (orgInfo.type == 0) ? "OutSchoolInfo" : "InSchoolInfo";
        let org =  _this.OutSchoolInfo;
        org.forEach((item) => {
          item.value = (orgInfo[item.ref]) ? orgInfo[item.ref] : "";
        });
        _this.HeadImage.trueName = (orgInfo[_this.HeadImage.ref]) ? orgInfo[_this.HeadImage.ref] : '';
        _this.QuotInfo.value = (orgInfo[_this.QuotInfo.ref]) ? orgInfo[_this.QuotInfo.ref] : "";
        _this.com_headImg();
      },
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
        let timeRule = new RegExp(/((((1[6-9]|[2-9]\d)\d{2})\/(1[02]|0?[13578])\/([12]\d|3[01]|0?[1-9]))|(((1[6-9]|[2-9]\d)\d{2})\/(1[012]|0?[13456789])\/([12]\d|30|0?[1-9]))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(1\d|2[0-8]|0?[1-9]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))/);
        if(!_this.errorString(obj)){
          if(!_this.stringLength(obj)){
            if(timeRule.test(obj.value)){
              obj.isRule = true;
              obj.errorType = '';
            }else {
              obj.isRule = false;
              obj.errorType = 'timeError';
            }
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
      quotationInput(obj){
//          console.log("我进入quotationInput");
        let _this = this;
        if(!_this.errorString(obj)){
            obj.isRule = true;
            obj.errorType = '';
        }
      },
      inputBlur(obj){
        obj.isBlur = true;
        this.submitButtonEnable();
      },
      inputTipImage(obj){
        let _this = this;
        return (obj.isRule) ? _this.inputTrue : _this.inputError;
      },
      inputTipImageShow(obj){
        return (!obj.isRule || (obj.isRule && obj.value != "" && obj.isBlur)) ? true : false;
      },
      inputTip(obj){
        let _this = this;
        return _this.$store.state.RuleErrorTip[obj.errorType];
      },
      headImageChange(){
        let _this = this;
        let headImage = _this.HeadImage;
        let newImage = _this.$refs.upLoad.files[0];
        let Rule = /(image\/(jpeg|png))/;
        let file = new FormData();
        if(Rule.test(newImage.type)){
          file.append("file",newImage);
          file.append("userName","root16");
          headImage.isChange = true;
          headImage.isUpLoadFinish = false;
          headImage.url = window.URL.createObjectURL(newImage);
          headImage.name = 'loading.......';
          _this.$store.dispatch('UPLOADHEAD',file)
            .then((res) => {
              console.log(JSON.stringify(res));
              res = (typeof res == "string") ? JSON.parse(res) : res;
              if(res["INFO"].code == 508){
                headImage.trueName = res["INFO"].message;
                headImage.isUpLoadFinish = true;
                headImage.name = newImage.name;
                _this.submitButtonEnable();
              }else {
                alert("您的图片上传失败，请重新选择上传");
              }
            })
        }else {
          alert("您上传的图片不符合规格，请重选择上传");
        }
      },
      submitButtonEnable(){
        let _this = this;
//        let orgData = _this.$store.state.CommunityInfo;
//        let Data = (orgData.type == 0) ? _this.OutSchoolInfo : _this.InSchoolInfo;
        let Data =  _this.OutSchoolInfo;
        let index = 0;
        Data.forEach((item) => {
          if(item.isRule && item.isBlur && item.value != ""){
              index += 1;
          }else {
              if(index > 0){
                  index -= 1;
              }
          }
        });
        console.log('index:',index,'_this.QuotInfo.isRule:'+_this.QuotInfo.isRule,'_this.QuotInfo.isBlur:'+_this.QuotInfo.isBlur,'_this.QuotInfo.value:',_this.QuotInfo.value,'_this.HeadImage.isUpLoadFinish:'+_this.HeadImage.isUpLoadFinish);
        _this.submitEnable = (index == 3 && (_this.QuotInfo.isRule && _this.QuotInfo.isBlur && _this.QuotInfo.value != "") && _this.HeadImage.isUpLoadFinish) ? true : false;
      },
      change(){
        this.CanChange = true;
      },
      submit(){
        let _this = this;
        if(!_this.submitEnable){
            alert("请填写完以上信息且图片上传完毕后再点击提交");
            return;
        }
        let result = {},body,LoginInfo;
//        let orgData = _this.$store.state.CommunityInfo;
//        let Data = (orgData.type == 0) ? _this.OutSchoolInfo : _this.InSchoolInfo;
        let Data = _this.OutSchoolInfo;
        LoginInfo = (typeof _this.$store.state.CommunityInfo == "string") ? JSON.parse(_this.$store.state.CommunityInfo) : _this.$store.state.CommunityInfo;
        result["userName"] = LoginInfo.userName;
        Data.forEach((item) => {
          result[item.ref] = item.value;
        });
        result[_this.QuotInfo.ref] = _this.QuotInfo.value.replace('%','25%').replace('$','24%').replace('@','40%');
        result["head"] = _this.HeadImage.trueName;
        body = 'json=' + JSON.stringify(result);
        console.log("body=>"+body);
        _this.$store.dispatch("SETINFO",body)
          .then((res) => {
            console.log(JSON.stringify(res["INFO"]));
            if(res["INFO"].code == 509){
              _this.CanChange = false;
              _this.NewInfo["name"] = Data[0].value;
              _this.NewInfo["head"] = _this.HeadImage.trueName;
              _this.$emit('newInfo',_this.NewInfo);
              alert('修改成功');
            }else {
              alert("修改不成功");
              console.log("修改不成功:")
            }
          })
      },
      com_headImg(){
        const _this = this;
        let body = {};
        body["type"] = 'org';
        body["head"] =  _this.HeadImage.trueName;
        _this.$store.dispatch('IMAGEURL',body)
          .then((res) => {
            _this.HeadImage.url = res;
          })
      }
    },
    computed:{
      com_orgType(){
          return (this.$store.state.CommunityInfo.type == 0) ? true : false;
      },
      com_orgData(){
//          return (this.$store.state.CommunityInfo.type == 0) ? this.OutSchoolInfo : this.InSchoolInfo;
        return this.OutSchoolInfo;
      }
    },
    watch:{
      HeadImage:'com_headImg'
    },
    created(){
      this.upDataInfo();
    }
  }
</script>
<style scoped>
  .BaseInfo{
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .mixInfoBox{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 3rem;

    display: -webkit-flex;
    -webkit-flex-direction: row;
  }
  .textInfoBox{
    display: flex;
    flex: 2;
    flex-direction: column;

    display: -webkit-flex;
    -webkit-flex: 2;
    -webkit-flex-direction: column;

  }
  .infoBox{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: flex-start;
  }
  .topBox{
    display: flex;
    flex: 4;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    display: -webkit-flex;
    -webkit-flex: 4;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-start;
    -webkit-align-items: center;
  }
  .bottomBox{
    display: flex;
    flex: 1;
    flex-direction:row;
    justify-content: flex-start;
    align-items: center;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-start;
    -webkit-align-items: center;
  }
  .infoTile{
    width: 3rem;
    height: 0.4rem;
    font-size: 0.2rem;
    line-height: 0.4rem;
    text-align: right;
  }
  .infoContent{
    width: 5rem;
    height: 0.4rem;
    font-size: 0.2rem;
    line-height: 0.4rem;
    text-align: left;
    border: 0.02rem solid #c3c3c3;
  }
  .inputTipImage{
    width: 0.4rem;
    height: 0.4rem;
    margin-left: 0.2rem;
  }
  .inputTip{
    padding-left: 3rem;
    font-size: 0.1rem;
    color: #ff0000;
  }
  .headImageBox{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .headImage{
    width: 2rem;
    height: 2rem;
    background-size: cover;
    background-position: center center;
  }
  .headImageName{
    margin-top: 0.05rem;
    font-size: 0.2rem;
  }
  .uLInput{
    display: none;
  }
  .quotInfoBox{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: auto;
    padding: .5rem 0;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-start;
    -webkit-align-items: flex-start;
  }
  .quotInfoTipImageBox{
    display: flex;
    flex: 1;
    width: auto;
    height: 5rem;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-start;
    -webkit-align-items: center;
  }
  .quotInfoTip{
    font-size: 0.2rem;
    color: #ff0000;
  }
  .quotTitle{
    width: 3rem;
    height: 0.5rem;
    font-size: 0.2rem;
    text-align: right;
    overflow: hidden;

  }
  .quotInfo{
    width: 5rem;
    height: 5rem;
    font-size: .2rem;
    border: 0.02rem solid #c3c3c3;
  }
  .lineSize{
    white-space: pre-wrap;
    word-wrap:break-word;
    word-break:normal;
  }
  .buttonBox{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 1rem;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
  }
  .button{
    width: 1.5rem;
    height: 0.5rem;
    font-size: 0.2rem;
    border-radius: 0.05rem;
    outline: none;
  }
</style>
