import { AppThunk } from "@src/app/store"
import { apis } from "./api"
import { actions } from "./reducer"
import { InputState } from "./types"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { isAxiosError } from "axios"
import { commonApis } from "@resource/ts/src/common/commonApi"

export const operations = {
  init: (): AppThunk => async (dispatch, getState) => {
    // 共通処理を先に走らせる。共通処理が終わってから後続処理を実行するため、awaitを指定する。
    await dispatch(commonOperations.init("契約情報を入力してください"))
    // 最初に名前はセットしておく
    dispatch(
      actions.onInputHandle({
        name: "contractersName",
        value: getState().common.user.name,
      })
    )
  },

  // 契約情報を登録する
  storeContract: (): AppThunk => async (dispatch, getState) => {
    let formData = new FormData()

    const inputState = getState().registerContract.inputState

    Object.keys(inputState).forEach((key) => {
      formData.append(key, inputState[key as keyof InputState])
    })

    let apiResult
    try {
      apiResult = await apis.storeContracts(formData)
    } catch (e) {
      if (
        isAxiosError(e) &&
        e.response &&
        e.response.status === 422 &&
        e.response.data.errors
      ) {
        // laravelでvalidation errorが発生したとき
        dispatch(commonOperations.putErrors(e.response.data.errors))
        return
      } else {
        throw e
      }
    }

    location.href = "/redirector"
  },

  // 郵便番号アウトフォーカス
  zipCodeOnBlur: (): AppThunk => async (dispatch, getState) => {
    const zipCode = getState().registerContract.inputState.contractZipcode
    if (zipCode.length !== 7) {
      return
    }

    let params = new URLSearchParams()
    params.append("zipcode", zipCode)
    let apiResult
    try {
      apiResult = await commonApis.getAddress(params)
    } catch (error) {
      throw error
    }

    if (!Array.isArray(apiResult.data["results"])) {
      // 住所検索にヒットしなかった場合(ヒットしなかった場合、resultsは配列では帰ってこない)
      return
    }
    // TODO: 1つの郵便番号に紐づく住所が2つ以上ある場合を考慮する。
    const address = apiResult.data["results"][0]

    const newCustomerInfo: Partial<InputState> = {
      contractAddress1: address["address1"],
      contractAddress2: address["address2"],
      contractAddress3: address["address3"],
    }

    dispatch(actions.inputItemsBulkUpdate({ value: newCustomerInfo }))
  },
}
