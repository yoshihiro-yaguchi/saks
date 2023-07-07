import React, { useEffect } from "react"
import {
  Box,
  BoxProps,
  Button,
  Container,
  Grid,
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
import { createTransactionOperations } from "./operation"
import { BaseComponent } from "src/common/BaseComponent/BaseComponent"
import styled from "@emotion/styled"
import { Typo } from "src/common/Text/Typo"
import { auto } from "@popperjs/core"
import Date from "src/common/DatePicker/DatePicker"

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

  const ContainerBox = function (props: BoxProps) {
    const { children } = props
    return (
      <>
        <Box {...props} sx={{ margin: "0" }}>
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
        <Box sx={{ padding: "8px 0" }}>
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

  return (
    <>
      <BaseComponent>
        {/* ページ内ヘッダー */}
        <LinedContainerBox>
          <H1>取引作成</H1>
        </LinedContainerBox>
        <Grid container spacing={4} sx={{ marginTop: "0px", marginBottom: "32px" }}>
          <Grid item xs>
            {/* 取引情報 */}
            <LinedContainerBox>
              <ContainerBox>
                <H2>取引情報</H2>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Input name="transactionDate" label="取引日付" type="date"></Input>
                    <Input name="transactionBranch" label="取引支店"></Input>
                  </Grid>
                  <Grid item xs>
                    <Input name="transactionDivision" label="取引区分"></Input>
                    <Input name="corporateDivision" label="法人区分"></Input>
                  </Grid>
                </Grid>
                <Input name="transactionTitle" label="件名">
                  件名
                </Input>
              </ContainerBox>
            </LinedContainerBox>
          </Grid>
          <Grid item xs>
            {/* お客様情報 */}
            <LinedContainerBox>
              <H2>お客様情報</H2>
              <ContainerBox>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Input name="cunstomerCompanyName">会社名</Input>
                    <Input name="customerBranch">支店</Input>
                    <Input name="invoiceNumber">登録番号</Input>
                  </Grid>
                  <Grid item xs>
                    <Input name="customerName">担当者名</Input>
                    <Input name="postNumber">郵便番号</Input>
                    <Input name="customerPhoneNumber">電話番号</Input>
                  </Grid>
                </Grid>
                <Input name="customerAddress">住所</Input>
                <Input name="buildingName">建物名</Input>
              </ContainerBox>
            </LinedContainerBox>
          </Grid>
        </Grid>

        {/* 明細情報 */}
        <LinedContainerBox>
          <H2>明細情報</H2>
        </LinedContainerBox>
        {/* 備考 */}
        <LinedContainerBox>
          <H2>備考</H2>
        </LinedContainerBox>
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
