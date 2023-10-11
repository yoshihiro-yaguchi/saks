import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  initInputs,
  initPaginate,
  Paginate,
  SearchProduct,
  SearchResult,
} from "./types"

const initialState: SearchProduct = {
  input: initInputs,
  searchResults: [],
  paginate: initPaginate,
}

export const productSearchState = createSlice({
  name: "productSearchState",
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
    updateInput: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      state.input[action.payload.key] = action.payload.value
    },

    /**
     * 検索結果更新
     *
     * @param state
     * @param action
     */
    updateSearchResults: (
      state,
      action: PayloadAction<{ data: Array<SearchResult> }>
    ) => {
      state.searchResults = action.payload.data
    },

    /**
     * ページネーションデータ
     *
     * @param state
     * @param action
     */
    updatePaginate: (
      state,
      action: PayloadAction<{ key: string; value: number }>
    ) => {
      state.paginate[action.payload.key] = action.payload.value
    },

    /**
     * ページネーションデータ一括アップデート
     *
     * @param state
     * @param action
     */
    bulkUpdatePaginate: (
      state,
      action: PayloadAction<{ data: Partial<Paginate> }>
    ) => {
      state.paginate = { ...state.paginate, ...action.payload.data }
    },
  },
})
export const { actions } = productSearchState
