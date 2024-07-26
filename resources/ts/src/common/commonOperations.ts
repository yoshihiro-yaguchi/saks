import { AppThunk } from "@src/app/store"
import { actions } from "./commonReducer"
import { commonApis } from "./commonApi"
import { ValidateError } from "./commonTypes"
// import { apis } from './api'

export const commonOperations = {
  /**
   * 初期処理
   */
  init:
    (title: string): AppThunk =>
    async (dispatch, getState) => {
      // タブの名前を設定
      document.querySelector("title")!.textContent = title
      // csrfTokenを取得
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

  /**
   * 処理開始
   *
   * @returns
   */
  processStart: (): AppThunk => async (dispatch, getState) => {
    dispatch(actions.processStart())
    // 画面ロック
    let lock_screen = document.createElement("div")
    lock_screen.id = "screenLock"

    lock_screen.style.height = "100%"
    lock_screen.style.left = "0px"
    lock_screen.style.position = "fixed"
    lock_screen.style.top = "0px"
    lock_screen.style.width = "100%"
    lock_screen.style.zIndex = "9999"
    lock_screen.style.opacity = "0"

    let objBody = document.getElementsByTagName("body").item(0)
    objBody!.appendChild(lock_screen)
  },

  /**
   * 処理終了
   *
   * @returns
   */
  processEnd: (): AppThunk => async (dispatch, getState) => {
    dispatch(actions.processEnd())
    let screenLock = document.getElementById("screenLock")!
    screenLock?.parentNode?.removeChild(screenLock)
  },
}
