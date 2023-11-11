import { AppThunk } from "@src/app/store"
import { actions as commonActions } from "@resource/ts/src/common/commonReducer"
import { actions } from "./reducer"
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
    // エラー取得
    let errors = document.body.querySelector<HTMLInputElement>("#errors")?.value
    if (errors !== undefined) {
      let errorArray = JSON.parse(errors)
      dispatch(commonActions.putErrors({ value: errorArray }))
    }

    // 旧name取得
    let name = document.body.querySelector<HTMLInputElement>("#oldName")?.value
    if (typeof name === "string") {
      dispatch(
        actions.putName({
          value: name,
        })
      )
    }

    // 旧email取得
    let email =
      document.body.querySelector<HTMLInputElement>("#oldEmail")?.value
    if (typeof email === "string") {
      dispatch(
        actions.putEmail({
          value: email,
        })
      )
    }
  },

  /** エラーアラートを閉じる */
  errorAlertClose: (): AppThunk => async (dispatch, getState) => {
    dispatch(commonActions.deleteErrorArray())
  },
}
