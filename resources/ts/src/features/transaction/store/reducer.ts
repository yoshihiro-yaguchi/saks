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
  StoreTransactionState,
  AmountInfo,
  Common,
} from "./types"

const initialState: StoreTransactionState = {
  processing: false,
  token: "",
  common: initCommon,
  transactionInfo: initTransactionInfo,
  customerInfo: initCustomerInfo,
  detailRows: [],
  amountInfo: initAmountInfo,
  taxInfos: [],
}

export const createTransactionStates = createSlice({
  name: "storeTransaction",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // 初期表示時
    initHandle: (
      state,
      action: PayloadAction<{ param: Partial<StoreTransactionState> }>
    ) => {
      // トークン情報
      state.token = action.payload.param.token ?? ""
      state.common = { ...state.common, ...action.payload.param.common }
    },

    // 取引情報変更時ハンドラ
    updateTransactionInfoHandle: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const updateData: Partial<TransactionInfo> = {
        [action.payload.name]: action.payload.value,
      }
      state.transactionInfo = { ...state.transactionInfo, ...updateData }
    },

    // お客様情報変更時ハンドラ
    updateCustomerInfoHandle: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      const updateData: Partial<CustomerInfo> = {
        [action.payload.name]: action.payload.value,
      }
      state.customerInfo = { ...state.customerInfo, ...updateData }
    },

    // 明細情報変更時ハンドラ
    updateDetailRowHandle: (
      state,
      action: PayloadAction<{
        index: number
        params: DetailRow
      }>
    ) => {
      state.detailRows[action.payload.index] = action.payload.params
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
    setBaseUrl: (state, action: PayloadAction<{ baseUrl: string }>) => {
      state.common.baseUrl = action.payload.baseUrl
    },

    // 明細追加
    addDetailRow: (state, action: PayloadAction<{ value: DetailRow }>) => {
      state.detailRows.push(action.payload.value)
    },

    // 明細行削除
    deleteDetailRow: (state, action: PayloadAction<{ index: number }>) => {
      state.detailRows.splice(action.payload.index, 1)
    },

    // エラー削除
    deleteErrorArray: (state) => {
      state.common.errorArray = []
    },

    // 共通情報更新
    updateCommon: (
      state,
      action: PayloadAction<{ common: Partial<Common> }>
    ) => {
      state.common = { ...state.common, ...action.payload.common }
    },

    // 処理開始
    processStart: (state) => {
      state.processing = true
    },

    // 処理終了
    processEnd: (state) => {
      state.processing = false
    },
  },
})

export const { actions } = createTransactionStates
