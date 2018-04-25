import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';
import mutations from './mutations';
Vue.use(Vuex);

const state = {
    host:'http://api.dedele.net',
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
    
}

export default new Vuex.Store({
	state,
    actions,
    getters,
	mutations
})