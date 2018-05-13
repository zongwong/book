import axios from 'axios';
import store from '../store/index';
import router from '../router/index';
import confg from '../utils/global';
axios.defaults.headers.post['content-Type'] = 'application/x-www=form-urlencoded';
axios.defaults.withCredentials = true;
const Axios = axios.create({
  baseURL: confg.host,
  timeout: 20000000,
});


Axios.interceptors.request.use(
  config => {
    let token = store.state.token||'';
    if(config.method=='get'){
      config.params.token = token;
    }else if(config.method=='post'){
      config.data.token = token;
      // if(!token)
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// //返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {
    // token 失效处理
    console.log(res.data)
    if( (res.data.code == 400 && res.data.message == '当前账号已在其他终端登录') ||(res.data.code == 400 && res.data.message == '未提交token') || (res.data.code == 400 &&res.data.message=='token已过期，请重新登录') ){
      store.commit('LoginOut_MUTATION');
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default {

  //Post  请求方式
  post(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      Axios.post(url, params, config).then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },


  //GET 请求方式
  get(url, params = {}) {
    console.log(params)
    return new Promise((resolve, reject) => {
      Axios.get(url, {
          params: params
        }).then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        });
    })

  }
}
