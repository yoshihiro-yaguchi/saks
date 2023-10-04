import axios from "axios"

export const apis = {
  // doInit: async (params: URLSearchParams) => {
  //   return await axios.get<string>(`sample/getMethod?${params.toString()}`)
  // },
  // doPost: async (params: URLSearchParams) => {
  //   return await axios.post<string>(`sample/postMethod`, params)
  // },

  storeContracts: async (params: FormData) => {
    return await axios.post<any>("/api/store_contract", params)
  },
}
