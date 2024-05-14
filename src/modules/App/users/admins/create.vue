<template>
  <div class="bg-white p-8 rounded-md">
    <h3 class="lg:text-2xl md:text-2xl text-xl font-semibold mb-0">Basic Information</h3>

    <vForm @submit="onSubmit" v-slot="{ meta }" class="mt-5">
      <fieldset class="grid grid-cols-2 gap-6">
        <div>
          <label for="">Name</label>
          <vField name="name" class="input" placeholder="Name" type="text" rules="required" />
          <ErrorMessage name="name" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Role</label>
          <vField name="role_id" v-slot="{ field }" rules="required">
            <select class="input" placeholder="Select Role" v-bind="field" name="role_id">
              <option selected disabled value="">--Select One--</option>
              <option v-for="(item, idx) in roles" :key="idx" :value="String(item.id)">
                {{ item?.name }}
              </option>
            </select>
          </vField>
          <ErrorMessage name="role_id" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Email</label>
          <vField name="email" class="input" placeholder="email" type="text" rules="email" />
          <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Department</label>
          <vField name="department_uid" v-slot="{ field }" rules="required">
            <select
              class="input"
              placeholder="Select department"
              v-bind="field"
              name="department_uid"
            >
              <option selected disabled value="">--Select One--</option>
              <option v-for="(item, idx) in departments" :key="idx" :value="item.uuid">
                {{ item.name }}
              </option>
            </select>
          </vField>
          <ErrorMessage name="department_uid" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Date of Birth</label>
          <vField
            name="date_of_birth"
            class="input"
            placeholder="Date of Birth"
            type="date"
            rules="required"
          />
          <ErrorMessage name="date_of_birth" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Phone Number</label>
          <vField
            name="phone_number"
            class="input"
            placeholder="Phone Number"
            type="tel"
            rules="required"
          />
          <ErrorMessage name="phone_number" class="text-xs text-error"></ErrorMessage>
        </div>
      </fieldset>

      <div class="text-center mt-6">
        <wxButton :isLoading="isLoading" :isDisabled="isLoading" :formMeta="meta.valid">
          Add Admin
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
      validationErrors: {},
      roles: [],
      departments: []
    }
  },

  methods: {
    async onSubmit(values, {resetForm}) {
      this.isLoading = true
      let payload = {
        name: values.name,
        email: values.email,
        date_of_birth: values.date_of_birth,
        phone_number: values.phone_number,
        role_id: +values.role_id,
        department_uid: values.department_uid
      }
      console.log(payload)
      this.$users.createAdmin(payload)
      .then(()=> {
        resetForm()
      })
      .finally(()=> {
        this.isLoading = false
      })
    },

    getRoles() {
      this.$config.getRoles().then((res) => {
        console.log(res)
        this.roles = res.data
      })
    },

    getDepartments() {
      this.$config.getDepartments().then((res) => {
        console.log(res)
        this.departments = res.data
      })
    }
  },

  beforeMount() {
    this.getRoles()
    this.getDepartments()
  }
}
</script>
