<template>
  <div class="peopleList">
    <!--返回键-->
    <div class="back">
      <img class="returnArrow" :src="ReturnArrow" alt="返回" title="返回" @click="routerBack()">
    </div>
    <!--主体-->
    <div class="content">
      <div class="oldPage" @click="oldPage()">
        <img class="leftArrow" :src="LeftArrow" alt="上一页" title="上一页">
      </div>
      <div class="table">
        <div class="peopleNumber" v-text=""></div>
        <div class="tableBox">
          <div class="tableTitle">
            <div class="unit number">序号</div>
            <div class="unit name">姓名</div>
            <div class="unit sex">性别</div>
            <div class="unit age">年龄</div>
            <div class="unit phone">手机</div>
            <div class="unit address">地址</div>
            <div class="unit pass">通过</div>
            <div class="unit unPass">未通过</div>
            <div class="unit keep">暂保留</div>
          </div>
          <div class="tableList" v-for="(item,index) in com_list()">
            <div class="unit number">{{index + 1}}</div>
            <div class="unit name" v-text="item.name"></div>
            <div class="unit sex" >{{item.sex | filter_sex}}</div>
            <div class="unit age">{{item.birth | filter_age}}</div>
            <div class="unit phone" v-text="item.phone"></div>
            <div class="unit address" v-text="item.address"></div>
            <div class="unit pass">
              <input :ref="com_passRef(item)" type="checkbox" v-bind="{'disabled':!(item.enable == 1)}"
                     @mousedown="Check(item)" @mouseup="passUp(item)" >
            </div>
            <div class="unit unPass">
              <input :ref="com_unPassRef(item)" type="checkbox" v-bind="{'disabled':!(item.enable == 1)}"
                     @mousedown="Check(item)" @mouseup="unPassUp(item)" >
            </div>
            <div class="unit keep">
              <input :ref="com_keepRef(item)" type="checkbox" v-bind="{'disabled':!(item.enable == 1)}"
                     @mousedown="Check(item)" @mouseup="keepUp(item)">
            </div>
          </div>
        </div>
      </div>
      <div class="nextPage" @click="nextPage()">
        <img class="rightArrow" :src="RightArrow" alt="下一页" title="下一页">
      </div>
    </div>
    <div class="submitBox" >
      <button class="submit" @click="submit()">提交</button>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        ComId:"",
        Event:"",
        PeopleList:[],
        Page:1,
        Size:10,
        PeoMax:false,
        LeftArrow:require('../../assets/left_arrow_128px.png'),
        RightArrow:require('../../assets/right_arrow_128px.png'),
        ReturnArrow:require('../../assets/return_Arrow_128px.png')
      }
    },
    methods:{
      initInfo(){
        const _this = this;
        _this.ComId = _this.$route.params.comId;
        _this.Event = _this.$route.params.id;
//        console.log(_this.ComId,_this.Event);
      },
      upDataList(){
          const _this = this;
          let result = {};
          let body = "json=";
          result["actId"] = _this.Event;
          result["page"] = _this.Page - 1;
          result["size"] = _this.Size;
          body += JSON.stringify(result);
//          if(_this.$store.state.ProductionMode){
            _this.$store.dispatch('RETURNJOINTABLE',body)
              .then((res) => {
                if(res["INFO"].code == 706){
                  if(res["APPLY"].length < _this.Size){
                    _this.PeoMax = true;
                  }
                  _this.PeopleList = _this.PeopleList.concat(res["APPLY"]);
                }else {
                  alert('报名列表' + res["INFO"].message);
                }
              });
//          }else {
//            _this.$store.dispatch('GETLOCALPEOPLELIST')
//              .then((res) => {
//                _this.PeopleList = res[_this.Event];
//                _this.PeopleList.forEach((item,index) => {
//                  item["ref"] = index;
//                  item["isPass"] = false;
//                  item["isUnPass"] = false;
//                  item["enable"] = false;
//                })
//              })
//          }
      },
      routerBack(){
        this.$router.go(-1);
      },
      oldPage(){
        const _this = this;
        if(_this.Page > 1){
          _this.Page -= 1;
        }
      },
      nextPage(){
        const _this = this;
        if(!_this.PeoMax){
          _this.upDataList();
          _this.Page += 1;
        }
      },
      Check(obj){
        const _this = this;
        let passRef = 'pass' + obj["id"];
        let unPassRef = 'unPass' + obj["id"];
        let keepRef = 'keep' + obj["id"];
        console.log('Check点击了，obj的ref:'+obj["id"]);
        _this.$refs[passRef][0].checked = false;
        _this.$refs[unPassRef][0].checked = false;
        _this.$refs[keepRef][0].checked = false;
      },
      passUp(obj){
        if(obj.isPass){
          obj.isPass = false;
        }else {
          obj.isPass = true;
          obj.isUnPass = false;
        }
        console.log('pass:'+obj.isPass,"unPass:"+obj.isUnPass);
      },
      unPassUp(obj){
        if(obj.isUnPass){
          obj.isUnPass = false;
        }else {
          obj.isUnPass = true;
          obj.isPass = false;
        }
        console.log('pass:'+obj.isPass,"unPass:"+obj.isUnPass);
      },
      keepUp(obj){
        obj.isPass = false;
        obj.isUnPass = false;
      },
      submit(){
        const _this = this;
        let list = _this.PeopleList;
        let result = {};
        let pass = [];
        let passArr = [];
        let disPass = [];
        let disPassArr = [];
        let body = 'json=';
        list.forEach((item,index) => {
            if(item.isPass){
              pass = pass.concat(String(item.id));
              passArr = passArr.concat(index);
            }else {
                if(item.isUnPass){
                  disPass = disPass.concat(String(item.id));
                  disPassArr = disPassArr.concat(index);
                }
            }
        });
        result["actId"] = _this.Event;
        result["pass"] = pass;
        result["dispass"] = disPass;
        body += JSON.stringify(result);
        _this.$store.dispatch('JOINPASS',body)
          .then((res) => {
            if(res["INFO"].code = 705){
              _this.changList(list,passArr,disPassArr);
            }
          })
      },
      changList(obj,passArr,disPassArr){
        passArr.forEach((item) => {
            obj[item].enable = true;
        });

        for(let i = disPassArr.length - 1; i > 0 ; i --){
            obj.splice(disPassArr[i],1);
        }
        this.$nextTick(function () {
          return 0;
        })
      },
      com_list(){
        const _this = this;
        let page = _this.Page;
        let size = _this.Size;
        if(_this.PeopleList.length != 0){
          return _this.PeopleList.slice((page-1)*size,page*size);
        }
      },
      com_passRef(obj){
        return 'pass' + obj["id"];
      },
      com_unPassRef(obj){
        return 'unPass' + obj["id"];
      },
      com_keepRef(obj){
        return 'keep' + obj["id"];
      }
    },
    filters:{
      filter_sex(value){
        return (value == 0) ? "男" : "女";
      },
      filter_age(value){
        let date = new Date();
        let birth = Number(value.substring(0,4));
        return (date.getFullYear() - birth) + '岁';
      }
    },
    created(){
      this.initInfo();
      this.upDataList();
    }
//    mounted(){
//      this.$nextTick(function () {
//        this.testSubmit();
//      })
//    }
  }
</script>
<style scoped>
  .peopleList{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .back{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 0.5rem;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: flex-start;
  }
  .returnArrow{
    width: auto;
    height: 0.2rem;
    margin-left: 0.2rem;
  }
  .content{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding: 0.5rem 0;

    display: -webkit-flex;
    -webkit-flex-direction: row;
  }
  .oldPage,.nextPage{
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
  .table{
    width: 11rem;
    height: 100%;
  }
  .tableBox{
    width: 100%;
    border-right: 0.02rem solid #000000;
    border-bottom: 0.02rem solid #000000;
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
    justify-content: space-around;
    align-items: center;
    height: 100%;
    font-size: 0.2rem;
    border-top: 0.02rem solid #000000;
    border-left: 0.02rem solid #000000;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
  }
  .number{
    width: 0.5rem;
  }
  .name{
    width: 1.5rem;
  }
  .sex{
    width: 0.5rem;
  }
  .age{
    width: 1rem;
  }
  .phone{
    width: 2rem;
  }
  .address{
    width: 3rem;
  }
  .pass{
    width: 0.75rem;
  }
  .unPass{
    width: 0.75rem;
  }
  .keep{
    width: 1rem;
  }
  .leftArrow,.rightArrow{
    width: 0.2rem;
    height: auto;
  }

  .submitBox{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 1rem;

    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .submit{
    width: 1.5rem;
    height: 0.5rem;
    font-size: 0.2rem;
    border-radius: 0.1rem;
    outline: none;
  }
</style>
