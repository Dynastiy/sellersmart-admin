import $request from '@/axios/index'
// import { catchAxiosError, catchAxiosSuccess } from './response'
import { catchAxiosError } from './response'

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
}




