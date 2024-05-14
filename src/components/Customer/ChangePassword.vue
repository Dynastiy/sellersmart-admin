<template>
  <div>
    <h4 class="font-semibold">Change Password</h4>

    <vForm @submit="onSubmit" v-slot="{ meta }" class="flex flex-col gap-2 mt-2">
      <div>
        <label for="">Old Password</label>
        <vField
          name="old_password"
          class="input"
          placeholder="old password"
          type="text"
          rules="required"
        />
        <ErrorMessage name="old_password" class="text-xs text-error"></ErrorMessage>
      </div>

      <div>
        <label for="">New Password</label>
        <vField name="new_password" v-slot="{ field }" rules="required">
          <div class="input-field">
            <input
              :type="typePassword ? 'password' : 'text'"
              name="new_password"
              id="new_password"
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
        <ErrorMessage name="new_password" class="text-xs text-error"></ErrorMessage>
      </div>

      <div>
        <label for="">Confirm Password</label>
        <vField name="new_password_confirmation" v-slot="{ field }" rules="required">
          <div class="input-field">
            <input
              :type="typePassword2 ? 'password' : 'text'"
              name="new_password_confirmation"
              id="confirm_new_password"
              placeholder="Password"
              v-bind="field"
            />
            <span class="password-iccon" role="button" @click="typePassword2 = !typePassword2">
              <i-icon
                :icon="typePassword2 ? 'tabler:eye' : 'gridicons:not-visible'"
                class="form-icon"
              />
            </span>
          </div>
        </vField>
        <ErrorMessage name="new_password_confirmation" class="text-xs text-error"></ErrorMessage>
      </div>

      <div class="text-center mt-3">
        <button
          class="brand-btn w-full"
          :disabled="isLoading || !meta.valid"
          :class="[
            isLoading
              ? 'bg-gray400 text-gray600'
              : meta.valid
                ? 'brand-primary'
                : 'bg-gray400 text-gray600'
          ]"
        >
          Change Password
        </button>
      </div>
    </vForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typePassword: 'password',
      typePassword2: 'password',
      isLoading: false
    }
  },

  methods: {
    onSubmit(values, { resetForm }) {
      this.isLoading = true
      this.$auth
        .changePassword(values)
        .then((res) => {
          return res
        })
        .finally(() => {
          resetForm()
          this.isLoading = false
        })
    }
  }
}
</script>

<style></style>
