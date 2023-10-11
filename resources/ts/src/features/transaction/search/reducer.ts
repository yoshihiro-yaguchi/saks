import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  ApiInitResult,
  ApiSearchResult,
  initInputs,
  initPaginate,
  Inputs,
  Paginate,
  TransactionSearch,
} from "./type"

const initialState: TransactionSearch = {
  transactions: Array(),
  inputs: initInputs,
  paginate: initPaginate,
  offices: [],
}

export const transactionSearchState = createSlice({
  name: "transactionSearchState",
  initialState,
  reducers: {
    /**
     * ステートリセット
     *
     * @returns
     */
    reset: () => initialState,
    /**
     * サンプル
     *
     * @param state
     * @param action
     */
    sample: (state, action: PayloadAction<{ name: string; value: string }>) => {
      console.log("サンプル")
    },

    /**
     * 入力項目更新
     *
     * @param state
     * @param action
     */
    updateInputs: (state, action: PayloadAction<{ data: Partial<Inputs> }>) => {
      state.inputs = { ...state.inputs, ...action.payload.data }
    },

    /**
     * 初期処理
     *
     * @param state
     * @param action
     */
    init: (state, action: PayloadAction<{ data: ApiInitResult }>) => {
      state.paginate.count = action.payload.data.count
      state.transactions = action.payload.data.transactions
      state.paginate.maxPages = Math.ceil(
        state.paginate.count / state.paginate.itemsPerPage
      )
      state.paginate.pages = 1
      state.offices = action.payload.data.offices
    },

    /**
     * 取引データ更新
     *
     * @param state
     * @param action
     */
    updateTransactionData: (
      state,
      action: PayloadAction<{ data: ApiSearchResult }>
    ) => {
      state.paginate.count = action.payload.data.count
      state.transactions = action.payload.data.transactions
      state.paginate.maxPages = Math.ceil(
        state.paginate.count / state.paginate.itemsPerPage
      )
      state.paginate.pages = 1
    },

    /**
     * ページネーションデータの更新
     *
     * @param state
     * @param action
     */
    updatePaginate: (
      state,
      action: PayloadAction<{ data: Partial<Paginate> }>
    ) => {
      state.paginate = { ...state.paginate, ...action.payload.data }
    },
  },
})
export const { actions } = transactionSearchState
