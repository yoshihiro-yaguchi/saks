import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {}

export const productUpdateState = createSlice({
  name: "productUpdateState",
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
export const { actions } = productUpdateState
