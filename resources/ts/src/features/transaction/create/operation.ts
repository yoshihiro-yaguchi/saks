import { AppThunk } from "@src/app/store"
import { DetailRow, TaxInfo, AmountInfo } from "./types"
import { actions } from "./reducer"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
// import { api } from './api'

export const createTransactionOperations = {
  init: (): AppThunk => async (dispatch, getState) => {
    let bladeCsrfToken = document.head.querySelector<HTMLMetaElement>(
      'meta[name="csrfToken"]'
    )!.content
    // baseUrl
    let baseUrl = document.head.querySelector<HTMLMetaElement>(
      'meta[name="baseUrl"]'
    )!.content
    // errors
    let errors: string[] = []
    document.head
      .querySelectorAll<HTMLMetaElement>('meta[name="errors"]')
      ?.forEach((error) => {
        errors.push(error.content)
      })
    console.log(errors)
    // バックエンドからのデータ
    let data = document.head.querySelector<HTMLMetaElement>(
      'meta[name="data"]'
    )?.content
    let arrayData = null
    if (typeof data === "string") {
      arrayData = JSON.parse(data)
      console.log(arrayData)
    }

    dispatch(actions.setToken({ token: bladeCsrfToken }))
    dispatch(actions.setBaseUrl({ baseUrl: baseUrl }))
  },
  /**
   * 保存処理
   *
   * @returns
   */
  submit: (): AppThunk => async (dispatch, getState) => {
    let form = document.querySelector<HTMLFormElement>(
      'form[id="createTransaction"]'
    )
    if (form !== null) {
      form.submit()
    }
  },

  /**
   * 明細追加
   *
   * @param productName
   * @returns
   */
  addDetailRow:
    (productName: string): AppThunk =>
    async (dispatch, getState) => {
      const key = Math.random().toString(32).substring(2)
      const row: DetailRow = {
        productNo: key,
        productName: productName,
        quantity: 10,
        unitPrice: 500,
        taxRate: 10,
        totalPrice: 0,
      }
      row.totalPrice = row.quantity * row.unitPrice

      dispatch(actions.addDetailRow({ value: row }))
      dispatch(createTransactionOperations.updateTaxInfo())
      dispatch(createTransactionOperations.updateAmountInfo())
    },

  /**
   * 明細削除
   *
   * @param productNo
   * @returns
   */
  deleteDetailRow:
    (productNo: string): AppThunk =>
    async (dispatch, getState) => {
      const deleteIndex: number =
        getState().createTransaction.detailRows.findIndex(
          (row) => row.productNo === productNo
        )

      dispatch(actions.deleteDetailRow({ index: deleteIndex }))
      dispatch(createTransactionOperations.updateTaxInfo())
      dispatch(createTransactionOperations.updateAmountInfo())
    },

  /**
   * 明細情報更新
   *
   * @param index
   * @param name
   * @param value
   * @returns
   */
  updateDetailRow:
    (index: number, name: string, value: string | number): AppThunk =>
    async (dispatch, getState) => {
      let oldDetailRow =
        getState().createTransaction.detailRows[index]

      const newDetailRow: DetailRow = {
        productNo:
          name === "productNo"
            ? (value as string)
            : oldDetailRow.productNo,
        productName:
          name === "productName"
            ? (value as string)
            : oldDetailRow.productName,
        quantity:
          name === "quantity"
            ? (value as number)
            : oldDetailRow.quantity,
        unitPrice:
          name === "unitPrice"
            ? (value as number)
            : oldDetailRow.unitPrice,
        taxRate:
          name === "taxRate"
            ? (value as number)
            : oldDetailRow.taxRate,
        totalPrice: 0,
      }
      // 合計金額計算
      const totalPrice =
        newDetailRow.unitPrice * newDetailRow.quantity
      newDetailRow.totalPrice = totalPrice

      dispatch(
        actions.updateDetailRowHandle({
          index: index,
          data: newDetailRow,
        })
      )
      dispatch(createTransactionOperations.updateTaxInfo())
      dispatch(createTransactionOperations.updateAmountInfo())
    },

  /**
   * 税情報更新
   *
   * @returns
   */
  updateTaxInfo: (): AppThunk => async (dispatch, getState) => {
    const detailRows = getState().createTransaction.detailRows

    const taxInfos: TaxInfo[] = []

    detailRows.forEach((detailRow) => {
      if (detailRow.taxRate in taxInfos) {
        taxInfos[detailRow.taxRate].taxableAmout +=
          detailRow.totalPrice
      } else {
        const taxInfo: TaxInfo = {
          taxRate: detailRow.taxRate,
          taxableAmout: detailRow.totalPrice,
          taxAmout: 0,
        }
        taxInfos[detailRow.taxRate] = taxInfo
      }
    })

    taxInfos.forEach((taxInfo) => {
      taxInfo.taxAmout = commonFunc.culcTaxIncludeAmount(
        taxInfo.taxableAmout,
        taxInfo.taxRate
      )
    })

    dispatch(actions.updateTaxInfoHandle({ taxInfo: taxInfos }))
  },

  /**
   * 会計情報更新
   *
   * @returns
   */
  updateAmountInfo: (): AppThunk => async (dispatch, getState) => {
    const taxInfos: TaxInfo[] = getState().createTransaction.taxInfos
    let subTotal: number = 0
    let taxInclude: number = 0
    let total: number = 0
    taxInfos.forEach((taxInfo) => {
      subTotal += taxInfo.taxableAmout
      taxInclude += taxInfo.taxAmout
      total += taxInfo.taxableAmout
    })

    const amountInfo: AmountInfo = {
      subtotal: subTotal,
      taxInclude: taxInclude,
      total: total,
    }
    dispatch(
      actions.updateAmountInfoHandle({ treasureInfo: amountInfo })
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
