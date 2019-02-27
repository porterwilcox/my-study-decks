import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.js'
import swal from './modules/swal.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    swal
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {
    User(state) {
      return state.auth.user
    }
  }
})