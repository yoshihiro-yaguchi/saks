import { store } from "@src/app/store"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React from "react"
import reportWebVitals from "@resource/ts/src/reportWebVitals"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Store } from "../store/store"
import { Show } from "../show/show"
import { Update } from "../update/update"
import { Search } from "../search/search"
import { Setting } from "../setting/setting"

export const TRANSACTION_PATHS = {
  SEARCH: "/transaction/search",
  STORE: "/transaction/store",
  SHOW: "/transaction/show/:transactionId",
  UPDATE: "/transaction/update/:transactionId",
  SETTING: "/transaction/setting",
}

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={TRANSACTION_PATHS.SEARCH} element={<Search />} />
          <Route path={TRANSACTION_PATHS.STORE} element={<Store />} />
          <Route path={TRANSACTION_PATHS.SHOW} element={<Show />} />
          <Route path={TRANSACTION_PATHS.UPDATE} element={<Update />} />
          <Route path={TRANSACTION_PATHS.SETTING} element={<Setting />}></Route>
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
