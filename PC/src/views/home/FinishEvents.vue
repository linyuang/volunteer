<template>
  <div class="finishEvents">
    <div class="content">
      <div class="leftArrowBox">
        <img class="leftArrow" :src="LeftArrow" alt="上一页" title="上一页" @click="oldPage()">
      </div>
      <div class="tableBox">
        <div class="tableTitle">
          <div class="unit number">序号</div>
          <div class="unit activityName">活动名称</div>
          <div class="unit joinPeoples">报名人数</div>
          <div class="unit activityFinish">活动进程</div>
          <div class="unit activitySelect">结束活动</div>
        </div>
        <div class="tableList" v-for="(item,index) in com_list()">
          <div class="unit number" v-text="index + 1"></div>
          <div class="unit activityName" v-text="item.name"></div>
          <div class="unit joinPeoples">
            <router-link  :to="{path:'events/'+ item.id}">报名名单</router-link>
          </div>
          <div class="unit activityFinish" v-text="com_actProcess(item)"></div>
          <div class="unit activitySelect">
            <button :ref="item.ref" class="finishButton" v-bind="{'disabled':!(item.enable == 1)}" @click="finishActivity(item)">结束活动</button>
          </div>
        </div>
      </div>
      <div class="rightArrowBox">
        <img class="rightArrow" :src="RightArrow" alt="下一页" title="下一页" @click="nextPage()">
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        CurrentPage:1,
        IsAllSelect:false,
        ComId:'',
        Page:1,
        Size:10,
        TableLists:[],
        ActMax:false,
        LeftArrow:require('../../assets/left_arrow_128px.png'),
        RightArrow:require('../../assets/right_arrow_128px.png')
      }
    },
    methods:{
      upDataList(){
        const _this = this;
        let actList = _this.TableLists;
        let result = {};
        let body = 'json=';
        result["comId"] = _this.$route.params.comId;
        result["page"] = _this.Page - 1;
        result["size"] = _this.Size;
        console.log(JSON.stringify(result));
        body += JSON.stringify(result);
        _this.ComId = _this.$store.state.CommunityInfo.comId;
//        if(_this.$store.state.ProductionMode){
          _this.$store.dispatch('RETURNALLACTIVITY',body)
            .then((res) => {
              if(res["INFO"].code == 604){
                if(res["ACTIVITY"].length < _this.Size){
                    _this.ActMax = true;
                }
                _this.TableLists = _this.TableLists.concat(res["ACTIVITY"]);
              }
            });
//        }else {
//          _this.$store.dispatch('GETLOCALORGACTLIST')
//            .then((res) => {
//              _this.ComId = res["comId"];
//              _this.TableLists = actList.concat(res["orgActList"]);
//              _this.TableLists.forEach((item,index) => {
//                item["number"] = index + 1;
//                item["ref"] = 'activity' + index;
//                item["check"] = false;
//              })
//            })
//        }
      },
      oldPage(){
        const _this = this;
        let page = _this.Page;
        if(page > 1){
          _this.Page -= 1
        }
      },
      nextPage(){
        const _this = this;
        let page = _this.Page;
        if(_this.$store.state.ProductionMode){
          if(!_this.ActMax){
            _this.upDataList();
            _this.Page += 1;
          }
        }else {
          if(page*_this.Size < _this.TableLists.length){
            _this.Page += 1;
          }
        }
      },
      finishActivity(obj){
        if(obj["enable"] == 2){
          return;
        }
        const _this = this;
        let body = "id=" + obj["id"];
        console.log(body);
        _this.$store.dispatch('FINISHACTIVITY',body)
          .then((res) => {
             if(res["INFO"].code == 608){
               console.log('结束活动成功');
               obj["enable"] = 0;
             }
          })
      },
      com_actProcess(obj){
        return (obj.enable == 1) ? "活动进行中" : "活动结束";
      },
      com_list(){
        const _this = this;
        let arr = new Array();
        let num = _this.Size;
        let min = (_this.Page-1)*num;
        let max = _this.Page*num;
        let list = _this.TableLists;
        if(max > list.length - 1){
            arr = list.slice(min,list.length - 1);
        }else {
            arr = list.slice(min,max);
        }
        return arr;
      }
    },
    filters:{
      filter_peoples(value){
        return value + '人';
      }
    },
    created(){
      this.upDataList();
    }
  }
</script>
<style scoped>
  .finishEvents{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
  }
  .content{
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding: 0.5rem 0;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content: center;
    -webkit-align-items: flex-start;
  }
  .leftArrowBox,.rightArrowBox{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .leftArrow{
    width: 0.3rem;
    height: auto;
  }
  .rightArrow{
    width: 0.3rem;
    height: auto;
  }
  .tableBox{
    display: flex;
    flex-direction: column;
    width: 10rem;
    border-right: 0.01rem solid #000000;
    border-bottom: 0.01rem solid #000000;

    display: -webkit-flex;
    -webkit-flex-direction: column;
  }
  .tableTitle,.tableList{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 0.5rem;

    display: -webkit-flex;
    -webkit-flex-direction: row;
  }
  .unit{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 0.2rem;
    border-top: 0.01rem solid #000000;
    border-left: 0.01rem solid #000000;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .number{
    width: 1rem;
    height: 100%;
  }
  .activityName{
    width: 4rem;
    height: 100%;
  }
  .joinPeoples{
    width: 2rem;
    height: 100%;
  }
  .activityFinish{
    width: 1.5rem;
    height: 100%;
  }
  .activitySelect{
    width: 1.5rem;
    height: 100%;
  }
  .finishButton{
    width: 1rem;
    height: 0.4rem;
    font-size: 0.2rem;
    border-radius: 0.05rem;
    outline: none;
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
  .finishSubmit{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.5rem;
    height: 0.5rem;
    font-size: 0.2rem;
    border-radius: 0.03rem;
    outline: none;

    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
</style>
