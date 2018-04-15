import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';
import mutations from './mutations';
Vue.use(Vuex);

const state = {
    token:'123',
    school:'',
    userInfo:{
        headimgurl:'123',
        name:'王宗荣',
        sex:1,
        country:'China',
    },
}

const getters = {
    
}

export default new Vuex.Store({
	state,
    actions,
    getters,
	mutations
})