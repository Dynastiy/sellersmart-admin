<template>
  <div>
    <CartHeader :tabs="menu" />
    <div class="mt-4">
        <slot />
        
    </div>
  </div>
</template>

<script>
import CartHeader from '../navigation/headers/cart_header.vue'

export default {
  components: {
    CartHeader
  },

  data() {
    return {
      menu: [
        {
          label: 'Shopping Cart',
          url: '/cart',
          identifier: 'cart'
        },

        {
          label: 'Checkout',
          url: '/checkout',
          identifier: 'checkout'
        },

        {
          label: 'Order Complete',
          url: '/transaction-completed',
          identifier: 'completed'
        }
      ]
    }
  }
}
</script>

<style></style>
