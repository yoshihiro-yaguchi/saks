import axios from "axios"

export const apis = {
  postTest: async (params: URLSearchParams, baseUrl: string) => {
    return await axios.post<any>(`${baseUrl}/transaction/store`, params)
  },

  // doPost: async (params: URLSearchParams) => {
  //   return await axios.post<string>(`sample/postMethod`, params)
  // },
  // // 送信ボタン押下時
  // doSend: async (params: URLSearchParams) => {
  //   return await axios.post<boolean>(`contact/doSend`, params)
  // },
}
