import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { storeTransactionReducer } from "@resource/ts/src/features/transaction/store/reducer"
import { showTransactionReducer } from "../features/transaction/show/reducer"
import { authRegisterReducer } from "../features/auth/register/reducer"
import { commonReducer } from "../common/commonReducer"
import { registerContractReducer } from "../features/auth/registerContract/reducer"
import { transactionSearchState } from "../features/transaction/search/reducer"

export const store = configureStore({
  reducer: {
    // 共通部分
    common: commonReducer.reducer,
    // 取引検索
    searchTransaction: transactionSearchState.reducer,
    // 取引作成
    storeTransaction: storeTransactionReducer.reducer,
    // 取引詳細
    showTransaction: showTransactionReducer.reducer,
    // 認証 新規登録
    authRegister: authRegisterReducer.reducer,
    // 契約情報登録
    registerContract: registerContractReducer.reducer,
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
