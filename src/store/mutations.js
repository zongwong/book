import * as types from './mutation-types';
import Vue from 'vue';
export default {
    [types.Login](state, payload){
        state.userInfo = payload.userinfo
        state.token = payload.token
    },
    [types.LoginOut](state, payload){
        state.token = '';
        // localStorage.removeItem('token');

        localStorage.clear();
        window.location.href='/login';
    },
    [types.EditName](state, payload){
        state.userInfo.nickname = payload.nickname;
        localStorage.setItem('nickname',payload.nickname);
    },
    [types.EditUserInfo](state, payload){
        state.userInfo.name = payload.name
        state.userInfo.graduate_school = payload.graduate_school
        state.userInfo.sex = payload.sex
        state.userInfo.country = payload.country
        state.userInfo.mobilephone = payload.mobilephone
        state.userInfo.headimgurl = payload.headimgurl
        localStorage.setItem('graduate_school',payload.graduate_school);
        
    },
    [types.getUserInfo](state,payload){
        state.userInfo = payload
    },
    [types.EditCard](state, payload){
        
    },
    [types.CampuList](state, payload){
        state.campuList = state.campuList.concat(payload.list);
    },
    [types.NowCampu](state, payload){
        state.nowCampu = payload.nowCampu
        localStorage.setItem('nowCampu',JSON.stringify(payload.nowCampu))
    },
    [types.Currency](state, payload){
        state.Currency = payload.list
    },
    [types.Lang](state, payload){
        state.lang = payload.lang
    }


}