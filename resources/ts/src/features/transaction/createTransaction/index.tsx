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

  return (
    <>
      <BaseComponent>
        {/* ページ内ヘッダー */}
        <Grid container spacing={0}>
          <Grid item xs sx={{ margin: "16px 0" }}>
            <LinedContainerBox>
              <H1>取引作成</H1>
            </LinedContainerBox>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs sx={{ margin: "16px 0" }}>
            {/* お客様情報 */}
            <LinedContainerBox>
              <H2>お客様情報</H2>
              <ContainerBox>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Box sx={{ padding: "8px 8px 8px 0" }}>
                      <FormControl fullWidth>
                        <InputLabel>法人区分</InputLabel>
                        <Select
                          id="corporateDivision"
                          size="small"
                          labelId="demo"
                          value={1}
                          label="法人区分"
                        >
                          <MenuItem value={1}>法人</MenuItem>
                          <MenuItem value={2}>個人</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Input name="customerCompanyName" label="会社名"></Input>
                    <Input name="customerBranch" label="支店"></Input>
                  </Grid>
                  <Grid item xs>
                    <Input name="invoiceNumber" label="インボイス登録番号"></Input>

                    <Input name="customerName" label="担当者名"></Input>
                    <Input name="customerPhoneNumber" label="電話番号"></Input>
                  </Grid>
                </Grid>
                <Input name="postNumber" label="郵便番号"></Input>
                <Input name="customerAddress" label="住所"></Input>
                <Input name="buildingName" label="建物名"></Input>
              </ContainerBox>
            </LinedContainerBox>
          </Grid>
          <Grid item xs sx={{ margin: "16px 0" }}>
            {/* 取引情報 */}
            <LinedContainerBox>
              <ContainerBox>
                <H2>取引情報</H2>
                <Input name="transactionTitle" label="件名"></Input>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Input name="transactionDate" label="取引日付" type="date"></Input>
                    <Box sx={{ padding: "8px 8px 8px 0" }}>
                      <FormControl fullWidth>
                        <InputLabel>取引区分</InputLabel>
                        <Select
                          id="transactionDivision"
                          size="small"
                          labelId="demo"
                          value={1}
                          label="取引日付"
                        >
                          <MenuItem value={1}>販売</MenuItem>
                          <MenuItem value={2}>買取</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs>
                    <Input name="transactionBranch" label="取引支店"></Input>
                    <Input name="transactionPic" label="担当者"></Input>
                  </Grid>
                </Grid>
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
