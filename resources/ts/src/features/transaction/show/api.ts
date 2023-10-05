import axios from "axios"

export const apis = {
  doInit: async (transactionId: string) => {
    return await axios.get<any>(
      `/api/transaction/getTransactionData/${transactionId}`
    )
  },
  doPost: async (params: URLSearchParams) => {
    return await axios.post<string>(`sample/postMethod`, params)
  },
}
