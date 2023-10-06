import { AppThunk } from "@src/app/store"
import { apis } from "./api"
import { commonOperations } from "@resource/ts/src/common/commonOperations"

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

  init: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.init("取引編集"))
  },
}
