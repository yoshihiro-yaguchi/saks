import { AppThunk } from "@src/app/store"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { apis } from "./api"
import { isAxiosError } from "axios"
import { Inputs, TransactionData } from "./type"
import { actions } from "./reducer"
import {
  corporationDivName,
  transactionConstants,
  transactionDivName,
} from "../transactionConstants"

export const operations = {
  /**
   * 初期処理
   *
   * @returns
   */
  init: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.init("取引検索"))
  },
  /**
   * 検索処理
   *
   * @returns
   */
  search: (): AppThunk => async (dispatch, getState) => {
    const state = getState().searchTransaction

    // 検索条件設定
    let params = new URLSearchParams()
    Object.keys(state.inputs).forEach((key) => {
      if (
        !(
          (key === "transactionDivision" || key === "corporationDivision") &&
          state.inputs[key as keyof Inputs] === "0"
        )
      ) {
        params.append(key, state.inputs[key as keyof Inputs])
      }
    })

    // ページ数
    params.append("page", state.paginate.pages.toString())
    // 一ページあたりの表示数
    params.append("itemsPerPage", state.paginate.itemsPerPage.toString())

    // データ取得
    let result
    try {
      result = await apis.search(params)
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
    await dispatch(commonOperations.errorAlertClose())
    dispatch(actions.updateTransactionData({ data: result.data }))
  },

  /**
   * 区分値の日本語名を取得
   *
   * @param params
   * @returns
   */
  getDivName: (params: TransactionData) => {
    const corporationDivision: string = params.corporationDivision
    let corporateDivisionName = ""
    if (corporationDivision in corporationDivName) {
      corporateDivisionName = corporationDivName[corporationDivision]
    }

    const transactionDivision: string = params.transactionDivision
    let transactionDivisionName = ""
    if (transactionDivision in transactionDivName) {
      transactionDivisionName = transactionDivName[transactionDivision]
    }

    return `${corporateDivisionName} - ${transactionDivisionName}`
  },

  /**
   * お客様名を取得
   *
   * @param params
   * @returns
   */
  getCustomerName: (params: TransactionData) => {
    if (
      params.corporationDivision ==
      transactionConstants.CORPORATION_DIV_CORPORATE
    ) {
      return `${params.customerCompany} ${params.customerName}`
    } else {
      return `${params.customerName}`
    }
  },

  /**
   * ページあたり表示数変更
   *
   * @param perPage
   * @returns
   */
  changePerPage:
    (perPage: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(
        actions.updatePaginate({
          data: {
            itemsPerPage: perPage,
            pages: 1,
          },
        })
      )
      dispatch(operations.search())
    },

  /**
   * ページ変更
   *
   * @param page
   * @returns
   */
  changePage:
    (page: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(
        actions.updatePaginate({
          data: {
            pages: page,
          },
        })
      )

      dispatch(operations.search())
    },
}
