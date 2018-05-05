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
    campuList:[{
        campus_id:"",
        campus_name:"全部",
        eng_name:"All",
        summary:"",
    }],
    nowCampu:JSON.parse(localStorage.getItem('nowCampu'))||'',
    Currency:[],
    lang:localStorage.getItem('lang')||'zh'
}

const getters = {
    headimgurl(state, getters){
        return headfilter(state.userInfo.headimgurl);
    },
    campuList(state, getters){
        return state.campuList.slice(1);
    }
}

export default new Vuex.Store({
	state,
    actions,
    getters,
	mutations
})