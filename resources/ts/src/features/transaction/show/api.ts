import axios from "axios"

export const apis = {
  doInit: async (contractId: string, transactionId: string) => {
    return await axios.get<any>(
      `/api/${contractId}/transaction/getTransactionData/${transactionId}`
    )
  },
  doPost: async (params: URLSearchParams) => {
    return await axios.post<string>(`sample/postMethod`, params)
  },
}
