import axios from "axios"

export const commonApis = {
  // doInit: async (params: URLSearchParams) => {
  //   return await axios.get<string>(`sample/getMethod?${params.toString()}`)
  // },
  // doPost: async (params: URLSearchParams) => {
  //   return await axios.post<string>(`sample/postMethod`, params)
  // },

  fetchUserInfo: async () => {
    return await axios.get(`/api/fetchUserInfo`)
  },

  getAddress: async (params: URLSearchParams) => {
    return await axios.get<any>(
      `https://zipcloud.ibsnet.co.jp/api/search?${params.toString()}`
    )
  },
}
