import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';
import mutations from './mutations';
Vue.use(Vuex);

const state = {
    token:'c2cf19827f84348c3f65e75325f37ddc',
    school:'',
    userInfo:{
        user_id: 3,
        name:'王宗荣',
        nickname: '',
        sex: 3,
        country: '中国',
        mobilephone: 17605952442,
        passwd: 12,
        headimgurl: 123,
        status: 1,
        created_at: 1523966552,
        updated_at: 1523966552,
        deleted_at: null
    },
    campuList:[],
    nowCampu:{},
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