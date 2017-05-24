// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'

router.beforeEach((to, from, next) => {
  console.log(to.matched.some(record => record.meta.requireAuth));
  if (to.matched.some(record => record.meta.requireAuth)) {  // 判断该路由是否需要登录权限
    if (store.state.CommunityLogin) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/login'
      })
    }
  }
  else {
    console.log("我没有requireAuth 属性");
    next();
  }
});

sync(store,router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#app', router, store }, App));

router.push('/');
