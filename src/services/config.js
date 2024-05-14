import $request from '@/axios/index'
// import { catchAxiosError, catchAxiosSuccess } from './response'
import { catchAxiosError } from './response'
// import { useToast } from "vue-toastification";
// const toast = useToast();

export default {
  async getRoles() {
    try {
      let res = await $request.get(`admin/admins/roles`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getDepartments() {
    try {
      let res = await $request.get(`admin/departments`)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getCategories() {
    try {
      let res = await $request.get(`products/categories`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },
}
