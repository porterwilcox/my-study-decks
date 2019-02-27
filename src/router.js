import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store/index.js'

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
    }
  ]
})

let publicRoutes = ["home", "about"]

router.beforeEach((to, from, next) => {
  if (!publicRoutes.includes(to.name)) {
    if (!Store.getters.User.uid) {
      Store.dispatch('toast', {title: "Unauthorized", text: "Please, Sign In or Sign Up.", type: 'error', timer: 2000})
      if(!publicRoutes.includes(from.name)) {
        return router.push({name: 'home'})
      }
      return next(false)
    }
  }
  next()
})

export default router