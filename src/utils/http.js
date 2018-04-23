import axios from 'axios';
import store from '../store/index';
axios.defaults.headers.post['content-Type'] = 'application/x-www=form-urlencoded';
axios.defaults.withCredentials = true;
const Axios = axios.create({
  // baseURL: 'http://api.dedele.net',
  baseURL: '/api',
  timeout: 10000,
});


Axios.interceptors.request.use(
  config => {
    let token = store.state.token||'';
    if(config.method=='get'){
      config.params.token = token;
    }else if(config.method=='post'){
      config.data.token = token;
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
    // if(0){
    //   store.commit(types.LOGOUT);
    //   router.replace({
    //     path: 'login',
    //     query: {
    //       redirect: router.currentRoute.fullPath
    //     }
    //   })
    // }
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
