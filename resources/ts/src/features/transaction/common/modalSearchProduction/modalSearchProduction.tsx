import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Modal,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import { FullWidthInput, Input } from "@resource/ts/src/common/Component/Input"
import { actions } from "./reducer"
import { H1, Typo } from "@resource/ts/src/common/Component/Typo"
import { modalSearchProductOperations } from "./operations"

type Props = {
  receiveFunc: Function
}

export const ModalSearchProduction = (props: Props) => {
  const dispatch = useAppDispatch()
  // 共通ステート
  const commonState = useAppSelector((s: RootState) => s.common)

  // ステート
  const state = useAppSelector(
    (s: RootState) => s.transactionModalSearchProduction
  )

  // 画面ロード時処理
  // useEffect(() => {

  // }, [])

  return (
    <>
      <Modal open={state.isOpen} onClose={() => dispatch(actions.close())}>
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
                  value={state.searchCondition.productionCode}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      actions.inputCondition({
                        key: "productionCode",
                        value: e.target.value,
                      })
                    )
                  }
                  onBlur={() => dispatch(modalSearchProductOperations.search())}
                ></Input>
                <Input
                  label="商品名"
                  value={state.searchCondition.productionName}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      actions.inputCondition({
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
                    onClick={() =>
                      dispatch(modalSearchProductOperations.search())
                    }
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
              if (state.searchResult.length > 0) {
                return (
                  <>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Pagination
                        size="small"
                        sx={{ display: "flex", alignContent: "center" }}
                        page={state.paginate.pages}
                        count={state.paginate.maxPages}
                        onChange={(e: React.ChangeEvent<unknown>, page) =>
                          dispatch(
                            modalSearchProductOperations.modalPerPage(page)
                          )
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
                            {state.searchResult.map((row, index) => (
                              <TableRow key={row.productionCode}>
                                <TableCell
                                  sx={{ textAlign: "center" }}
                                  onClick={() =>
                                    dispatch(
                                      modalSearchProductOperations.modalRowClickHandle(
                                        index
                                      )
                                    )
                                  }
                                >
                                  <Link
                                    onClick={() =>
                                      dispatch(
                                        modalSearchProductOperations.modalRowClickHandle(
                                          index
                                        )
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
                                      modalSearchProductOperations.modalRowClickHandle(
                                        index
                                      )
                                    )
                                  }
                                >
                                  <Link
                                    onClick={() =>
                                      dispatch(
                                        modalSearchProductOperations.modalRowClickHandle(
                                          index
                                        )
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
                        page={state.paginate.pages}
                        count={state.paginate.maxPages}
                        onChange={(e: React.ChangeEvent<unknown>, page) =>
                          dispatch(
                            modalSearchProductOperations.modalPerPage(page)
                          )
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
                  value={state.input.productionName}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      actions.inputData({
                        key: "productionName",
                        value: e.target.value,
                      })
                    )
                  }
                ></FullWidthInput>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ padding: "8px 8px 8px 0" }}></Box>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ padding: "8px 8px 8px 0" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ width: "105px", height: "40px" }}
                    onClick={() => dispatch(actions.resetInputData())}
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
                  value={state.input.quantity}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length > 9) {
                      return false
                    }
                    dispatch(
                      actions.inputData({
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
                  value={state.input.unit}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      actions.inputData({
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
                  value={state.input.unitPrice}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value.length > 13) {
                      return false
                    }
                    dispatch(
                      actions.inputData({
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
                      value={state.input.taxRate}
                      size="small"
                      variant="outlined"
                      label="税率"
                      onChange={(e: SelectChangeEvent<number>) => {
                        dispatch(
                          actions.inputData({
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
                    onClick={() => {
                      dispatch(
                        modalSearchProductOperations.modalAddDetailRow(
                          props.receiveFunc
                        )
                      )
                    }}
                  >
                    明細に反映
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
                    onClick={() => dispatch(actions.close())}
                  >
                    閉じる
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
