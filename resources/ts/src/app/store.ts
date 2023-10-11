import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { storeTransactionReducer } from "@resource/ts/src/features/transaction/store/reducer"
import { showTransactionReducer } from "../features/transaction/show/reducer"
import { authRegisterReducer } from "../features/auth/register/reducer"
import { commonReducer } from "../common/commonReducer"
import { registerContractReducer } from "../features/auth/registerContract/reducer"
import { transactionSearchState } from "../features/transaction/search/reducer"
import { productSearchState } from "../features/product/search/readucer"
import { productShowState } from "../features/product/show/readucer"
import { productStoreState } from "../features/product/store/readucer"
import { productUpdateState } from "../features/product/update/readucer"

export const store = configureStore({
  reducer: {
    // 共通部分
    common: commonReducer.reducer,

    // 認証・新規登録
    // 新規登録
    authRegister: authRegisterReducer.reducer,
    // 契約情報登録
    registerContract: registerContractReducer.reducer,

    // 取引
    // 検索
    searchTransaction: transactionSearchState.reducer,
    // 作成
    storeTransaction: storeTransactionReducer.reducer,
    // 詳細
    showTransaction: showTransactionReducer.reducer,

    // 商品マスタ
    // 検索
    searchProduct: productSearchState.reducer,
    // 詳細
    showProduct: productShowState.reducer,
    // 登録
    storeProduct: productStoreState.reducer,
    // 更新
    updateProduct: productUpdateState.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
