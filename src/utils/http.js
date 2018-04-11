import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded';

const Axios = axios.create({
  baseURL: 'http://api.dedele.net',
  timeout: 10000,
});


// Axios.interceptors.request.use(
//   config => {


//   },
//   error => {


//   }
// );

// //返回状态判断(添加响应拦截器)
// Axios.interceptors.response.use(
//   res => {


//   },
//   error => {

//   }
// );

export default {

  //Post  请求方式
  post(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      Axios.post(url, params, config).then(response => {
          resolve(response);
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
    return new Promise((resolve, reject) => {
      Axios.get(url, {
          params: params
        }).then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        });
    })

  }
}
