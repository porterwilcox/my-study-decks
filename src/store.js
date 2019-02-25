import Vue from 'vue'
import Vuex from 'vuex'
import fireApp from './utils/firebase-init.js'
import Swal from 'sweetalert2'

const _db = fireApp.firestore
const _auth = fireApp.auth

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    login({ commit }, payload) {
      _auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit('setUser', res.user)
          router.push({ name: 'home' })
        })
        .catch(e => console.error(e))
    },
    swalTest({}) {
      Swal.fire({
        title: "super cool",
        text: "\nyou pressed the button",
        showConfirmButton: false,
        timer: 1500,
        position: 'top-right',
        type: 'success',
        toast: true,
        target: document.querySelector('#swal-target')
      })
    }
  }
})
