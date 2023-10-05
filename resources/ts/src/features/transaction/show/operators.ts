import { AppThunk } from "@src/app/store"
import { apis } from "./api"
import { Common, ShowTransactionState } from "./types"
import { actions } from "./reducer"
import { ParamParseKey, useParams } from "react-router-dom"
import { TRANSACTION_PATHS } from "../router/router"

export const operations = {
  /**
   * 初期処理
   *
   * @returns
   */
  init: (): AppThunk => async (dispatch, getState) => {
    // 共通データ
    // csrfToken
    const token = document.head.querySelector<HTMLMetaElement>(
      'meta[name="csrfToken"]'
    )!.content
    // metaInitData
    const metaInitData = JSON.parse(
      document.head.querySelector<HTMLMetaElement>('meta[name="initData"]')!
        .content
    )
    console.log(useParams<ParamParseKey<typeof TRANSACTION_PATHS.SHOW>>())
    const commonData: Common = {
      token: token,
      contractId: "",
      transactionId: metaInitData.transactionId,
    }

    // apiアクセス、データ取得
    let apiInitResult
    try {
      apiInitResult = await apis.doInit(
        metaInitData.contractId,
        metaInitData.transactionId
      )
    } catch (error) {
      throw error
    }
    const initData = apiInitResult.data["initData"]

    const initState: Partial<ShowTransactionState> = {
      common: commonData,
      transactionInfo: initData["transactionInfo"],
      customerInfo: initData["customerInfo"],
      detailRows: initData["detailRows"],
      amountInfo: initData["amountInfo"],
      // taxInfos: [],
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
