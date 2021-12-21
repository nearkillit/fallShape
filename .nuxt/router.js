import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _654705f0 = () => interopDefault(import('../pages/Game.vue' /* webpackChunkName: "pages/Game" */))
const _b7d8fc4a = () => interopDefault(import('../pages/Login.vue' /* webpackChunkName: "pages/Login" */))
const _2ab6a696 = () => interopDefault(import('../pages/Signup.vue' /* webpackChunkName: "pages/Signup" */))
const _62f9bee4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Game",
    component: _654705f0,
    name: "Game"
  }, {
    path: "/Login",
    component: _b7d8fc4a,
    name: "Login"
  }, {
    path: "/Signup",
    component: _2ab6a696,
    name: "Signup"
  }, {
    path: "/",
    component: _62f9bee4,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
