import axios from "axios"
import { ApiDoInitResult } from "./types"

export const apis = {
  doSearch: async (params: URLSearchParams) => {
    return await axios.get<ApiDoInitResult>(
      `/api/product/search?${params.toString()}`
    )
  },
  // doPost: async (params: URLSearchParams) => {
  //   return await axios.post<string>(`sample/postMethod`, params)
  // },
}
