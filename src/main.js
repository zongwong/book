// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import './assets/css/el-variables.scss';
import './assets/css/public.scss';
import EleLangEn from 'element-ui/lib/locale/lang/en';
import LangEn from "../static/lang/en";
import LangZhCN from "../static/lang/zh";
import GoogleAuth from 'vue-google-oauth';
import store from "./store/index";
import axios from 'axios';

Vue.prototype.$http = axios;
import promise from 'es6-promise';
promise.polyfill();

import VueStripeCheckout from "./utils/pay";
Vue.use(VueStripeCheckout, {
  key: 'pk_test_hHCR1t7CrgapGB4vqs1qLF4G',
  image: 'https://www.wahcampus.com/static/visa.jpg',
  locale: 'auto',
  panelLabel: 'Subscribe {{amount}}'
});
 

// Vue.use(ElementUI, { EleLangEn })
Vue.use(VueI18n);
Vue.use(ElementUI);

Vue.locale('zh', LangZhCN);
Vue.locale('en', {...LangEn,...EleLangEn});

Vue.config.lang = localStorage.getItem('lang') || 'zh';
Vue.config.productionTip = false;



Vue.use(GoogleAuth, { client_id: '470375594267-g2ika962u05cat3m6a8v37k2o877gc0s.apps.googleusercontent.com' })
Vue.googleAuth().load()

function getStorage(key){
  return localStorage.getItem(key)||'';
}

router.beforeEach((to, from, next) => {
  // if (window.location.href.indexOf('code') >= 0){
  // }
  // 需要登录的路由
  if (to.matched.some(record => record.meta.requiresAuth)) { 
    if(!getStorage('token')){
      // 不存在token
      next({
        path: '/login',
        query: { redirect: to.fullPath }  
      });
    
    // }else if(!getStorage('nickname')){
      // if(to.path=='/setnick'){
      //   next()
      // }else{
      //   next({
      //     path: '/setnick' 
      //   });
      // }

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
      return;
    }


    if(getStorage('token')){
      // if(!getStorage('nickname')){
      //   if(to.path=='/setnick'){
      //     next()
      //   }else{
      //     next({
      //       path: '/setnick' 
      //     });
      //   }
  
      // }else 
      if(!getStorage('graduate_school')){
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
      next()
    }

      // next();

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
