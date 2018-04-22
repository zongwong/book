// import * as types from './mutation-types';
import { getCampus,getCurrency,getInfo,getGoodsList,setInfo,setBankinfo,setassociation } from '../api/api';
export default {
    campusAction({ commit }){
        return new Promise((resolve, reject) => {
            getCampus({}).then((res)=>{
                commit('CampuList_MUTATION',{ list: res.data[1]})
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
                // resolve(res.data)
            })
        }) 
    },
    getBookListData(context, params){
        return new Promise((resolve, reject) => {
            getGoodsList(params).then((res)=>{
                if(res.code==200){
                    resolve(res.data)
                }else{
                    reject(res)
                }
            })
        }) 
    },
    setUserInfo(context, params){
        return new Promise((resolve, reject) => {
            setInfo(params).then((res)=>{
                if(res.code==200){
                    commit('EditUserInfo_MUTATION',{ list: params})
                    resolve(res.data)
                }else{
                    reject(res)
                }
            })
        }) 
    },
    setBank(context, params){
        return new Promise((resolve, reject) => {
            setBankinfo(params).then((res)=>{
                if(res.code==200){
                    resolve(res.data)
                }else{
                    reject(res)
                }
            })
        }) 
    },
    setGroup(context, params){
        return new Promise((resolve, reject) => {
            setassociation(params).then((res)=>{
                if(res.code==200){
                    resolve(res.data)
                }else{
                    reject(res)
                }
            })
        }) 
    },
}