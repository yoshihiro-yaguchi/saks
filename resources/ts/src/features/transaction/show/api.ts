import axios from "axios"
import { ApiDoInit } from "./types"

export const apis = {
  doInit: async (transactionId: string) => {
    return await axios.get<ApiDoInit>(
      `/api/transaction/getTransactionData/${transactionId}`
    )
  },
}
