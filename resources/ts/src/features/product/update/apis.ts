import axios from "axios"
import { ApiDoGetProduct, ApiDoUpdate } from "./types"

export const apis = {
  // doInit: async (params: URLSearchParams) => {
  //   return await axios.get<string>(`sample/getMethod?${params.toString()}`)
  // },
  doGetProduct: async (params: URLSearchParams) => {
    return await axios.get<ApiDoGetProduct>(
      `/api/product/getProduct?${params.toString()}`
    )
  },
  doUpdate: async (params: FormData) => {
    return await axios.post<ApiDoUpdate>(`/api/product/update`, params)
  },
}
