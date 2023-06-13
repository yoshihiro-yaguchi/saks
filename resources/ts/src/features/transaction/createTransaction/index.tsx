import React from "react"
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RootState, store } from "src/app/store"
import reportWebVitals from "src/reportWebVitals"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { actions } from "./reducer"

export const DeliverySlip = () => {
  const dispatch = useAppDispatch()

  const screenStates = useAppSelector((s: RootState) => s.createTransaction.screenState)

  // 取引区分セレクトハンドラ
  const selectVoucherClassHandle = (e: SelectChangeEvent) => {
    dispatch(actions.onChangeVoucharStateHandle({ value: e.target.value }))
  }

  return (
    <>
      <Select
        value={screenStates.voucharState}
        onChange={(e: SelectChangeEvent) => {
          selectVoucherClassHandle(e)
        }}
      >
        <MenuItem value={"1"}>販売取引</MenuItem>
        <MenuItem value={"2"}>買取取引</MenuItem>
      </Select>
      <Button variant="contained">行追加</Button>
      <TableContainer>
        <Table>
          {/* テーブルヘッダー */}
          <TableHead>
            <TableCell>商品名称/商品備考</TableCell>
            <TableCell>数量(重量)</TableCell>
            <TableCell>単価</TableCell>
            <TableCell>消費税</TableCell>
            <TableCell>金額</TableCell>
          </TableHead>
          {/* テーブルデータ */}
          <TableRow>
            <TableCell>商品名称</TableCell>
            <TableCell>
              <TextField label="数量(重量)" variant="standard" size="small"></TextField>
            </TableCell>
            <TableCell>12000</TableCell>
            <TableCell>10</TableCell>
            <TableCell>金額</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </>
  )
}

const container = document.getElementById("createTransaction")!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DeliverySlip />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
