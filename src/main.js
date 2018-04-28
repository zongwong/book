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
import GoogleAuth from 'vue-google-oauth';
import store from "./store/index";
import axios from 'axios';
Vue.prototype.$http = axios;
import promise from 'es6-promise';
promise.polyfill();

Vue.use(VueI18n);
Vue.use(ElementUI);


Vue.locale('zh', LangZhCN);
Vue.locale('en', LangEn);

Vue.config.lang = localStorage.getItem('lang') || 'zh';
Vue.config.productionTip = false;



Vue.use(GoogleAuth, { client_id: '470375594267-g2ika962u05cat3m6a8v37k2o877gc0s.apps.googleusercontent.com' })
Vue.googleAuth().load()

// localStorage.setItem('token','94fa6d2e8d6cf3cb9f65012f33e67a10');
// localStorage.setItem('token','c2cf19827f84348c3f65e75325f37ddc');

function getStorage(key){
  return localStorage.getItem(key)||'';
}

router.beforeEach((to, from, next) => {
  // if (window.location.href.indexOf('code') >= 0){
  // }
  // 需要登录的路由
  if (to.matched.some(record => record.meta.requiresAuth)) { 
    console.log(to.path=='/setnick')
    if(!getStorage('token')){
      // 不存在token
      next({
        path: '/login',
        query: { redirect: to.fullPath }  
      });
    
    }else if(!getStorage('nickname')){
      if(to.path=='/setnick'){
        next()
      }else{
        next({
          path: '/setnick' 
        });
      }

    }else if(!getStorage('graduate_school')){
      if(to.path=='/setinfo'){
        next()
      }else{
        next({
          path: '/setinfo'
        });
      }
      
    }else{
      next()
    }

    
  }else{

    if(to.path==='/login' && getStorage('token')){
      next({
        path: '/',
        query: { redirect: to.fullPath }  
      });
    }else{
      next();
    }
    
  }

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
