<template>
    <div>
      <div class="flex items-center justify-between">
        <h4 class="font-semibold text-xl">Vendors</h4>
        <!-- <button class="brand-btn brand-primary">Add Vendor</button> -->
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
          { field: 'vendorName', header: 'Name' },
          { field: 'email', header: 'Email' },
          { field: 'status', header: 'Status' },
          { field: 'date_registered', header: 'Registered' },
          { field: 'tableBtn', header: 'Actions' }
        ],
        items: [],
        busy: false
      }
    },
  
    methods: {
      list(page = 1) {
        this.$users.getVendors(page).then((res) => {
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
  