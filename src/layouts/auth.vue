<template>
  <div class="lg:p-4 lg:bg-primaryLight md:bg-primaryLight auth md:p-4 bg-white flex overflow-y-auto justify-center items-center min-h-screen">
    <div class="bg-white lg:w-5/12 md:w-6/12 w-full shadow-sm rounded-lg">
      <div class="py-8 px-8">
        <slot />
      </div>
     
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    routeName(){
      return this.$route.name
    }
  }
}
</script>

<style>
</style>
