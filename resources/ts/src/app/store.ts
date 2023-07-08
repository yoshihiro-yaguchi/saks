import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import { contactStates } from "@front/ts/src/features/sample/reducer"
import { createTransactionStates } from "@front/ts/src/features/transaction/createTransaction/reducer"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    contact: contactStates.reducer,
    // 取引作成
    createTransaction: createTransactionStates.reducer,
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
