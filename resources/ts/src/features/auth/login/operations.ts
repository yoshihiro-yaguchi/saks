import { AppThunk } from "@src/app/store"
import { actions } from "@resource/ts/src/common/commonReducer"
// import { apis } from './api'

export const operations = {
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

  /** 初期処理 */
  init: (): AppThunk => async (dispatch, getState) => {
    let errors = document.body.querySelector<HTMLInputElement>("#errors")?.value
    if (errors !== undefined) {
      let errorArray = JSON.parse(errors)
      dispatch(actions.putErrors({ value: errorArray }))
    }
  },

  /** エラーアラートを閉じる */
  errorAlertClose: (): AppThunk => async (dispatch, getState) => {
    dispatch(actions.deleteErrorArray())
  },
}
