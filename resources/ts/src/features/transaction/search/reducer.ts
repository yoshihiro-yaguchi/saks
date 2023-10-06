import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initItems, TransactionSearch } from "./type"

const initialState: TransactionSearch = {
  items: initItems,
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
  },
})
export const { actions } = transactionSearchState
