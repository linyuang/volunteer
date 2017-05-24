<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  //判别访问设备类型
  (function browserRedirect(){
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
    let bIsIphone = sUserAgent.match(/iphone os/i) == 'iphone os';
    let bIsMidp = sUserAgent.match(/midp/i) == 'midp';
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
    let bIsUc = sUserAgent.match(/ucweb/i) == 'web';
    let bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
    let bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';

    if(bIsIpad || bIsIphone || bIsMidp || bIsUc7 || bIsUc || bIsCE || bIsWM){
      window.fontSize = (window.innerWidth * 100) / 1600;
    }else{
      window.fontSize = (window.innerWidth < 1100) ? (1100  * 100) / 1600 : (window.innerWidth * 100) / 1600;
    }
    console.log("我判断了设备类型");
  })();
  document.querySelector('html').style.fontSize = window.fontSize + 'px';
  export default {
    data(){
        return{}
    },
    methods:{
      tokenListen(){
        const _this = this;
        const sock = new SockJS('http://'+window.location.host+'/Yuc/yucService');
        const stomp = Stomp.over(sock);

        stomp.connect('root16', 'root', () => {
          console.log('*****  Connected  *****');
          stomp.subscribe("/user/queue/notifications",_this.handleNotification);
//      stomp.send("/app/yucserver", {},
//              JSON.stringify({'msg':'123456'}));
        });
      },
      handleNotification(message){
        const _this = this;
        alert("here============"+message);
        console.log("here=================" + message);
        if(message){
          _this.$store.state.COMMUNITYLOGIN = false;
          _this.$router.push('/login');
        }
      }
    },
    created(){
      const _this = this;
      if(_this.$store.state.ProductionMode){
        _this.tokenListen();
      }
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
