import { AppThunk } from "@src/app/store"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { actions } from "./readucer"
import { InputState } from "./types"
import { apis } from "./apis"
import { isAxiosError } from "axios"
import { NavigateFunction } from "react-router-dom"

export const operations = {
  /**
   * 初期処理
   *
   * @returns
   */
  init: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.processStart())
    await dispatch(commonOperations.init("商品登録"))
    dispatch(commonOperations.processEnd())
  },

  /**
   * 入力更新
   *
   * @param name
   * @param value
   * @returns
   */
  handleInput:
    (name: string, value: string | number): AppThunk =>
    async (dispatch, getState) => {
      dispatch(actions.updateInput({ name: name, value: value }))
    },

  doStore:
    (navigate: NavigateFunction): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())

      const state = getState().storeProduct

      let formData = new FormData()
      Object.keys(state.inputState).forEach((key) => {
        formData.append(
          key,
          state.inputState[key as keyof InputState] as string
        )
      })

      let result
      try {
        result = await apis.doStore(formData)
      } catch (e) {
        if (
          isAxiosError(e) &&
          e.response &&
          e.response.status === 422 &&
          e.response.data.errors
        ) {
          await dispatch(commonOperations.putErrors(e.response.data.errors))
          dispatch(commonOperations.processEnd())
          return
        } else {
          dispatch(commonOperations.processEnd())
          throw e
        }
      }

      dispatch(commonOperations.processEnd())
      navigate("/product/search")
    },
}
