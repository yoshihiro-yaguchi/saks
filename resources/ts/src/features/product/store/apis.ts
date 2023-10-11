import axios from "axios"
import { ApiDoStore } from "./types"

export const apis = {
  // doInit: async (params: URLSearchParams) => {
  //   return await axios.get<string>(`sample/getMethod?${params.toString()}`)
  // },
  doStore: async (params: FormData) => {
    return await axios.post<ApiDoStore>(`/api/product/store`, params)
  },
}
