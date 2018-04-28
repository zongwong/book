// import * as types from './mutation-types';
import { getCampus,getCurrency,getInfo,getGoodsList,setInfo,setBankinfo,setassociation } from '../api/api';
export default {
    campusAction({ commit }){
        return new Promise((resolve, reject) => {
            getCampus({}).then((res)=>{
                commit('CampuList_MUTATION',{ list: res.data.campuslist})
                resolve(res.data)
            })
        }) 
    },
    currencyAction({ commit }){
        getCurrency().then((res)=>{
            commit('Currency_MUTATION',{ list: res.data[1]})
        })
    },                                      
    userInfoAction({ commit }){
        return new Promise((resolve, reject) => {
            getInfo().then((res)=>{
                commit('getUserInfo_MUTATION',res.data.userinfo)
            })
        }) 
    },
    getBookListData({commit}, params){
        return new Promise((resolve, reject) => {
            getGoodsList(params).then((res)=>{
                if(res.code==200){
                    resolve(res)
                }else{
                    reject(res)
                }
            })
        }) 
    },
    setUserInfo({commit}, params){
        return new Promise((resolve, reject) => {
            setInfo(params).then((res)=>{
                if(res.code==200){
                    console.log(params)
                    commit('EditUserInfo_MUTATION',params)
                    resolve(res)
                }else{
                    reject(res)
                }
            })
        }) 
    },
    setBank({commit}, params){
        console.log(params)
        return new Promise((resolve, reject) => {
            setBankinfo(params).then((res)=>{
                if(res.code==200){
                    resolve(res)
                }else{
                    reject(res)
                }
            })
        }) 
    },
    setGroup({commit}, params){
        return new Promise((resolve, reject) => {
            setassociation(params).then((res)=>{
                if(res.code==200){
                    resolve(res)
                }else{
                    reject(res)
                }
            })
        }) 
    },
}