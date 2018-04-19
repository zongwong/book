import * as types from './mutation-types';
// import { setInfo,getCode } from '../api/api';
export default {
    [types.Login](state, payload){
        state.userInfo = payload
    },
    [types.EditName](state, payload){
        state.nickname = payload.nickname
    },
    [types.EditUserInfo](state, payload){
        state.name = payload.name
        state.nickname = payload.nickname
        state.sex = payload.sex
        state.country = payload.country
        state.mobilephone = payload.mobilephone
        state.headimgurl = payload.headimgurl
    },
    [types.EditCard](state, payload){
        
    },
    [types.CampuList](state, payload){
        state.campuList = payload.list
    },
    [types.NowCampu](state, payload){
        state.nowCampu = payload.nowCampu
    },
    [types.Currency](state, payload){
        state.Currency = payload.list
    },



}