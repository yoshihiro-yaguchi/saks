import React, { useEffect } from "react"
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Pagination,
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
import { RootState } from "@src/app/store"
import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { actions } from "./reducer"
import { BaseComponent } from "@resource/ts/src/common/Component/BaseComponent"
import { H1, H2, H5, Typo } from "@resource/ts/src/common/Component/Typo"
import { operations } from "./operation"
import Paper from "@mui/material/Paper"
import { AmountInfo, ModalState, Office } from "./types"
import { Delete } from "@mui/icons-material"
import { constants } from "./constant"
import { ErrorAlert } from "@resource/ts/src/common/Component/ErrorAlert"
import { LinedContainerBox } from "@resource/ts/src/common/Component/LinedContainerBox"
import { FullWidthInput, Input } from "@resource/ts/src/common/Component/Input"
import {
  StyledTableHeadCell,
  StyledTableRowCell,
  StyledTableRow,
} from "@resource/ts/src/common/Component/Table"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
import { useNavigate } from "react-router-dom"
import { DetailRow, TaxInfo } from "../TransactionTypes"

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

  // 税情報
  const taxInfos: Array<TaxInfo> = useAppSelector(
    (s: RootState) => s.storeTransaction.taxInfos
  )

  // 事業所情報
  const offices: Array<Office> = useAppSelector(
    (s: RootState) => s.storeTransaction.offices
  )

  // モーダル
  const modalState: ModalState = useAppSelector(
    (s: RootState) => s.storeTransaction.modal
  )

  // 法人区分が法人である
  const isCorporation =
    customerInfoState.corporationDivision === constants.CORPORATION_CORPORATE

  return (
    <>
      <BaseComponent processing={processing}>
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
                        onClick={() => navigate("/transaction/search")}
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
              <FullWidthInput
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
              ></FullWidthInput>
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
                  <FullWidthInput
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
                  ></FullWidthInput>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <Box sx={{ padding: "8px 8px 8px 0" }}>
                    <FormControl fullWidth>
                      <InputLabel>取引支店</InputLabel>
                      {offices.length > 0 && (
                        <Select
                          id="transactionBranch"
                          name="transactionInfo[transactionBranch]"
                          size="small"
                          labelId="transactionBranch"
                          value={transactionInfoState.transactionBranch}
                          label="取引支店"
                          defaultValue=""
                          onChange={(e: SelectChangeEvent<string>) => {
                            dispatch(
                              actions.updateTransactionInfoHandle({
                                name: "transactionBranch",
                                value: e.target.value,
                              })
                            )
                          }}
                        >
                          {offices.map((office, index) => (
                            <MenuItem value={office.officeCode} key={index}>
                              {office.officeName}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FullWidthInput
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
                  ></FullWidthInput>
                </Grid>
              </Grid>
              <FullWidthInput
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
              ></FullWidthInput>
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
                    {/* <Button
                      variant="outlined"
                      type="button"
                      color="primary"
                      onClick={() => {}}
                    >
                      お客様検索
                    </Button> */}
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
                  <FullWidthInput
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
                  ></FullWidthInput>
                </Grid>
              </Grid>
              <FullWidthInput
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
              ></FullWidthInput>
              <FullWidthInput
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
              ></FullWidthInput>
              <Grid container spacing={1}>
                <Grid item xs={12} lg={6}>
                  <FullWidthInput
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
                  ></FullWidthInput>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FullWidthInput
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
                  ></FullWidthInput>
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ marginTop: "8px" }}>
                <Grid item xs={12} lg={6}>
                  <FullWidthInput
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
                    value={commonFunc.zipCodeHyphen(customerInfoState.zipCode)}
                    error={commonState.errors.hasOwnProperty(
                      "customerInfo.zipCode"
                    )}
                  ></FullWidthInput>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FullWidthInput
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
                  ></FullWidthInput>
                </Grid>
              </Grid>
              <FullWidthInput
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
              ></FullWidthInput>
              <FullWidthInput
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
              ></FullWidthInput>
              <FullWidthInput
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
              ></FullWidthInput>
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
                      onClick={() => {
                        dispatch(actions.openModal())
                      }}
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
                    <StyledTableRow key={index}>
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
                      </StyledTableRowCell>
                      {/* 商品名 */}
                      <StyledTableRowCell>
                        <Typo>{row.productName}</Typo>
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
                              <InputAdornment position="end">
                                {row.unit}
                              </InputAdornment>
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
                                &yen;
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
                        <Typo>&yen;{row.totalPrice.toLocaleString()}</Typo>
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
                        <Typo>&yen;{amountInfo.subtotal.toLocaleString()}</Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableRowCell>
                        <H5>(内消費税)</H5>
                      </StyledTableRowCell>
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>
                          &yen;{amountInfo.taxInclude.toLocaleString()}
                        </Typo>
                      </StyledTableRowCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableRowCell>
                        <H5>合計</H5>
                      </StyledTableRowCell>
                      <StyledTableRowCell sx={{ textAlign: "right" }}>
                        <Typo>&yen;{amountInfo.total.toLocaleString()}</Typo>
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
                                </StyledTableRowCell>
                                <StyledTableRowCell
                                  sx={{
                                    width: "30%",
                                    textAlign: "right",
                                  }}
                                >
                                  <Typo>
                                    &yen;
                                    {taxInfo.taxableAmount.toLocaleString()}
                                  </Typo>
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
                                    &yen;{taxInfo.taxAmount.toLocaleString()}
                                  </Typo>
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

      {/* 商品追加モーダル */}
      <Modal
        open={modalState.isOpen}
        onClose={() => dispatch(actions.closeModal())}
      >
        <Box
          sx={{
            width: "750px",
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          {/* ヘッダー */}
          <Box sx={{ borderBottom: "1px solid #dddddd" }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <H1>商品検索</H1>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  verticalAlign: "center",
                }}
              >
                <Input
                  label="商品コード"
                  value={modalState.searchCondition.productionCode}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      actions.modalInputCondition({
                        key: "productionCode",
                        value: e.target.value,
                      })
                    )
                  }
                  onBlur={() => dispatch(operations.modalSearch())}
                ></Input>
                <Input
                  label="商品名"
                  value={modalState.searchCondition.productionName}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      actions.modalInputCondition({
                        key: "productionName",
                        value: e.target.value,
                      })
                    )
                  }
                ></Input>
                <Box sx={{ padding: "8px 8px 8px 0" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ height: "40px" }}
                    onClick={() => dispatch(operations.modalSearch())}
                  >
                    検索
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {/* 検索結果表示 */}
          <Box
            sx={{
              borderBottom: "1px solid #dddddd",
              height: "150px",
              overflow: "scroll",
            }}
          >
            {(() => {
              if (modalState.searchResult.length > 0) {
                return (
                  <>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Pagination
                        size="small"
                        sx={{ display: "flex", alignContent: "center" }}
                        page={modalState.paginate.pages}
                        count={modalState.paginate.maxPages}
                        onChange={(e: React.ChangeEvent<unknown>, page) =>
                          dispatch(operations.modalPerPage(page))
                        }
                      ></Pagination>
                    </Box>
                    <Box sx={{ margin: "8px" }}>
                      <TableContainer component={Paper}>
                        <Table sx={{ width: "100%" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell
                                sx={{ width: "40%", textAlign: "center" }}
                              >
                                <Typo>商品コード</Typo>
                              </TableCell>
                              <TableCell
                                sx={{ width: "60%", textAlign: "center" }}
                              >
                                <Typo>商品名</Typo>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {modalState.searchResult.map((row, index) => (
                              <TableRow key={row.productionCode}>
                                <TableCell
                                  sx={{ textAlign: "center" }}
                                  onClick={() =>
                                    dispatch(
                                      operations.modalRowClickHandle(index)
                                    )
                                  }
                                >
                                  <Link
                                    onClick={() =>
                                      dispatch(
                                        operations.modalRowClickHandle(index)
                                      )
                                    }
                                  >
                                    <Typo>{row.productionCode}</Typo>
                                  </Link>
                                </TableCell>
                                <TableCell
                                  sx={{ textAlign: "center" }}
                                  onClick={() =>
                                    dispatch(
                                      operations.modalRowClickHandle(index)
                                    )
                                  }
                                >
                                  <Link
                                    onClick={() =>
                                      dispatch(
                                        operations.modalRowClickHandle(index)
                                      )
                                    }
                                  >
                                    <Typo>{row.productionName}</Typo>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Pagination
                        size="small"
                        sx={{ display: "flex", alignContent: "center" }}
                        page={modalState.paginate.pages}
                        count={modalState.paginate.maxPages}
                        onChange={(e: React.ChangeEvent<unknown>, page) =>
                          dispatch(operations.modalPerPage(page))
                        }
                      ></Pagination>
                    </Box>
                  </>
                )
              } else {
                return <Typo>データが見つかりませんでした。</Typo>
              }
            })()}
          </Box>
          {/* 詳細入力 */}
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <FullWidthInput
                  label="商品名"
                  value={modalState.input.productionName}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      actions.modalInputData({
                        key: "productionName",
                        value: e.target.value,
                      })
                    )
                  }
                ></FullWidthInput>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ padding: "8px 8px 8px 0" }}>
                  <Button
                    variant="contained"
                    sx={{ width: "105px", height: "40px" }}
                    onClick={() =>
                      dispatch(operations.modalContinueAddDetailRow())
                    }
                  >
                    連続で追加
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ padding: "8px 8px 8px 0" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ width: "105px", height: "40px" }}
                    onClick={() => dispatch(actions.modalResetInputData())}
                  >
                    クリア
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={2.2}>
                <FullWidthInput
                  label="数量(重量)"
                  value={modalState.input.quantity}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length > 9) {
                      return false
                    }
                    dispatch(
                      actions.modalInputData({
                        key: "quantity",
                        value: e.target.value,
                      })
                    )
                  }}
                ></FullWidthInput>
              </Grid>
              <Grid item xs={1.5}>
                <FullWidthInput
                  label="単位"
                  value={modalState.input.unit}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      actions.modalInputData({
                        key: "unit",
                        value: e.target.value,
                      })
                    )
                  }
                ></FullWidthInput>
              </Grid>
              <Grid item xs={2.5}>
                <FullWidthInput
                  label="単価"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&yen;</InputAdornment>
                    ),
                  }}
                  value={modalState.input.unitPrice}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length > 13) {
                      return false
                    }
                    dispatch(
                      actions.modalInputData({
                        key: "unitPrice",
                        value: e.target.value,
                      })
                    )
                  }}
                ></FullWidthInput>
              </Grid>
              <Grid item xs={1.8}>
                <Box sx={{ padding: "8px 8px 8px 0" }}>
                  <FormControl fullWidth>
                    <InputLabel>税率</InputLabel>
                    <Select
                      labelId="taxRate"
                      value={modalState.input.taxRate}
                      size="small"
                      variant="outlined"
                      label="税率"
                      onChange={(e: SelectChangeEvent<number>) => {
                        dispatch(
                          actions.modalInputData({
                            key: "taxRate",
                            value: e.target.value,
                          })
                        )
                      }}
                    >
                      <MenuItem value={8}>8%</MenuItem>
                      <MenuItem value={10}>10%</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  verticalAlign: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ padding: "8px 8px 8px 0" }}>
                  <Button
                    variant="contained"
                    sx={{ width: "105px", height: "40px" }}
                    onClick={() => dispatch(operations.modalAddDetailRow())}
                  >
                    明細に追加
                  </Button>
                </Box>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ display: "flex", verticalAlign: "center" }}
              >
                <Box sx={{ padding: "8px 8px 8px 0" }}>
                  <Button
                    variant="outlined"
                    sx={{ width: "105px", height: "40px" }}
                    onClick={() => dispatch(actions.closeModal())}
                  >
                    閉じる
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>

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
