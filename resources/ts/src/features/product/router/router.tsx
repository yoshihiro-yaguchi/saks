import { store } from "@src/app/store"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React from "react"
import reportWebVitals from "@resource/ts/src/reportWebVitals"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Search } from "../search/search"
import { Store } from "../store/store"
import { Update } from "../update/update"

export const PRODUCT_PATHS = {
  SEARCH: "/product/search",
  STORE: "/product/store",
  UPDATE: "/product/update/:productCode",
}

export const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PRODUCT_PATHS.SEARCH} element={<Search />} />
          <Route path={PRODUCT_PATHS.STORE} element={<Store />} />
          <Route path={PRODUCT_PATHS.UPDATE} element={<Update />} />
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
