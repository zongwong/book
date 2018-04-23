import Axios from '../utils/http';

//登录
//图形验证码
export const getCaptcha = params => Axios.get('/token/captcha', params);
//短信验证码
export const getCode = params => Axios.get('/token/getcode', params);
// 登录
export const toLogin = params => Axios.post('/token/create', params);

//校区列表
export const getCampus = params => Axios.get('/campus/getlist', params);

// 货币列表
export const getCurrency = params => Axios.get('/currency/getlist', params);

//个人资料
export const getUserInfo = params => Axios.get('/user/info', params);
export const setNickname = params => Axios.post('/set/nickname', params);
export const setPasswd = params => Axios.post('/set/passwd', params);
export const getInfo = params => Axios.get('/set/getinfo', params);
export const setInfo = params => Axios.post('/set/personalinfo', params);
export const setBankinfo = params => Axios.post('/set/bankinfo', params);
export const setassociation = params => Axios.post('/set/association', params);
// export const aa = params => Axios.get('/mall/goods/getlist', params);

// 二手商品
export const getGoodsList = params => Axios.get('/mall/goods/getlist', params);
export const getGoodsInfo = params => Axios.get('/mall/goods/info', params);
export const publishGoods = (params,config) => Axios.post('/mall/goods/publish', params, config);

// 租赁

export const getLeaseList = params => Axios.get('/lease/getlist', params);
export const getLeaseInfo = params => Axios.get('/lease/info', params);
export const publishLease = params => Axios.post('/lease/create', params);
export const leaseCommentList = params => Axios.get('/lease/comment/getlist', params);
export const leaseCommentCreate = params => Axios.post('/lease/comment/create', params);
export const myLeaseList = params => Axios.get('/lease/mylist', params);
export const leaseZan = params => Axios.get('/lease/thumbup', params);
export const leaseUnZan = params => Axios.get('/lease/unthumbup', params);



// 社团
export const getgroupList = params => Axios.get('/association/getlist', params);
export const getgroupInfo = params => Axios.get('/association/info', params);
// export const publishgroup = params => Axios.post('/association/create', params);

// 社团 帖子
export const groupPostList = params => Axios.get('/association/post/getlist', params);
export const groupCommentList = params => Axios.get('/association/comment/getlist', params);
export const groupCommentCreate = params => Axios.post('/association/comment/create', params);
export const getPostInfo = params => Axios.get('/association/post/info', params);
export const groupPostZan = params => Axios.get('/association/post/thumbup', params);
export const groupPostUnZan = params => Axios.get('/association/post/unthumbup', params);

// 发帖
export const groupPostCreate = params => Axios.post('/association/post/create', params);

// 收货地址

export const addressList = params => Axios.get('/mall/address/getlist', params);
export const addressAdd = params => Axios.post('/mall/address/save', params); 
export const addressDel = params => Axios.get('/mall/order/delete', params); 
export const addressEdit = params => Axios.post('/mall/pay/create', params); 
export const addressDefault = params => Axios.post('/mall/address/setdefault', params); 

// 个人中心
export const getMyGoods = params => Axios.get('/mall/goods/mylist', params);


// 订单
export const createOrder = params => Axios.post('/mall/order/create', params);
export const orderInfo = params => Axios.get('/mall/order/info', params); 
export const deleteOrder = params => Axios.get('/mall/order/delete', params); 
export const payPal = params => Axios.get('/mall/pay/create', params); 


// 交易记录

export const orderList = params => Axios.get('/mall/order/getlist', params); 