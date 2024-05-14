<template>
    <div>
      <!-- Products Table  -->
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
          { field: 'productName', header: 'Product' },
          { field: 'stock', header: 'Stock' },
          { field: 'selling_price', header: 'Price' },
          { field: 'orders', header: 'Orders' },
          { field: 'status', header: 'Status' },
          { field: 'rating', header: 'Rating' },
          { field: 'published', header: 'Published' },
          { field: 'tableBtn', header: 'Actions' }
        ],
        items: [],
        busy: false
      }
    },
  
    methods: {
      list() {
        this.$product.getProducts().then((res) => {
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
  