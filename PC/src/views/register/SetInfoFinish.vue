<template>
  <div class="SetInfoFinish">
    <div class="finishTXTBox">
      <p class="finishTXT" v-text="FinishTXT1"></p>
      <p class="finishTXT" v-text="FinishTXT2"></p>
    </div>
    <div class="returnLoginButtonBox">
      <div class="returnLoginButton" @click="RTLogin()">返回登录</div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        FinishTXT1:"您已完成注册，我们将在1-2个工作日内对贵组织的信息进行审核,请耐心等候",
        FinishTXT2:"非常感谢感谢贵组织对我们平台的关注"
      }
    },
    methods:{
      RTLogin(){
        this.$router.push('/login');
      }
    }
  }
</script>
<style>
  .SetInfoFinish{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 12rem;
    height: 5.6rem;

    display: -webkit-flex;
    -webkit-flex-direction: column;
    -webkit-align-items: center;
  }
  .finishTXTBox{
    display: flex;
    flex:4;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 12rem;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 4;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .returnLoginButtonBox{
    display: flex;
    flex:1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 12rem;
    height: auto;

    display: -webkit-flex;
    -webkit-flex: 1;
    -webkit-flex-direction: column;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .finishTXT{
    width: 8rem;
    height: auto;
    font-size: 0.3rem;
    text-align: center;
  }
  .returnLoginButton{
    width: 1.5rem;
    height: 0.6rem;
    background-color: orange;
    color: #ffffff;
    border-radius: 0.05rem;
    font-size: 0.2rem;
    font-weight: bold;
    text-align: center;
    line-height: 0.6rem;
  }
</style>
