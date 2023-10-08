import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  initRegisterContractTypes,
  RegisterContractTypes,
  InputState,
} from "./types"

const initialState: RegisterContractTypes = initRegisterContractTypes

export const registerContractReducer = createSlice({
  name: "registerContract",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // テキストインプット時のハンドラ
    onInputHandle: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.inputState[action.payload.name as keyof InputState] =
        action.payload.value
    },

    // インプット項目指定項目一括更新
    inputItemsBulkUpdate: (
      state,
      action: PayloadAction<{ value: Partial<FullWidthInputState> }>
    ) => {
      state.inputState = { ...state.inputState, ...action.payload.value }
    },
  },
})
export const { actions } = registerContractReducer
