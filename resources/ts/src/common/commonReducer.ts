import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CommonTypes, initCommonTypes, UserTypes } from "./commonTypes"

const initialState: CommonTypes = initCommonTypes

export const commonReducer = createSlice({
  name: "common",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    // CSRFトークンをアップデート
    updateCsrfToken: (state, action: PayloadAction<{ csrfToken: string }>) => {
      state.csrfToken = action.payload.csrfToken
    },

    /** エラー設定 */
    putErrors: (state, action: PayloadAction<{ value: string[] }>) => {
      state.errorArray = action.payload.value
    },

    /**
     * エラーオブジェクト更新
     *
     * @param state
     * @param action
     */
    putErrorsObject: (state, action: PayloadAction<{ value: Object }>) => {
      state.errors = action.payload.value
    },
    // エラー削除
    deleteErrorArray: (state) => {
      state.errorArray = []
    },

    /**
     * ユーザーデータ更新
     *
     * @param state
     * @param action
     */
    putUser: (state, action: PayloadAction<{ data: Partial<UserTypes> }>) => {
      state.user = { ...state.user, ...action.payload.data }
    },

    // 処理開始
    processStart: (state) => {
      state.processing = true
    },

    // 処理終了
    processEnd: (state) => {
      state.processing = false
    },
  },
})
export const { actions } = commonReducer
