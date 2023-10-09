import axios from "axios"
import { Office, InitApiResult } from "./types"

export const apis = {
  // 初期処理
  init: async () => {
    return await axios.get<InitApiResult>(`/api/transaction/store/init`)
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
}
