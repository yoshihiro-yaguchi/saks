import { AppThunk } from "@src/app/store"
// import { api } from './api'

export const contactOperations = {
  submit: (): AppThunk => async (dispatch, getState) => {
    let request = new XMLHttpRequest()

    // request.open('POST', )
  },

  /**
   * サンプル
   */
  // sample: (): AppThunk => async (dispatch, getState) => {
  //   const target = getState().#{STATES_NAME}.#{STATE_NAME}

  //   let params = new URLSearchParams()
  //   params.append('companyName', target.#{target1})

  //   const result = await api.doPost(params)
  //   dispatch(#{actions})
  // },
}
