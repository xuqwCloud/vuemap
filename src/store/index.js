import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    view: '',
};

const getters = {
    getView() {
        return state.view;
    },
};

const mutations = {
    setView(state, value) {
        state.view = value;
    },
};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
});

export default store;
