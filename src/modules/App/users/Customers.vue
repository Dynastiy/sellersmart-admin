<template>
  <div>
    <div class="flex items-center justify-between">
      <h4 class="font-semibold text-xl">Customers</h4>
      <button class="brand-btn brand-primary">Add Customer</button>
    </div>

    <!--Customers Table  -->
    <div class="bg-white p-4 rounded-xl shadow-sm mt-3">
      <wxTable :columns="columns" :items="items" :busy="busy"> </wxTable>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { field: 'fullname', header: 'Name' },
        { field: 'email', header: 'Email' },
        { field: 'total_orders', header: 'Total Orders' },
        { field: 'registered', header: 'Registered' },
        { field: 'tableBtn', header: 'Actions' }
      ],
      items: [],
      busy: false
    }
  },

  methods: {
    list(page = 1) {
      this.$users.getCustomers(page).then((res) => {
        console.log(res)
        this.items = res.data
      })
    }
  },

  beforeMount() {
    this.list()
  }
}
</script>

<style></style>
