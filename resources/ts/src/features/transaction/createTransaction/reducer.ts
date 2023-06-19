import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { indexRow, initScreenState, screenState, transactionState } from "./types"

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
    // onInputHandle: (state, action: PayloadAction<{ name: string; value: string }>) => {
    //   state.screenState[action.payload.name as keyof screenState] = action.payload.value
    // },

    onChangeVoucherStateHandle: (state, action: PayloadAction<{ value: string }>) => {
      state.screenState.voucherState = action.payload.value
    },

    pushRow: (state, action: PayloadAction<{ value: indexRow }>) => {
      state.screenState.rows.push(action.payload.value)
    },

    deleteRow: (state, action: PayloadAction<{ key: number }>) => {
      const index = state.screenState.rows.findIndex(
        ({ productId }) => productId === action.payload.key
      )

      state.screenState.rows.splice(index, 1)
    },
  },
})

export const { actions } = createTransactionStates
