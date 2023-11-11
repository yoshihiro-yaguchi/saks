import axios from "axios"
import { InitApiResult, ApiGetProductByCode } from "./types"

export const apis = {
  // 初期処理
  init: async () => {
    return await axios.get<InitApiResult>(`/api/transaction/store/init`)
  },

  // 取引登録
  saveTransactionData: async (params: FormData) => {
    return await axios.post<any>(`/api/transaction/store`, params)
  },

  // 商品コードで商品1件取得
  getProductByCode: async (params: URLSearchParams) => {
    return await axios.get<ApiGetProductByCode>(
      `/api/product/search-product-by-product-code?${params.toString()}`
    )
  },
}
