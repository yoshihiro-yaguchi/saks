import { AppThunk } from "@src/app/store"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { isAxiosError } from "axios"
import { actions } from "./reducer"
import { DetailRow } from "../../TransactionTypes"
import { apis } from "./apis"

export const modalSearchProductOperations = {
  open:
    (receiveIndex: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())
      await dispatch(actions.reset())
      await dispatch(actions.open({ receiveIndex: receiveIndex }))
      dispatch(commonOperations.processEnd())
    },

  search: (): AppThunk => async (dispatch, getState) => {
    await dispatch(commonOperations.processStart())

    const state = getState().transactionModalSearchProduction
    const condition = new URLSearchParams()

    condition.append("productionCode", state.searchCondition.productionCode)
    condition.append("productionName", state.searchCondition.productionName)

    condition.append("page", state.paginate.pages.toString())
    condition.append("itemsPerPage", state.paginate.itemsPerPage.toString())

    // データ取得
    let result
    try {
      result = await apis.getProducts(condition)
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
    await dispatch(actions.updateSearchResult({ data: result.data.products }))
    await dispatch(
      actions.bulkUpdatePaginate({
        data: {
          count: result.data.count,
          maxPages: Math.ceil(
            result.data.count /
              getState().transactionModalSearchProduction.paginate.itemsPerPage
          ),
          pages: 1,
        },
      })
    )
    dispatch(commonOperations.processEnd())
  },

  // ページ変更
  modalPerPage:
    (page: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())
      await dispatch(
        actions.bulkUpdatePaginate({
          data: {
            pages: page,
          },
        })
      )

      const state = getState().transactionModalSearchProduction
      const condition = new URLSearchParams()

      condition.append("productionCode", state.searchCondition.productionCode)
      condition.append("productionName", state.searchCondition.productionName)
      condition.append("productionName", state.searchCondition.productionName)

      condition.append("page", state.paginate.pages.toString())
      condition.append("itemsPerPage", state.paginate.itemsPerPage.toString())

      // データ取得
      let result
      try {
        result = await apis.getProducts(condition)
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
      await dispatch(actions.updateSearchResult({ data: result.data.products }))
      await dispatch(
        actions.bulkUpdatePaginate({
          data: {
            count: result.data.count,
            maxPages: Math.ceil(
              result.data.count /
                getState().transactionModalSearchProduction.paginate
                  .itemsPerPage
            ),
          },
        })
      )
      dispatch(commonOperations.processEnd())
    },

  // モーダル内行クリック時の処理
  modalRowClickHandle:
    (index: number): AppThunk =>
    async (dispatch, getState) => {
      await dispatch(commonOperations.processStart())
      const clickData =
        getState().transactionModalSearchProduction.searchResult[index]
      const updateData = {
        productionCode: clickData.productionCode,
        productionName: clickData.productionName,
        quantity: 1,
        unitPrice: Math.floor(clickData.unitPrice),
        unit: clickData.unit,
        taxRate: Math.floor(clickData.taxRate),
      }
      await dispatch(actions.bulkInputData({ data: updateData }))
      dispatch(commonOperations.processEnd())
    },

  /**
   * 明細追加
   *
   * @param productName
   * @returns
   */
  modalAddDetailRow:
    (receiveFunc: Function): AppThunk =>
    async (dispatch, getState) => {
      dispatch(commonOperations.processStart())
      const inputState = getState().transactionModalSearchProduction.input
      const row: DetailRow = {
        productNo: inputState.productionCode,
        productName: inputState.productionName,
        quantity: inputState.quantity,
        unitPrice: inputState.unitPrice,
        taxRate: inputState.taxRate,
        totalPrice: 0,
        unit: inputState.unit,
      }

      row.totalPrice = row.quantity * row.unitPrice

      // await dispatch(actions.addDetailRow({ value: row }))
      // await dispatch(operations.updateTaxInfo())
      // await dispatch(operations.updateAmountInfo())
      await dispatch(
        receiveFunc(getState().transactionModalSearchProduction.receive.index)
      )
      await dispatch(actions.close())
      dispatch(commonOperations.processEnd())
    },
}
