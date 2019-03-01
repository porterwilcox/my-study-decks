import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './registerServiceWorker'
import firebase from './utils/firebase-init.js'

const _auth = firebase.auth

Vue.config.productionTip = false

_auth.onAuthStateChanged(user => {
  new Vue({
    router,
    store,
    created() {
      this.$store.dispatch('auth/setUser', user)
      this.$store.dispatch('getDecks')
    },
    render: function (h) { return h(App) }
  }).$mount('#app')
})