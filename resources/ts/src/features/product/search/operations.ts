import { AppThunk } from "@src/app/store"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { actions } from "./readucer"
import { Inputs, SearchProduct } from "./types"
import { apis } from "./apis"
import { isAxiosError } from "axios"

export const operations = {
  /**
   * 初期処理
   *
   * @returns
   */
  init: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.processStart())
    await dispatch(commonOperations.init("商品検索"))

    // 検索条件
    const state = getState().searchProduct
    const condition = operations.__setCondition(state)

    let result
    try {
      result = await apis.doSearch(condition)
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
    // データ設定
    await dispatch(actions.updateSearchResults({ data: result.data.products }))
    await dispatch(
      actions.bulkUpdatePaginate({
        data: {
          count: result.data.count,
          maxPages: Math.ceil(
            result.data.count / getState().searchProduct.paginate.itemsPerPage
          ),
          pages: 1,
        },
      })
    )
    dispatch(commonOperations.processEnd())
  },

  /**
   * 商品検索
   *
   * @returns
   */
  doSearch: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.processStart())
    await dispatch(actions.updatePaginate({ key: "pages", value: 1 }))
    // 検索条件
    const state = getState().searchProduct
    const condition = operations.__setCondition(state)

    let result
    try {
      result = await apis.doSearch(condition)
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
    // データ設定
    await dispatch(actions.updateSearchResults({ data: result.data.products }))
    await dispatch(
      actions.bulkUpdatePaginate({
        data: {
          count: result.data.count,
          maxPages: Math.ceil(
            result.data.count / getState().searchProduct.paginate.itemsPerPage
          ),
          pages: 1,
        },
      })
    )

    dispatch(commonOperations.processEnd())
  },

  /**
   * 入力時ハンドル
   *
   * @param key
   * @param value
   * @returns
   */
  handleInput:
    (key: string, value: string): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(actions.updateInput({ key: key, value: value }))
    },

  /**
   * ページネーション時ハンドル
   * @param key
   * @param value
   * @returns
   */
  handlePaginate:
    (value: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())
      await dispatch(actions.updatePaginate({ key: "pages", value: value }))

      // 検索条件
      const state = getState().searchProduct
      const condition = operations.__setCondition(state)

      let result
      try {
        result = await apis.doSearch(condition)
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
      // データ設定
      await dispatch(
        actions.updateSearchResults({ data: result.data.products })
      )
      await dispatch(
        actions.bulkUpdatePaginate({
          data: {
            count: result.data.count,
            maxPages: Math.ceil(
              result.data.count / getState().searchProduct.paginate.itemsPerPage
            ),
          },
        })
      )

      dispatch(commonOperations.processEnd())
    },

  /**
   * ページあたり表示数ハンドラ
   *
   * @param value
   * @returns
   */
  handlePerPage:
    (value: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())
      await dispatch(
        actions.bulkUpdatePaginate({
          data: {
            itemsPerPage: value,
            pages: 1,
          },
        })
      )

      // 検索条件
      const state = getState().searchProduct
      const condition = operations.__setCondition(state)

      let result
      try {
        result = await apis.doSearch(condition)
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
      // データ設定
      await dispatch(
        actions.updateSearchResults({ data: result.data.products })
      )
      await dispatch(
        actions.bulkUpdatePaginate({
          data: {
            count: result.data.count,
            maxPages: Math.ceil(
              result.data.count / getState().searchProduct.paginate.itemsPerPage
            ),
            pages: 1,
          },
        })
      )

      dispatch(commonOperations.processEnd())
    },

  /**
   * 検索条件を設定したURLParamsを返却する
   *
   * @param state
   * @returns
   */
  __setCondition: (state: SearchProduct) => {
    let params = new URLSearchParams()
    Object.keys(state.input).forEach((key) => {
      if (
        !(
          (key === "taxDivision" ||
            key === "taxRate" ||
            key === "transactionBranch") &&
          state.input[key as keyof Inputs] == "0"
        )
      ) {
        params.append(key, state.input[key as keyof Inputs] as string)
      }
    })

    // ページ数
    params.append("page", state.paginate.pages.toString())
    // 一ページあたりの表示数
    params.append("itemsPerPage", state.paginate.itemsPerPage.toString())

    return params
  },
}
