import axios from "axios"
import { ApiSearchResult, TransactionData } from "./type"

export const apis = {
  doInit: async (params: URLSearchParams) => {
    return await axios.get<string>(`sample/getMethod?${params.toString()}`)
  },
  doPost: async (params: URLSearchParams) => {
    return await axios.post<string>(`sample/postMethod`, params)
  },

  search: async (params: URLSearchParams) => {
    return await axios.get<ApiSearchResult>(
      `/api/transaction/searchTransactionData?${params.toString()}`
    )
  },
}
