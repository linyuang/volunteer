<template>
  <div class="management">
    <div class="content">
      <div class="leftArrowBox">
        <img class="leftArrow" :src="LeftArrow" alt="上一页" title="上一页">
      </div>
      <div class="tableBox">
        <div class="table">
          <div class="tableTile" >
            <div class="unit number">序号</div>
            <div class="unit" :class="item.css" v-text="item.name" v-for="item in com_tableTitle()"></div>
            <div class="unit freeze">冻结</div>
            <div class="unit enable">激活</div>
          </div>
          <div class="tableList" v-for="(item,index) in com_lists()">
            <div class="unit number" v-text="index+1"></div>
            <div class="unit userName" v-text="item.userName"></div>
            <div class="unit name" v-text="item.name"></div>
            <div class="unit nature" v-text="com_nature(item)"></div>
            <div class="unit contact" v-text="com_contact(item)"></div>
            <div class="unit status" v-text="com_status(item)"></div>
            <div class="unit freeze">
              <button class="button " v-bind="{'disable':item.enable == 1}" @click="com_buttonFreeze(item)">冻结</button>
            </div>
            <div class="unit enable">
              <button class="button " v-bind="{'disable':!item.enable == 1}" @click="com_buttonEnable(item)">激活</button>
            </div>
          </div>
        </div>
      </div>
      <div class="rightArrowBox">
        <img class="rightArrow" :src="RightArrow" alt="上一页" title="下一页">
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        ManaId:"",
        MaxPage:false,
        Page:1,
        Size:10,
        TableTitleList:{
          comList:[
            {
              ref:"userName",
              css:"userName",
              name:"账号"
            },
            {
              ref:"name",
              css:"name",
              name:"组织名",
            },
            {
              ref:"nature",
              css:"nature",
              name:"性质"
            },
            {
              ref:"address",
              css:"contact",
              name:"地址"
            },
            {
              ref:"status",
              css:"status",
              name:"状态"
            }
          ],
          userList:[
            {
              ref:"userName",
              css:"userName",
              name:"账号"
            },
            {
              ref:"name",
              css:"name",
              name:"用户名"
            },
            {
              ref:"sex",
              css:"nature",
              name:"性别"
            },
            {
              ref:"phone",
              css:"contact",
              name:"联系方式"
            },
            {
              ref:"status",
              css:"status",
              name:"状态"
            }
          ],
          actList:[
            {
              ref:"userName",
              css:"userName",
              name:"账号"
            },
            {
              ref:"name",
              css:"name",
              name:"组织名"
            },
            {
              ref:"nature",
              css:"nature",
              name:"性质"
            },
            {
              ref:"comName",
              css:"contact",
              name:"归属组织"
            },
            {
              ref:"status",
              css:"status",
              name:"状态"
            }
          ]
        },
        TableLists:[],
        LeftArrow:require('../../assets/left_arrow_128px.png'),
        RightArrow:require('../../assets/right_arrow_128px.png'),
      }
    },
    props:['obj'],
    methods:{
      //初始化数据
      initInfo(){
        this.ManaId = this.$route.params.id;
        this.MaxPage = false;
        this.TableLists = [];
        this.upDataList();
      },
      //根据路由执行不同列表的获取函数
      upDataList(){
        const _this = this;
        switch (_this.ManaId){
          case 'org':
            _this.upDataOrgList();
            break;
          case 'user':
            _this.upDataUserList();
            break;
          case 'events':
            _this.upDataActlist();
            break;
          default:
            break;
        }
      },
      //获取组织列表
      upDataOrgList(){
        const _this = this;
        let result = {};
        let body = 'json=';
        result["page"] = _this.Page;
        result["size"] = _this.Size;
        body += JSON.stringify(result);
        _this.$store.dispatch('ADMINGETORGS',body)
          .then((res) => {
            if(res["INFO"].code == ''){
              if(res["INFO"].message.length < _this.Size){
                _this.MaxPage = true;
              }
              _this.TableLists =  _this.TableLists.concat(res["INFO"].message);
              console.log('读取组织数据成功');
            }else {
              console.log('获取组织数据失败');
            }
          })
      },
      //获取用户列表
      upDataUserList(){
        const _this = this;
        let result = {};
        let body = 'json=';
        result["page"] = _this.Page;
        result["size"] = _this.Size;
        body += JSON.stringify(result);
        _this.$store.dispatch('ADMINGETUSERS',body)
          .then((res) => {
            if(res["INFO"].code == ''){
              if(res["INFO"].message.length < _this.Page){
                  _this.MaxPage = true;
              }
              _this.TableLists = res["INFO"].message;
              console.log('读取用户数据成功');
            }else {
              console.log('获取用户数据失败');
            }
          })
      },
      //获取活动列表
      upDataActlist(){
        const _this = this;
        let result = {};
        let body = 'json=';
        result["page"] = _this.Page;
        result["size"] = _this.Size;
        body += JSON.stringify(result);
        _this.$store.dispatch('ADMINGETACT',body)
          .then((res) => {
            if(res["INFO"].code == ''){
              if(res["INFO"].message.length < _this.Page){
                _this.MaxPage = true;
              }
              _this.TableLists = res["INFO"].message;
              console.log('读取用户数据成功');
            }else {
              console.log('获取用户数据失败');
            }
          })
      },
      //上一页
      oldPage(){
        const _this = this;
        if(_this.Page > 1){
          _this.Page -= 1;
        }
      },
      //下一页
      nextPage(){
        const _this = this;
        if(!_this.PeoMax){
          _this.upDataList();
          _this.Page += 1;
        }
      },
      //冻结组织
      freezeOrgList(obj){
        const _this = this;
        let body = 'userName=' + obj["userName"];
        _this.$store.dispatch('ADMINFREEZEORG',body)
          .then((res) => {
            if(res["INFO"].code == ''){
              obj.enable = 2;
            }
          })
      },
      //激活组织
      enableOrgList(obj){
        const _this = this;
        let body = 'userName=' + obj["userName"];
        _this.$store.dispatch('ADMINENABLEORG',body)
          .then((res) => {
            if(res["INFO"].code == ''){
              obj.enable = 1;
            }
          })
      },
      //冻结用户
      freezeUserList(obj){
        const _this = this;
        let body = 'userName=' + obj["userName"];
        _this.$store.dispatch('ADMINFREEZEUSER',body)
          .then((res) => {
            if(res["INFO"].code == ''){
              obj.enable = 2;
            }
          })
      },
      //激活用户
      enableUserList(obj){
        const _this = this;
        let body = 'userName=' + obj["userName"];
        _this.$store.dispatch('ADMINENABLEUSER',body)
          .then((res) => {
            if(res["INFO"].code == ''){
              obj.enable = 1;
            }
          })
      },
      //冻结活动
      freezeActList(obj){
        const _this = this;
        let body = 'id' + obj["id"];
        _this.$store.dispatch('ADMINFREEZEACT',body)
          .then((res) => {
            if(res["INFO"].code == ''){
                obj.enable = 2;
            }
          })
      },
      //激活活动
      enableActList(obj){
        const _this = this;
        let body = 'id' + obj["id"];
        _this.$store.dispatch('ADMINENABLEACT',body)
          .then((res) => {
            if(res["INFO"].code == ''){
              obj.enable = 1;
            }
          })
      },
      //计算函数——触发对应的冻结功能
      com_buttonFreeze(obj){
        const _this = this;
        switch (_this.ManaId){
          case 'org':
            _this.freezeOrgList(obj);
            break;
          case 'user':
            _this.freezeUserList(obj);
            break;
          case 'events':
            _this.freezeActList(obj);
            break;
          default:
            break;
        }
      },
      //计算函数——触发对应的冻结功能
      com_buttonFreeze(obj){
        const _this = this;
        switch (_this.ManaId){
          case 'org':
            _this.enableOrgList(obj);
            break;
          case 'user':
            _this.enableUserList(obj);
            break;
          case 'events':
            _this.enableActList(obj);
            break;
          default:
            break;
        }
      },
      //计算函数——触发对应的激活功能
      com_buttonEnable(obj){
          const _this = this;
        switch (_this.ManaId){
          case 'org':
            _this.freezeOrgList(obj);
            break;
          case 'user':
            _this.freezeUserList(obj);
            break;
          case 'events':
            _this.freezeActList(obj);
            break;
          default:
            break;
        }
      },
      //计算函数——返回对应的头部列表
      com_tableTitle(){
        const _this = this;
        let tableTitleList = _this.TableTitleList;
        let result = [];
        switch (_this.ManaId){
          case 'org':
            result = tableTitleList.comList;
            break;
          case 'user':
            result = tableTitleList.userList;
            break;
          case 'events':
            result = tableTitleList.actList;
            break;
          default:
            break;
        }
        return result;
      },
      //计算函数——返回对应页码的列表内容
      com_lists(){
        const _this = this;
        let page = _this.Page;
        let size = _this.Size;
        if(_this.TableLists.length != 0){
          return _this.TableLists.slice((page-1)*size,page*size);
        }
      },
      //计算函数——返回nature对应的数据
      com_nature(obj){
        const _this = this;
        let result;
        switch (_this.ManaId){
          case "org":
            result = '组织';
            break;
          case "user":
            result = (obj["sex"] == 0) ? '男' : '女';
            break;
          case 'events':
            result = '活动';
            break;
          default:
            break;
        }
        return result;
      },
      //计算函数——返回contact对应的数据
      com_contact(obj){
        const _this = this;
        let result;
        switch (_this.ManaId){
          case "org":
            result = obj["address"];
            break;
          case "user":
            result = obj["phone"];
            break;
          case 'events':
            result = obj["comName"];
            break;
          default:
            break;
        }
      },
      //计算函数——返回状态栏对应的数据
      com_status(obj){
        return (obj["enable"] == 0) ? '冻结中' : '激活';
      }
    },
    watch:{
      obj:"initInfo"
    },
    created(){
      this.initInfo();
    }
  }
</script>
<style scoped>
  .management{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .content{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    display: -webkit-flex;
    -webkit-flex-direction: row;
  }
  .leftArrowBox,.rightArrowBox{
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;

    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .leftArrow,.rightArrow{
    width: 0.3rem;
    height: auto;
    font-size: 0.02rem;
  }
  .content{
    display: flex;
    width: 100%;
    height: 100%;

    display: -webkit-flex;
  }
  .tableBox{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 12rem;
    height: 100%;
    padding: 0.5rem 0;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: flex-start;
    -webkit-align-items: center;
  }
  .table{
    width: 12rem;
    height: auto;
    border-right: 0.02rem solid #000000;
    border-bottom: 0.02rem solid #000000;
  }
  .tableTile,.tableList{
    display: flex;
    flex-direction: row;
    width: 100%;

    display: -webkit-flex;
    -webkit-flex-direction: row;
  }
  .unit{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 0.5rem;
    font-size: 0.2rem;
    border-top: 0.02rem solid #000000;
    border-left: 0.02rem solid #000000;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .number{
    width: 0.5rem;
  }
  .userName{
    width: 2rem;
  }
  .name{
    width: 3rem;
  }
  .nature{
    width: 0.5rem;
  }
  .contact{
    width: 3rem;
  }
  .status{
    width: 1rem;
  }
  .freeze,.enable{
    width: 1.5rem;
  }
  .button{
    width: 1rem;
    height: 0.4rem;
    font-size: 0.2rem;
    border-radius: 0.05rem;
    outline: none;
  }
</style>
