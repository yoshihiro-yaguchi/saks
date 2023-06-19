import { AppThunk } from "src/app/store"
import { indexRow } from "./types"
import { actions } from "./reducer"

export const createTransactionOperations = {
  onLoad: (): AppThunk => async (dispatch, getState) => {
    const row: indexRow = {
      productId: 0,
      productName: "商品名",
      quantity: 10,
      unitPrice: 120,
      taxRate: 10,
      totalPrice: 1200,
    }

    dispatch(actions.pushRow({ value: row }))
  },

  pushAddRowButton: (): AppThunk => async (dispatch, getState) => {
    const key = Math.floor(Math.random() * (1000 + 1 - 1) + 1)
    const row: indexRow = {
      productId: key,
      productName: "商品名",
      quantity: 10,
      unitPrice: 120,
      taxRate: 10,
      totalPrice: 1200,
    }

    dispatch(actions.pushRow({ value: row }))
  },

  pushDeleteRowButton: (): AppThunk => async (dispatch, getState, key) => {},
}
