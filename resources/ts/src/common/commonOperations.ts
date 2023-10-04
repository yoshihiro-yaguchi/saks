import { AppThunk } from "@src/app/store"
import { actions } from "./commonReducer"
import { commonApis } from "./commonApi"
import { ValidateError } from "./commonTypes"
import { userInfo } from "os"
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

    const userInfoResult = await commonApis.fetchUserInfo()
    dispatch(
      actions.putUser({
        data: {
          name: userInfoResult.data.name,
        },
      })
    )
  },

  // エラー更新
  putErrors:
    (validateErrors: ValidateError): AppThunk =>
    async (dispatch, getState) => {
      // オブジェクトのままエラーを入れておく
      dispatch(actions.putErrorsObject({ value: validateErrors }))

      // エラーの配列を作成する。
      let errorArray: string[] = []
      Object.keys(validateErrors).forEach((key) => {
        validateErrors[key].forEach((error: string) => {
          errorArray.push(error)
        })
      })
      dispatch(actions.putErrors({ value: errorArray }))
    },

  /** エラーアラートを閉じる */
  errorAlertClose: (): AppThunk => async (dispatch, getState) => {
    dispatch(actions.deleteErrorArray())
  },
}
