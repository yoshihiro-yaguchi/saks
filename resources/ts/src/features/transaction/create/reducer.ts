import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  customerInfo,
  initCommon,
  initCustomerInfo,
  initTransactionInfo,
  transactionInfo,
  transactionState,
} from "./types"

const initialState: transactionState = {
  _token: "",
  common: initCommon,
  transactionInfo: initTransactionInfo,
  customerInfo: initCustomerInfo,
}

export const createTransactionStates = createSlice({
  name: "createTransaction",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // 取引情報変更時ハンドラ
    changeTransactionInfoHandle: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.transactionInfo[action.payload.name as keyof transactionInfo] =
        action.payload.value
    },

    // お客様情報変更時ハンドラ
    changeCustomerInfoHandle: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.customerInfo[action.payload.name as keyof customerInfo] =
        action.payload.value
    },

    // トークンセット
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state._token = action.payload.token
    },

    // baseURLセット
    setBaseUrl: (state, action: PayloadAction<{ baseUrl: string }>) => {
      state.common.baseUrl = action.payload.baseUrl
    },
  },
})

export const { actions } = createTransactionStates
