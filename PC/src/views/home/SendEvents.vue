<template>
  <div class="sendEvents">
    <div class="eventInputBox">
      <div class="eventTitleBox">
        <p class="eventTitle">活动标题：</p>
        <div class="eventTitleInputBox">
          <input :ref="EventTitle.ref" class="eventTitleInput" type="text" v-model="EventTitle.value" v-bind="{'disabled':!RewriteEnable}"
                 @focus="allInputFocus(EventTitle)" @input="allInputTest(EventTitle)" @blur="allInputBlur(EventTitle)">
          <img class="inputTestImage" :src="tipImage(EventTitle)" title="输入检验图" alt="输入检验图" v-show="tipImageShow(EventTitle)">
        </div>
        <p class="inputTestTip" v-text="titleTip()"></p>
      </div>
      <div class="eventPosterBox">
        <p class="eventPosterTitle">活动海报：</p>
        <img class="eventPoster" :src="VoidImage" title="活动海报" alt="活动海报"
             :style="{backgroundImage:'url('+EventPoster.value+')'}" @click="touchInputFile()">
        <input :ref="EventPoster.ref" class="eventPosterInput" type="file" accept="image/jpeg,image/png"
               v-bind="{disabled:!EventPoster.isUploadFinish}" @change="allInputTest(EventPoster)">
        <p class="posterTip" v-text="posterTip()"></p>
      </div>
      <div class="eventTxTBox">
        <p class="eventTxTTitle">活动内容：</p>
        <div class="eventTxTInputBox">
          <textarea :ref="EventTxT.ref" class="eventTxTInput" cols="35" rows="0" v-model="EventTxT.value" v-bind="{'disabled':!RewriteEnable}"
                    @focus="allInputFocus(EventTxT)" @input="allInputTest(EventTxT)" @blur="allInputBlur(EventTxT)">
          </textarea>
          <img class="inputTestImage" :src="tipImage(EventTxT)" title="输入检验图" alt="输入检验图" v-show="tipImageShow(EventTxT)">
        </div>
        <p class="inputTestTip" v-text="txtTip()"></p>
      </div>
      <div class="buttonBox">
        <button ref="preview" class="button" :class="" v-bind="{'disabled':!ButtonEnable}" @click="activityPreview()">预览</button>
        <button ref="submit" class="button" :class="" v-bind="{'disabled':!ButtonEnable}" @click="activitySubmit()">提交</button>
      </div>
    </div>
    <div class="eventShowBox" :class="com_previewBg">
      <p class="eventShowTitle" v-text="EventTitle.value" v-show="IsPreview"></p>
      <img class="eventShowPoster" :src="EventPoster.value" alt="活动海报" v-show="IsPreview">
      <pre class="eventShowContent" v-show="IsPreview" v-text="EventTxT.value"></pre>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        ComId:"",
        IsPreview:false,
        RewriteEnable:true,
        ButtonEnable:false,
        EventTitle:{
          ref:"eventTitle",
          value:"",
          isRule:true,
          errorType:"",
          isBlur:true
        },
        EventPoster:{
          ref:"eventPoster",
          value:"",
          trueName:"",
          isRule:true,
          errorType:"",
          isUploadFinish:true
        },
        EventTxT:{
          ref:"eventTxT",
          value:"",
          isRule:true,
          errorType:"",
          isBlur:true
        },
        InputTrueImage:require('../../assets/inputTrue_128px.png'),
        InputErrorImage:require('../../assets/inputError_128px.png'),
        VoidImage:require('../../assets/void.png')
      }
    },
    methods:{
      initInfo(){
        const _this = this;
        _this.ComId = _this.$route.params.comId;
      },
      touchInputFile(){
        if(!this.RewriteEnable){
          console.log('我上传不了图片');
          return;
        }
        this.$refs[this.EventPoster.ref].click();
      },
      allInputFocus(obj){
        obj.isBlur = false;
      },
      allInputTest(obj){
          const _this = this;
          switch (obj.ref){
            case "eventTitle":
                _this.eventTitleInput(obj);
                break;
            case "eventPoster":
                _this.eventPosterInput(obj);
                break;
            case "eventTxT":
                _this.eventTxTInput(obj);
                break;
            default:
                break;
          }
      },
      eventTitleInput(obj){
        const _this = this;
        if(!_this.errorString(obj)){
          obj.isRule = true;
          obj.errorType = "";
        }
      },
      eventPosterInput(obj){
        const _this = this;
        const imageRule = /(image\/(jpeg|png))/;
        let img = _this.$refs[_this.EventPoster.ref].files[0];
        if(imageRule.test(img.type)){
          let file = new FormData();
          obj.isRule = true;
          obj.isUploadFinish = false;
          obj.value = window.URL.createObjectURL(img);
          file.append('file',img);
          _this.$store.dispatch("UPLOADPOSTER",file)
            .then((res) => {
              console.log(res);
              if(res["INFO"].code == 601){
                console.log('我成功了');
                obj.isUploadFinish = true;
                obj.trueName = res["INFO"].message;
                _this.buttonEnable();
              }
            })
        }else {
          obj.isRule = false;
          obj.errorType = "imageFormat";
        }
      },
      eventTxTInput(obj){
        const _this = this;
        if(!_this.errorString(obj)){
          obj.isRule = true;
          obj.errorType = "";
        }
      },
      errorString (obj) {
        let TxTRule = /[,#$= ]|[<].{0,1000}[>]/;
        let RichTxTRule = /[<].{0,1000}[>]/;
        let rule = (obj.ref == 'eventTxT') ? RichTxTRule : TxTRule;
        let result = rule.test(obj.value);
        if(result){
          obj.isRule = false;
          obj.errorType = (obj.ref == 'eventTxT') ? 'errorString_rich' : 'errorString';
          return true;
        }else {
          obj.isRule = true;
          obj.errorType = 'rightString';
          return false;
        }
      },
      allInputBlur(obj){
        obj.isBlur = true;
        this.buttonEnable();
      },
      buttonEnable(){
        const _this = this;
        let title = _this.EventTitle;
        let poster = _this.EventPoster;
        let txt = _this.EventTxT;
        if(title.isRule && title.value != "" && title.isBlur){
            console.log('poster.trueName：',poster.trueName,'poster.isUploadFinish:'+poster.isUploadFinish);
            if(poster.trueName != "" && poster.isUploadFinish){
                if(txt.isRule && txt.value != "" && txt.isBlur){
                    _this.ButtonEnable = true;
                }else {
                  _this.ButtonEnable = false;
                }
            }else {
              _this.ButtonEnable = false;
            }
        }else {
          _this.ButtonEnable = false;
        }
        console.log('buttonEnable:'+_this.ButtonEnable);
      },
      activityPreview(){
        this.IsPreview = true;
      },
      activitySubmit(){
        const _this = this;
        let title = _this.EventTitle;
        let poster = _this.EventPoster;
        let txt = _this.EventTxT;
        let result = {};
        let body = '';
        result["comId"] = _this.ComId;
        result["name"] = title.value;
        result["image"] = poster.trueName;
        result["quotation"] = txt.value.replace('%','%25').replace('$','%24').replace('@','%40');
        body = "json=" + JSON.stringify(result);
        _this.RewriteEnable = false;
        _this.$store.dispatch('SENDACTIVITY',body)
          .then((res) => {
            if(res["INFO"].code == 602){
              _this.RewriteEnable = true;
              alert("活动发布成功");
            }else {
              alert(res["INFO"].message);
            }
          })
      },
      titleTip(){
        const _this = this;
        let title = _this.EventTitle;
        return _this.$store.state.RuleErrorTip[title.errorType];
      },
      posterTip(){
        const _this = this;
        let result = '';
        let poster = _this.EventPoster;
        if(poster.trueName != ""){
            if(poster.isUploadFinish){
              result = _this.$refs[poster.ref].files[0].name;
            }else {
              result = 'loading......';
            }
        }else {
          result = _this.$store.state.RuleErrorTip[poster.errorType];
        }
        return result;
      },
      txtTip(){
        const _this = this;
        let txt = _this.EventTxT;
        return _this.$store.state.RuleErrorTip[txt.errorType];
      },
      tipImage(obj){
        return (obj.isRule) ? this.InputTrueImage : this.InputErrorImage;
      },
      tipImageShow(obj){
        return (!obj.isRule || (obj.isRule && obj.value != "" && obj.isBlur)) ? true : false;
      }
    },
    computed:{
      com_previewBg(){
        return (this.IsPreview) ? "eventShowBox_preview" : "eventShowBox_unPreview"
      }
    },
    created(){
      this.initInfo();
    }
  }
</script>
<style scoped>
  .sendEvents{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .eventShowBox,.eventInputBox{
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    width: auto;
    height: 12rem;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-align-items: center;
  }
  .eventShowBox_unPreview{
    background-color: #c3c3c3;
    border: 0.02rem solid #eeeeee;
  }
  .eventShowBox_preview{
    background-color: #ffffff;
    border: 0.02rem solid #eeeeee;
  }
  .eventShowTitle{
    width: 4rem;
    font-size: 0.5rem;
    font-weight: bold;
    text-align: center;
  }
  .eventShowPoster{
    margin-top: 0.3rem;
    width: 4rem;
    height: auto;
    font-size: 0.2rem;
  }
  .eventShowContent{
    margin-top: 0.3rem;
    width: 4rem;
    height: auto;
    font-size: 0.2rem;
    white-space: pre-wrap;
  }
  .eventTitleBox,.eventPosterBox,.eventTxTBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 4rem;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: flex-start;
  }
  .eventTitleBox{
    height: 1.5rem;
  }
  .eventPosterBox{
    height: 4rem;
  }
  .eventTxTBox{
    height: 5rem;
  }
  .eventTitle,.eventPosterTitle,.eventTxTTitle{
    font-size: 0.2rem;
  }
  .eventTitleInputBox,.eventTxTInputBox{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 4rem;
    height: auto;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-start;
    -webkit-align-items: center;
  }
  .eventTitleInput{
    width: 3.5rem;
    height: 0.5rem;
    font-size: 0.3rem;
  }
  .inputTestImage{
    width: 0.5rem;
    height: 0.5rem;
    font-size: 0.2rem;
  }
  .posterTip{
    width: 3.5rem;
    font-size: 0.2rem;
    text-align: center;
    color: #000000;
  }
  .inputTestTip{
    font-size: 0.1rem;
    color: #ff0000;
  }
  .eventPoster{
    width: 3.5rem;
    height: 3.5rem;
    background-size: cover;
    background-position: center center;
    border: 0.01rem solid #a9a9a9;
  }
  .eventPosterInput{
    display: none;
  }
  .eventTxTInput{
    width: 3.5rem;
    height: 4rem;
    font-size: 0.2rem;
  }
  .buttonBox{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 4rem;
    height: 1rem;
    padding-right: 0.5rem;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content:space-between;
    -webkit-align-items: center;
  }
  .button{
    width: 1.5rem;
    height: 0.6rem;
    font-size: 0.2rem;
    border-radius: 0.1rem;
    outline: none;
  }
</style>
