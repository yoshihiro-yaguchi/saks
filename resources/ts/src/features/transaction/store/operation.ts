import { AppThunk } from "@src/app/store"
import {
  AmountInfo,
  StoreTransactionState,
  TransactionInfo,
  CustomerInfo,
  Common,
  initCommon,
  ValidateError,
} from "./types"
import { actions } from "./reducer"
import { actions as commonActions } from "@resource/ts/src/common/commonReducer"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
import { apis } from "./api"
import { isAxiosError } from "axios"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { NavigateFunction } from "react-router-dom"
import { DetailRow, TaxInfo } from "../TransactionTypes"

export const operations = {
  /**
   * 初期処理
   *
   * @returns
   */
  init: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.init("取引作成"))
    dispatch(commonActions.processStart())

    let partialState: Partial<StoreTransactionState> = {
      token: "",
      common: initCommon,
    }

    // csrfToken
    partialState.token = document.head.querySelector<HTMLMetaElement>(
      'meta[name="csrfToken"]'
    )!.content
    dispatch(actions.initHandle({ param: partialState }))
    dispatch(commonActions.processEnd())
  },
  /**
   * 保存処理
   *
   * @returns
   */
  saveTransactionData:
    (navigate: NavigateFunction): AppThunk =>
    async (dispatch, getState) => {
      dispatch(commonActions.processStart())
      const createTransactionState = getState().storeTransaction

      let formData = new FormData()
      // 取引データ
      Object.keys(createTransactionState.transactionInfo).forEach((key) => {
        formData.append(
          `transactionInfo[${key}]`,
          createTransactionState.transactionInfo[key as keyof TransactionInfo]
        )
      })

      // お客様情報
      Object.keys(createTransactionState.customerInfo).forEach((key) => {
        formData.append(
          `customerInfo[${key}]`,
          createTransactionState.customerInfo[key as keyof CustomerInfo]
        )
      })

      // 明細情報
      Object.keys(createTransactionState.detailRows).forEach((index) => {
        const detailRow =
          createTransactionState.detailRows[index as unknown as number]
        Object.keys(detailRow).forEach((key) => {
          const value = detailRow[key as keyof DetailRow] as string
          formData.append(`detailRows[${index}][${key}]`, value)
        })
      })

      // 会計情報
      Object.keys(createTransactionState.amountInfo).forEach((key) => {
        formData.append(
          `amountInfo[${key}]`,
          createTransactionState.amountInfo[
            key as keyof AmountInfo
          ] as unknown as string
        )
      })

      // 税情報
      Object.keys(createTransactionState.taxInfos).forEach((index) => {
        const taxInfo =
          createTransactionState.taxInfos[index as unknown as number]
        Object.keys(taxInfo).forEach((key) => {
          const value = taxInfo[key as keyof TaxInfo] as unknown as string
          formData.append(`taxInfos[${index}][${key}]`, value)
        })
      })

      let apiResult
      try {
        apiResult = await apis.saveTransactionData(formData)
      } catch (e) {
        if (
          isAxiosError(e) &&
          e.response &&
          e.response.status === 422 &&
          e.response.data.errors
        ) {
          // laravelでvalidation errorが発生したとき
          dispatch(operations.putErrors(e.response.data.errors))
          dispatch(commonActions.processEnd())
          return
        } else {
          dispatch(commonActions.processEnd())
          throw e
        }
      }
      dispatch(commonActions.processEnd())

      // 画面遷移
      console.log(`/transaction/show/${apiResult.data.transactionId}`)
      navigate(`/transaction/show/${apiResult.data.transactionId}`)
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
      dispatch(commonActions.processStart())
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
      dispatch(operations.updateTaxInfo())
      dispatch(operations.updateAmountInfo())
      dispatch(commonActions.processEnd())
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
      dispatch(commonActions.processStart())
      const deleteIndex: number =
        getState().storeTransaction.detailRows.findIndex(
          (row) => row.productNo === productNo
        )

      dispatch(actions.deleteDetailRow({ index: deleteIndex }))
      dispatch(operations.updateTaxInfo())
      dispatch(operations.updateAmountInfo())
      dispatch(commonActions.processEnd())
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
      const oldInfo: DetailRow = getState().storeTransaction.detailRows[index]

      const updateData: Partial<DetailRow> = { [name]: value }

      let newDetailRow = {
        ...oldInfo,
        ...updateData,
      }

      // 合計金額更新
      newDetailRow.totalPrice = newDetailRow.quantity * newDetailRow.unitPrice

      dispatch(
        actions.updateDetailRowHandle({
          index: index,
          params: newDetailRow,
        })
      )
      dispatch(operations.updateTaxInfo())
      dispatch(operations.updateAmountInfo())
    },

  /**
   * 税情報更新
   *
   * @returns
   */
  updateTaxInfo: (): AppThunk => async (dispatch, getState) => {
    const detailRows = getState().storeTransaction.detailRows

    const taxInfos: TaxInfo[] = []

    detailRows.forEach((detailRow) => {
      if (detailRow.taxRate in taxInfos) {
        taxInfos[detailRow.taxRate].taxableAmout += detailRow.totalPrice
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
    const taxInfos: TaxInfo[] = getState().storeTransaction.taxInfos
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
    dispatch(actions.updateAmountInfoHandle({ treasureInfo: amountInfo }))
  },

  /** エラーアラートを閉じる */
  errorAlertClose: (): AppThunk => async (dispatch, getState) => {
    dispatch(actions.deleteErrorArray())
  },

  // エラー更新
  putErrors:
    (validateErrors: ValidateError): AppThunk =>
    async (dispatch, getState) => {
      let common: Partial<Common> = {}
      common.errors = validateErrors

      let errorArray: string[] = []
      Object.keys(validateErrors).forEach((key) => {
        validateErrors[key].forEach((error: string) => {
          errorArray.push(error)
        })
      })
      common.errorArray = errorArray

      dispatch(actions.updateCommon({ common: common }))
    },

  // 郵便番号アウトフォーカス
  zipCodeOnBlur: (): AppThunk => async (dispatch, getState) => {
    const zipCode = getState().storeTransaction.customerInfo.zipCode
    if (zipCode.length !== 7) {
      return
    }

    let params = new URLSearchParams()
    params.append("zipcode", zipCode)
    let apiResult
    try {
      apiResult = await apis.getAddress(params)
    } catch (error) {
      throw error
    }

    if (!Array.isArray(apiResult.data["results"])) {
      // 住所検索にヒットしなかった場合(ヒットしなかった場合、resultsは配列では帰ってこない)
      return
    }
    // TODO: 1つの郵便番号に紐づく住所が2つ以上ある場合を考慮する。
    const address = apiResult.data["results"][0]

    const newCustomerInfo: Partial<CustomerInfo> = {
      customerAddress1: address["address1"],
      customerAddress2: address["address2"],
      customerAddress3: address["address3"],
    }

    dispatch(actions.updateCustomerInfo({ newCustomerInfo: newCustomerInfo }))
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
