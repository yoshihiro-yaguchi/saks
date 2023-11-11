import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  initInput,
  initModalSearchProductionState,
  Input,
  ModalSearchProductionState,
  Paginate,
  SearchCondition,
  SearchResult,
} from "./types"

const initialState: ModalSearchProductionState = initModalSearchProductionState

export const transactionModalSearchProduction = createSlice({
  name: "transactionModalSearchProduction",
  initialState,
  reducers: {
    /**
     * ステートリセット
     *
     * @returns
     */
    reset: () => initialState,
    // モーダル開く
    open: (state, action: PayloadAction<{ receiveIndex: number }>) => {
      state.isOpen = true
      state.receive.index = action.payload.receiveIndex
    },

    // モーダル閉じる
    close: (state) => {
      state.isOpen = false
    },

    // モーダルの検索条件
    inputCondition: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      state.searchCondition[action.payload.key as keyof SearchCondition] =
        action.payload.value
    },
    // モーダルのデータ入力
    inputData: (
      state,
      action: PayloadAction<{ key: string; value: string | number }>
    ) => {
      state.input[action.payload.key] = action.payload.value
    },

    // モーダルインプット一括更新
    bulkInputData: (state, action: PayloadAction<{ data: Input }>) => {
      state.input = { ...state.input, ...action.payload.data }
    },

    // モーダルインプットリセット
    resetInputData: (state) => {
      state.input = initInput
    },

    // ページネーションデータの更新
    bulkUpdatePaginate: (
      state,
      action: PayloadAction<{ data: Partial<Paginate> }>
    ) => {
      state.paginate = { ...state.paginate, ...action.payload.data }
    },

    // 検索結果反映
    updateSearchResult: (
      state,
      action: PayloadAction<{ data: Array<SearchResult> }>
    ) => {
      state.searchResult = action.payload.data
    },
  },
})
export const { actions } = transactionModalSearchProduction
