<template>
  <div>
    <!-- {{ analytics }} -->
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 mt-4">
          <div v-for="item in 8" :key="item">
            <el-skeleton-item variant="image" style="height: 150px; border-radius: 10px" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 mt-4">
          <statistics-card
            :title="'Total Visits'"
            :percentage="analytics.total_visits.percentage"
            :value="analytics.total_visits.value"
            :percentage_type="analytics.total_visits.percentage_type"
            :filter="analytics.total_visits.filter"
            :hasView="false"
            :hasFilter="true"
          />

          <statistics-card
            :title="'Vendors'"
            :percentage="analytics.vendors.percentage"
            :value="analytics.vendors.value"
            :percentage_type="analytics.vendors.percentage_type"
            :filter="analytics.vendors.filter"
            :hasView="false"
            :hasFilter="true"
          />

          <statistics-card
            :title="'Logistics'"
            :percentage="analytics.logistics.percentage"
            :value="analytics.logistics.value"
            :percentage_type="analytics.logistics.percentage_type"
            :filter="analytics.logistics.filter"
            :hasView="false"
            :hasFilter="true"
          />

          <statistics-card
            :title="'Successful Orders'"
            :percentage="analytics.successful_orders.percentage"
            :value="analytics.successful_orders.value"
            :percentage_type="analytics.successful_orders.percentage_type"
            :filter="analytics.successful_orders.filter"
            :hasView="false"
            :hasFilter="true"
          />

          <statistics-card
            :title="'Total Earnings'"
            :percentage="analytics.total_earnings.percentage"
            :value="analytics.total_earnings.value"
            :percentage_type="analytics.total_earnings.percentage_type"
            :filter="analytics.total_earnings.filter"
            :hasView="true"
            :hasFilter="false"
            linkText="View All Earnings"
            linkIcon="tabler:letter-n"
            iconStyling="text-red-600 bg-red-600/10"
          />

          <statistics-card
            :title="'Orders'"
            :percentage="analytics.orders.percentage"
            :value="analytics.orders.value"
            :percentage_type="analytics.orders.percentage_type"
            :filter="analytics.orders.filter"
            :hasView="true"
            :hasFilter="false"
            linkText="View All Order"
            linkIcon="ion:cart"
            iconStyling="text-green-600 bg-green-600/10"
          />

          <statistics-card
            :title="'Customers'"
            :percentage="analytics.customers.percentage"
            :value="analytics.customers.value"
            :percentage_type="analytics.customers.percentage_type"
            :filter="analytics.customers.filter"
            :hasView="true"
            :hasFilter="false"
            linkText="View All Customers"
            linkIcon="fa-solid:user"
            iconStyling="text-amber-600 bg-amber-600/10"
          />

          <statistics-card
            :title="'Returns'"
            :percentage="analytics.returns.percentage"
            :value="analytics.returns.value"
            :percentage_type="analytics.returns.percentage_type"
            :filter="analytics.returns.filter"
            :hasView="true"
            :hasFilter="false"
            linkText="View all returns"
            linkIcon="ph:link-fill"
            iconStyling="text-blue-600 bg-blue-600/10"
          />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import StatisticsCard from '../Cards/StatisticsCard.vue'
export default {
  components: { StatisticsCard },
  data() {
    return {
      analytics: {},
      loading: false
    }
  },

  methods: {
    getAnalytics() {
      this.loading = true
      this.$dashboard
        .getAnalytics()
        .then((res) => {
          console.log(res)
          this.analytics = res.data
          let allAnalytics = [
            {
              total_visits: {
                value: 8
              }
            }
          ]
          console.log(allAnalytics)
        })
        .finally(() => [(this.loading = false)])
    }
  },

  beforeMount() {
    this.getAnalytics()
  }
}
</script>

<style></style>
