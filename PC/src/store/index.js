import Vue from 'vue'
import Vuex from 'vuex'
import State from './state'
import * as Mutations from './mutations'
import * as Actions from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:State,
  mutations:Mutations,
  actions:Actions
});

export default store;
