import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { initScreenState, screenState, transactionState } from "./types"

const initialState: transactionState = {
  screenState: initScreenState,
}

export const createTransactionStates = createSlice({
  name: "createTransaction",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // テキストインプット時のハンドラ
    onInputHandle: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state.screenState[action.payload.name as keyof screenState] = action.payload.value
    },

    onChangeVoucharStateHandle: (state, action: PayloadAction<{ value: string }>) => {
      state.screenState.voucharState = action.payload.value
    },
  },
})

export const { actions } = createTransactionStates
