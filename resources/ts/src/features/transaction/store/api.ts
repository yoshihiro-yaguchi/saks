import axios from "axios"
import { Office, InitApiResult, ModalApiSearchResult } from "./types"

export const apis = {
  // 初期処理
  init: async () => {
    return await axios.get<InitApiResult>(`/api/transaction/store/init`)
  },

  // 取引登録
  saveTransactionData: async (params: FormData) => {
    return await axios.post<any>(`/api/transaction/store`, params)
  },

  // 商品検索
  getProducts: async (params: URLSearchParams) => {
    return await axios.get<ModalApiSearchResult>(
      `/api/product/search?${params.toString()}`
    )
  },
}
