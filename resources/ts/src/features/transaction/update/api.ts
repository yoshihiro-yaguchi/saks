import axios from "axios"
import {
  Office,
  InitApiResult,
  ModalApiSearchResult,
  ApiGetProductByCode,
} from "./types"

export const apis = {
  // 初期処理
  init: async (params: URLSearchParams) => {
    return await axios.get<InitApiResult>(
      `/api/transaction/update/init?${params.toString()}`
    )
  },

  // 取引登録
  updateTransactionData: async (params: FormData) => {
    return await axios.post<any>(`/api/transaction/update`, params)
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

  // 商品コードで商品1件取得
  getProductByCode: async (params: URLSearchParams) => {
    return await axios.get<ApiGetProductByCode>(
      `/api/product/search-product-by-product-code?${params.toString()}`
    )
  },
}
