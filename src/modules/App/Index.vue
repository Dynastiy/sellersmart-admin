<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="text-xl font-bold">{{ greeting }}</h1>
      <h6 class="text-sm text-gray-400">Here's what is happening today</h6>
    </div>

    <analytics />
    <sales-by-location />
    <best-selling-products />
  </div>
</template>

<script>
import Analytics from '@/components/Dashboard/Analytics.vue'
import SalesByLocation from '@/components/Dashboard/SalesByLocation.vue'
import BestSellingProducts from '@/components/Dashboard/BestSellingProducts.vue'
export default {
  components: { Analytics, SalesByLocation, BestSellingProducts },
  computed: {
    greeting() {
      let currentTime = new Date()
      const currentHour = currentTime.getHours()
      let greetingMessage = ''

      if (currentHour < 12) {
        greetingMessage = `Good Morning! ${this.user.fullname}`
      } else if (currentHour > 12 || currentHour < 18) {
        greetingMessage = `Good Afternoon! ${this.user.fullname}`
      } else {
        greetingMessage = `Good Evening! ${this.user.fullname}`
      }

      return greetingMessage
    },
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
