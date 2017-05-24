<template>
  <div class="register">
    <div class="backLogin">
      <a class="backLoginLink" href="javaScript:;" v-text="BackLoginTxT" @click="backLogin()"></a>
    </div>
    <div class="orgData">
      <div class="orgDataTitle"></div>
      <router-view class="orgDataContent"></router-view>
      <div class="orgDataStepBar">
        <div :ref="step.ref" class="orgDataStepBox" :class="" v-for="step in Steps">
          <div class="stepRound">
            <p class="stepTxT" v-text="step.ref"></p>
          </div>
          <p class="stepTxT" v-text="step.name"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        BackLoginTxT:'已经注册，返回登录',
        Steps:[
          {
            ref:"1",
            name:"账号注册"
          },
          {
            ref:"2",
            name:"填写信息"
          },
          {
            ref:"3",
            name:"返回登录"
          }
        ]
      }
    },
    methods:{
      backLogin(){
          this.$router.push('/login');
      }
    }
  }
</script>
<style scoped>
  .register{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 16rem;
    height: 100%;
    background-color: #00A0E9;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .backLogin{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 12rem;
    height: 0.4rem;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content: flex-end;
    -webkit-align-items: center;
  }
  .backLoginLink{
    font-size: 0.2rem;
    color: #ffffff;
    text-decoration: none;
  }
  .orgData{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 12rem;
    height: 7rem;
    background-color: #ffffff;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .orgDataTitle,.orgDataStepBar{
    display: flex;
    flex: 1;

    display: -webkit-flex;
    -webkit-flex: 1;
  }
  .orgDataContent{
    display: flex;
    flex: 8;

    display: -webkit-flex;
    -webkit-flex: 8;
  }
  .orgDataStepBar,.orgDataStepBox{
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    -webkit-flex-direction: row;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
  }
  .orgDataStepBar{
    width: 8rem;
    height: auto;
  }
  .orgDataStepBox{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 1.5rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: #c3c3c3;

    display: -webkit-flex;
    -webkit-flex-direction: row;
    -webkit-justify-content: space-around;
    -webkit-align-items: center;
  }
  .stepRound{
    width: 0.3rem;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    border-radius: 0.15rem;
    background-color: #ffffff;
  }
  .stepTxT{
    font-size: 0.1rem;
    font-weight: bold;
  }
</style>
