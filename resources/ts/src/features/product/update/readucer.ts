import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  ApiDoGetProduct,
  initInputState,
  InputState,
  UpdateProduct,
} from "./types"

const initialState: UpdateProduct = {
  inputState: initInputState,
}

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
    updateInput: (
      state,
      action: PayloadAction<{ name: string; value: string | number }>
    ) => {
      state.inputState[action.payload.name as keyof InputState] =
        action.payload.value
    },

    init: (state, action: PayloadAction<{ data: ApiDoGetProduct }>) => {
      const product = action.payload.data.product

      state.inputState.productionCode = product.productionCode
      state.inputState.productionName = product.productionName
      state.inputState.taxDivision = product.taxDivision
      state.inputState.taxRate = Math.floor(product.taxRate)
      state.inputState.unit = product.unit
      state.inputState.unitPrice = Math.floor(product.unitPrice)
    },
  },
})
export const { actions } = productUpdateState
