import axios from "axios"

export const apis = {
  doInit: async (params: URLSearchParams) => {
    return await axios.get<string>(`sample/getMethod?${params.toString()}`)
  },
  doPost: async (params: URLSearchParams) => {
    return await axios.post<string>(`sample/postMethod`, params)
  },
}
