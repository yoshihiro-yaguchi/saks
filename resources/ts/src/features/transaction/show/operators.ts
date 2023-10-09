import { AppThunk } from "@src/app/store"
import { apis } from "./api"
import { Common, ShowTransactionState } from "./types"
import { actions } from "./reducer"
import { Params } from "react-router-dom"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
import FileSaver from "file-saver"

export const operations = {
  /**
   * 初期処理
   *
   * @returns
   */
  init:
    (urlParams: Readonly<Params<string>>): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.init("取引詳細"))

      // 共通データ
      // csrfToken
      const token = document.head.querySelector<HTMLMetaElement>(
        'meta[name="csrfToken"]'
      )!.content

      const commonData: Common = {
        token: token,
        contractId: "",
        transactionId: urlParams.transactionId!,
      }

      // apiアクセス、データ取得
      let apiInitResult
      try {
        apiInitResult = await apis.doInit(commonData.transactionId)
      } catch (error) {
        throw error
      }
      const initData = apiInitResult.data.transactionData

      const initState: Partial<ShowTransactionState> = {
        common: commonData,
        transactionHead: initData.transactionHead,
        detailRows: initData.detailRows,
        taxInfos: commonFunc.transactionCulcTax(initData.detailRows),
      }

      dispatch(actions.init({ updateData: initState }))
    },

  /**
   * 買取明細書・依頼書PDF
   *
   * @param urlParams
   * @returns
   */
  printPurchaseInvoice:
    (urlParams: Readonly<Params<string>>): AppThunk =>
    async (dispatch, getState) => {
      let params = new URLSearchParams()
      params.append("transactionId", urlParams.transactionId!)

      let result
      try {
        result = await apis.printPurchaseInvoice(params)
      } catch (error) {
        throw error
      }
      let mineType = result.headers["content-type"]
      const blob = new Blob([result.data], { type: mineType })
      FileSaver.saveAs(blob, "買取明細書・依頼書.pdf")
    },
}
