import { AppThunk } from "@src/app/store"
import { apis } from "./api"
import { Common, ShowTransactionState } from "./types"
import { actions } from "./reducer"

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
    // baseUrl
    const baseUrl = document.head.querySelector<HTMLMetaElement>(
      'meta[name="baseUrl"]'
    )!.content
    // metaInitData
    const metaInitData = JSON.parse(
      document.head.querySelector<HTMLMetaElement>('meta[name="initData"]')!
        .content
    )
    const commonData: Common = {
      token: token,
      baseUrl: baseUrl,
      contractId: metaInitData.contractId,
      transactionId: metaInitData.transactionId,
    }

    // apiアクセス、データ取得
    let apiInitResult
    try {
      apiInitResult = await apis.doInit(
        baseUrl,
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
