import axios from "axios"
import { ApiInitResult, ApiSearchResult, TransactionData } from "./type"

export const apis = {
  doInit: async (params: URLSearchParams) => {
    return await axios.get<ApiInitResult>(
      `/api/transaction/search/init?${params.toString()}`
    )
  },

  search: async (params: URLSearchParams) => {
    return await axios.get<ApiSearchResult>(
      `/api/transaction/search?${params.toString()}`
    )
  },
}
