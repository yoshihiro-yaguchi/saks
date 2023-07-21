import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import { contactStates } from "@src/features/sample/reducer"
import { storeTransactionReducer } from "@resource/ts/src/features/transaction/store/reducer"
import { showTransactionReducer } from "../features/transaction/show/reducer"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contact: contactStates.reducer,
    // 取引作成
    storeTransaction: storeTransactionReducer.reducer,
    // 取引詳細
    showTransaction: showTransactionReducer.reducer,
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
