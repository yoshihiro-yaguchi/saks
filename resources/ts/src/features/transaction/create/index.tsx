import React, { useEffect } from "react"
import {
  Box,
  BoxProps,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
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
  TextFieldProps,
} from "@mui/material"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RootState, store } from "@src/app/store"
import reportWebVitals from "@src/reportWebVitals"
import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { actions } from "./reducer"
import { BaseComponent } from "@common/BaseComponent/BaseComponent"
import styled from "@emotion/styled"
import { Typo } from "@src/common/Text/Typo"
import { createTransactionOperations } from "./operation"
import Paper from "@mui/material/Paper"
import { DetailRow, AmountInfo, TaxInfo } from "./types"
import { Delete } from "@mui/icons-material"
import { constants } from "./constant"

/**
 * bladeからのデータ受け取り
 */
// token
let bladeCsrfToken = document.head.querySelector<HTMLMetaElement>(
  'meta[name="csrfToken"]'
)?.content
// baseUrl
let baseUrl = document.head.querySelector<HTMLMetaElement>(
  'meta[name="baseUrl"]'
)?.content
// バックエンドからのデータ
let data = document.head.querySelector<HTMLMetaElement>(
  'meta[name="data"]'
)?.content
let arrayData = null
if (typeof data === "string") {
  arrayData = JSON.parse(data)
  console.log(arrayData)
}

/**
 * LinedContainerBox styledComponent
 *
 * @param props
 * @returns
 */
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

/**
 * H1 styledComponent
 */
const H1 = styled(Typo)(({ theme }) => ({
  fontSize: 32,
}))

/**
 * H2 styledComponent
 */
const H2 = styled(Typo)(({ theme }) => ({
  fontSize: 28,
}))

/**
 * H3 styledComponent
 */
const H3 = styled(Typo)(({}) => ({
  fontSize: 20,
}))

/**
 * Input styledComponent
 *
 * @param props
 * @returns
 */
const Input = function (props: TextFieldProps) {
  const { hidden } = props
  return (
    <>
      <Box sx={hidden ? {} : { padding: "8px 8px 8px 0" }}>
        <TextField
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
          {...props}
        ></TextField>
      </Box>
    </>
  )
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  border: "2px solid #1cc1cc",
  color: "#ffffff",
  paddingTop: "0 auto 0 auto",
  fontSize: "12px",
  textAlign: "center",
}))

const StyledTableRowCell = styled(TableCell)(({ theme }) => ({
  border: "2px solid #1cc1cc",
  fontSize: "12px",
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#effeff",
  },
}))

/**
 * 画面
 *
 * @returns
 */
export const Create = () => {
  const dispatch = useAppDispatch()

  // 画面ロード時処理
  useEffect(() => {
    // トークン設定
    if (typeof bladeCsrfToken === "string") {
      dispatch(actions.setToken({ token: bladeCsrfToken }))
    }
    if (typeof baseUrl === "string") {
      dispatch(actions.setBaseUrl({ baseUrl: baseUrl }))
    }
  }, [])

  // csrfトークン
  const csrfToken = useAppSelector(
    (s: RootState) => s.createTransaction._token
  )

  // baseurl
  const baseUrl = useAppSelector(
    (s: RootState) => s.createTransaction.common.baseUrl
  )

  // 取引情報ステート
  const transactionInfoState = useAppSelector(
    (s: RootState) => s.createTransaction.transactionInfo
  )

  // お客様情報ステート
  const customerInfoState = useAppSelector(
    (s: RootState) => s.createTransaction.customerInfo
  )

  // 明細行
  const detailRows: DetailRow[] = useAppSelector(
    (s: RootState) => s.createTransaction.detailRows
  )

  // 金額情報
  const amountInfo: AmountInfo = useAppSelector(
    (s: RootState) => s.createTransaction.amountInfo
  )

  const taxInfos: TaxInfo[] = useAppSelector(
    (s: RootState) => s.createTransaction.taxInfos
  )

  // 取引情報変更時ハンドラ
  const changeTransactionInfoHandle = (
    name: string,
    value: string
  ) => {
    dispatch(
      actions.updateTransactionInfoHandle({
        name: name,
        value: value,
      })
    )
  }

  // お客様情報変更時ハンドラ
  const changeCustomerInfoHandle = (name: string, value: string) => {
    dispatch(
      actions.updateCustomerInfoHandle({ name: name, value: value })
    )
  }

  // 送信
  const onClickSendButton = () => {
    dispatch(createTransactionOperations.submit())
  }

  // 明細追加
  const addRow = () => {
    dispatch(
      createTransactionOperations.addDetailRow(
        transactionInfoState.transactionDate
      )
    )
  }

  // 行削除
  const deleteRow = (productNo: string) => {
    dispatch(createTransactionOperations.deleteDetailRow(productNo))
  }

  // 明細データ変更時ハンドラ
  const changeDetailRowHandle = (
    index: number,
    name: string,
    value: string | number
  ) => {
    dispatch(
      createTransactionOperations.updateDetailRow(index, name, value)
    )
  }

  // 法人区分が法人である
  const isCorporation =
    customerInfoState.corporationDivision ===
    constants.CORPORATION_CORPORATE

  return (
    <>
      <BaseComponent>
        <form
          id="createTransaction"
          name="createTransaction"
          action={`${baseUrl}/transaction/create`}
          method="post"
        >
          <input type="hidden" name="_token" value={csrfToken} />
          {/* ページ内ヘッダー */}
          <Box>
            <Grid container spacing={4}>
              <Grid item xs>
                <LinedContainerBox>
                  <Grid container spacing={1}>
                    <Grid item xs>
                      <Box sx={{ width: "150px" }}>
                        <H1>取引作成</H1>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Box sx={{ width: "250px" }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          type="button"
                          sx={{ margin: "auto 5px" }}
                        >
                          戻る
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          type="button"
                          sx={{ margin: "auto 5px" }}
                        >
                          ドラフト
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          type="button"
                          sx={{ margin: "auto 5px" }}
                          onClick={() => {
                            onClickSendButton()
                          }}
                        >
                          送信
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
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
                  name="transactionInfo[transactionTitle]"
                  label="件名"
                  inputProps={{
                    maxLength: "50",
                  }}
                  onInput={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    changeTransactionInfoHandle(
                      e.target.name,
                      e.target.value
                    )
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
                          name="transactionInfo[transactionDivision]"
                          size="small"
                          labelId="demo"
                          value={
                            transactionInfoState.transactionDivision
                          }
                          label="取引区分"
                          onChange={(
                            e: SelectChangeEvent<string>
                          ) => {
                            changeTransactionInfoHandle(
                              "transactionDivision",
                              e.target.value as string
                            )
                          }}
                        >
                          <MenuItem value={"1"}>買取</MenuItem>
                          <MenuItem value={"2"}>販売</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Input
                      name="transactionInfo[transactionDate]"
                      label="取引日付"
                      type="date"
                      onInput={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        changeTransactionInfoHandle(
                          e.target.name,
                          e.target.value
                        )
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
                          name="transactionInfo[transactionBranch]"
                          size="small"
                          labelId="demo"
                          value={
                            transactionInfoState.transactionBranch
                          }
                          label="取引支店"
                          onChange={(
                            e: SelectChangeEvent<string>
                          ) => {
                            changeTransactionInfoHandle(
                              "transactionBranch",
                              e.target.value as string
                            )
                          }}
                        >
                          <MenuItem value={"1"}>本社工場</MenuItem>
                          <MenuItem value={"2"}>高崎工場</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Input
                      name="transactionInfo[transactionPicLastName]"
                      label="担当者(姓)"
                      inputProps={{
                        maxLength: "10",
                      }}
                      onInput={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        changeTransactionInfoHandle(
                          e.target.name,
                          e.target.value
                        )
                      }}
                      value={
                        transactionInfoState.transactionPicLastName
                      }
                    ></Input>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Input
                      name="transactionInfo[transactionPicFirstName]"
                      label="担当者(名)"
                      inputProps={{
                        maxLength: "10",
                      }}
                      onInput={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        changeTransactionInfoHandle(
                          e.target.name,
                          e.target.value
                        )
                      }}
                      value={
                        transactionInfoState.transactionPicFirstName
                      }
                    ></Input>
                  </Grid>
                </Grid>
                <Input
                  name="transactionInfo[transactionNote]"
                  label="取引備考"
                  multiline
                  rows={12}
                  inputProps={{
                    maxLength: "1000",
                  }}
                  sx={{ height: "auto" }}
                  onInput={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    changeTransactionInfoHandle(
                      e.target.name,
                      e.target.value
                    )
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
                          name="customerInfo[corporationDivision]"
                          size="small"
                          value={
                            customerInfoState.corporationDivision
                          }
                          label="法人区分"
                          onChange={(
                            e: SelectChangeEvent<string>
                          ) => {
                            changeCustomerInfoHandle(
                              "corporationDivision",
                              e.target.value as string
                            )
                          }}
                        >
                          <MenuItem value={"1"}>個人</MenuItem>
                          <MenuItem value={"2"}>法人</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Input
                      name="customerInfo[invoiceNumber]"
                      label="インボイス登録番号"
                      inputProps={{
                        maxLength: "14",
                      }}
                      onInput={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        changeCustomerInfoHandle(
                          e.target.name,
                          e.target.value
                        )
                      }}
                      value={customerInfoState.invoiceNumber}
                    ></Input>
                  </Grid>
                </Grid>
                <Input
                  name="customerInfo[customerCompany]"
                  hidden={isCorporation ? false : true}
                  sx={isCorporation ? {} : { display: "none" }}
                  label="会社名"
                  inputProps={{
                    maxLength: "50",
                  }}
                  onInput={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    changeCustomerInfoHandle(
                      e.target.name,
                      e.target.value
                    )
                  }}
                  value={customerInfoState.customerCompany}
                ></Input>
                <Input
                  name="customerInfo[customerBranch]"
                  hidden={isCorporation ? false : true}
                  sx={isCorporation ? {} : { display: "none" }}
                  label="支店名"
                  inputProps={{
                    maxLength: "50",
                  }}
                  onInput={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    changeCustomerInfoHandle(
                      e.target.name,
                      e.target.value
                    )
                  }}
                  value={customerInfoState.customerBranch}
                ></Input>
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={3}>
                    <Input
                      name="customerInfo[customerLastName]"
                      label="お名前(姓)"
                      inputProps={{
                        maxLength: "10",
                      }}
                      onInput={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        changeCustomerInfoHandle(
                          e.target.name,
                          e.target.value
                        )
                      }}
                      value={customerInfoState.customerLastName}
                    ></Input>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Input
                      name="customerInfo[customerFirstName]"
                      label="お名前(名)"
                      inputProps={{
                        maxLength: "10",
                      }}
                      onInput={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        changeCustomerInfoHandle(
                          e.target.name,
                          e.target.value
                        )
                      }}
                      value={customerInfoState.customerFirstName}
                    ></Input>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Input
                      name="customerInfo[customerPhoneNumber]"
                      label="電話番号"
                      inputProps={{
                        maxLength: "15",
                      }}
                      onInput={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        changeCustomerInfoHandle(
                          e.target.name,
                          e.target.value
                        )
                      }}
                      value={customerInfoState.customerPhoneNumber}
                    ></Input>
                  </Grid>
                </Grid>
                <Grid container spacing={1} sx={{ marginTop: "8px" }}>
                  <Grid item xs={12} lg={6}>
                    <Input
                      name="customerInfo[zipCode]"
                      label="郵便番号"
                      inputProps={{
                        maxLength: "8",
                      }}
                      onInput={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        changeCustomerInfoHandle(
                          e.target.name,
                          e.target.value
                        )
                      }}
                      value={customerInfoState.zipCode}
                    ></Input>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Input
                      name="customerInfo[customerAddress1]"
                      label="都道府県"
                      inputProps={{
                        maxLength: "10",
                      }}
                      onInput={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        changeCustomerInfoHandle(
                          e.target.name,
                          e.target.value
                        )
                      }}
                      value={customerInfoState.customerAddress1}
                    ></Input>
                  </Grid>
                </Grid>
                <Input
                  name="customerInfo[customerAddress2]"
                  label="市区町村"
                  inputProps={{
                    maxLength: "50",
                  }}
                  onInput={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    changeCustomerInfoHandle(
                      e.target.name,
                      e.target.value
                    )
                  }}
                  value={customerInfoState.customerAddress2}
                ></Input>
                <Input
                  name="customerInfo[customerAddress3]"
                  label="町・番地"
                  inputProps={{
                    maxLength: "100",
                  }}
                  onInput={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    changeCustomerInfoHandle(
                      e.target.name,
                      e.target.value
                    )
                  }}
                  value={customerInfoState.customerAddress3}
                ></Input>
                <Input
                  name="customerInfo[customerAddress4]"
                  label="建物名等"
                  inputProps={{
                    maxLength: "100",
                  }}
                  onInput={(
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    changeCustomerInfoHandle(
                      e.target.name,
                      e.target.value
                    )
                  }}
                  value={customerInfoState.customerAddress4}
                ></Input>
              </LinedContainerBox>
            </Grid>
          </Grid>

          <Box sx={{ height: "32px" }}></Box>
          {/* 明細情報 */}
          <Box>
            <LinedContainerBox>
              <Box sx={{ marginBottom: "16px" }}>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <H2>明細情報</H2>
                  </Grid>
                  <Grid
                    item
                    xs
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Button
                        variant="outlined"
                        type="button"
                        color="primary"
                        onClick={() => addRow()}
                      >
                        明細追加
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ float: "left" }}></Box>
              </Box>
              <TableContainer component={Paper}>
                <Table size="small" sx={{ minWidth: "900px" }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#1cc1cc" }}>
                      <StyledTableHeadCell
                        sx={{ width: "44px" }}
                      ></StyledTableHeadCell>
                      <StyledTableHeadCell
                        sx={{ minWidth: "110px", width: "10%" }}
                      >
                        商品番号
                      </StyledTableHeadCell>
                      <StyledTableHeadCell>
                        商品名
                      </StyledTableHeadCell>
                      <StyledTableHeadCell
                        sx={{
                          minWidth: "120px",
                          width: "10%",
                          padding: "6px 6px",
                        }}
                      >
                        数量(重量)
                      </StyledTableHeadCell>
                      <StyledTableHeadCell sx={{ width: "140px" }}>
                        単価
                      </StyledTableHeadCell>
                      <StyledTableHeadCell sx={{ width: "91px" }}>
                        税率
                      </StyledTableHeadCell>
                      <StyledTableHeadCell sx={{ width: "100px" }}>
                        金額
                      </StyledTableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailRows.map((row, index) => (
                      <StyledTableRow key={row.productNo}>
                        {/* 削除ボタン */}
                        <StyledTableRowCell
                          sx={{ padding: "6px 6px" }}
                        >
                          <Box sx={{ display: "inline-block" }}>
                            <IconButton
                              aria-label="deleteRow"
                              size="small"
                              onClick={() => deleteRow(row.productNo)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </StyledTableRowCell>
                        {/* 商品番号 */}
                        <StyledTableRowCell>
                          {row.productNo}
                          <input
                            readOnly
                            hidden
                            name={`detailRows[${index}][productNo]`}
                            value={row.productNo}
                          />
                        </StyledTableRowCell>
                        {/* 商品名 */}
                        <StyledTableRowCell>
                          {row.productName}
                          <input
                            readOnly
                            hidden
                            name={`detailRows[${index}][productName]`}
                            value={row.productName}
                          />
                        </StyledTableRowCell>
                        {/* 数量(重量) */}
                        <StyledTableRowCell>
                          <TextField
                            name={`detailRows[${index}][quantity]`}
                            type="number"
                            size="small"
                            variant="standard"
                            sx={{ float: "left", fontSize: "10px" }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  個
                                </InputAdornment>
                              ),
                            }}
                            value={row.quantity}
                            onInput={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              changeDetailRowHandle(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                          ></TextField>
                        </StyledTableRowCell>
                        {/* 単価 */}
                        <StyledTableRowCell
                          sx={{ textAlign: "right" }}
                        >
                          <TextField
                            name={`detailRows[${index}][unitPrice]`}
                            type="number"
                            size="small"
                            variant="standard"
                            sx={{ float: "left", fontSize: "10px" }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  ￥
                                </InputAdornment>
                              ),
                            }}
                            value={row.unitPrice}
                            onInput={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              changeDetailRowHandle(
                                index,
                                "unitPrice",
                                e.target.value
                              )
                            }
                          ></TextField>
                        </StyledTableRowCell>
                        {/* 税率 */}
                        <StyledTableRowCell
                          sx={{ textAlign: "right" }}
                        >
                          <Select
                            name={`detailRows[${index}][taxRate]`}
                            labelId="taxRate"
                            value={row.taxRate}
                            size="small"
                            variant="standard"
                            onChange={(
                              e: SelectChangeEvent<number>
                            ) => {
                              changeDetailRowHandle(
                                index,
                                "taxRate",
                                e.target.value as keyof number
                              )
                            }}
                          >
                            <MenuItem value={8}>8%</MenuItem>
                            <MenuItem value={10}>10%</MenuItem>
                          </Select>
                        </StyledTableRowCell>
                        {/* 金額 */}
                        <StyledTableRowCell
                          sx={{ textAlign: "right" }}
                        >
                          ￥{row.totalPrice.toLocaleString()}
                          <input
                            readOnly
                            hidden
                            name={`detailRows[${index}][totalPrice]`}
                            value={row.totalPrice}
                          />
                        </StyledTableRowCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ height: "32px" }}></Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <TableContainer
                  component={Paper}
                  sx={{ width: "350px" }}
                >
                  <Table size="small" sx={{ width: "350px" }}>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableRowCell sx={{ width: "40%" }}>
                          小計
                        </StyledTableRowCell>
                        <StyledTableRowCell
                          sx={{ textAlign: "right" }}
                        >
                          ￥{amountInfo.subtotal.toLocaleString()}
                          <input
                            type="hidden"
                            name="amountInfo[subtotal]"
                            value={amountInfo.subtotal}
                            readOnly
                          />
                        </StyledTableRowCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableRowCell>
                          (内消費税)
                        </StyledTableRowCell>
                        <StyledTableRowCell
                          sx={{ textAlign: "right" }}
                        >
                          ￥{amountInfo.taxInclude.toLocaleString()}
                          <input
                            type="hidden"
                            name="amountInfo[taxInclude]"
                            value={amountInfo.taxInclude}
                            readOnly
                          />
                        </StyledTableRowCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableRowCell>合計</StyledTableRowCell>
                        <StyledTableRowCell
                          sx={{ textAlign: "right" }}
                        >
                          ￥{amountInfo.total.toLocaleString()}
                          <input
                            type="hidden"
                            name="amountInfo[total]"
                            value={amountInfo.total}
                            readOnly
                          />
                        </StyledTableRowCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {(() => {
                if (taxInfos.length > 0) {
                  return (
                    <>
                      <Box sx={{ height: "32px" }}></Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TableContainer sx={{ width: "450px" }}>
                          <Table size="small" sx={{ width: "450px" }}>
                            <TableBody>
                              {taxInfos.map((taxInfo, index) => (
                                <StyledTableRow key={index}>
                                  <StyledTableRowCell
                                    sx={{
                                      width: "20%",
                                      textAlign: "center",
                                    }}
                                  >
                                    {taxInfo.taxRate}%対象
                                    <input
                                      type="hidden"
                                      name={`taxInfo[${taxInfo.taxRate}][taxRate]`}
                                      value={taxInfo.taxRate}
                                      readOnly
                                    />
                                  </StyledTableRowCell>
                                  <StyledTableRowCell
                                    sx={{
                                      width: "30%",
                                      textAlign: "right",
                                    }}
                                  >
                                    ￥
                                    {taxInfo.taxableAmout.toLocaleString()}
                                    <input
                                      type="hidden"
                                      name={`taxInfo[${taxInfo.taxRate}][taxableAmout]`}
                                      value={taxInfo.taxableAmout}
                                      readOnly
                                    />
                                  </StyledTableRowCell>
                                  <StyledTableRowCell
                                    sx={{
                                      width: "20%",
                                      textAlign: "center",
                                    }}
                                  >
                                    消費税
                                  </StyledTableRowCell>
                                  <StyledTableRowCell
                                    sx={{
                                      width: "30%",
                                      textAlign: "right",
                                    }}
                                  >
                                    ￥
                                    {taxInfo.taxAmout.toLocaleString()}
                                    <input
                                      type="hidden"
                                      name={`taxInfo[${taxInfo.taxRate}][taxAmout]`}
                                      value={taxInfo.taxAmout}
                                      readOnly
                                    />
                                  </StyledTableRowCell>
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </>
                  )
                }
              })()}

              <Box></Box>
            </LinedContainerBox>
          </Box>

          <Box sx={{ height: "32px" }}></Box>
          {/* ページ内フッター */}
          <Box>
            <LinedContainerBox></LinedContainerBox>
          </Box>
          <Box sx={{ height: "32px" }}></Box>
        </form>
      </BaseComponent>
    </>
  )
}

const container = document.getElementById("createTransaction")!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Create />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
