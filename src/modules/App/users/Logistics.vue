<template>
    <div>
      <div class="flex items-center justify-between">
        <h4 class="font-semibold text-xl">Admins</h4>
        <button class="brand-btn brand-primary">Add Admin</button>
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
          { field: 'status', header: 'Role' },
          { field: 'date_registered', header: 'Last Login' },
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
  