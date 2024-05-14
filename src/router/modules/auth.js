import Login from '@/modules/Auth/login.vue'
import Register from '@/modules/Auth/register.vue'

import ForgotPassword from '@/modules/Auth/ForgotPassword.vue'
import ResetPassword from '@/modules/Auth/ResetPassword.vue'

import VerifyEmail from '@/modules/Auth/verify.vue'
import LinkSent from '@/modules/Auth/LinkSent.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

  {
    path: '/auth/reset-link-sent',
    name: 'reset-link-sent',
    component: LinkSent,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

 

  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  },

  {
    path: '/verify-email',
    name: 'verify-email',
    component: VerifyEmail,
    meta: {
      layout: 'Auth',
      requiresAuth: false
    }
  }
]

export default routes
