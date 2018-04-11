import Axios from '../utils/http';

//登录
//图形验证码
export const getCaptcha = params => Axios.get('/token/captcha', params);
//短信验证码
export const getCode = params => Axios.get('/token/getcode', params);
// 登录
export const toLogin = params => Axios.post('/token/create', params);


//个人资料

export const setNickname = params => Axios.post('/set/nickname', params);
export const setPasswd = params => Axios.post('/set/passwd', params);
export const getInfo = params => Axios.get('/set/getinfo', params);
export const setInfo = params => Axios.post('/set/personalinfo', params);
export const setBankinfo = params => Axios.post('/set/bankinfo', params);
export const setassociation = params => Axios.post('/set/association', params);
// export const aa = params => Axios.get('/mall/goods/getlist', params);

// 二手商品

// 租赁

// 社团
