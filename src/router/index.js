import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Auth from './modules/auth'

import Dashboard from './modules/dashboard'
import Users from './modules/users'
import Products from './modules/products'

// Error Page
import PageNotFound from '../modules/ErrorPages/Error404Page.vue'

const baseRoutes = [
  // Route for Page Not found
  { path: '/:pathMatch(.*)', component: PageNotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: baseRoutes.concat(Auth, Dashboard, Users, Products),
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters['auth/getAuthenticated']
  if (to.meta.requiresAuth) {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
