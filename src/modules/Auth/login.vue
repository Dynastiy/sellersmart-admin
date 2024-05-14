<template>
  <div class="">
    <div class="flex flex-col items-center">
      <h3 class="lg:text-3xl md:text-3xl text-xl font-bold mb-0">Welcome!</h3>
      <span class="text-sm block font-regular text-gray-400">Sign in to continue</span>
    </div>

    <vForm @submit="onSubmit" v-slot="{ meta }" class="flex flex-col gap-2 mt-4">
      <div>
        <label for="">Email</label>
        <vField name="email" class="input" placeholder="Email" type="email" rules="email" />
        <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
      </div>

      <div>
        <label for="">Password</label>
        <vField name="password" v-slot="{ field }" rules="password">
          <div class="input-field">
            <input
              :type="typePassword ? 'password' : 'text'"
              name="password"
              id="password"
              placeholder="Password"
              v-bind="field"
            />
            <span class="password-iccon" role="button" @click="typePassword = !typePassword">
              <i-icon
                :icon="typePassword ? 'tabler:eye' : 'gridicons:not-visible'"
                class="form-icon"
              />
            </span>
          </div>
        </vField>
        <ErrorMessage name="password" class="text-xs text-error"></ErrorMessage>
      </div>

      <div class="text-right">
        <router-link class="text-[13px] font-semibold text-primary underline" to="/forgot-password"
          >Forgot Password?</router-link
        >
      </div>

      <div class="text-center mt-3">
        <wxButton :isLoading="isLoading" :isDisabled="isLoading" :formMeta="meta.valid">
          Login
        </wxButton>
      </div>
    </vForm>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      typePassword: true,
      isLoading: false,
      validationErrors: {}
    }
  },

  methods: {
    async onSubmit(values) {
      this.isLoading = true
      const captcha = await grecaptcha.enterprise.execute(this.config.captchaKey, {
        action: 'LOGIN'
      })
      let payload = {
        ...values,
        recaptcha: captcha
      }
      this.$auth
        .login(payload)
        .then((res) => {
          console.log(res)
          let userData = res.data
          let token = res.extra.token
          this.$store.commit('auth/login', {
            user: userData,
            token
          })
          this.$router.push('/app/dashboard')
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },

  mounted() {
    const siteKey = import.meta.env.VITE_APP_SITE_KEY
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }
}
</script>
