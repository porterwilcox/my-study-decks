import Vue from 'vue'
import Vuex from 'vuex'
import fireApp from './utils/firebase-init.js'
import SwalConfigs from './utils/swal-configs.js'
import { resolve } from 'url';

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
      return _auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit('setUser', res.user)
          SwalConfigs.toast('Welcome back, ' + res.user.displayName, '', 'success')          
          return true
        })
        .catch(e => {
          console.error(e)
          throw new Error("Email and/or Password is incorrect.")
        })
    },
    register({ dispatch }, payload) {
      _auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          _auth.currentUser.updateProfile({ displayName: payload.username })
          dispatch('validateEmail')
        })
    },
    validateEmail({ }) {
      _auth.currentUser.sendEmailVerification({
        url: 'http://localhost:8080/'
      })
        .then(() => {
          SwalConfigs.toast('Account Created!', 'Verification email has been sent.', 'success')
        })
    },
    swalTest({}) {
      SwalConfigs.toast("Noice", "you pressed the button", "success")
    }
  },
  getters: {
    IsUniqueEmail: () => (email) => {
      return _auth.fetchSignInMethodsForEmail(email)
        .then(res => {
          console.log('this is the res', res)
          if (res.length) throw new Error('This email is already in use.')
          return true
        })
    }
  }
})
