import { AppThunk } from "@src/app/store"
import {
  StoreTransactionState,
  Common,
  initCommon,
  ValidateError,
  InitApiResult,
  TransactionHead,
} from "./types"
import { actions } from "./reducer"
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
  init:
    (transactionId: string): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.init("取引作成"))
      dispatch(commonOperations.processStart())

      let partialState: Partial<StoreTransactionState> = {
        common: initCommon,
      }

      const params = new URLSearchParams()
      params.append("transactionId", transactionId)

      // 初期処理API実行
      let result: AxiosResponse<InitApiResult>
      try {
        result = await apis.init(params)
      } catch (error) {
        dispatch(commonOperations.processEnd())
        throw error
      }

      dispatch(
        actions.initHandle({
          param: partialState,
          transactionData: result.data,
        })
      )
      dispatch(commonOperations.processEnd())
    },
  /**
   * 更新処理
   *
   * @returns
   */
  updateTransactionData:
    (navigate: NavigateFunction): AppThunk =>
    async (dispatch, getState) => {
      dispatch(commonOperations.processStart())
      const createTransactionState = getState().updateTransaction

      let formData = new FormData()
      // 取引ヘッダー
      Object.keys(createTransactionState.transactionHead).forEach((key) => {
        console.log(
          `key: ${key}, value: ${
            createTransactionState.transactionHead[key as keyof TransactionHead]
          }`
        )
        formData.append(
          `${key}`,
          createTransactionState.transactionHead[
            key as keyof TransactionHead
          ] as unknown as string
        )
      })

      // 明細情報
      Object.keys(createTransactionState.detailRows).forEach((index) => {
        const detailRow =
          createTransactionState.detailRows[index as unknown as number]
        Object.keys(detailRow).forEach((key) => {
          console.log(
            `key: detailRows[${index}][${key}], value: ${
              detailRow[key as keyof DetailRow] as string
            }`
          )
          const value = detailRow[key as keyof DetailRow] as string
          formData.append(`detailRows[${index}][${key}]`, value)
        })
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
        apiResult = await apis.updateTransactionData(formData)
      } catch (e) {
        if (
          isAxiosError(e) &&
          e.response &&
          e.response.status === 422 &&
          e.response.data.errors
        ) {
          // laravelでvalidation errorが発生したとき
          console.log(e.response.data.errors)
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
  deleteDetailRow:
    (productNo: string): AppThunk =>
    async (dispatch, getState) => {
      dispatch(commonOperations.processStart())
      const deleteIndex: number =
        getState().updateTransaction.detailRows.findIndex(
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
      const oldInfo: DetailRow = getState().updateTransaction.detailRows[index]

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
    const detailRows = getState().updateTransaction.detailRows

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
    const taxInfos: TaxInfo[] = getState().updateTransaction.taxInfos
    let subTotal: number = 0
    let taxInclude: number = 0
    let total: number = 0
    taxInfos.forEach((taxInfo) => {
      subTotal += taxInfo.taxableAmount
      taxInclude += taxInfo.taxAmount
      total += taxInfo.taxableAmount
    })

    const amountInfo: Partial<TransactionHead> = {
      subtotal: subTotal,
      taxInclude: taxInclude,
      total: total,
    }
    dispatch(actions.bulkUpdateTransactionHeadHandle({ data: amountInfo }))
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
    const zipCode = getState().updateTransaction.transactionHead.customerZipCode
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

    const newCustomerInfo: Partial<TransactionHead> = {
      customerAddress1: address["address1"],
      customerAddress2: address["address2"],
      customerAddress3: address["address3"],
    }

    dispatch(
      actions.bulkUpdateTransactionHeadHandle({
        data: newCustomerInfo,
      })
    )
  },

  modalSearch: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.processStart())

    const modal = getState().updateTransaction.modal
    const condition = new URLSearchParams()

    condition.append("productionCode", modal.searchCondition.productionCode)
    condition.append("productionName", modal.searchCondition.productionName)
    condition.append("productionName", modal.searchCondition.productionName)

    condition.append("page", modal.paginate.pages.toString())
    condition.append("itemsPerPage", modal.paginate.itemsPerPage.toString())

    // データ取得
    let result
    try {
      result = await apis.getProducts(condition)
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
    await dispatch(commonOperations.errorAlertClose())
    await dispatch(
      actions.modalUpdateSearchResult({ data: result.data.products })
    )
    await dispatch(
      actions.modalBuldUpdatePaginate({
        data: {
          count: result.data.count,
          maxPages: Math.ceil(
            result.data.count /
              getState().updateTransaction.modal.paginate.itemsPerPage
          ),
          pages: 1,
        },
      })
    )
    dispatch(commonOperations.processEnd())
  },

  // ページ変更
  modalPerPage:
    (page: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())
      await dispatch(
        actions.modalBuldUpdatePaginate({
          data: {
            pages: page,
          },
        })
      )

      const modal = getState().updateTransaction.modal
      const condition = new URLSearchParams()

      condition.append("productionCode", modal.searchCondition.productionCode)
      condition.append("productionName", modal.searchCondition.productionName)
      condition.append("productionName", modal.searchCondition.productionName)

      condition.append("page", modal.paginate.pages.toString())
      condition.append("itemsPerPage", modal.paginate.itemsPerPage.toString())

      // データ取得
      let result
      try {
        result = await apis.getProducts(condition)
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
      await dispatch(commonOperations.errorAlertClose())
      await dispatch(
        actions.modalUpdateSearchResult({ data: result.data.products })
      )
      await dispatch(
        actions.modalBuldUpdatePaginate({
          data: {
            count: result.data.count,
            maxPages: Math.ceil(
              result.data.count /
                getState().updateTransaction.modal.paginate.itemsPerPage
            ),
          },
        })
      )
      dispatch(commonOperations.processEnd())
    },

  // モーダル内行クリック時の処理
  modalRowClickHandle:
    (index: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())
      const clickData = getState().updateTransaction.modal.searchResult[index]
      const updateData = {
        productionCode: clickData.productionCode,
        productionName: clickData.productionName,
        quantity: 1,
        unitPrice: Math.floor(clickData.unitPrice),
        unit: clickData.unit,
        taxRate: Math.floor(clickData.taxRate),
      }
      await dispatch(actions.modalBulkInputData({ data: updateData }))
      dispatch(commonOperations.processEnd())
    },

  /**
   * 明細追加
   *
   * @param productName
   * @returns
   */
  modalAddDetailRow: (): AppThunk => async (dispatch, getState) => {
    dispatch(commonOperations.processStart())
    const key = Math.random().toString(32).substring(2)
    const modalInput = getState().updateTransaction.modal.input
    const row: DetailRow = {
      productNo: modalInput.productionCode,
      productName: modalInput.productionName,
      quantity: modalInput.quantity,
      unitPrice: modalInput.unitPrice,
      taxRate: modalInput.taxRate,
      totalPrice: 0,
      unit: modalInput.unit,
    }

    row.totalPrice = row.quantity * row.unitPrice

    await dispatch(actions.addDetailRow({ value: row }))
    await dispatch(operations.updateTaxInfo())
    await dispatch(operations.updateAmountInfo())
    await dispatch(actions.closeModal())
    dispatch(commonOperations.processEnd())
  },
  /**
   * 明細追加
   *
   * @param productName
   * @returns
   */
  modalContinueAddDetailRow: (): AppThunk => async (dispatch, getState) => {
    dispatch(commonOperations.processStart())
    const key = Math.random().toString(32).substring(2)
    const modalInput = getState().updateTransaction.modal.input
    const row: DetailRow = {
      productNo: modalInput.productionCode,
      productName: modalInput.productionName,
      quantity: modalInput.quantity,
      unitPrice: modalInput.unitPrice,
      taxRate: modalInput.taxRate,
      totalPrice: 0,
      unit: modalInput.unit,
    }

    row.totalPrice = row.quantity * row.unitPrice

    await dispatch(actions.addDetailRow({ value: row }))
    await dispatch(operations.updateTaxInfo())
    await dispatch(operations.updateAmountInfo())
    await dispatch(actions.modalResetInputData())
    dispatch(commonOperations.processEnd())
  },
}
