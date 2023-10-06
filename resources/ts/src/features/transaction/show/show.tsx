import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from './reducer'
// import { operations } from './operations'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React, { useEffect } from "react"
import reportWebVitals from "@src/reportWebVitals"
import { BaseComponent } from "@resource/ts/src/common/BaseComponent/BaseComponent"
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { LinedContainerBox } from "@resource/ts/src/common/Box/LinedContainerBox"
import { H1, H2, H4, H5, Typo } from "@resource/ts/src/common/Text/Typo"
import {
  StyledTableHeadCell,
  StyledTableRow,
  StyledTableRowCell,
} from "@resource/ts/src/common/Table/Table"
import styled from "@emotion/styled"
import { operations } from "./operators"
import { ParamParseKey, useParams } from "react-router-dom"
import { TRANSACTION_PATHS } from "../router/router"
import { TaxInfo } from "../TransactionTypes"

const TextCenterdTableCell = styled(StyledTableRowCell)(({ theme }) => ({
  textAlign: "center",
}))

export const Show = () => {
  const urlParams = useParams<ParamParseKey<typeof TRANSACTION_PATHS.SHOW>>()

  const dispatch = useAppDispatch()

  const transactionHead = useAppSelector(
    (s: RootState) => s.showTransaction.transactionHead
  )

  const detailRows = useAppSelector(
    (s: RootState) => s.showTransaction.detailRows
  )

  const taxInfos: Array<TaxInfo> = useAppSelector(
    (s: RootState) => s.showTransaction.taxInfos
  )

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init(urlParams))
  }, [])

  return (
    <>
      <BaseComponent processing={false}>
        {/* ページ内ヘッダー */}
        <Box>
          <Grid container spacing={4}>
            <Grid item xs>
              <LinedContainerBox>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <Box sx={{ width: "150px" }}>
                      <H1>取引詳細</H1>
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        sx={{ margin: "auto 5px" }}
                      >
                        一覧へ戻る
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="button"
                        sx={{ margin: "auto 5px" }}
                      >
                        伝票を発行
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        sx={{ margin: "auto 5px" }}
                      >
                        編集する
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
          <Grid item xs={12} lg={6}>
            {/* 取引情報 */}
            <LinedContainerBox>
              <H2>取引情報</H2>
              <Box sx={{ height: "16px" }}></Box>
              <TableContainer component={Paper}>
                <Table size="small" sx={{ tableLayout: "fixed" }}>
                  <TableBody>
                    {/* 件名 */}
                    <StyledTableRow>
                      <TextCenterdTableCell sx={{ width: "130px" }}>
                        <H4>件名</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.transactionTitle}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 取引区分 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>取引区分</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.transactionDivision}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 取引日付 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>取引日付</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.transactionDate}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 取引支店 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>取引支店</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.transactionBranch}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 担当者 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>担当者</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.transactionPicName}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 取引備考 */}
                    <StyledTableRow sx={{ height: "280px" }}>
                      <TextCenterdTableCell>
                        <H4>取引備考</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.transactionNote}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </LinedContainerBox>
          </Grid>
          <Grid item xs={12} lg={6}>
            {/* お客様情報 */}
            <LinedContainerBox>
              <H2>お客様情報</H2>
              <Box sx={{ height: "16px" }}></Box>
              <TableContainer component={Paper}>
                <Table size="small" sx={{ tableLayout: "fixed" }}>
                  <TableBody>
                    {/* 法人区分 */}
                    <StyledTableRow>
                      <TextCenterdTableCell sx={{ width: "130px" }}>
                        <H4>法人区分</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.corporationDivision}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 登録番号 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>登録番号</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.invoiceNumber}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 会社名 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>会社名</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.customerCompany}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 支店名 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>支店名</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.customerBranch}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* お名前 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>お名前</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.customerName}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 電話番号 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>電話番号</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.customerPhoneNumber}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ height: "16px" }}></Box>
              <TableContainer component={Paper}>
                <Table size="small" sx={{ tableLayout: "fixed" }}>
                  <TableBody>
                    {/* 郵便番号 */}
                    <StyledTableRow>
                      <TextCenterdTableCell sx={{ width: "130px" }}>
                        <H4>郵便番号</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.customerZipCode}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 都道府県 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>都道府県</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.customerAddress1}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 市区町村 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>市区町村</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.customerAddress2}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 町・番地 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>町・番地</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.customerAddress3}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    {/* 建物名等 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H4>建物名等</H4>
                      </TextCenterdTableCell>
                      <StyledTableRowCell>
                        <Typo>{transactionHead.customerAddress4}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </LinedContainerBox>
          </Grid>
        </Grid>
        {/* 明細情報 */}
        <Box sx={{ height: "32px" }}></Box>
        {/* 明細情報 */}
        <Box>
          <LinedContainerBox>
            <Box sx={{ marginBottom: "16px" }}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <H2>明細情報</H2>
                </Grid>
              </Grid>
              <Box sx={{ float: "left" }}></Box>
            </Box>
            <TableContainer component={Paper}>
              <Table size="small" sx={{ minWidth: "915px" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1cc1cc" }}>
                    <StyledTableHeadCell
                      sx={{ minWidth: "110px", width: "10%" }}
                    >
                      商品番号
                    </StyledTableHeadCell>
                    <StyledTableHeadCell>商品名</StyledTableHeadCell>
                    <StyledTableHeadCell
                      sx={{
                        width: "105px",
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
                    <StyledTableHeadCell sx={{ width: "156px" }}>
                      金額
                    </StyledTableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {detailRows.map((row, index) => (
                    <StyledTableRow key={row.productNo}>
                      {/* 商品番号 */}
                      <StyledTableRowCell>
                        <Typo>{row.productNo}</Typo>
                      </StyledTableRowCell>
                      {/* 商品名 */}
                      <StyledTableRowCell>
                        <Typo>{row.productName}</Typo>
                      </StyledTableRowCell>
                      {/* 数量(重量) */}
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>{Math.floor(row.quantity)}</Typo>
                      </StyledTableRowCell>
                      {/* 単価 */}
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>{`￥${Math.floor(
                          row.unitPrice
                        ).toLocaleString()}`}</Typo>
                      </StyledTableRowCell>
                      {/* 税率 */}
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>{`${Math.floor(row.taxRate)}%`}</Typo>
                      </StyledTableRowCell>
                      {/* 金額 */}
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>{`￥${Math.floor(
                          row.totalPrice
                        ).toLocaleString()}`}</Typo>
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
              <TableContainer component={Paper} sx={{ width: "350px" }}>
                <Table size="small" sx={{ width: "350px" }}>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableRowCell sx={{ width: "40%" }}>
                        <H5>小計</H5>
                      </StyledTableRowCell>
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>
                          ￥
                          {Math.floor(
                            transactionHead.subtotal
                          ).toLocaleString()}
                        </Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableRowCell>
                        <H5>(内消費税)</H5>
                      </StyledTableRowCell>
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>
                          ￥
                          {Math.floor(
                            transactionHead.taxInclude
                          ).toLocaleString()}
                        </Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableRowCell>
                        <H5>合計</H5>
                      </StyledTableRowCell>
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>
                          ￥{Math.floor(transactionHead.total).toLocaleString()}
                        </Typo>
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
                      <TableContainer component={Paper} sx={{ width: "500px" }}>
                        <Table size="small" sx={{ width: "500px" }}>
                          <TableBody>
                            {taxInfos.map((taxInfo, index) => (
                              <StyledTableRow key={index}>
                                <StyledTableRowCell
                                  sx={{
                                    width: "20%",
                                    textAlign: "center",
                                  }}
                                >
                                  <H5>{taxInfo.taxRate}%対象</H5>
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
                                  <Typo>
                                    ￥{taxInfo.taxableAmout.toLocaleString()}
                                  </Typo>
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
                                  <H5>消費税</H5>
                                </StyledTableRowCell>
                                <StyledTableRowCell
                                  sx={{
                                    width: "30%",
                                    textAlign: "right",
                                  }}
                                >
                                  <Typo>
                                    ￥{taxInfo.taxAmout.toLocaleString()}
                                  </Typo>
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
          </LinedContainerBox>
        </Box>

        {/* ページ内フッター */}
      </BaseComponent>
    </>
  )
}

// const container = document.getElementById("showTransaction")!
// const root = createRoot(container)

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Show />
//     </Provider>
//   </React.StrictMode>
// )

// reportWebVitals()
