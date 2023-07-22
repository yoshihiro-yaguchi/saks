import axios from "axios"

export const apis = {
  doInit: async (
    baseUrl: string,
    contractId: string,
    transactionId: string
  ) => {
    return await axios.get<any>(
      `${baseUrl}/api/${contractId}/transaction/getTransactionData/${transactionId}`
    )
  },
  doPost: async (params: URLSearchParams) => {
    return await axios.post<string>(`sample/postMethod`, params)
  },
}
