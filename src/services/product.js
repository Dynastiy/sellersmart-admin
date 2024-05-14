import $request from '@/axios/index'
import { catchAxiosError } from './response'

export default {
  async getProductBySlug(slug) {
    try {
      let res = await $request.get(`show-product/${slug}`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },


  async getProducts() {
    try {
      let res = await $request.get(`admin/vendor/products`)
      // catchAxiosSuccess(res)
      return res.data
    } catch (error) {
      catchAxiosError(error)
      throw error
    }
  },
  

}
