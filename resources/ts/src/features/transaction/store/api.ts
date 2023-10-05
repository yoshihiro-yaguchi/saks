import axios from "axios"

export const apis = {
  saveTransactionData: async (params: FormData) => {
    return await axios.post<any>(`/api/dummy/transaction/store`, params)
  },

  getAddress: async (params: URLSearchParams) => {
    return await axios.get<any>(
      `https://zipcloud.ibsnet.co.jp/api/search?${params.toString()}`
    )
  },

  // doPost: async (params: URLSearchParams) => {
  //   return await axios.post<string>(`sample/postMethod`, params)
  // },
  // // 送信ボタン押下時
  // doSend: async (params: URLSearchParams) => {
  //   return await axios.post<boolean>(`contact/doSend`, params)
  // },
}
