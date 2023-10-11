import { AppThunk } from "@src/app/store"
import { commonOperations } from "@resource/ts/src/common/commonOperations"

export const operations = {
  /**
   * 初期処理
   *
   * @returns
   */
  init: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.processStart())
    await dispatch(commonOperations.init("商品詳細"))
    dispatch(commonOperations.processEnd())
  },
}
