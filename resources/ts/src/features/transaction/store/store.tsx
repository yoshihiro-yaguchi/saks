import React, { useEffect } from "react"
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
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
import { RootState } from "@src/app/store"
import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { BaseComponent } from "@resource/ts/src/common/Component/BaseComponent"
import { H1, H2, H5, Typo } from "@resource/ts/src/common/Component/Typo"
import { operations } from "./operation"
import Paper from "@mui/material/Paper"
import { AmountInfo } from "./types"
import { Delete, Search as SearchIcon } from "@mui/icons-material"
import { ErrorAlert } from "@resource/ts/src/common/Component/ErrorAlert"
import { LinedContainerBox } from "@resource/ts/src/common/Component/LinedContainerBox"
import {
  StyledTableHeadCell,
  StyledTableRowCell,
  StyledTableRow,
} from "@resource/ts/src/common/Component/Table"
import { useNavigate } from "react-router-dom"
import { DetailRow, TaxInfo } from "../TransactionTypes"
import { ModalSearchProduction } from "../common/modalSearchProduction/modalSearchProduction"
import { TransactionInfo } from "./components/transactionInfo"

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
          <Grid item xs={12} md={12}>
            <TransactionInfo />
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
                ></Grid>
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
                        width: "120px",
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
                              dispatch(operations.clearRowButtonHandle(index))
                            }
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </StyledTableRowCell>
                      {/* 商品検索 */}
                      <StyledTableRowCell sx={{ padding: "6px 6px" }}>
                        <Box sx={{ display: "inline-block" }}>
                          <IconButton
                            aria-label="deleteRow"
                            size="small"
                            onClick={() => {
                              dispatch(
                                operations.openModalTransactionSearchProduct(
                                  index
                                )
                              )
                            }}
                          >
                            <SearchIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </StyledTableRowCell>
                      {/* 商品番号 */}
                      <StyledTableRowCell>
                        <TextField
                          name={`detailRows[${index}][productNo]`}
                          size="small"
                          variant="standard"
                          sx={{
                            float: "left",
                            fontSize: "10px",
                          }}
                          value={row.productNo ?? ""}
                          error={commonState.errors.hasOwnProperty(
                            `detailRows.${index}.productNo`
                          )}
                          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.value.length > 8) {
                              return false
                            }
                            dispatch(
                              operations.updateDetailRow(
                                index,
                                "productNo",
                                e.target.value
                              )
                            )
                          }}
                          onBlur={() =>
                            dispatch(operations.productNoBlurHandle(index))
                          }
                        ></TextField>
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
          <LinedContainerBox>
            <Grid container spacing={1}>
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
        </Box>
      </BaseComponent>

      {/* 商品追加モーダル */}
      <ModalSearchProduction
        receiveFunc={operations.receiveModalTransactionSearchProduct}
      />

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
