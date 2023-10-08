import { AppThunk } from "@src/app/store"
import { actions } from "./commonReducer"
import { commonApis } from "./commonApi"
import { ValidateError } from "./commonTypes"
import { userInfo } from "os"
// import { apis } from './api'

export const commonOperations = {
  /**
   * 初期処理
   */
  init:
    (title: string): AppThunk =>
    async (dispatch, getState) => {
      document.querySelector("title")!.textContent = title
      const token = document.head.querySelector<HTMLMetaElement>(
        'meta[name="csrfToken"]'
      )!.content

      await dispatch(actions.reset())
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
