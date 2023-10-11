import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  CustomerInfo,
  initCommon,
  initCustomerInfo,
  initTransactionInfo,
  initAmountInfo,
  TransactionInfo,
  StoreTransactionState,
  AmountInfo,
  Common,
  Office,
  initModal,
  ModalSearchCondition,
  ModalInput,
  ModalPaginate,
  ModalSearchResult,
  initModalInput,
} from "./types"
import { DetailRow, TaxInfo } from "../TransactionTypes"

const initialState: StoreTransactionState = {
  token: "",
  common: initCommon,
  transactionInfo: initTransactionInfo,
  customerInfo: initCustomerInfo,
  detailRows: [],
  amountInfo: initAmountInfo,
  taxInfos: [],
  offices: [],
  modal: initModal,
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

    // お客様情報の更新
    updateCustomerInfo: (
      state,
      action: PayloadAction<{ newCustomerInfo: Partial<CustomerInfo> }>
    ) => {
      state.customerInfo = {
        ...state.customerInfo,
        ...action.payload.newCustomerInfo,
      }
    },

    // モーダル開く
    openModal: (state) => {
      state.modal.isOpen = true
    },

    // モーダル閉じる
    closeModal: (state) => {
      state.modal.isOpen = false
    },

    // モーダルの検索条件
    modalInputCondition: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      state.modal.searchCondition[
        action.payload.key as keyof ModalSearchCondition
      ] = action.payload.value
    },
    // モーダルのデータ入力
    modalInputData: (
      state,
      action: PayloadAction<{ key: string; value: string | number }>
    ) => {
      state.modal.input[action.payload.key] = action.payload.value
    },

    // モーダルインプット一括更新
    modalBulkInputData: (
      state,
      action: PayloadAction<{ data: ModalInput }>
    ) => {
      state.modal.input = { ...state.modal.input, ...action.payload.data }
    },

    // モーダルインプットリセット
    modalResetInputData: (state) => {
      state.modal.input = initModalInput
    },

    // ページネーションデータの更新
    modalBuldUpdatePaginate: (
      state,
      action: PayloadAction<{ data: Partial<ModalPaginate> }>
    ) => {
      state.modal.paginate = { ...state.modal.paginate, ...action.payload.data }
    },

    // 検索結果反映
    modalUpdateSearchResult: (
      state,
      action: PayloadAction<{ data: Array<ModalSearchResult> }>
    ) => {
      state.modal.searchResult = action.payload.data
    },
  },
})

export const { actions } = storeTransactionReducer
