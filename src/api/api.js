import Axios from '../utils/http';

//登录
//图形验证码
export const getCaptcha = params => Axios.get('/token/captcha', params);
//短信验证码
export const getCode = params => Axios.get('/token/getcode', params);
// 登录
export const toLogin = params => Axios.post('/token/create', params);
export const googleToken= params => Axios.post('/token/google', params);
//校区列表
export const getCampus = params => Axios.get('/campus/getlist', params);

// 货币列表
export const getCurrency = params => Axios.get('/currency/getlist', params);


// 首页

export const indexList = params => Axios.get('/recommend/getlist', params);


//个人资料
export const getUserInfo = params => Axios.get('/user/info', params);
export const setNickname = params => Axios.post('/set/nickname', params);
export const setPasswd = params => Axios.post('/set/passwd', params);
export const getInfo = params => Axios.get('/set/getinfo', params);
export const setInfo = params => Axios.post('/set/personalinfo', params);
export const setBankinfo = params => Axios.post('/set/bankinfo', params);
export const setassociation = params => Axios.post('/association/create', params);
// export const aa = params => Axios.get('/mall/goods/getlist', params);

// 二手商品
export const getGoodsList = params => Axios.get('/mall/goods/getlist', params);
export const getGoodsInfo = params => Axios.get('/mall/goods/info', params);
export const publishGoods = (params,config) => Axios.post('/mall/goods/publish', params, config);
export const delGoods = params => Axios.get('/mall/goods/delete', params);
export const searchGoods = params => Axios.get('/mall/goods/search', params);


// 租赁

export const getLeaseList = params => Axios.get('/lease/getlist', params);
export const getLeaseInfo = params => Axios.get('/lease/info', params);
export const publishLease = params => Axios.post('/lease/create', params);
export const leaseCommentList = params => Axios.get('/lease/comment/getlist', params);
export const leaseCommentCreate = params => Axios.post('/lease/comment/create', params);
export const myLeaseList = params => Axios.get('/lease/mylist', params);
export const leaseZan = params => Axios.get('/lease/thumbup', params);
export const leaseUnZan = params => Axios.get('/lease/unthumbup', params);
export const delLease = params => Axios.get('/lease/delete', params);


// 社团
export const getgroupList = params => Axios.get('/association/getlist', params);
export const getgroupInfo = params => Axios.get('/association/info', params);


// 社团 帖子
export const groupPostList = params => Axios.get('/association/post/getlist', params);
export const groupCommentList = params => Axios.get('/association/comment/getlist', params);
export const groupCommentCreate = params => Axios.post('/association/comment/create', params);
export const getPostInfo = params => Axios.get('/association/post/info', params);
export const groupPostZan = params => Axios.get('/association/post/thumbup', params);
export const groupPostUnZan = params => Axios.get('/association/post/unthumbup', params);
export const delgroupPost = params => Axios.get('/association/post/delete', params);
export const myPostList = params => Axios.get('/association/post/mylist', params);
export const myGroupList = params => Axios.get('/association/mylist', params);
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
export const payPal = params => Axios.post('/mall/pay/create', params); 

export const applyRefund = params => Axios.get('/mall/refund/apply', params); 
export const sendDeliver = params => Axios.post('/mall/deliver/create', params); 
export const confirmDeliver = params => Axios.post('/mall/deliver/confirm', params); 
export const delOrder = params => Axios.get('/mall/order/delete', params); 
export const orderEvaluate = params => Axios.post('/mall/evaluate/create', params); 
export const evaluateList = params => Axios.get('/mall/evaluate/history', params);

// 交易记录
export const salelist = params => Axios.get('/mall/order/salelist', params); 
export const consumelist = params => Axios.get('/mall/order/consumelist', params); 

// 我的钱包
export const wallet = params => Axios.get('/wallet/balance', params); 
export const walletList = params => Axios.get('/wallet/cashflow', params); 
export const walletApply= params => Axios.get('/wallet/withdraw', params);
