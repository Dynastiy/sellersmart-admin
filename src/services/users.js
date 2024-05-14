import $request from '@/axios/index'
import { catchAxiosError, catchAxiosSuccess } from './response'
// import { catchAxiosError } from './response'

export default {
  async getCustomers(page) {
    try {
      let res = await $request.get(`admin/customers/list?page=${page}&perPage=10&search`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getVendors(page) {
    try {
      let res = await $request.get(`admin/vendors/all?page=${page}&perPage=10&search`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async getAdmins(page) {
    try {
      let res = await $request.get(`admin/admins/list?page=${page}&perPage=10&search`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  async adminAnalytics() {
    try {
      let res = await $request.get(`admin/admins/analytics`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  


  async createAdmin(formData) {
    try {
      let res = await $request.post(`admin/admins/create-account`, formData)
      catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

  
}




