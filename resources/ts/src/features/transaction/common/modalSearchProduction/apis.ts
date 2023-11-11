import axios from "axios"
import { ApiSearchResult } from "./types"

export const apis = {
  // 商品検索
  getProducts: async (params: URLSearchParams) => {
    return await axios.get<ApiSearchResult>(
      `/api/product/search?${params.toString()}`
    )
  },
}
