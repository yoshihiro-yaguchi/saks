import axios from "axios"
import { Office, InitApiResult, ModalApiSearchResult } from "./types"

export const apis = {
  // 初期処理
  init: async (params: URLSearchParams) => {
    return await axios.get<InitApiResult>(
      `/api/transaction/update/init?${params.toString()}`
    )
  },

  // 取引登録
  saveTransactionData: async (params: FormData) => {
    return await axios.post<any>(`/api/transaction/store`, params)
  },

  // 郵便番号から住所を取得する
  getAddress: async (params: URLSearchParams) => {
    return await axios.get<any>(
      `https://zipcloud.ibsnet.co.jp/api/search?${params.toString()}`
    )
  },

  // 商品検索
  getProducts: async (params: URLSearchParams) => {
    return await axios.get<ModalApiSearchResult>(
      `/api/product/search?${params.toString()}`
    )
  },
}
