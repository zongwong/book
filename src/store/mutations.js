import * as types from './mutation-types';
// import Vue from 'vue';
export default {
    [types.Login](state, payload){
        state.userInfo = payload.userinfo
        state.token = payload.token
    },
    [types.LoginOut](state, payload){
        state.token = '';
        localStorage.removeItem('token');
        window.location.href = '/';
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
    [types.getUserInfo](state,payload){
        state.userInfo = payload
    },
    [types.EditCard](state, payload){
        
    },
    [types.CampuList](state, payload){
        state.campuList = payload.list
    },
    [types.NowCampu](state, payload){
        state.nowCampu = payload.nowCampu
        localStorage.setItem('nowCampu',JSON.stringify(payload.nowCampu))
    },
    [types.Currency](state, payload){
        state.Currency = payload.list
    },



}