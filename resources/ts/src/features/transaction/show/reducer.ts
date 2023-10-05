import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  Common,
  initCommon,
  initTransactionHead,
  ShowTransactionState,
} from "./types"

const initialState: ShowTransactionState = {
  common: initCommon,
  transactionHead: initTransactionHead,
  detailRows: [],
  taxInfos: [],
}

export const showTransactionReducer = createSlice({
  name: "showTransactionState",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // common更新
    commonUpdate: (
      state,
      action: PayloadAction<{ common: Partial<Common> }>
    ) => {
      state.common = { ...state.common, ...action.payload.common }
    },

    /**
     * 初期処理
     *
     * @param state
     * @param action
     */
    init: (
      state,
      action: PayloadAction<{ updateData: Partial<ShowTransactionState> }>
    ) => {
      const newState = { ...state, ...action.payload.updateData }
      state.common = newState.common
      state.transactionHead = newState.transactionHead
      state.detailRows = newState.detailRows
      state.taxInfos = newState.taxInfos
    },

    // テキストインプット時のハンドラ
    // onInputHandle: (state, action: PayloadAction<{ name: string; value: string }>) => {
    //   state.#{STATE_NAME}[action.payload.name as keyof ShowTransactionState] = action.payload.value
    // },
  },
})
export const { actions } = showTransactionReducer
