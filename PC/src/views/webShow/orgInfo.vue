<template>
  <div class="orgInfo">
    <div class="content">
      <div class="orgBaseInfoBox">
        <div class="orgBaseInfoTxTBox">
          <div class="orgName">
            <p class="txtTip">组织名称:</p>
            <p class="txtContent" v-text="OrgInfo.name"></p>
          </div>
          <div class="orgBirthday">
            <p class="txtTip">成立时间:</p>
            <p class="txtContent">{{OrgInfo.time | birthday}}</p>
          </div>
          <div class="orgAddress">
            <p class="txtTip">组织地址:</p>
            <p class="txtContent" v-text="OrgInfo.address"></p>
          </div>
        </div>
        <div class="orgBaseInfoHeadBox">
          <img class="orgHead" :src="OrgHeadSrc" alt="组织logo" title="组织logo">
        </div>
      </div>
      <pre class="orgQuotation" v-text="OrgInfo.quotation"></pre>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        OrgHeadSrc:"",//https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495936796&di=b88a8591b832cf344fb1e84300f66c3e&imgtype=jpg&er=1&src=http%3A%2F%2Fa4.att.hudong.com%2F44%2F55%2F20300542038769143711557315031_s.jpg
        OrgInfo:{
          name:'',//网易公司
          head:'',//https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495936796&di=b88a8591b832cf344fb1e84300f66c3e&imgtype=jpg&er=1&src=http%3A%2F%2Fa4.att.hudong.com%2F44%2F55%2F20300542038769143711557315031_s.jpg
          time:'',//19970601
          address:'',//中国广州
          quotation:''//网易 (NASDAQ: NTES)是中国的互联网公司，利用互联网技术，加强人与人之间信息的交流和共享，实现“网聚人的力量”。创始人兼CEO是丁磊。在开发互联网应用、服务及其它技术方面，网易在推出了包括中文全文检索、全中文大容量免费邮件系统、无限容量免费网络相册、免费电子贺卡站、网上虚拟社区、网上拍卖平台、24小时客户服务中心在内的业内领先产品或服务，还通过自主研发推出了国产网络游戏。[1]网易公司推出了门户网站、在线游戏、电子邮箱、在线教育、电子商务、在线音乐、网易bobo等多种服务。[1]2016年净收入为381
        }
      }
    },
    methods:{
      initData(){
        const _this = this;
        let body = 'id=' + _this.$route.params.id;
        let orgInfo = _this.OrgInfo
        _this.$store.dispatch('GETCOMMUNITY',body)
          .then((res) => {
            if(res["INFO"].code == "516"){
              orgInfo.name = res["COMMUNITY"].name;
              orgInfo.head = res["COMMUNITY"].head;
              orgInfo.time = res["COMMUNITY"].setUp;
              orgInfo.address = res["COMMUNITY"].address;
              orgInfo.quotation = res["COMMUNITY"].quotation;
              _this.orgHead();
            }
          })
      },
      orgHead(){
          const _this = this;
          let body = {};
          body["type"] = 'org';
          body["head"] = (_this.OrgInfo.head) ? _this.OrgInfo.head : "";
          _this.$store.dispatch('IMAGEURL',body)
            .then((res) => {
              _this.OrgHeadSrc = res;
            })
      }
    },
    filters:{
      birthday(value){
        let year = String(value).substr(0,4) + "年";
        let month = Number(String(value).substr(4,2)) + "月";
        let day = Number(String(value).substr(6,2)) + '日';
        return year+month+day;
      }
    },
//    watch:{
//      OrgInfo:"orgHead"
//    },
    created(){
        this.initData();
    }
  }
</script>
<style scoped>
  .orgInfo{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
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
  .orgBaseInfoBox{
    display: flex;
    flex-direction: row;
    width: 12rem;
    height: 4.5rem;

    display: -webkit-flex;
    -webkit-flex-direction: row;
  }
  .orgBaseInfoTxTBox{
    display: flex;
    flex-direction: column;
    width: 9rem;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex-direction: column;
  }
  .orgName,.orgBirthday,.orgAddress{
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 9rem;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-start;
    -webkit-align-items: center;
  }
  .txtTip{
    width: 3rem;
    text-align: right;
    font-size: 0.6rem;
  }
  .txtContent{
    width: 5rem;
    text-align: left;
    font-size: 0.6rem;
  }
  .orgBaseInfoHeadBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .orgHead{
    width: 3rem;
    height: auto;
  }
  .orgQuotation{
    margin-top:1rem;
    width: 11rem;
    height: auto;
    font-size: 0.7rem;
    white-space: pre-wrap;
  }
</style>
