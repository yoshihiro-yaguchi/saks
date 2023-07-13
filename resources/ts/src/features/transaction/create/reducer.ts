import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  CustomerInfo,
  DetailRow,
  initCommon,
  initCustomerInfo,
  initTransactionInfo,
  initAmountInfo,
  TaxInfo,
  TransactionInfo,
  transactionState,
  AmountInfo,
  initHandle,
} from "./types"

const initialState: transactionState = {
  token: "",
  common: initCommon,
  transactionInfo: initTransactionInfo,
  customerInfo: initCustomerInfo,
  detailRows: [],
  amountInfo: initAmountInfo,
  taxInfos: [],
}

export const createTransactionStates = createSlice({
  name: "createTransaction",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // 初期表示時
    initHandle: (
      state,
      action: PayloadAction<{ param: transactionState }>
    ) => {
      const param = action.payload.param
      state.token = param.token
      state.amountInfo = param.amountInfo
      state.common = param.common
      state.customerInfo = param.customerInfo
      state.detailRows = param.detailRows
      state.taxInfos = param.taxInfos
      state.transactionInfo = param.transactionInfo
    },

    // 取引情報変更時ハンドラ
    updateTransactionInfoHandle: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.transactionInfo[
        action.payload.name as keyof TransactionInfo
      ] = action.payload.value
    },

    // お客様情報変更時ハンドラ
    updateCustomerInfoHandle: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.customerInfo[action.payload.name as keyof CustomerInfo] =
        action.payload.value
    },

    // 明細情報変更時ハンドラ
    updateDetailRowHandle: (
      state,
      action: PayloadAction<{
        index: number
        data: DetailRow
      }>
    ) => {
      state.detailRows[action.payload.index] = action.payload.data
    },

    /**
     * 税情報更新
     *
     * @param state
     * @param action
     */
    updateTaxInfoHandle: (
      state,
      action: PayloadAction<{
        taxInfo: TaxInfo[]
      }>
    ) => {
      state.taxInfos = action.payload.taxInfo
    },

    /**
     * 会計情報更新
     * @param state
     * @param action
     */
    updateAmountInfoHandle: (
      state,
      action: PayloadAction<{
        treasureInfo: AmountInfo
      }>
    ) => {
      state.amountInfo = action.payload.treasureInfo
    },

    // トークンセット
    setToken: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token
    },

    // baseURLセット
    setBaseUrl: (
      state,
      action: PayloadAction<{ baseUrl: string }>
    ) => {
      state.common.baseUrl = action.payload.baseUrl
    },

    // 明細追加
    addDetailRow: (
      state,
      action: PayloadAction<{ value: DetailRow }>
    ) => {
      state.detailRows.push(action.payload.value)
    },

    // 明細行削除
    deleteDetailRow: (
      state,
      action: PayloadAction<{ index: number }>
    ) => {
      state.detailRows.splice(action.payload.index, 1)
    },
  },
})

export const { actions } = createTransactionStates
