import React, { useEffect } from "react"
import {
  Box,
  BoxProps,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
} from "@mui/material"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RootState, store } from "src/app/store"
import reportWebVitals from "src/reportWebVitals"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { actions } from "./reducer"

import { BaseComponent } from "src/common/BaseComponent/BaseComponent"
import styled from "@emotion/styled"
import { Typo } from "src/common/Text/Typo"

const LinedContainerBox = function (props: BoxProps) {
  const { children } = props
  return (
    <>
      <Box
        {...props}
        sx={{
          margin: "0",
          padding: "16px",
          border: "1px solid #dddddd",
          borderRadius: "8px",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </>
  )
}

const H1 = styled(Typo)(({ theme }) => ({
  fontSize: 32,
}))

const H2 = styled(Typo)(({ theme }) => ({
  fontSize: 28,
}))

const H3 = styled(Typo)(({}) => ({
  fontSize: 20,
}))

const Input = function (props: TextFieldProps) {
  const { children, name } = props
  return (
    <>
      <Box sx={{ padding: "8px 8px 8px 0" }}>
        <TextField
          size="small"
          sx={{ width: "100%" }}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
          {...props}
        ></TextField>
      </Box>
    </>
  )
}

export const DeliverySlip = () => {
  const dispatch = useAppDispatch()

  // 取引情報ステート
  const transactionInfoState = useAppSelector((s: RootState) => s.createTransaction.transactionInfo)
  // お客様情報ステート
  const customerInfoState = useAppSelector((s: RootState) => s.createTransaction.customerInfo)
  // 取引情報変更時ハンドラ
  const changeTransactionInfoHandle = (name: string, value: string) => {
    dispatch(actions.changeTransactionInfoHandle({ name: name, value: value }))
  }
  // 取引情報変更時ハンドラ
  const changeCustomerInfoHandle = (name: string, value: string) => {
    dispatch(actions.changeCustomerInfoHandle({ name: name, value: value }))
  }

  // 画面ロード時処理
  useEffect(() => {
    console.log("初回ロード")
  }, [])

  return (
    <>
      <BaseComponent>
        <Box sx={{ height: "32px" }}></Box>
        {/* ページ内ヘッダー */}
        <Box>
          <Grid container spacing={4}>
            <Grid item xs>
              <LinedContainerBox>
                <H1>取引作成</H1>
              </LinedContainerBox>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ height: "32px" }}></Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* 取引情報 */}
            <LinedContainerBox>
              <H2>取引情報</H2>
              <Input
                name="transactionTitle"
                label="件名"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeTransactionInfoHandle(e.target.name, e.target.value)
                }}
                value={transactionInfoState.transactionTitle}
              ></Input>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <Box sx={{ padding: "8px 8px 8px 0" }}>
                    <FormControl fullWidth>
                      <InputLabel>取引区分</InputLabel>
                      <Select
                        id="transactionDivision"
                        size="small"
                        labelId="demo"
                        value={transactionInfoState.transactionDivision}
                        label="取引区分"
                        onChange={(e: SelectChangeEvent<string>) => {
                          changeTransactionInfoHandle(
                            "transactionDivision",
                            e.target.value as string
                          )
                        }}
                      >
                        <MenuItem value={"1"}>販売</MenuItem>
                        <MenuItem value={"2"}>買取</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Input
                    name="transactionDate"
                    label="取引日付"
                    type="date"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeTransactionInfoHandle(e.target.name, e.target.value)
                    }}
                    value={transactionInfoState.transactionDate}
                  ></Input>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <Box sx={{ padding: "8px 8px 8px 0" }}>
                    <FormControl fullWidth>
                      <InputLabel>取引支店</InputLabel>
                      <Select
                        id="transactionBranch"
                        size="small"
                        labelId="demo"
                        value={transactionInfoState.transactionBranch}
                        label="取引支店"
                        onChange={(e: SelectChangeEvent<string>) => {
                          changeTransactionInfoHandle("transactionBranch", e.target.value as string)
                        }}
                      >
                        <MenuItem value={"1"}>本社工場</MenuItem>
                        <MenuItem value={"2"}>高崎工場</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Input
                    name="transactionPic"
                    label="担当者"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeTransactionInfoHandle(e.target.name, e.target.value)
                    }}
                    value={transactionInfoState.transactionPic}
                  ></Input>
                </Grid>
              </Grid>
              <Input
                name="transactionNote"
                label="取引備考"
                multiline
                rows={11}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeTransactionInfoHandle(e.target.name, e.target.value)
                }}
                value={transactionInfoState.transactionNote}
              ></Input>
            </LinedContainerBox>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* お客様情報 */}
            <LinedContainerBox>
              <H2>お客様情報</H2>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <Box sx={{ padding: "8px 8px 8px 0" }}>
                    <FormControl fullWidth>
                      <InputLabel>法人区分</InputLabel>
                      <Select
                        id="corporationDivision"
                        size="small"
                        value={customerInfoState.corporationDivision}
                        label="法人区分"
                        onChange={(e: SelectChangeEvent<string>) => {
                          changeCustomerInfoHandle("corporationDivision", e.target.value as string)
                        }}
                      >
                        <MenuItem value={1}>法人</MenuItem>
                        <MenuItem value={2}>個人</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Input
                    name="invoiceNumber"
                    label="インボイス登録番号"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeCustomerInfoHandle(e.target.name, e.target.value)
                    }}
                    value={customerInfoState.invoiceNumber}
                  ></Input>
                </Grid>
              </Grid>
              <Input
                name="customerCompany"
                label="会社名"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeCustomerInfoHandle(e.target.name, e.target.value)
                }}
                value={customerInfoState.customerCompany}
              ></Input>
              <Input
                name="customerBranch"
                label="支店名"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeCustomerInfoHandle(e.target.name, e.target.value)
                }}
                value={customerInfoState.customerBranch}
              ></Input>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <Input
                    name="customerName"
                    label="お名前"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeCustomerInfoHandle(e.target.name, e.target.value)
                    }}
                    value={customerInfoState.customerName}
                  ></Input>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Input
                    name="customerPhoneNumber"
                    label="電話番号"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeCustomerInfoHandle(e.target.name, e.target.value)
                    }}
                    value={customerInfoState.customerPhoneNumber}
                  ></Input>
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: "8px" }}>
                <Grid item xs={12} lg={6}>
                  <Input
                    name="zipCode"
                    label="郵便番号"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeCustomerInfoHandle(e.target.name, e.target.value)
                    }}
                    value={customerInfoState.zipCode}
                  ></Input>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Input
                    name="customerAddress1"
                    label="都道府県"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      changeCustomerInfoHandle(e.target.name, e.target.value)
                    }}
                    value={customerInfoState.customerAddress1}
                  ></Input>
                </Grid>
              </Grid>
              <Input
                name="customerAddress2"
                label="市区町村"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeCustomerInfoHandle(e.target.name, e.target.value)
                }}
                value={customerInfoState.customerAddress2}
              ></Input>
              <Input
                name="customerAddress3"
                label="町・番地"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeCustomerInfoHandle(e.target.name, e.target.value)
                }}
                value={customerInfoState.customerAddress3}
              ></Input>
              <Input
                name="customerAddress4"
                label="建物名等"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  changeCustomerInfoHandle(e.target.name, e.target.value)
                }}
                value={customerInfoState.customerAddress4}
              ></Input>
            </LinedContainerBox>
          </Grid>
        </Grid>

        <Box sx={{ height: "32px" }}></Box>
        {/* 明細情報 */}
        <LinedContainerBox>
          <H2>明細情報</H2>
        </LinedContainerBox>

        <Box sx={{ height: "32px" }}></Box>
        {/* 備考 */}
        <LinedContainerBox>
          <H2>備考</H2>
        </LinedContainerBox>

        <Box sx={{ height: "32px" }}></Box>
        {/* ページ内フッター */}
        <LinedContainerBox></LinedContainerBox>
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
