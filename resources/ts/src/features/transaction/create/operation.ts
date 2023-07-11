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

  changeDetailRow:
    (index: number, name: string, value: string | number): AppThunk =>
    async (dispatch, getState) => {
      const oldDetailRow = getState().createTransaction.detailRows[index]

      const newDetailRow: detailRow = {
        productNo:
          name === "productNo" ? (value as string) : oldDetailRow.productNo,
        productName:
          name === "productName" ? (value as string) : oldDetailRow.productName,
        quantity:
          name === "quantity" ? (value as number) : oldDetailRow.quantity,
        unitPrice:
          name === "unitPrice" ? (value as number) : oldDetailRow.unitPrice,
        taxRate: name === "taxRate" ? (value as number) : oldDetailRow.taxRate,
        totalPrice: 0,
      }
      // 合計金額計算
      const totalPrice = newDetailRow.unitPrice * newDetailRow.quantity
      newDetailRow.totalPrice = totalPrice

      dispatch(
        actions.changeDetailRowHandle({ index: index, data: newDetailRow })
      )
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
