<template>
  <div>
    <h4 class="font-semibold">Account Information</h4>
    <!-- <div>
      {{ user }}
    </div> -->
    <form action="" @submit.prevent="onSubmit">
      <fieldset class="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-3">
        <div>
          <label for="">First Name</label>
          <input type="text" class="input" v-model="form.first_name" />
        </div>

        <div>
          <label for="">Last Name</label>
          <input type="text" class="input" v-model="form.last_name"/>
        </div>

        <div>
          <label for="">Phone Number</label>
          <input type="tel" class="input" v-model="form.phone_no" />
        </div>

        <div>
          <label for="">Date of Birth</label>
          <input type="date" class="input" v-model="form.dob" />
        </div>

        <div class="">
          <label for="">Country</label>
          <input type="text" class="input" readonly v-model="form.country" />
        </div>

        <div>
          <label for="">State</label>
          <input type="text" class="input" v-model="form.city" />
        </div>

        <!-- <div>
          <label for="">City</label>
          <input type="text" class="input" v-model="form.city" />
        </div> -->

        <!-- <div class="lg:col-span-2 md:col-span-2">
          <label for="">Addresss</label>
          <textarea name="" class="input" id="" cols="30" rows="4"></textarea>
        </div> -->
      </fieldset>
      <button
        class="brand-btn w-full mt-4"
        :disabled="isLoading"
        :class="[isLoading ? 'bg-gray400 text-gray600' : 'brand-primary']"
      >
        Update Profile
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        phone_no: '',
        dob: '',
        // address: '',
        city: '',
        state: '',
        country: 'Nigeria'
      },
      isLoading: false
    }
  },

  methods: {
    getUser() {
      this.$auth
        .getProfile()
        .then((res) => {
          console.log(res)
          this.$store.commit('auth/setUser', res.user)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    onSubmit() {
      this.$auth
        .updateProfile(this.form)
        .then((res) => {
          console.log(res)
          this.getUser()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },

  watch: {
    user: {
      handler(val) {
        console.log(val)
        this.form.first_name = val.first_name;
        this.form.last_name = val.last_name;
        this.form.phone_no = val.phone_no;
        this.form.dob = val.dob;
        this.form.address = val.address;
        this.form.city = val.city;
        this.form.state = val.state;
      },
      immediate: true
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
