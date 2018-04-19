// import * as types from './mutation-types';
import { getCampus,getCurrency } from '../api/api';
export default {
    campusAction({ commit }){
        getCampus({}).then((res)=>{
            commit('CampuList_MUTATION',{ list: res.data[1]})
        })
    },
    currencyAction({ commit }){
        getCurrency().then((res)=>{
            commit('Currency_MUTATION',{ list: res.data[1]})
        })
    }
}