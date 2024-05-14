<template>
  <div class="bg-white rounded-md p-4 shadow-sm">
    <h4 class="font-semibold uppercase mb-4">
      {{
        cartName !== 'cart'
          ? `Order Summary ( ${cart.length} ${cart.length > 1 ? ' Items' : ' Item'})`
          : 'Cart Totals'
      }}
    </h4>

    <div class="flex flex-col gap-4" v-if="cartName !== 'cart'">
      <div v-for="(item, i) in cart" :key="i" class="flex justify-between">
        <div class="flex gap-2">
          <img
            :src="item.product.app_icon !== null ? imgUrl + item.product.app_icon : defaultCover"
            class="w-[45px] h-[45px] rounded-lg object-cover object-top"
          />
          <span class="flex flex-col">
            <h5 class="font-regular text-sm">{{ item.product.name }}</h5>
            <h6 class="text-gray-400 text-[13px]">{{ `Qty: ${item.quantity}` }}</h6>
          </span>
        </div>

        <span class="font-medium text-[13px]">{{ $currencyFormat(returnTotal(item)) }}</span>
      </div>
    </div>

    <hr class="my-3" v-if="cartName !== 'cart'" />

    <div class="flex flex-col gap-4">
      <span class="flex justify-between">
        <span class="font-semibold text-sm">{{
          'Sub Total' + ` (${cart.length} ${cart.length > 1 ? ' Items' : ' Item'})`
        }}</span>
        <span class="text-sm font-medium">{{ $currencyFormat(subTotal) }}</span>
      </span>
      <span class="flex justify-between">
        <span class="font-semibold text-sm">Shipping</span>
        <span class="text-sm font-medium">
          {{ order !== null ? $currencyFormat(order.newFee) : '---' }}
        </span>
      </span>

      <hr class="" />
      <span class="flex justify-between">
        <span class="font-semibold text-sm">Total</span>
        <span class="text-sm font-semibold">{{ $currencyFormat(totalAmount) }}</span>
      </span>
    </div>

    <div v-if="order !== null">
      <hr class="my-3" />
      <span class="font-semibold text-sm">Payment Options</span>
      <div class="grid lg:grid-cols-3 md:grid-cols-3 mt-1 grid-cols-1 gap-4">
        <span
          class="border-2 flex flex-col gap-1 items-center p-2 rounded-md"
          role="button"
          :class="[item.currency === selectedCurrency ? 'border-primary' : 'border-gray-300']"
          @click="selectOption(item)"
          v-for="(item, idx) in payment_options"
          :key="idx"
        >
          <img class="w-8 h-8" :src="item.image" alt="" />
          <span
            class="text-[12px] font-semibold"
            :class="[item.currency === selectedCurrency ? 'text-primary' : 'text-gray-300']"
            >{{ item.label }}</span
          >
        </span>
      </div>
    </div>

    <!-- <div></div> -->

    <div class="mt-4">
      <button
        v-if="order === null"
        class="brand-btn brand-primary w-full"
        @click="cartFunc"
        :disabled="user.address === null"
        :class="{ 'bg-gray-400': user.address === null }"
      >
        {{ cartName == 'cart' ? 'Proceed to Checkout' : 'Place Order' }}
      </button>
      <div class="flex gap-4" v-else>
        <button
          class="brand-btn brand-primary w-full"
          :disabled="selectedCurrency === null"
          :class="{ 'bg-gray-400': selectedCurrency === null }"
          @click="pay"
        >
          Pay
        </button>
        <button class="brand-btn bg-black3 w-full text-white" @click="deleteOrder">
          Cancel Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import flutterWave from '@/assets/img/fluuterwave-icon.png'
import usdt from '@/assets/img/usdt.png'
export default {
  data() {
    return {
      payment_options: [
        {
          label: 'Naira',
          image: flutterWave,
          currency: 'ngn'
        },
        {
          label: 'USDT',
          image: usdt,
          currency: 'usdt'
        },
        {
          label: 'USD',
          image: flutterWave,
          currency: 'usd'
        }
      ],
      selectedCurrency: null,
      selected: {},
      loading: false,
      order: null,
      ngn_rate: null
    }
  },

  methods: {
    returnTotal(item) {
      let price = item.product.discount ? item.product.discount.price : item.product.price
      var amount = price * item.quantity || 1
      return amount
    },

    pay() {
      const payload = {
        name: `${this.user.first_name} ${this.user.last_name}`,
        email: this.user.email,
        phone: this.user.phone_no,
        description: 'Purchase from Warehauze',
        title: 'Warehauze Purchase',
        order_id: this.order.order.id
      }
      if (this.selectedCurrency == 'ngn') {
        this.payWithFlutterwave(payload)
      }
      if (this.selectedCurrency == 'usd') {
        this.payWithUSD(payload)
      }
      if (this.selectedCurrency == 'usdt') {
        this.payWithUSDT(payload)
      }
    },

    payWithFlutterwave(e) {
      let payload = {
        ...e,
        amount: this.totalAmount
      }
      this.$customer
        .PayWithNGN(payload)
        .then((res) => {
          console.log(res)
          window.open(res.payment, '_blank', 'toolbar=yes,top=300,left=300,width=1000,height=1000')
          // this.$router.push('/transaction-completed')
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    payWithUSDT(e) {
      let payload = {
        ...e,
        amount: (this.totalAmount / this.ngn_rate).toFixed(2)
      }
      let order = JSON.stringify(payload)
      this.$router.push(`hosted/pay-with-crypto?order=${order}`)
    },

    payWithUSD(e) {
      let payload = {
        ...e,
        amount: (this.totalAmount / this.ngn_rate).toFixed(2)
      }
      this.$customer
        .PayWithUSD(payload)
        .then((res) => {
          console.log(res)
          window.open(res.payment, '_blank', 'toolbar=yes,top=300,left=300,width=1000,height=1000')
          // this.$router.push('/transaction-completed')
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    getRate() {
      this.$axios
        .get('https://v6.exchangerate-api.com/v6/a387b020f9479300818443d3/latest/USD')
        .then((res) => {
          console.log(res.data.conversion_rates.NGN)
          this.ngn_rate = res.data.conversion_rates.NGN
        })
        .catch((err) => {
          console.log(err)
        })
    },

    cartFunc() {
      this.cartName === 'cart' ? this.$router.push('/checkout') : this.placeOrder()
    },

    placeOrder() {
      let payload = {
        total_amount: this.totalAmount,
        total_quantity: this.totalQty,
        delivery_address: this.user.address.delivery_address,
        city: this.user.address.city,
        state: this.user.address.state,
        country: this.user.address.country
      }
      this.$customer.placeOrder(payload).then((res) => {
        console.log(res)
        this.order = res
      })
    },

    deleteOrder() {
      this.$customer.removeOrder(this.order.order.id).finally(() => {
        this.loading = false
      })
    },

    selectOption(e) {
      this.selectedCurrency =
        this.selectedCurrency === null
          ? e.currency
          : this.selectedCurrency !== e.currency
            ? e.currency
            : null
    }
  },

  beforeMount() {
    this.getRate()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },

    cart() {
      let cartItems = this.user.cart
      let filteredCart = cartItems.filter((item) => item.product !== null)
      return filteredCart
    },

    cartName() {
      return this.$route.meta.name
    },

    totalAmount() {
      let total = this.order !== null ? this.subTotal + this.order.newFee : this.subTotal
      return total
    },

    totalQty() {
      const cartItem = this.cart
      const totalPrice = cartItem.reduce((accumulator, item) => {
        return accumulator + item.quantity
      }, 0)
      return totalPrice
    },

    subTotal() {
      const cartItem = this.cart
      const totalPrice = cartItem.reduce((accumulator, item) => {
        if (item.product.discount === null) {
          return accumulator + item.quantity * item.product.price
        } else {
          return accumulator + item.quantity * item.product.discount.price
        }
      }, 0)
      return totalPrice
    }
  }
}
</script>

<style></style>
