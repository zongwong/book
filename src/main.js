// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
// import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/el-variables.scss';
import './assets/css/public.scss';
// import enLocale from 'element-ui/lib/locale/lang/en';
// import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import LangEn from "../static/lang/en";
import LangZhCN from "../static/lang/zh";
Vue.use(VueI18n);
Vue.use(ElementUI);


Vue.locale('zh', LangZhCN);
Vue.locale('en', LangEn);
Vue.config.lang = 'zh';

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  // if (window.location.href.indexOf('code') >= 0){
  // }
  // if (to.matched.some(record => record.meta.requiresAuth)) {

  //   next({path: '/login'});
  // }else{
  //   next();
  // }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
