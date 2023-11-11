import { BaseComponent } from "@resource/ts/src/common/Component/BaseComponent"
import { H1, Typo } from "@resource/ts/src/common/Component/Typo"
import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import { useEffect } from "react"
import { operations } from "./operations"
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
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
import { Spacer } from "@resource/ts/src/common/Component/Spacer"
import { LinedContainerBox } from "@resource/ts/src/common/Component/LinedContainerBox"
import { useNavigate } from "react-router-dom"
import { ContainerBox } from "@resource/ts/src/common/Component/ContainerBox"
import { ErrorAlert } from "@resource/ts/src/common/Component/ErrorAlert"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { FullWidthInput } from "@resource/ts/src/common/Component/Input"
import { keyValueObject } from "@resource/ts/src/common/commonTypes"

export const Search = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // 共通ステート
  const commonState = useAppSelector((s: RootState) => s.common)

  const state = useAppSelector((s: RootState) => s.searchProduct)

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init())
  }, [])

  const onClickSearchResult = (productCode: string) => {
    navigate(`/product/update/${productCode}`)
  }

  const handleInput = (name: string, value: string) => {
    dispatch(operations.handleInput(name, value))
  }

  return (
    <>
      <BaseComponent processing={commonState.processing}>
        {/* ヘッダー */}
        <Box>
          <ContainerBox>
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
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/product/store")}
                  >
                    商品を作成
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </ContainerBox>
        </Box>
        <Spacer />
        {/* 検索条件 */}
        <Box>
          <LinedContainerBox>
            <Box sx={{ margin: "16px" }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <FullWidthInput
                        label="商品コード"
                        name="productionCode"
                        value={state.input.productionCode}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                          dispatch(
                            operations.handleInput(
                              e.target.name,
                              e.target.value
                            )
                          )
                        }
                        error={commonState.errors.hasOwnProperty(
                          "productionCode"
                        )}
                        inputProps={{
                          maxLength: "50",
                        }}
                      ></FullWidthInput>
                    </Grid>
                    <Grid item xs={6}>
                      <FullWidthInput
                        label="商品名"
                        name="productionName"
                        value={state.input.productionName}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleInput(e.target.name, e.target.value)
                        }
                        error={commonState.errors.hasOwnProperty(
                          "productionName"
                        )}
                        inputProps={{
                          maxLength: "100",
                        }}
                      ></FullWidthInput>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box sx={{ padding: "8px 8px 8px 0" }}>
                        <FormControl fullWidth>
                          <InputLabel>税区分</InputLabel>
                          <Select
                            size="small"
                            value={state.input.taxDivision}
                            label="税区分"
                            onChange={(e: SelectChangeEvent<string>) =>
                              dispatch(
                                operations.handleInput(
                                  "taxDivision",
                                  e.target.value
                                )
                              )
                            }
                            error={commonState.errors.hasOwnProperty(
                              "taxDivision"
                            )}
                          >
                            <MenuItem value="0">　</MenuItem>
                            <MenuItem value="1">内税</MenuItem>
                            <MenuItem value="2">外税</MenuItem>
                            <MenuItem value="3">非課税</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box sx={{ padding: "8px 8px 8px 0" }}>
                        <FormControl fullWidth>
                          <InputLabel>税率</InputLabel>
                          <Select
                            size="small"
                            value={state.input.taxRate}
                            label="税率"
                            onChange={(e: SelectChangeEvent<string>) =>
                              dispatch(
                                operations.handleInput(
                                  "taxRate",
                                  e.target.value
                                )
                              )
                            }
                            error={commonState.errors.hasOwnProperty("taxRate")}
                          >
                            <MenuItem value="0">　</MenuItem>
                            <MenuItem value="10">標準税率 10%</MenuItem>
                            <MenuItem value="8">軽減税率 8%</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => dispatch(operations.doSearch())}
                sx={{ marginRight: "24px" }}
              >
                検索
              </Button>
            </Box>
          </LinedContainerBox>
        </Box>
        <Spacer />
        {/* 検索結果 */}
        <Box>
          <LinedContainerBox>
            {(() => {
              if (state.searchResults.length > 0) {
                return (
                  <>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            verticalAlign: "end",
                            marginTop: "16px",
                          }}
                        >
                          {/* TODO: 削除機能を実装する */}
                          <Button
                            color="error"
                            variant="outlined"
                            sx={{ margin: "auto 0" }}
                            hidden
                          >
                            削除
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "16px",
                          }}
                        >
                          {/* 1ページあたりの表示量 */}
                          <Select
                            size="small"
                            value={state.paginate.itemsPerPage}
                            onChange={(e: SelectChangeEvent<number>) =>
                              dispatch(
                                operations.handlePerPage(
                                  e.target.value as unknown as number
                                )
                              )
                            }
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                          </Select>
                          <Pagination
                            sx={{ display: "flex", alignContent: "center" }}
                            page={state.paginate.pages}
                            count={state.paginate.maxPages}
                            onChange={(e: React.ChangeEvent<unknown>, page) =>
                              dispatch(operations.handlePaginate(page))
                            }
                          ></Pagination>
                        </Box>
                      </Grid>
                    </Grid>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "16px",
                      }}
                    ></Box>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: "950px" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell width={"25px"}></TableCell>
                            <TableCell
                              width={"30%"}
                              sx={{ textAlign: "center" }}
                            >
                              <Typo>商品コード</Typo>
                            </TableCell>
                            <TableCell
                              width={"32.5%"}
                              sx={{ textAlign: "center" }}
                            >
                              <Typo>商品名</Typo>
                            </TableCell>
                            <TableCell
                              width={"12.5%"}
                              sx={{ textAlign: "center" }}
                            >
                              <Typo>単価</Typo>
                            </TableCell>
                            <TableCell
                              width={"12.5%"}
                              sx={{ textAlign: "center" }}
                            >
                              <Typo>税区分</Typo>
                            </TableCell>
                            <TableCell
                              width={"12.5%"}
                              sx={{ textAlign: "center" }}
                            >
                              <Typo>税率</Typo>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {state.searchResults.map((row) => (
                            <TableRow key={row.productionCode}>
                              <TableCell></TableCell>
                              {/* 商品コード */}
                              <TableCell sx={{ textAlign: "center" }}>
                                <Typo>
                                  <Button size="small">
                                    <Link
                                      onClick={() =>
                                        onClickSearchResult(row.productionCode)
                                      }
                                    >
                                      {row.productionCode}
                                    </Link>
                                  </Button>
                                </Typo>
                              </TableCell>
                              {/* 商品名 */}
                              <TableCell sx={{ textAlign: "center" }}>
                                <Typo>{row.productionName}</Typo>
                              </TableCell>
                              {/* 単価 */}
                              <TableCell sx={{ textAlign: "center" }}>
                                <Typo>
                                  {Math.floor(row.unitPrice).toLocaleString()}
                                </Typo>
                              </TableCell>
                              {/* 税区分 */}
                              <TableCell sx={{ textAlign: "center" }}>
                                <Typo>
                                  {(() => {
                                    const taxNames: keyValueObject = {
                                      1: "内税",
                                      2: "外税",
                                      3: "非課税",
                                    }
                                    const tasDivision: string = row.taxDivision
                                    if (tasDivision in taxNames) {
                                      return taxNames[tasDivision]
                                    }
                                  })()}
                                </Typo>
                              </TableCell>
                              {/* お客様名 */}
                              <TableCell sx={{ textAlign: "center" }}>
                                <Typo>
                                  {Math.floor(row.taxRate as unknown as number)}
                                  %
                                </Typo>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "16px",
                      }}
                    >
                      {/* 1ページあたりの表示量 */}
                      <Select
                        size="small"
                        value={state.paginate.itemsPerPage}
                        onChange={(e: SelectChangeEvent<number>) =>
                          dispatch(
                            operations.handlePerPage(
                              e.target.value as unknown as number
                            )
                          )
                        }
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                      </Select>
                      <Pagination
                        sx={{ display: "flex", alignContent: "center" }}
                        page={state.paginate.pages}
                        count={state.paginate.maxPages}
                        onChange={(e: React.ChangeEvent<unknown>, page) =>
                          dispatch(operations.handlePaginate(page))
                        }
                      ></Pagination>
                    </Box>
                  </>
                )
              } else {
                return (
                  <>
                    <Typo>データが見つかりませんでした。</Typo>
                  </>
                )
              }
            })()}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            ></Box>
          </LinedContainerBox>
        </Box>
      </BaseComponent>
      {/* エラー表示 */}
      {(() => {
        if (commonState.errorArray.length > 0) {
          return (
            <ErrorAlert
              severity="error"
              onClose={() => {
                dispatch(commonOperations.errorAlertClose())
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
