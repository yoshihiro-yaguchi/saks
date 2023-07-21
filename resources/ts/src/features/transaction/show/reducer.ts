import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  initAmountInfo,
  initCustomerInfo,
  initTransactionInfo,
  ShowTransactionState,
} from "./types"

const initialState: ShowTransactionState = {
  transactionInfo: initTransactionInfo,
  customerInfo: initCustomerInfo,
  detailRows: [],
  amountInfo: initAmountInfo,
  taxInfos: [],
}

export const showTransactionReducer = createSlice({
  name: "#{STATE_NAME}",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // テキストインプット時のハンドラ
    // onInputHandle: (state, action: PayloadAction<{ name: string; value: string }>) => {
    //   state.#{STATE_NAME}[action.payload.name as keyof ShowTransactionState] = action.payload.value
    // },
  },
})
export const { actions } = showTransactionReducer
