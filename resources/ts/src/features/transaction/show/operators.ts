import { AppThunk } from "@src/app/store"
import { apis } from "./api"
import { Common, ShowTransactionState } from "./types"
import { actions } from "./reducer"
import { Params } from "react-router-dom"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
import { TaxInfo } from "../TransactionTypes"

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
      const initData = apiInitResult.data["initData"]

      const initState: Partial<ShowTransactionState> = {
        common: commonData,
        transactionHead: initData["transactionHead"],
        detailRows: initData["detailRows"],
        taxInfos: commonFunc.transactionCulcTax(initData["detailRows"]),
      }

      dispatch(actions.init({ updateData: initState }))
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
