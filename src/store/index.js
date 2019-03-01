import Vue from 'vue'
import Vuex from 'vuex'
import SwalConfigs from '../utils/swal-configs.js'
import auth from './modules/auth.js'
import studyDecks from './modules/decks.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    studyDecks
  },
  state: {
    decks: []
  },
  mutations: {
    ...studyDecks.mutations
  },
  actions: {
    toast({ }, payload) {
      SwalConfigs.toast(payload.title, payload.text, payload.type, payload.timer)
    },
    confirm({ }, payload) {
      return SwalConfigs.confirm(payload.title, payload.text, payload.type, payload.confirm, payload.cancel)
    }
  },
  getters: {
    User(state) {
      return state.auth.user
    }
  }
})