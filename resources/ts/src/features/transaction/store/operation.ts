import { AppThunk } from "@src/app/store"
import {
  AmountInfo,
  StoreTransactionState,
  TransactionInfo,
  Common,
  initCommon,
  ValidateError,
  InitApiResult,
} from "./types"
import { actions } from "./reducer"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
import { apis } from "./api"
import { AxiosResponse, isAxiosError } from "axios"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { NavigateFunction } from "react-router-dom"
import { DetailRow, TaxInfo } from "../TransactionTypes"
import { modalSearchProductOperations } from "@resource/ts/src/features/transaction/common/modalSearchProduction/operations"

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
      dispatch(commonOperations.processEnd())
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
   * 明細削除
   *
   * @param productNo
   * @returns
   */
  clearRowButtonHandle:
    (index: number): AppThunk =>
    async (dispatch, getState) => {
      dispatch(commonOperations.processStart())
      dispatch(actions.clearRow({ index: index }))
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

  // 明細行商品Noブラーハンドル
  productNoBlurHandle:
    (index: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())

      const oldInfo = getState().storeTransaction.detailRows[index]
      const condtion = new URLSearchParams()

      condtion.append("productionCode", oldInfo.productNo)
      let result
      try {
        result = await apis.getProductByCode(condtion)
      } catch (e) {
        if (
          isAxiosError(e) &&
          e.response &&
          e.response.status === 422 &&
          e.response.data.errors
        ) {
          // laravelでvalidation errorが発生したとき
          await dispatch(commonOperations.putErrors(e.response.data.errors))
          dispatch(commonOperations.processEnd())
          return
        } else {
          dispatch(commonOperations.processEnd())
          throw e
        }
      }
      if (result.data.product !== null) {
        const product = result.data.product
        const updateData: Partial<DetailRow> = {
          productName: product.productionName,
          unit: product.unit,
          unitPrice: Math.floor(product.unitPrice),
          taxRate: Math.floor(product.taxRate),
        }

        let newDetailRow = {
          ...oldInfo,
          ...updateData,
        }

        // 合計金額更新
        newDetailRow.totalPrice = newDetailRow.quantity * newDetailRow.unitPrice

        await dispatch(
          actions.updateDetailRowHandle({
            index: index,
            params: newDetailRow,
          })
        )
      } else {
        const updateData: Partial<DetailRow> = {
          productName: "",
          unit: "",
          unitPrice: 0,
          taxRate: 10,
        }

        let newDetailRow = {
          ...oldInfo,
          ...updateData,
        }

        // 合計金額更新
        newDetailRow.totalPrice = newDetailRow.quantity * newDetailRow.unitPrice

        await dispatch(
          actions.updateDetailRowHandle({
            index: index,
            params: newDetailRow,
          })
        )
      }

      dispatch(operations.updateTaxInfo())
      dispatch(operations.updateAmountInfo())
      dispatch(commonOperations.errorAlertClose())

      dispatch(commonOperations.processEnd())
    },

  /**
   * 商品検索モーダル
   *
   * @returns
   */
  openModalTransactionSearchProduct:
    (index: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())
      await dispatch(modalSearchProductOperations.open(index))
      dispatch(commonOperations.processEnd())
    },

  /**
   * 商品検索モーダルからのデータ受け取り
   *
   * @returns
   */
  receiveModalTransactionSearchProduct:
    (index: number): AppThunk =>
    async (dispatch, getState) => {
      const inputState = getState().transactionModalSearchProduction.input
      const row: DetailRow = {
        productNo: inputState.productionCode,
        productName: inputState.productionName,
        quantity: inputState.quantity,
        unitPrice: inputState.unitPrice,
        taxRate: inputState.taxRate,
        totalPrice: 0,
        unit: inputState.unit,
      }
      row.totalPrice = row.quantity * row.unitPrice

      const newDetailRow = {
        ...getState().storeTransaction.detailRows[index],
        ...row,
      }

      await dispatch(
        actions.updateDetailRowHandle({
          index: index,
          params: newDetailRow,
        })
      )
    },
}
