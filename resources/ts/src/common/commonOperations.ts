import { AppThunk } from "@src/app/store"
import { actions } from "./commonReducer"
// import { apis } from './api'

export const commonOperations = {
  /**
   * サンプル
   */
  // sample: (): AppThunk => async (dispatch, getState) => {
  //   const target = getState().#{STATES_NAME}.#{STATE_NAME}

  //   let params = new URLSearchParams()
  //   params.append('companyName', target.#{target1})

  //   const result = await apis.doPost(params)
  //   dispatch(#{actions})
  // },

  /**
   * 初期処理
   */
  init: (): AppThunk => async (dispatch, getState) => {
    const token = document.head.querySelector<HTMLMetaElement>(
      'meta[name="csrfToken"]'
    )!.content
    dispatch(actions.updateCsrfToken({ csrfToken: token }))
  },
}
