import Dashboard from '@/modules/App/Index.vue'

const routes = [
  {
    path: '/app/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      isSubPage: false,
      parent: 'dashboard',
      name: 'dashboard',
    }
  },

]

export default routes
