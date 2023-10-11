import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initInputState, InputState, StoreProduct } from "./types"

const initialState: StoreProduct = {
  inputState: initInputState,
}

export const productStoreState = createSlice({
  name: "productStoreState",
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
    updateInput: (
      state,
      action: PayloadAction<{ name: string; value: string | number }>
    ) => {
      state.inputState[action.payload.name as keyof InputState] =
        action.payload.value
    },
  },
})
export const { actions } = productStoreState
