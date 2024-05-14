import $request from '@/axios/index'
import { catchAxiosError } from './response'

export default {
  async getAnalytics() {
    try {
      let res = await $request.get(`admin/dashboard/analytics`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },

 
}
