<template>
  <div>
    <div class="flex items-center justify-between">
      <h4 class="font-semibold text-xl">Admins</h4>
      <button @click="$router.push('/app/users/admin/create')" class="brand-btn brand-primary">Add Admin</button>
    </div>

    <div class="flex gap-4 mt-4">
        <div class="bg-white shadow-sm rounded-md p-6 w-full flex flex-col gap-2" v-for="(value, name) in admin" :key="name">
            <h1 class="text-3xl font-semibold">{{ value }}</h1>
            <span class="text-sm">{{ name }}</span>
        </div>
    </div>

    <!--Customers Table  -->
    <div class="bg-white p-4 rounded-xl shadow-sm mt-4">
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
        { field: 'status', header: 'Role' },
        { field: 'last_login', header: 'Last Login' },
        { field: 'tableBtn', header: 'Actions' }
      ],
      items: [],
      busy: false,
      admin: {}
    }
  },

  methods: {
    list(page = 1) {
      this.$users.getAdmins(page).then((res) => {
        console.log(res)
        this.items = res.data
      })
    },

    analytics() {
      this.$users.adminAnalytics().then((res) => {
        console.log(res)
        this.admin = res.data
        // this.items = res.data
      })
    }
  },

  beforeMount() {
    this.list()
    this.analytics()
  },

  computed: {
    // admin() {
    //   let obj = {
    //     active: 1,
    //     suspended: 0,
    //     banned: 0,
    //     trashed: 0
    //   }
    //   return obj
    // }
  }
}
</script>

<style></style>
