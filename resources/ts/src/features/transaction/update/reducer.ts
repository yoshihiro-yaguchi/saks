import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  initCommon,
  initAmountInfo,
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
  initTransactionHead,
  TransactionHead,
  InitApiResult,
} from "./types"
import { DetailRow, TaxInfo } from "../TransactionTypes"

const initialState: StoreTransactionState = {
  token: "",
  common: initCommon,
  transactionHead: initTransactionHead,
  detailRows: [],
  taxInfos: [],
  offices: [],
  modal: initModal,
}

export const updateTransactionReducer = createSlice({
  name: "updateTransaction",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // 初期表示時
    initHandle: (
      state,
      action: PayloadAction<{
        param: Partial<StoreTransactionState>
        transactionData: InitApiResult
      }>
    ) => {
      // トークン情報
      state.common = { ...state.common, ...action.payload.param.common }

      // 取引データ
      const transactionData = action.payload.transactionData

      // 取引ヘッダー
      const transactionHead = action.payload.transactionData.transactionHead
      state.transactionHead.transactionId = transactionHead.transactionId ?? ""
      state.transactionHead.transactionTitle =
        transactionHead.transactionTitle ?? ""
      state.transactionHead.transactionDivision =
        transactionHead.transactionDivision ?? ""
      state.transactionHead.transactionDate =
        transactionHead.transactionDate ?? ""
      state.transactionHead.transactionBranch =
        transactionHead.transactionBranch ?? ""
      state.transactionHead.transactionPicName =
        transactionHead.transactionPicName ?? ""
      state.transactionHead.transactionNote =
        transactionHead.transactionNote ?? ""
      state.transactionHead.corporationDivision =
        transactionHead.corporationDivision ?? ""
      state.transactionHead.customerCompany =
        transactionHead.customerCompany ?? ""
      state.transactionHead.customerBranch =
        transactionHead.customerBranch ?? ""
      state.transactionHead.invoiceNumber = transactionHead.invoiceNumber ?? ""
      state.transactionHead.customerName = transactionHead.customerName ?? ""
      state.transactionHead.customerPhoneNumber =
        transactionHead.customerPhoneNumber ?? ""
      state.transactionHead.customerZipCode =
        transactionHead.customerZipCode ?? ""
      state.transactionHead.customerAddress1 =
        transactionHead.customerAddress1 ?? ""
      state.transactionHead.customerAddress2 =
        transactionHead.customerAddress2 ?? ""
      state.transactionHead.customerAddress3 =
        transactionHead.customerAddress3 ?? ""
      state.transactionHead.customerAddress4 =
        transactionHead.customerAddress4 ?? ""
      state.transactionHead.subtotal = Math.floor(transactionHead.subtotal) ?? 0
      state.transactionHead.taxInclude =
        Math.floor(transactionHead.taxInclude) ?? 0
      state.transactionHead.total = Math.floor(transactionHead.total) ?? 0

      // 明細
      const detailRowsData: DetailRow[] = []
      transactionData.detailRows.forEach((detailRow) => {
        let detailRowData: DetailRow = {
          productNo: detailRow.productNo,
          productName: detailRow.productName,
          quantity: Math.floor(detailRow.quantity),
          unitPrice: Math.floor(detailRow.unitPrice),
          unit: detailRow.unit,
          taxRate: Math.floor(detailRow.taxRate),
          totalPrice: Math.floor(detailRow.totalPrice),
        }
        detailRowsData.push(detailRowData)
      })
      state.detailRows = detailRowsData
      // 税情報
      state.taxInfos = transactionData.taxInfos
      // 編集情報
      state.offices = action.payload.transactionData.offices
    },

    // 取引ヘッダー変更時ハンドラ
    updateTransactionHeadHandle: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.transactionHead[action.payload.name as keyof TransactionHead] =
        action.payload.value
    },

    // 取引ヘッダー一括変更
    bulkUpdateTransactionHeadHandle: (
      state,
      action: PayloadAction<{ data: Partial<TransactionHead> }>
    ) => {
      state.transactionHead = {
        ...state.transactionHead,
        ...action.payload.data,
      } as TransactionHead
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

export const { actions } = updateTransactionReducer
