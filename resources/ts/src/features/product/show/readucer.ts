import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {}

export const productShowState = createSlice({
  name: "productShowState",
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
export const { actions } = productShowState
