import { AppThunk } from "@src/app/store"
import {
  AmountInfo,
  StoreTransactionState,
  TransactionInfo,
  CustomerInfo,
  Common,
  initCommon,
  ValidateError,
  Office,
  InitApiResult,
} from "./types"
import { actions } from "./reducer"
import { actions as commonActions } from "@resource/ts/src/common/commonReducer"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
import { apis } from "./api"
import { AxiosResponse, isAxiosError } from "axios"
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
    dispatch(commonOperations.processStart())

    let partialState: Partial<StoreTransactionState> = {
      token: "",
      common: initCommon,
    }

    // csrfToken
    partialState.token = document.head.querySelector<HTMLMetaElement>(
      'meta[name="csrfToken"]'
    )!.content

    // 初期処理API実行
    let result: AxiosResponse<InitApiResult>
    try {
      result = await apis.init()
    } catch (error) {
      throw error
    }

    dispatch(
      actions.initHandle({
        param: partialState,
        name: getState().common.user.name,
        offices: result.data.offices,
        initOffice: result.data.offices[0].officeCode,
      })
    )
    dispatch(commonOperations.processEnd())
  },
  /**
   * 保存処理
   *
   * @returns
   */
  saveTransactionData:
    (navigate: NavigateFunction): AppThunk =>
    async (dispatch, getState) => {
      dispatch(commonOperations.processStart())
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
          dispatch(commonOperations.processEnd())
          return
        } else {
          dispatch(commonOperations.processEnd())
          throw e
        }
      }
      dispatch(commonOperations.processEnd())

      // 画面遷移
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
      dispatch(commonOperations.processStart())
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
      dispatch(commonOperations.processEnd())
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
      dispatch(commonOperations.processStart())
      const deleteIndex: number =
        getState().storeTransaction.detailRows.findIndex(
          (row) => row.productNo === productNo
        )

      dispatch(actions.deleteDetailRow({ index: deleteIndex }))
      dispatch(operations.updateTaxInfo())
      dispatch(operations.updateAmountInfo())
      dispatch(commonOperations.processEnd())
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
        taxInfos[detailRow.taxRate].taxableAmount += detailRow.totalPrice
      } else {
        const taxInfo: TaxInfo = {
          taxRate: detailRow.taxRate,
          taxableAmount: detailRow.totalPrice,
          taxAmount: 0,
        }
        taxInfos[detailRow.taxRate] = taxInfo
      }
    })

    taxInfos.forEach((taxInfo) => {
      taxInfo.taxAmount = commonFunc.culcTaxIncludeAmount(
        taxInfo.taxableAmount,
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
      subTotal += taxInfo.taxableAmount
      taxInclude += taxInfo.taxAmount
      total += taxInfo.taxableAmount
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
