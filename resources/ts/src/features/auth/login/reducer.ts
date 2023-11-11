import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthRegisterState, initAuthRegisterState } from "./types"

const initialState: AuthRegisterState = initAuthRegisterState

export const authRegisterReducer = createSlice({
  name: "#{STATE_NAME}",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // テキストインプット時のハンドラ
    // onInputHandle: (state, action: PayloadAction<{ name: string; value: string }>) => {
    //   state.#{STATE_NAME}[action.payload.name as keyof contactState] = action.payload.value
    // },

    /** エラー設定 */
    putErrors: (state, action: PayloadAction<{ value: string[] }>) => {
      state.errorArray = action.payload.value
    },
    // エラー削除
    deleteErrorArray: (state) => {
      state.errorArray = []
    },
  },
})
export const { actions } = authRegisterReducer
