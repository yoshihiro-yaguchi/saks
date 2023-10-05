import React, { useEffect } from "react"
import {
  Box,
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
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RootState, store } from "@src/app/store"
import reportWebVitals from "@src/reportWebVitals"
import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { actions } from "./reducer"
import { BaseComponent } from "@common/BaseComponent/BaseComponent"
import { H1, H2, H5, Typo } from "@src/common/Text/Typo"
import { operations } from "./operation"
import Paper from "@mui/material/Paper"
import { DetailRow, AmountInfo, TaxInfo } from "./types"
import { Delete } from "@mui/icons-material"
import { constants } from "./constant"
import { ErrorAlert } from "@resource/ts/src/common/ErrorAlert/ErrorAlert"
import { LinedContainerBox } from "@src/common/Box/LinedContainerBox"
import { Input } from "@src/common/Input/Input"
import {
  StyledTableHeadCell,
  StyledTableRowCell,
  StyledTableRow,
} from "@resource/ts/src/common/Table/Table"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
import { useNavigate } from "react-router-dom"

/**
 * 画面
 *
 * @returns
 */
export const Store = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init())
  }, [])

  // ロード中
  const processing = useAppSelector((s: RootState) => s.common.processing)

  // csrfトークン
  const csrfToken = useAppSelector((s: RootState) => s.storeTransaction.token)

  // commonコンポーネント
  const commonState = useAppSelector(
    (s: RootState) => s.storeTransaction.common
  )

  // 取引情報ステート
  const transactionInfoState = useAppSelector(
    (s: RootState) => s.storeTransaction.transactionInfo
  )

  // お客様情報ステート
  const customerInfoState = useAppSelector(
    (s: RootState) => s.storeTransaction.customerInfo
  )

  // 明細行
  const detailRows: DetailRow[] = useAppSelector(
    (s: RootState) => s.storeTransaction.detailRows
  )

  // 金額情報
  const amountInfo: AmountInfo = useAppSelector(
    (s: RootState) => s.storeTransaction.amountInfo
  )

  const taxInfos: TaxInfo[] = useAppSelector(
    (s: RootState) => s.storeTransaction.taxInfos
  )

  // 法人区分が法人である
  const isCorporation =
    customerInfoState.corporationDivision === constants.CORPORATION_CORPORATE

  return (
    <>
      <BaseComponent processing={processing}>
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
                    <Box
                      sx={{
                        width: "250px",
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
                        color="primary"
                        type="button"
                        sx={{ margin: "auto 5px" }}
                        onClick={() => {
                          dispatch(operations.saveTransactionData(navigate))
                        }}
                      >
                        保存
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
                id="transactionTitle"
                name="transactionInfo[transactionTitle]"
                label="件名"
                inputProps={{
                  maxLength: "50",
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    actions.updateTransactionInfoHandle({
                      name: e.target.id,
                      value: e.target.value,
                    })
                  )
                }}
                value={transactionInfoState.transactionTitle}
                error={commonState.errors.hasOwnProperty(
                  "transactionInfo.transactionTitle"
                )}
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
                        labelId="transactionDivision"
                        value={transactionInfoState.transactionDivision}
                        label="取引区分"
                        onChange={(e: SelectChangeEvent<string>) => {
                          dispatch(
                            actions.updateTransactionInfoHandle({
                              name: "transactionDivision",
                              value: e.target.value,
                            })
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
                    id="transactionDate"
                    name="transactionInfo[transactionDate]"
                    label="取引日付"
                    type="date"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        actions.updateTransactionInfoHandle({
                          name: e.target.id,
                          value: e.target.value,
                        })
                      )
                    }}
                    value={transactionInfoState.transactionDate}
                    error={commonState.errors.hasOwnProperty(
                      "transactionInfo.transactionDate"
                    )}
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
                        labelId="transactionBranch"
                        value={transactionInfoState.transactionBranch}
                        label="取引支店"
                        onChange={(e: SelectChangeEvent<string>) => {
                          dispatch(
                            actions.updateTransactionInfoHandle({
                              name: "transactionBranch",
                              value: e.target.value,
                            })
                          )
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
                    id="transactionPicName"
                    name="transactionInfo[transactionPicName]"
                    label="担当者"
                    inputProps={{
                      maxLength: "10",
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        actions.updateTransactionInfoHandle({
                          name: e.target.id,
                          value: e.target.value,
                        })
                      )
                    }}
                    value={transactionInfoState.transactionPicName}
                    error={commonState.errors.hasOwnProperty(
                      "transactionInfo.transactionPicName"
                    )}
                  ></Input>
                </Grid>
              </Grid>
              <Input
                id="transactionNote"
                name="transactionInfo[transactionNote]"
                label="取引備考"
                multiline
                rows={12}
                inputProps={{
                  maxLength: "1000",
                }}
                sx={{ height: "auto" }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    actions.updateTransactionInfoHandle({
                      name: e.target.id,
                      value: e.target.value,
                    })
                  )
                }}
                value={transactionInfoState.transactionNote}
                error={commonState.errors.hasOwnProperty(
                  "transactionInfo.transactionNote"
                )}
              ></Input>
            </LinedContainerBox>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* お客様情報 */}
            <LinedContainerBox>
              <Grid container spacing={1}>
                <Grid item xs>
                  <H2>お客様情報</H2>
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
                      onClick={() => {}}
                    >
                      お客様検索
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <Box sx={{ padding: "8px 8px 8px 0" }}>
                    <FormControl fullWidth>
                      <InputLabel>法人区分</InputLabel>
                      <Select
                        id="corporationDivision"
                        name="customerInfo[corporationDivision]"
                        size="small"
                        value={customerInfoState.corporationDivision}
                        label="法人区分"
                        onChange={(e: SelectChangeEvent<string>) => {
                          dispatch(
                            actions.updateCustomerInfoHandle({
                              name: "corporationDivision",
                              value: e.target.value as string,
                            })
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
                    id="invoiceNumber"
                    name="customerInfo[invoiceNumber]"
                    label="登録番号"
                    inputProps={{
                      maxLength: "14",
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        actions.updateCustomerInfoHandle({
                          name: e.target.id,
                          value: e.target.value,
                        })
                      )
                    }}
                    value={customerInfoState.invoiceNumber}
                    error={commonState.errors.hasOwnProperty(
                      "customerInfo.invoiceNumber"
                    )}
                  ></Input>
                </Grid>
              </Grid>
              <Input
                id="customerCompany"
                name="customerInfo[customerCompany]"
                hidden={isCorporation ? false : true}
                sx={isCorporation ? {} : { display: "none" }}
                label="会社名"
                inputProps={{
                  maxLength: "50",
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    actions.updateCustomerInfoHandle({
                      name: e.target.id,
                      value: e.target.value,
                    })
                  )
                }}
                value={customerInfoState.customerCompany}
                error={commonState.errors.hasOwnProperty(
                  "customerInfo.customerCompany"
                )}
              ></Input>
              <Input
                id="customerBranch"
                name="customerInfo[customerBranch]"
                hidden={isCorporation ? false : true}
                sx={isCorporation ? {} : { display: "none" }}
                label="支店名"
                inputProps={{
                  maxLength: "50",
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    actions.updateCustomerInfoHandle({
                      name: e.target.id,
                      value: e.target.value,
                    })
                  )
                }}
                value={customerInfoState.customerBranch}
                error={commonState.errors.hasOwnProperty(
                  "customerInfo.customerBranch"
                )}
              ></Input>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <Input
                    id="customerName"
                    name="customerInfo[customerName]"
                    label="お名前"
                    inputProps={{
                      maxLength: "10",
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        actions.updateCustomerInfoHandle({
                          name: e.target.id,
                          value: e.target.value,
                        })
                      )
                    }}
                    value={customerInfoState.customerName}
                    error={commonState.errors.hasOwnProperty(
                      "customerInfo.customerName"
                    )}
                  ></Input>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Input
                    id="customerPhoneNumber"
                    name="customerInfo[customerPhoneNumber]"
                    label="電話番号"
                    inputProps={{
                      maxLength: "15",
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        actions.updateCustomerInfoHandle({
                          name: e.target.id,
                          value: e.target.value,
                        })
                      )
                    }}
                    value={customerInfoState.customerPhoneNumber}
                    error={commonState.errors.hasOwnProperty(
                      "customerInfo.customerPhoneNumber"
                    )}
                  ></Input>
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: "8px" }}>
                <Grid item xs={12} lg={6}>
                  <Input
                    id="zipCode"
                    name="customerInfo[zipCode]"
                    label="郵便番号"
                    inputProps={{
                      maxLength: "8",
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const zipCode = e.target.value.replace("-", "")
                      dispatch(
                        actions.updateCustomerInfoHandle({
                          name: e.target.id,
                          value: zipCode,
                        })
                      )
                    }}
                    onBlur={() => {
                      dispatch(operations.zipCodeOnBlur())
                    }}
                    value={commonFunc.zipCodeHyphen(customerInfoState.zipCode)}
                    error={commonState.errors.hasOwnProperty(
                      "customerInfo.zipCode"
                    )}
                  ></Input>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Input
                    id="customerAddress1"
                    name="customerInfo[customerAddress1]"
                    label="都道府県"
                    inputProps={{
                      maxLength: "10",
                    }}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                      dispatch(
                        actions.updateCustomerInfoHandle({
                          name: e.target.id,
                          value: e.target.value,
                        })
                      )
                    }}
                    value={customerInfoState.customerAddress1}
                    error={commonState.errors.hasOwnProperty(
                      "customerInfo.customerAddress1"
                    )}
                  ></Input>
                </Grid>
              </Grid>
              <Input
                id="customerAddress2"
                name="customerInfo[customerAddress2]"
                label="市区町村"
                inputProps={{
                  maxLength: "50",
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    actions.updateCustomerInfoHandle({
                      name: e.target.id,
                      value: e.target.value,
                    })
                  )
                }}
                value={customerInfoState.customerAddress2}
                error={commonState.errors.hasOwnProperty(
                  "customerInfo.customerAddress2"
                )}
              ></Input>
              <Input
                id="customerAddress3"
                name="customerInfo[customerAddress3]"
                label="町・番地"
                inputProps={{
                  maxLength: "100",
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    actions.updateCustomerInfoHandle({
                      name: e.target.id,
                      value: e.target.value,
                    })
                  )
                }}
                value={customerInfoState.customerAddress3}
                error={commonState.errors.hasOwnProperty(
                  "customerInfo.customerAddress3"
                )}
              ></Input>
              <Input
                id="customerAddress4"
                name="customerInfo[customerAddress4]"
                label="建物名等"
                inputProps={{
                  maxLength: "100",
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    actions.updateCustomerInfoHandle({
                      name: e.target.id,
                      value: e.target.value,
                    })
                  )
                }}
                value={customerInfoState.customerAddress4}
                error={commonState.errors.hasOwnProperty(
                  "customerInfo.customerAddress4"
                )}
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
                      onClick={() =>
                        dispatch(
                          operations.addDetailRow(
                            transactionInfoState.transactionDate
                          )
                        )
                      }
                    >
                      明細追加
                    </Button>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ float: "left" }}></Box>
            </Box>
            <TableContainer component={Paper}>
              <Table size="small" sx={{ minWidth: "915px" }}>
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
                      {/* 削除ボタン */}
                      <StyledTableRowCell sx={{ padding: "6px 6px" }}>
                        <Box sx={{ display: "inline-block" }}>
                          <IconButton
                            aria-label="deleteRow"
                            size="small"
                            onClick={() =>
                              dispatch(
                                operations.deleteDetailRow(row.productNo)
                              )
                            }
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </StyledTableRowCell>
                      {/* 商品番号 */}
                      <StyledTableRowCell>
                        <Typo>{row.productNo}</Typo>
                        <input
                          readOnly
                          hidden
                          name={`detailRows[${index}][productNo]`}
                          value={row.productNo ?? ""}
                        />
                      </StyledTableRowCell>
                      {/* 商品名 */}
                      <StyledTableRowCell>
                        <Typo>{row.productName}</Typo>
                        <input
                          readOnly
                          hidden
                          name={`detailRows[${index}][productName]`}
                          value={row.productName ?? ""}
                        />
                      </StyledTableRowCell>
                      {/* 数量(重量) */}
                      <StyledTableRowCell>
                        <TextField
                          name={`detailRows[${index}][quantity]`}
                          type="number"
                          size="small"
                          variant="standard"
                          sx={{
                            float: "left",
                            fontSize: "10px",
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">個</InputAdornment>
                            ),
                          }}
                          value={row.quantity ?? 0}
                          error={commonState.errors.hasOwnProperty(
                            `detailRows.${index}.quantity`
                          )}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length > 5) {
                              return false
                            }
                            dispatch(
                              operations.updateDetailRow(
                                index,
                                "quantity",
                                e.target.value
                              )
                            )
                          }}
                        ></TextField>
                      </StyledTableRowCell>
                      {/* 単価 */}
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <TextField
                          name={`detailRows[${index}][unitPrice]`}
                          size="small"
                          variant="standard"
                          sx={{
                            float: "left",
                            fontSize: "10px",
                          }}
                          type="number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                ￥
                              </InputAdornment>
                            ),
                          }}
                          value={row.unitPrice ?? 0}
                          error={commonState.errors.hasOwnProperty(
                            `detailRows.${index}.unitPrice`
                          )}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length > 9) {
                              return false
                            }
                            dispatch(
                              operations.updateDetailRow(
                                index,
                                "unitPrice",
                                e.target.value
                              )
                            )
                          }}
                        ></TextField>
                      </StyledTableRowCell>
                      {/* 税率 */}
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Select
                          name={`detailRows[${index}][taxRate]`}
                          labelId="taxRate"
                          value={row.taxRate}
                          size="small"
                          variant="standard"
                          fullWidth
                          onChange={(e: SelectChangeEvent<number>) => {
                            dispatch(
                              operations.updateDetailRow(
                                index,
                                "taxRate",
                                e.target.value
                              )
                            )
                          }}
                        >
                          <MenuItem value={8}>8%</MenuItem>
                          <MenuItem value={10}>10%</MenuItem>
                        </Select>
                      </StyledTableRowCell>
                      {/* 金額 */}
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>￥{row.totalPrice.toLocaleString()}</Typo>
                        <input
                          readOnly
                          hidden
                          name={`detailRows[${index}][totalPrice]`}
                          value={row.totalPrice ?? 0}
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
              <TableContainer component={Paper} sx={{ width: "350px" }}>
                <Table size="small" sx={{ width: "350px" }}>
                  <TableBody>
                    <StyledTableRow>
                      <StyledTableRowCell sx={{ width: "40%" }}>
                        <H5>小計</H5>
                      </StyledTableRowCell>
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>￥{amountInfo.subtotal.toLocaleString()}</Typo>
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
                        <H5>(内消費税)</H5>
                      </StyledTableRowCell>
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>￥{amountInfo.taxInclude.toLocaleString()}</Typo>
                        <input
                          type="hidden"
                          name="amountInfo[taxInclude]"
                          value={amountInfo.taxInclude}
                          readOnly
                        />
                      </StyledTableRowCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableRowCell>
                        <H5>合計</H5>
                      </StyledTableRowCell>
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>￥{amountInfo.total.toLocaleString()}</Typo>
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

            <Box></Box>
          </LinedContainerBox>
        </Box>

        <Box sx={{ height: "32px" }}></Box>
        {/* ページ内フッター */}
        <Box>
          <LinedContainerBox></LinedContainerBox>
        </Box>
        <Box sx={{ height: "32px" }}></Box>
      </BaseComponent>
      {(() => {
        if (commonState.errorArray.length > 0) {
          return (
            <ErrorAlert
              severity="error"
              onClose={() => {
                dispatch(operations.errorAlertClose())
              }}
              sx={{
                borderRadius: "8px",
              }}
            >
              {commonState.errorArray.map((error, index) => (
                <Box key={index} sx={{ margin: "3px 0" }}>
                  {error}
                </Box>
              ))}
            </ErrorAlert>
          )
        }
      })()}
    </>
  )
}

// const container = document.getElementById("storeTransaction")!
// const root = createRoot(container)

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Store />
//     </Provider>
//   </React.StrictMode>
// )

// reportWebVitals()
