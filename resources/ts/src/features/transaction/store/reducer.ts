import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  initCommon,
  initTransactionInfo,
  initAmountInfo,
  TransactionInfo,
  StoreTransactionState,
  AmountInfo,
  Common,
  Office,
} from "./types"
import { DetailRow, TaxInfo, initDetailRow } from "../TransactionTypes"

let initDetailRows: Array<DetailRow> = []
for (let index = 0; index < 10; index++) {
  initDetailRows.push(initDetailRow)
}

const initialState: StoreTransactionState = {
  token: "",
  common: initCommon,
  transactionInfo: initTransactionInfo,
  detailRows: initDetailRows,
  amountInfo: initAmountInfo,
  taxInfos: [],
  offices: [],
}

export const storeTransactionReducer = createSlice({
  name: "storeTransaction",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // 初期表示時
    initHandle: (
      state,
      action: PayloadAction<{
        param: Partial<StoreTransactionState>
        name: string
        offices: Array<Office>
        initOffice: string
      }>
    ) => {
      // トークン情報
      state.token = action.payload.param.token ?? ""
      state.common = { ...state.common, ...action.payload.param.common }
      state.transactionInfo.transactionPicName = action.payload.name
      state.transactionInfo.transactionBranch = action.payload.initOffice
      state.offices = action.payload.offices
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

    // 明細追加
    addDetailRow: (state, action: PayloadAction<{ value: DetailRow }>) => {
      state.detailRows.push(action.payload.value)
    },

    // 明細行クリア
    clearRow: (state, action: PayloadAction<{ index: number }>) => {
      state.detailRows[action.payload.index] = initDetailRow
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
  },
})

export const { actions } = storeTransactionReducer
