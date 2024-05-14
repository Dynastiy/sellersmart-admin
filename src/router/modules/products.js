
import ProductsList from '@/modules/App/products/ProductsList.vue'

const routes = [
  {
    path: '/app/products/product-list',
    name: 'product-list',
    component: ProductsList,
    meta: {
      layout: 'Dashboard',
      requiresAuth: true,
      isSubPage: false,
      parent: 'product-list',
      name: 'product-list',
    }
  },

]

export default routes
