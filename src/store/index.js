import Vue from 'vue';
import Vuex from 'vuex';
import actions from './action';
import mutations from './mutations';
Vue.use(Vuex);

const state = {
    hello:1,
    token:1,
}

const getters = {

}

export default new Vuex.Store({
	state,
    actions,
    getters,
	mutations
})