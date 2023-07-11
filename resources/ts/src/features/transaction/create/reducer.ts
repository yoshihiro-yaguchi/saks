import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  customerInfo,
  detailRow,
  initCommon,
  initCustomerInfo,
  initTransactionInfo,
  transactionInfo,
  transactionState,
} from "./types"
import { stringify } from "querystring"

const initialState: transactionState = {
  _token: "",
  common: initCommon,
  transactionInfo: initTransactionInfo,
  customerInfo: initCustomerInfo,
  detailRows: [],
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

    // 明細追加
    addDetailRow: (state, action: PayloadAction<{ value: detailRow }>) => {
      state.detailRows.push(action.payload.value)
    },

    // 明細行削除
    deleteDetailRow: (state, action: PayloadAction<{ index: number }>) => {
      state.detailRows.splice(action.payload.index, 1)
    },
  },
})

export const { actions } = createTransactionStates
