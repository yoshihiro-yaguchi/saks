import { AppThunk } from "@src/app/store"
import {
  DetailRow,
  TaxInfo,
  AmountInfo,
  StoreTransactionState,
  TransactionInfo,
  CustomerInfo,
  Common,
  initCommon,
  ValidateError,
} from "./types"
import { actions } from "./reducer"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
import { apis } from "./api"
import { isAxiosError } from "axios"

export const operations = {
  init: (): AppThunk => async (dispatch, getState) => {
    dispatch(actions.processStart())
    let partialState: Partial<StoreTransactionState> = {
      token: "",
      common: initCommon,
    }

    // csrfToken
    partialState.token = document.head.querySelector<HTMLMetaElement>(
      'meta[name="csrfToken"]'
    )!.content
    // baseUrl
    let common: Common = {
      baseUrl: "",
      errors: [],
      errorArray: [],
    }
    if (partialState.common !== undefined) {
      common.baseUrl = document.head.querySelector<HTMLMetaElement>(
        'meta[name="baseUrl"]'
      )!.content
      partialState.common = common
    }
    dispatch(actions.initHandle({ param: partialState }))
    dispatch(actions.processEnd())
  },
  /**
   * 保存処理
   *
   * @returns
   */
  submit: (): AppThunk => async (dispatch, getState) => {
    dispatch(actions.processStart())
    const createTransactionState = getState().storeTransaction
    const postData = {
      transactionInfo: JSON.stringify(createTransactionState.transactionInfo),
    }

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
      apiResult = await apis.postTest(
        formData,
        createTransactionState.common.baseUrl
      )
    } catch (e) {
      if (
        isAxiosError(e) &&
        e.response &&
        e.response.status === 422 &&
        e.response.data.errors
      ) {
        // laravelでvalidation errorが発生したとき
        dispatch(operations.putErrors(e.response.data.errors))
        dispatch(actions.processEnd())
        return
      } else {
        dispatch(actions.processEnd())
        throw e
      }
    }
    dispatch(actions.processEnd())

    location.href = `${getState().storeTransaction.common.baseUrl}/${
      apiResult.data.contractId
    }/transaction/${apiResult.data.transactionId}`
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
      dispatch(actions.processStart())
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
      dispatch(actions.processEnd())
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
      dispatch(actions.processStart())
      const deleteIndex: number =
        getState().storeTransaction.detailRows.findIndex(
          (row) => row.productNo === productNo
        )

      dispatch(actions.deleteDetailRow({ index: deleteIndex }))
      dispatch(operations.updateTaxInfo())
      dispatch(operations.updateAmountInfo())
      dispatch(actions.processEnd())
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
