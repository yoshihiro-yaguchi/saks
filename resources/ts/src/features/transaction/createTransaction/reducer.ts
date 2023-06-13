import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initScreenState, transactionState } from "./types";

const initialState: transactionState = {
  screenState: initScreenState,
};

export const createTransactionStates = createSlice({
  name: "createTransaction",
  initialState,
  reducers: {
    // ステートリセット
    reset: () => initialState,

    onChangeVoucharStateHandle: (
      state,
      action: PayloadAction<{ value: string }>
    ) => {
      state.screenState.voucharState = action.payload.value;
    },
  },
});

export const { actions } = createTransactionStates;
