<template>
  <div class="">
    
    <!-- <top-header :menu="menu" class="lg:hidden md:hidden sticky top-0 block" /> -->
    <div class="lg:block md:block hidden">
      <app-drawer :menu="menu" />
    </div>
    <div id="main" class="lg:ml-[300px] md:ml-[300px]">
      <app-header class="lg:block md:block hidden" :menu="menu" />
      <div class="pb-28 px-5 mt-6">
        <div v-if="isSubPage" class="flex items-center gap-2 mb-4">
          <span class="back-button bg-gray-100" role="button" @click="$router.go(-1)">
            <i-icon icon="ic:baseline-arrow-back" width="20px" />
          </span>

          <div>
            <small class="font-light text-xs block">Go Back</small>
            <h6 class="mb-0 text-sm font-semibold capitalize" style="font-weight: 500">
              {{ subRouteName }}
            </h6>
          </div>
        </div>
        <!-- <div>
          <span v-if="">
            {{ routeName }}
          </span>
        </div> -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import AppDrawer from '@/components/navigation/AppDrawer.vue'
import AppHeader from '@/components/navigation/AppHeader.vue'
// import TopHeader from '@/components/navigation/TopHeader.vue'
export default {
  components: {
    AppDrawer,
    AppHeader
    // TopHeader
  },
  name: 'DashboardLayout',
  data() {
    return {
      menu: [
        {
          title: 'Dashboard',
          icon: 'majesticons:home',
          url: '/app/dashboard',
          parent: 'dashboard'
        },
        {
          title: 'Users',
          icon: 'majesticons:home',
          url: '/app/users',
          parent: 'users',
          hasChildren: true,
          children: [
            { title: 'Customers', to: '/app/users/customers' },
            { title: 'Vendors', to: '/app/users/vendor' },
            { title: 'Logistics', to: '/app/users/logistics' },
            { title: 'Admin', to: '/app/users/admin' }
          ]
        },
        {
          title: 'Products',
          icon: 'majesticons:home',
          url: '/app/products',
          parent: 'products',
          hasChildren: true,
          children: [
            { title: 'Product List', to: '/app/products/product-list' },
            { title: 'Categories', to: '/app/products/categories' },
          ]
        },
        {
          title: 'Orders',
          icon: 'majesticons:home',
          url: '/app/orders',
          parent: 'orders'
        },
        {
          title: 'Payment',
          icon: 'majesticons:home',
          url: '/app/payment',
          parent: 'payment'
        },
        {
          title: 'Chat',
          icon: 'majesticons:home',
          url: '/app/chat',
          parent: 'chat'
        },
        {
          title: 'Advert',
          icon: 'majesticons:home',
          url: '/app/advert',
          parent: 'advert'
        },
        {
          title: 'Newsletter',
          icon: 'majesticons:home',
          url: '/app/newsletter',
          parent: 'newsletter',
          hasChildren: true,
          children: [
            { title: 'Compose', to: '/app/newsletter/compose' },
            { title: 'Sent', to: '/app/newsletter/sent' },
            { title: 'Important', to: '/app/newsletter/important' },
            { title: 'Trash', to: '/app/newsletter/trash' }
          ]
        },
        {
          title: 'Support Center',
          icon: 'majesticons:home',
          url: '/app/support-center',
          parent: 'support-center'
        }
      ]
    }
  },

  computed: {
    routeName() {
      return this.$route.meta.name
    },

    routeParent() {
      return this.$route.meta.header
    },

    user() {
      return this.$store.getters['auth/getUser']
    },

    isSubPage() {
      return this.$route.meta.isSubPage
    },

    subRouteName() {
      return this.$route.meta.subName
    }
  }
}
</script>

<style></style>
