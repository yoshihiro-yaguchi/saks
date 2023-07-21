import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import { contactStates } from "@src/features/sample/reducer"
import { createTransactionStates } from "@resource/ts/src/features/transaction/store/reducer"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contact: contactStates.reducer,
    // 取引作成
    storeTransaction: createTransactionStates.reducer,
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
