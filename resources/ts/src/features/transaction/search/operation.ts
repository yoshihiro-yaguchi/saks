import { AppThunk } from "@src/app/store"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { apis } from "./api"
import { isAxiosError } from "axios"
import { Inputs, TransactionData, TransactionSearch } from "./type"
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
    await dispatch(commonOperations.processStart())
    await dispatch(commonOperations.init("取引検索"))

    // 検索条件
    const state = getState().searchTransaction
    const condition = operations.__setCondition(state)

    // データ取得
    let result
    try {
      result = await apis.doInit(condition)
    } catch (e) {
      if (
        isAxiosError(e) &&
        e.response &&
        e.response.status === 422 &&
        e.response.data.errors
      ) {
        // laravelでvalidation errorが発生したとき
        await dispatch(commonOperations.putErrors(e.response.data.errors))
        dispatch(commonOperations.processEnd())
        return
      } else {
        dispatch(commonOperations.processEnd())
        throw e
      }
    }
    await dispatch(actions.init({ data: result.data }))
    dispatch(commonOperations.processEnd())
  },
  /**
   * 検索処理
   *
   * @returns
   */
  search: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.processStart())
    // 検索条件
    const state = getState().searchTransaction
    const condition = operations.__setCondition(state)

    // データ取得
    let result
    try {
      result = await apis.search(condition)
    } catch (e) {
      if (
        isAxiosError(e) &&
        e.response &&
        e.response.status === 422 &&
        e.response.data.errors
      ) {
        // laravelでvalidation errorが発生したとき
        await dispatch(commonOperations.putErrors(e.response.data.errors))
        dispatch(commonOperations.processEnd())
        return
      } else {
        dispatch(commonOperations.processEnd())
        throw e
      }
    }
    await dispatch(commonOperations.errorAlertClose())
    await dispatch(actions.updateTransactionData({ data: result.data }))
    dispatch(commonOperations.processEnd())
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
      await dispatch(commonOperations.processStart())
      await dispatch(
        actions.updatePaginate({
          data: {
            itemsPerPage: perPage,
            pages: 1,
          },
        })
      )
      await dispatch(operations.search())
      dispatch(commonOperations.processEnd())
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
      await dispatch(commonOperations.processStart())
      await dispatch(
        actions.updatePaginate({
          data: {
            pages: page,
          },
        })
      )

      await dispatch(operations.search())
      dispatch(commonOperations.processEnd())
    },

  /**
   * 入力項目更新
   *
   * @param name
   * @param value
   * @returns
   */
  updateInput:
    (name: string, value: string): AppThunk =>
    async (dispatch, getState) => {
      dispatch(
        actions.updateInputs({
          data: {
            [name]: value,
          },
        })
      )
    },

  /**
   * 検索条件を設定したURLParamsを返却する
   *
   * @param state
   * @returns
   */
  __setCondition: (state: TransactionSearch) => {
    let params = new URLSearchParams()
    Object.keys(state.inputs).forEach((key) => {
      if (
        !(
          (key === "transactionDivision" ||
            key === "corporationDivision" ||
            key === "transactionBranch") &&
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

    return params
  },
}
