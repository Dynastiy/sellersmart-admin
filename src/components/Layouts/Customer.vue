<template>
  <div>
    <div class="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-6 lg:items-start md:items-start">
      <div>
        <UserDrawer :tabs="menuItems" />
      </div>
      <div class="lg:col-span-2 md:col-span-2 bg-white p-8 rounded-md">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import UserDrawer from '../navigation/UserDrawer.vue'

export default {
  components: {
    UserDrawer
  },

  data() {
    return {
      menuItems: [
        {
          label: 'My Account',
          icon: 'lucide:user-round',
          url: '/user',
          identifier: 'user'
        },

        {
          label: 'Orders',
          icon: 'lets-icons:order',
          url: '/user/history',
          identifier: 'history'
        },

        {
          label: 'Wishlist',
          icon: 'bi:heart',
          url: '/user/wishlist',
          identifier: 'wishlist'
        },

        {
          label: 'Vendor Applications',
          icon: 'basil:document-outline',
          url: '/user/vendor-applications',
          identifier: 'vendor-applications'
        }
      ]
    }
  },

  methods: {
    getUser() {
      this.$auth
        .getProfile()
        .then((res) => {
          console.log(res)
          this.$store.commit('auth/setUser', res.user)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },

  beforeMount() {
    this.getUser()
    const user = this.$store.getters['auth/getUser']
    if (user.role === 'vendor') {
      this.$router.push('/vendor/dashboard')
    }
  }
}
</script>

<style></style>
