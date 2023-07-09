import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  customerInfo,
  initCustomerInfo,
  initTransactionInfo,
  transactionInfo,
  transactionState,
} from "./types"

const initialState: transactionState = {
  _token: "",
  transactionInfo: initTransactionInfo,
  customerInfo: initCustomerInfo,
}

export const createTransactionStates = createSlice({
  name: "createTransaction",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // テキストインプット時のハンドラ
    changeTransactionInfoHandle: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.transactionInfo[action.payload.name as keyof transactionInfo] = action.payload.value
    },
    changeCustomerInfoHandle: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state.customerInfo[action.payload.name as keyof customerInfo] = action.payload.value
    },
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state._token = action.payload.token
    },
  },
})

export const { actions } = createTransactionStates
