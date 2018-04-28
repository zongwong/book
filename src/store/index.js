import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';
import mutations from './mutations';
import headfilter from '../utils/tools';
Vue.use(Vuex);

const state = {
    host:'http://api.risuntechs.com',
    token: localStorage.getItem('token')||'',
    school:'',
    userInfo:{
        // user_id: '',
        // name:'',
        // nickname: '',
        // sex: '',
        // country: '',
        // mobilephone: '',
        // passwd: '',
        // headimgurl: '',
    },
    cardInfo:{

    },
    associationInfo:{

    },
    campuList:[],
    nowCampu:JSON.parse(localStorage.getItem('nowCampu'))||'',
    Currency:[]
}

const getters = {
    headimgurl(state, getters){
        return headfilter(state.userInfo.headimgurl);
    }
}

export default new Vuex.Store({
	state,
    actions,
    getters,
	mutations
})