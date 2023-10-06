import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from './reducer'
// import { operations } from './operations'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React from "react"
import reportWebVitals from "@resource/ts/src/reportWebVitals"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Store } from "../store/store"
import { Show } from "../show/show"
import { Update } from "../update/update"

export const TRANSACTION_PATHS = {
  STORE: "/transaction/store",
  SHOW: "/transaction/show/:transactionId",
  UPDATE: "/transaction/update/:transactionId",
}

export const Router = () => {
  // const dispatch = useAppDispatch()
  // 画面項目
  // const contactStates = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.screenState)
  // 画面コントロール
  // const contactScreenControl = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.controlState)
  // 値入力時ハンドラ
  // const onInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(contactActions.onInputHandle({ name: e.target.name, value: e.target.value }))
  // }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={TRANSACTION_PATHS.STORE} element={<Store />} />
          <Route path={TRANSACTION_PATHS.SHOW} element={<Show />} />
          <Route path={TRANSACTION_PATHS.UPDATE} element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const container = document.getElementById("index")!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
