import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store/index.js'
import firebase from "./utils/firebase-init";

const _auth = firebase.auth

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: function () { 
        return import('./views/About.vue')
      }
    },
    {
      path: '/create',
      name: 'create',
      component: function () { 
        return import('./views/Create.vue')
      }
    },
    {
      path: '/study/deck:deckId',
      name: 'study',
      component: function () { 
        return import('./views/Study.vue')
      }
    }
  ]
})

// TODO
// smart handling of private/public route, study, based on deck prop, specifically when accessing from third party site

let publicRoutes = ["home", "about", "study"]

let signedIn = () => _auth.currentUser != undefined

//binary signedIn?
router.beforeEach((to, from, next) => {
  if (!publicRoutes.includes(to.name)) {
    if (!signedIn() || !_auth.currentUser.emailVerified) {
      Store.dispatch('toast', {title: "Unauthorized", text: !signedIn() ? "Please, Sign In or Sign Up." : "Please, Verify your Email Address.", type: 'error', timer: 2000})
      if(!publicRoutes.includes(from.name)) {
        return router.push({name: 'home'})
      }
      return next(false)
    }
  }
  next()
})

export default router