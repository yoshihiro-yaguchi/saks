import { AppThunk } from "@src/app/store"
import { detailRow } from "./types"
import { actions } from "./reducer"
// import { api } from './api'

export const createTransactionOperations = {
  submit: (): AppThunk => async (dispatch, getState) => {
    let form = document.querySelector<HTMLFormElement>(
      'form[id="createTransaction"]'
    )
    if (form !== null) {
      form.submit()
    }
  },

  addDetailRow:
    (productName: string): AppThunk =>
    async (dispatch, getState) => {
      const key = Math.random().toString(32).substring(2)
      const row: detailRow = {
        productNo: key,
        productName: productName,
        quantity: 10,
        unitPrice: 999999999,
        taxRate: 10,
        totalPrice: 999999999,
      }

      dispatch(actions.addDetailRow({ value: row }))
    },

  deleteDetailRow:
    (productNo: string): AppThunk =>
    async (dispatch, getState) => {
      const deleteIndex: number =
        getState().createTransaction.detailRows.findIndex(
          (row) => row.productNo === productNo
        )

      dispatch(actions.deleteDetailRow({ index: deleteIndex }))
    },

  /**
   * サンプル
   */
  // sample: (): AppThunk => async (dispatch, getState) => {
  //   const target = getState().#{STATES_NAME}.#{STATE_NAME}

  //   let params = new URLSearchParams()
  //   params.append('companyName', target.#{target1})

  //   const result = await api.doPost(params)
  //   dispatch(#{actions})
  // },
}
