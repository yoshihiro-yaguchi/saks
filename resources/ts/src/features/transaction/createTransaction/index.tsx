import React, { useEffect } from "react"
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
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
import { createTransactionOperations } from "./operation"
import { BaseComponent } from "src/common/BaseComponent/BaseComponent"

export const DeliverySlip = () => {
  const dispatch = useAppDispatch()

  const screenStates = useAppSelector((s: RootState) => s.createTransaction.screenState)

  // 画面ロード時処理
  // useEffect(() => {
  //   dispatch(createTransactionOperations.onLoad())
  // }, [])

  // 取引区分セレクトハンドラ
  const selectVoucherClassHandle = (e: SelectChangeEvent) => {
    dispatch(actions.onChangeVoucherStateHandle({ value: e.target.value }))
  }

  const pushAddRowButtonHandle = () => {
    dispatch(createTransactionOperations.pushAddRowButton())
  }

  const pushDeleteRowButtonHandle = (key: number) => {
    dispatch(actions.deleteRow({ key: key }))
  }

  return (
    <>
      <BaseComponent>
        <Select
          value={screenStates.voucherState}
          onChange={(e: SelectChangeEvent) => {
            selectVoucherClassHandle(e)
          }}
        >
          <MenuItem value={"1"}>販売取引</MenuItem>
          <MenuItem value={"2"}>買取取引</MenuItem>
        </Select>
        <Button
          variant="contained"
          onClick={() => {
            pushAddRowButtonHandle()
          }}
        >
          行追加
        </Button>
        <TableContainer>
          <Table>
            {/* テーブルヘッダー */}
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "200px" }}>商品名称/商品備考</TableCell>
                <TableCell sx={{ width: "100px" }}>数量(重量)</TableCell>
                <TableCell sx={{ width: "100px" }}>単価</TableCell>
                <TableCell sx={{ width: "100px" }}>消費税</TableCell>
                <TableCell sx={{ width: "100px" }}>金額</TableCell>
                <TableCell sx={{ width: "100px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* テーブルデータ */}
              {screenStates.rows.map((row) => (
                <TableRow key={row.productId}>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>
                    <TextField
                      label="数量(重量)"
                      variant="standard"
                      size="small"
                      value={1}
                    ></TextField>
                  </TableCell>
                  <TableCell>{row.unitPrice}</TableCell>
                  <TableCell>{row.taxRate}%</TableCell>
                  <TableCell>{row.totalPrice}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => pushDeleteRowButtonHandle(row.productId)}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </BaseComponent>
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
