import { AppThunk } from "@src/app/store"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { actions } from "./reducer"

export const operations = {
  /**
   * 初期処理
   *
   * @returns
   */
  init: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.processStart())
    await dispatch(commonOperations.init("取引設定"))
    dispatch(commonOperations.processEnd())
  },

  /**
   * 設定更新
   *
   * @returns
   */
  updateSettings:
    (name: string, value: boolean): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())

      await dispatch(
        actions.updateInputs({
          state: {
            [name]: value,
          },
        })
      )

      // ステートの情報をもとにリクエストを作成する。
      let settings = getState().settingTransaction.inputs
      console.log(settings)

      dispatch(commonOperations.processEnd())
    },
}
