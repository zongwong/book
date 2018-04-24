// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import './assets/css/el-variables.scss';
import './assets/css/public.scss';
import LangEn from "../static/lang/en";
import LangZhCN from "../static/lang/zh";

import store from "./store/index";

Vue.use(VueI18n);
Vue.use(ElementUI);


Vue.locale('zh', LangZhCN);
Vue.locale('en', LangEn);
Vue.config.lang = 'zh';
Vue.config.productionTip = false;

localStorage.setItem('token','94fa6d2e8d6cf3cb9f65012f33e67a10');
// localStorage.setItem('token','c2cf19827f84348c3f65e75325f37ddc');

router.beforeEach((to, from, next) => {
  // if (window.location.href.indexOf('code') >= 0){
  // }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');
    if(!token){
      next({
        path: '/login',
        query: { redirect: to.fullPath }  
      });
    }else{
      next();
    }
    
  }else{
    if(to.path==='/login' && localStorage.getItem('token')){
      next({
        path: '/',
        query: { redirect: to.fullPath }  
      });
    }else{
      next();
    }
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
