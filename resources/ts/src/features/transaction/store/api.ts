import axios from "axios"

export const apis = {
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
