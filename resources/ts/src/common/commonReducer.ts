import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CommonTypes, initCommonTypes } from "./commonTypes"

const initialState: CommonTypes = initCommonTypes

export const commonReducer = createSlice({
  name: "#{STATE_NAME}",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // CSRFトークンをアップデート
    updateCsrfToken: (state, action: PayloadAction<{ csrfToken: string }>) => {
      console.log(action.payload.csrfToken)
      state.csrfToken = action.payload.csrfToken
    },

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
export const { actions } = commonReducer
