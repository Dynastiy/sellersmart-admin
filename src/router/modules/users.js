
import Customers from '@/modules/App/users/Customers.vue'
import Vendors from '@/modules/App/users/Vendors.vue'
import Admins from '@/modules/App/users/Admins.vue'
import CreateAdmin from '@/modules/App/users/admins/create.vue'
import Logistics from '@/modules/App/users/Logistics.vue'

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

  {
    path: '/app/users/vendors',
    name: 'vendors',
    component: Vendors,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      isSubPage: false,
      parent: 'vendors',
      name: 'vendors',
    }
  },

  {
    path: '/app/users/admin',
    name: 'admin',
    component: Admins,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      isSubPage: false,
      parent: 'admin',
      name: 'admin',
    }
  },

  {
    path: '/app/users/admin/create',
    name: 'create-admin',
    component: CreateAdmin,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      isSubPage: false,
      parent: 'admin',
      name: 'admin',
    }
  },

  {
    path: '/app/users/logistics',
    name: 'logistics',
    component: Logistics,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      isSubPage: false,
      parent: 'logistics',
      name: 'logistics',
    }
  },
]

export default routes
