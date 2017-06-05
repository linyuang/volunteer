<template>
  <div class="actInfo">
    <div class="content">
      <p class="actTitle" v-text="ActInfo.name"></p>
      <img class="actPost" :src="PosterSrc" alt="活动海报" title="活动海报">
      <pre class="actTxT" v-text="ActInfo.quotation"></pre>
      <button class="actJoin" :class="com_buttonClass" v-if="com_buttonShow" v-text="com_buttonTxT" @click="joinAct"></button>
    </div>
    <div class="deleteAct" v-show="IsDeleteActShow">
      <div class="deleteActBox">
        <div class="deleteActTxTBox">
          <p class="deleteActTxT">您是否取消该报名</p>
        </div>
        <div class="deleteActButtonBox">
          <div class="button" @click="deleteActShow">
            <p class="buttonTxT">取消</p>
          </div>
          <div class="button LeftLine" @click="deleteAct">
            <p class="buttonTxT">确定</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
        return{
          ActId:'',
          UserId:'',
          ActInfo:{
            name:'',//xxx
            image:'',//http://www.bz55.com/uploads/allimg/121016/1-121016094252.jpg
            quotation:''//网易 (NASDAQ: NTES)是中国的互联网公司，利用互联网技术，加强人与人之间信息的交流和共享，实现“网聚人的力量”。创始人兼CEO是丁磊。在开发互联网应用、服务及其它技术方面，网易在推出了包括中文全文检索、全中文大容量免费邮件系统、无限容量免费网络相册、免费电子贺卡站、网上虚拟社区、网上拍卖平台、24小时客户服务中心在内的业内领先产品或服务，还通过自主研发推出了国产网络游戏。[1]网易公司推出了门户网站、在线游戏、电子邮箱、在线教育、电子商务、在线音乐、网易bobo等多种服务。[1]2016年净收入为381.79亿元人民币（54.99亿美元），在线游戏净收入为279.80亿元人民币（40.30亿美元），广告服务净收入为21.52亿元人民币（3.10亿美元），邮箱、电商及其他业务的净收入为80.46亿元人民币（11.59亿美元）。
          },
          PosterSrc:'',//http://www.bz55.com/uploads/allimg/121016/1-121016094252.jpg
          IsJoin:false,
          IsSameAct:false,
          IsDeleteActShow:false,
          ButtonTxT:'报名参加'
        }
    },
    methods:{
      initData(){
          const _this = this;
          let body = 'id=';
          let actInfo = _this.ActInfo;
          _this.ActId = _this.$route.params.id;
          body += _this.ActId;
          _this.$store.dispatch('RETURNACTIVITY',body)
            .then((res) => {
              if(res["INFO"].code == '605'){
                  actInfo.name = res["ACTIVITY"].name;
                  actInfo.image = res["ACTIVITY"].image;
                  actInfo.quotation = res["ACTIVITY"].quotation;
                  _this.actPoster();
              }
            });
      },
      //检测用户是否参加了活动
      isUserJoin(){
        if(!this.$route.query.userId){
            return ;
        }
        const _this = this;
        let result = {};
        let body = 'json=';
        result["userId"] = _this.$route.query.userId;
        result["actId"] = _this.$route.params.id;
        body += JSON.stringify(result);
        _this.$store.dispatch('JOINACT',body)
          .then((res) => {
            if(res["INFO"].code == "701"){
              _this.IsJoin = true;
              _this.IsSameAct = false;
            }else {
              _this.IsJoin = true;
              _this.IsSameAct = true;
            }
          })
      },
      actPoster(){
        const _this = this;
        let result = {};
        result["type"] = 'act';
        result["head"] = (_this.ActInfo.image) ? _this.ActInfo.image : "";
        _this.$store.dispatch('IMAGEURL',result)
          .then((res) => {
            _this.PosterSrc = res;
          })
      },
      joinAct(){
        const _this = this;
        if(!_this.IsJoin){
          let result = {};
          let body = 'json=';
          result["actId"] = _this.$route.params.id;
          result["userId"] = _this.$route.query.userId;
          body += JSON.stringify(result);
          _this.$store.dispatch('JOINACT',body)
            .then((res) => {
              if(res["INFO"].code == '700'){
                _this.IsJoin = true;
              }
            })
        }else {
            if(_this.IsSameAct){
              _this.IsDeleteActShow = true;
            }
        }
      },
      deleteActShow(){
        this.IsDeleteActShow = false;
      },
      deleteAct(){
        const _this = this;
        let result = {};
        let body = 'json=';
        result["actId"] = _this.$route.params.id;
        result["userId"] = _this.$route.query.userId;
        body += JSON.stringify(result);
        _this.$store.dispatch('DELETEJOIN',body)
          .then((res) => {
            if(res["INFO"].code == ''){
              _this.IsJoin = false;
              _this.IsSameAct = false;
              _this.IsDeleteActShow = false;
            }
          })
      }
    },
    computed:{
      com_buttonShow(){
          return (this.$route.query.userId) ? true : false;
      },
      com_buttonClass(){
        return (this.IsJoin) ? 'buttonSelect' : 'buttonUnSelect';
      },
      com_buttonTxT(){
          return (!this.IsJoin) ? '报名参加' : (this.IsSameAct) ? '已报名': '已报名其他活动';
      }
    },
//    watch:{
//      ActInfo:"actPoster"
//    },
    created(){
      this.initData();
      this.isUserJoin();
    }
  }
</script>
<style scoped>
  .actInfo{
    width: 16rem;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #ffffff;
  }
  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 16rem;
    height: auto;
    padding: 1.5rem 0;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-align-items: center;
  }
  .actTitle{
    width: 12rem;
    height: auto;
    font-size: 1rem;
    word-break: break-all;
    text-align: center;
    font-weight: bold;
  }
  .actPost{
    margin-top: 1rem;
    width: 12rem;
    height: auto;
  }
  .actTxT{
    margin-top: 1rem;
    width: 12rem;
    height: auto;
    font-size: 0.7rem;
    white-space: pre-wrap;
  }
  .actJoin{
    margin-top: 1rem;
    width: 6rem;
    height: 2rem;
    font-size: 0.6rem;
    border-radius: 0.5rem;
    border-color: transparent;
    outline: none;
  }
  .buttonUnSelect{
    background-color: #f19149;
  }
  .buttonSelect{
    background-color: #c3c3c3;
  }
  .deleteAct{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    position: fixed;
    top: 0;
    z-index: 10;

    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .deleteActBox{
    display: flex;
    flex-direction: column;
    width: 10rem;
    height: 6rem;
    background-color: #ffffff;
    border-radius: 0.5rem;

    display: -webkit-flex;
    -webkit-flex-direction: column;
  }
  .deleteActTxTBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 4.5rem;
    border-bottom: 0.05rem solid #000000;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .deleteActTxT{
    font-size: 0.8rem;
  }
  .deleteActButtonBox{
    display: flex;
    flex-direction: row;
    width: 10rem;
    height: 1.5rem;

    display: -webkit-flex;
    -webkit-flex-direction: row;
  }
  .button{
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .buttonTxT{
    font-size: 0.8rem;
  }
  .LeftLine{
    border-left: 0.05rem solid #000000;
  }
</style>
