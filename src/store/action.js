import * as types from './mutation-types';
import { setInfo,getCode } from '../api/api';
export default {
    login({ commit }){
        setInfo().then((res)=>{
            commit(types.LOGIN)
        })
    },
    getCode(){
        getCode().then(res =>{
            
        })
    }
}