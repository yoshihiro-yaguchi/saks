import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  initTransactionSettingInputs,
  TransactionSetting,
  TransactionSettingInputs,
} from "./types"

const initialState: TransactionSetting = {
  inputs: initTransactionSettingInputs,
}

export const transactionSettingState = createSlice({
  name: "transactionSettingState",
  initialState,
  reducers: {
    /**
     * ステートリセット
     *
     * @returns
     */
    reset: () => initialState,

    /**
     * 設定項目のstateを更新する。
     *
     * @param state
     * @param actions
     */
    updateInputs: (
      state,
      actions: PayloadAction<{ state: Partial<TransactionSettingInputs> }>
    ) => {
      state.inputs = { ...state.inputs, ...actions.payload.state }
    },
  },
})
export const { actions } = transactionSettingState
