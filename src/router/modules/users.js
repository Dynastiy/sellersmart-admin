
import Customers from '@/modules/App/users/Customers.vue'

const routes = [
  {
    path: '/app/users/customers',
    name: 'customers',
    component: Customers,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      isSubPage: false,
      parent: 'customers',
      name: 'customers',
    }
  },

]

export default routes
