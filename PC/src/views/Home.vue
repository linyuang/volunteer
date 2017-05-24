<template>
  <div class="home">
    <div class="header">
      <p class="headerTxT" v-text="HeadTxT"></p>
      <button class="headerMenu" type="button">设置</button>
    </div>
    <div class="content">
      <div class="leftPart">
        <div class="baseInfo">
          <div class="orgHead">
            <img class="orgHeadImage" :src="HeadImageSrc" alt="组织头像" title="组织头像">
          </div>
          <p class="orgName" v-text="ComName"></p>
        </div>
        <div class="featuresMenu">
          <div :ref="functional.ref" class="featureBox" :class="[functionalSelect(functional)]" v-for="functional in com_initData" v-text="functional.name"
               @click="functionalPush(functional)"></div>
          <div class="fillBox"></div>
        </div>
      </div>
      <div class="rightPart">
        <div class="navigationBar"></div>
        <router-view :obj="ComPath" @newInfo="upDataInfo"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        HeadTxT:"志愿平台",
        ComId:"",
        ComHead:"",
        ComName:"",
        ComPath:"org",
        HeadImageSrc:'',
        FunctionalModules:{
          administrator:[
            {
              ref:"orgManagement",
              name:"组织管理",
              path:"/org",
              isSelect:true
            },
            {
              ref:"userManagement",
              name:"用户管理",
              path:"/user",
              isSelect:false
            },
            {
              ref:"eventsManagement",
              name:"活动管理",
              path:"/events",
              isSelect:false
            }
          ],
          community:[
            {
              ref:"reWriteInfo",
              name:"修改资料",
              path:"/baseInfo",
              isSelect:true
            },
            {
              ref:"sendEvents",
              name:"发布活动",
              path:"/sendEvents",
              isSelect:false
            },
            {
              ref:"finishEvents",
              name:"活动管理",
              path:"/finishEvents",
              isSelect:false
            }
          ]
        }
      }
    },
    methods:{
      homePush(){
        const _this = this;
        let loginType = _this.$store.state.CommunityLoginType;
        let loginInfo = _this.$store.state.CommunityInfo;
        let info = JSON.parse(loginInfo);
        if(loginType == 0){
          console.log('我是管理员');
          _this.ComId = info["id"];
          _this.Comhead = info["head"];
          _this.ComName = info["name"];
          _this.$router.push('/home/'+ _this.ComId +'/org');
        }else {
          console.log('我是组织');
          _this.ComId = info["id"];
          _this.Comhead = info["head"];
          _this.ComName = info["name"];
          console.log(_this.Comhead);
          _this.$router.push('/home/'+_this.ComId+'/baseInfo');
        }
      },
      functionalSelect(obj){
        return (obj.isSelect) ? "select" : "unSelect";
      },
      functionalPush(obj){
        const _this = this;
        let data = (_this.$store.state.CommunityLoginType == 0) ? _this.FunctionalModules.administrator : _this.FunctionalModules.community;
        data.forEach((item) =>{
           item.isSelect = false;
        });
        obj.isSelect = true;
//        console.log(obj.path);
        _this.ComPath = obj.path.substring(1);
        console.log(_this.ComPath);
        _this.$router.push('/home/'+_this.ComId+obj.path);
      },
      upDataInfo(obj){
        const _this = this;
        _this.ComName = obj["name"];
        _this.Comhead = obj["head"];
      },
      com_headImg(){
        const _this = this;
        let body = {};
        body["type"] = 'org';
        body["head"] = _this.Comhead;
        console.log(body);
        _this.$store.dispatch('IMAGEURL',body)
          .then((res) => {
             _this.HeadImageSrc = res;
          })
      }
    },
    computed:{
      com_initData(){
        return (this.$store.state.CommunityLoginType == 0) ? this.FunctionalModules.administrator : this.FunctionalModules.community;
      }
    },
    mounted(){
      this.homePush();
      this.com_headImg();
    }
  }
</script>
<style>
  .home{
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
  }
  .header{
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 16rem;
    height: auto;
    background-color: beige;
    border-bottom: 0.02rem solid #c3c3c3;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: row;
    -webkit-justify-content: space-between;
    -webkit-align-items: center;
  }
  .headerTxT{
    font-size: 0.3rem;
    font-weight: bold;
    margin-left: 0.5rem;
  }
  .headerMenu{
    width: 1rem;
    height: 100%;
    font-size: 0.2rem;
    font-weight: bold;
  }
  .content{
    display: flex;
    flex: 14;
    flex-direction: row;
    width: 100%;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 14;
    -webkit-flex-direction: row;
  }
  .leftPart{
    display: flex;
    flex-direction: column;
    width: 3rem;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex-direction: column;
  }
  .baseInfo{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 2.99rem;
    height: 2.5rem;
    background-color: #eeeeee;
    border-right: 0.02rem solid #c3c3c3;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .orgHead{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.2rem;
    background-color: #ffffff;
  }
  .orgHeadImage{
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.1rem;
  }
  .orgName{
    margin-top: 0.15rem;
    width: 2rem;
    font-size: 0.2rem;
    text-align: center;
    word-break: break-all;
  }
  .featuresMenu{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    background-color: #eeeeee;
    border-top: 0.02rem solid #c3c3c3;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-justify-content: flex-start;
  }
  .featureBox{
    height: 1rem;
    font-size: 0.3rem;
    font-weight: bold;
    text-align: center;
    line-height: 1rem;
    border-bottom: 0.02rem solid #c3c3c3;
  }
  .unSelect{
    width: 2.98rem;
    background-color: #eeeeee;
    border-right: 0.02rem solid #c3c3c3;
  }
  .select{
    width: 3rem;
    background-color: #ffffff;
  }
  .fillBox{
    display: flex;
    flex: 1;
    width: 2.99rem;
    height: auto;
    background-color: #eeeeee;
    border-right: 0.02rem solid #c3c3c3;
  }
  .rightPart{
    display: flex;
    flex: 4;
    flex-direction: column;
    width: auto;
    height: 100%;
    background-color: #ffffff;

    display: -webkit-flex;
    -webkit-flex: 4;
    -webkit-flex-direction: column;
  }
  .navigationBar{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 0.4rem;
    background-color: #92ff7d;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-start;
    -webkit-align-items: center;
  }

</style>
