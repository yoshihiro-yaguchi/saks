import { AppThunk } from "@src/app/store"
import {
  DetailRow,
  TaxInfo,
  AmountInfo,
  initHandle,
  BackendData,
  initTransactionInfo,
  initCustomerInfo,
  initAmountInfo,
  initBackendData,
  transactionState,
  TransactionInfo,
  CustomerInfo,
  Common,
  initCommon,
} from "./types"
import { actions } from "./reducer"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
// import { api } from './api'

export const createTransactionOperations = {
  init: (): AppThunk => async (dispatch, getState) => {
    let state: transactionState = {
      token: "",
      common: initCommon,
      transactionInfo: initTransactionInfo,
      customerInfo: initCustomerInfo,
      detailRows: [],
      amountInfo: initAmountInfo,
      taxInfos: [],
    }

    // csrfToken
    state.token = document.head.querySelector<HTMLMetaElement>(
      'meta[name="csrfToken"]'
    )!.content
    // 共通情報
    let common: Common = {
      baseUrl: "",
      errors: "",
      errorArray: [],
    }
    // baseUrl
    common.baseUrl = document.head.querySelector<HTMLMetaElement>(
      'meta[name="baseUrl"]'
    )!.content
    // errors
    const jsonErrors = document.head.querySelector<HTMLMetaElement>(
      'meta[name="errors"]'
    )?.content
    if (typeof jsonErrors === "string") {
      let perseError = JSON.parse(jsonErrors)
      common.errors = perseError
      let arrayError: string[] = []
      Object.keys(perseError).map((key, index) =>
        perseError[key].forEach((content: string) => {
          arrayError.push(content)
        })
      )
      common.errorArray = arrayError
    }
    // stateのcommonを更新
    state.common = common

    // バックエンドからのデータ
    const jsondata =
      document.head.querySelector<HTMLMetaElement>('meta[name="data"]')?.content
    let datas = null
    if (typeof jsondata === "string") {
      datas = JSON.parse(jsondata)
      // 取引情報
      if (
        typeof datas.transactionInfo !== undefined &&
        datas.transactionInfo !== null
      ) {
        let transactionInfo: TransactionInfo = {
          transactionTitle: "",
          transactionDivision: "1",
          transactionDate: "",
          transactionBranch: "1",
          transactionPicLastName: "",
          transactionPicFirstName: "",
          transactionNote: "",
        }

        // 値があればセット
        const oldInfo = datas.transactionInfo
        transactionInfo.transactionTitle = oldInfo.transactionTitle ?? ""
        transactionInfo.transactionDivision = oldInfo.transactionDivision ?? "1"
        transactionInfo.transactionDate = oldInfo.transactionDate ?? ""
        transactionInfo.transactionBranch = oldInfo.transactionBranch ?? "1"
        transactionInfo.transactionPicFirstName =
          oldInfo.transactionPicFirstName ?? ""
        transactionInfo.transactionPicLastName =
          oldInfo.transactionPicLastName ?? ""
        transactionInfo.transactionNote = oldInfo.transactionNote ?? ""

        state.transactionInfo = transactionInfo
      }
      // お客様情報
      if (
        typeof datas.customerInfo !== undefined &&
        datas.customerInfo !== null
      ) {
        let customerInfo: CustomerInfo = {
          corporationDivision: "1",
          customerCompany: "",
          customerBranch: "",
          invoiceNumber: "",
          customerLastName: "",
          customerFirstName: "",
          customerPhoneNumber: "",
          zipCode: "",
          customerAddress1: "",
          customerAddress2: "",
          customerAddress3: "",
          customerAddress4: "",
        }

        // 値があればセット
        const oldInfo = datas.customerInfo
        customerInfo.corporationDivision = oldInfo.corporationDivision ?? "1"
        customerInfo.customerCompany = oldInfo.customerCompany ?? ""
        customerInfo.customerBranch = oldInfo.customerBranch ?? ""
        customerInfo.invoiceNumber = oldInfo.invoiceNumber ?? ""
        customerInfo.customerFirstName = oldInfo.customerFirstName ?? ""
        customerInfo.customerLastName = oldInfo.customerLastName ?? ""
        customerInfo.customerPhoneNumber = oldInfo.customerPhoneNumber ?? ""
        customerInfo.zipCode = oldInfo.zipCode ?? ""
        customerInfo.customerAddress1 = oldInfo.customerAddress1 ?? ""
        customerInfo.customerAddress2 = oldInfo.customerAddress2 ?? ""
        customerInfo.customerAddress3 = oldInfo.customerAddress3 ?? ""
        customerInfo.customerAddress4 = oldInfo.customerAddress4 ?? ""

        state.customerInfo = customerInfo
      }
      // 明細情報
      if (typeof datas.detailRows !== undefined && datas.detailRows !== null) {
        let detailRows: DetailRow[] = []
        const oldInfos = datas.detailRows

        Object.keys(oldInfos).forEach((key) => {
          let newDetailRow: DetailRow = {
            productNo: oldInfos[key]?.productNo,
            productName: oldInfos[key]?.productName,
            quantity: Number(oldInfos[key]?.quantity ?? "0"),
            unitPrice: Number(oldInfos[key]?.unitPrice ?? "0"),
            taxRate: Number(oldInfos[key]?.taxRate ?? "0"),
            totalPrice: Number(oldInfos[key]?.totalPrice ?? "0"),
          }

          detailRows.push(newDetailRow)
        })
        state.detailRows = detailRows
      }
      // 会計情報
      if (typeof datas.amountInfo !== undefined && datas.amountInfo !== null) {
        let amountInfo: AmountInfo = {
          subtotal: 0,
          taxInclude: 0,
          total: 0,
        }

        const oldInfo = datas.amountInfo

        amountInfo.subtotal = Number(oldInfo?.subtotal ?? "0")
        amountInfo.taxInclude = Number(oldInfo?.taxInclude ?? "0")
        amountInfo.total = Number(oldInfo?.total ?? "0")

        state.amountInfo = amountInfo
      }
      // 税情報
      if (typeof datas.taxInfo !== undefined && datas.taxInfo !== null) {
        let taxInfos: TaxInfo[] = state.taxInfos

        const oldInfos = datas.taxInfo

        Object.keys(oldInfos).forEach((key) => {
          let newTaxInfo: TaxInfo = {
            taxRate: Number(oldInfos[key]?.taxRate ?? "0"),
            taxableAmout: Number(oldInfos[key]?.taxableAmout ?? "0"),
            taxAmout: Number(oldInfos[key]?.taxAmout ?? "0"),
          }
          taxInfos.push(newTaxInfo)
        })

        state.taxInfos = taxInfos
      }
    }
    dispatch(actions.initHandle({ param: state }))
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
      const oldInfo: DetailRow = getState().createTransaction.detailRows[index]

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
    dispatch(actions.updateAmountInfoHandle({ treasureInfo: amountInfo }))
  },

  errorAlertClose: (): AppThunk => async (dispatch, getState) => {
    dispatch(actions.deleteErrorArray())
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
