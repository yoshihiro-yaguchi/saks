import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import { ReactHTMLElement, useEffect } from "react"
import { actions } from "./reducer"
import { operations } from "./operation"
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
import { BaseComponent } from "@resource/ts/src/common/Component/BaseComponent"
import { LinedContainerBox } from "@resource/ts/src/common/Component/LinedContainerBox"
import { H1, Typo } from "@resource/ts/src/common/Component/Typo"
import { FullWidthInput, Input } from "@resource/ts/src/common/Component/Input"
import { Specer } from "@resource/ts/src/common/Component/Spacer"
import { ErrorAlert } from "@resource/ts/src/common/Component/ErrorAlert"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { useNavigate } from "react-router-dom"

export const Search = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // 共通ステート
  const commonState = useAppSelector((s: RootState) => s.common)
  // 画面ステート
  const state = useAppSelector((s: RootState) => s.searchTransaction)

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init())
  }, [])

  // 入力項目更新
  const updateInput = (name: string, value: string) => {
    dispatch(
      actions.updateInputs({
        data: {
          [name]: value,
        },
      })
    )
  }

  const onClickSearchResult = (id: string) => {
    navigate(`/transaction/show/${id}`)
  }

  // ページあたり表示数変更
  const changePerPage = (perPage: number) => {
    dispatch(operations.changePerPage(perPage))
  }

  const changePage = (page: number) => {
    dispatch(operations.changePage(page))
  }

  return (
    <>
      <BaseComponent processing={commonState.processing}>
        {/* 検索条件 */}
        <Box>
          <LinedContainerBox>
            <H1>取引検索</H1>
            <Box sx={{ marginTop: "8px", marginLeft: "8px" }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                  <FullWidthInput
                    label="取引ID"
                    name="id"
                    value={state.inputs.id}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateInput(e.target.name, e.target.value)
                    }
                    sx={{ marginRight: "8px" }}
                  ></FullWidthInput>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={5}>
                      <FullWidthInput
                        label="取引日付From"
                        name="transactionDateFrom"
                        value={state.inputs.transactionDateFrom}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateInput(e.target.name, e.target.value)
                        }
                        type="date"
                      ></FullWidthInput>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={2}
                      sx={{
                        display: "flex",
                        "@media screen and (max-width:899px)": {
                          justifyContent: "flex-start",
                        },
                        "@media (min-width:900px)": {
                          justifyContent: "center",
                        },
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          "@media screen and (max-width:899px)": {
                            marginLeft: "8px",
                          },
                        }}
                      >
                        <Typo>〜</Typo>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                      <FullWidthInput
                        label="取引日付To"
                        name="transactionDateTo"
                        value={state.inputs.transactionDateTo}
                        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateInput(e.target.name, e.target.value)
                        }
                        type="date"
                      ></FullWidthInput>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} md={2}>
                  <Box sx={{ padding: "8px 8px 8px 0" }}>
                    <FormControl fullWidth>
                      <InputLabel>取引区分</InputLabel>
                      <Select
                        onChange={(e: SelectChangeEvent<string>) =>
                          dispatch(
                            actions.updateInputs({
                              data: {
                                transactionDivision: e.target.value,
                              },
                            })
                          )
                        }
                        value={state.inputs.transactionDivision}
                        size="small"
                        label="取引区分"
                      >
                        <MenuItem value={"0"}></MenuItem>
                        <MenuItem value={"1"}>買取</MenuItem>
                        <MenuItem value={"2"}>販売</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <FullWidthInput
                    label="取引件名"
                    name="transactionTitle"
                    value={state.inputs.transactionTitle}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateInput(e.target.name, e.target.value)
                    }
                  ></FullWidthInput>
                </Grid>
                <Grid item xs={12} md={5}>
                  <FullWidthInput
                    label="取引支店"
                    name="transactionBranch"
                    value={state.inputs.transactionBranch}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateInput(e.target.name, e.target.value)
                    }
                  ></FullWidthInput>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} md={2}>
                  <Box sx={{ padding: "8px 8px 8px 0" }}>
                    <FormControl fullWidth>
                      <InputLabel>法人区分</InputLabel>
                      <Select
                        onChange={(e: SelectChangeEvent<string>) =>
                          dispatch(
                            actions.updateInputs({
                              data: {
                                corporationDivision: e.target.value,
                              },
                            })
                          )
                        }
                        value={state.inputs.corporationDivision}
                        size="small"
                        fullWidth
                        label="法人区分"
                      >
                        <MenuItem value={"0"}></MenuItem>
                        <MenuItem value={"1"}>個人</MenuItem>
                        <MenuItem value={"2"}>法人</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <FullWidthInput
                    label="お客様 会社名"
                    name="customerCompany"
                    value={state.inputs.customerCompany}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateInput(e.target.name, e.target.value)
                    }
                  ></FullWidthInput>
                </Grid>
                <Grid item xs={12} md={5}>
                  <FullWidthInput
                    label="お客様名"
                    name="customerName"
                    value={state.inputs.customerName}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateInput(e.target.name, e.target.value)
                    }
                  ></FullWidthInput>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "8px",
                }}
              >
                <Button
                  onClick={() => dispatch(operations.search())}
                  variant="outlined"
                >
                  取引検索
                </Button>
              </Box>
            </Box>
          </LinedContainerBox>
        </Box>
        <Specer />
        {/* 検索結果 */}
        <Box>
          <LinedContainerBox>
            {(() => {
              if (state.transactions.length > 0) {
                return (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "16px",
                      }}
                    >
                      <Button color="error" variant="outlined">
                        削除
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "16px",
                      }}
                    >
                      {/* 1ページあたりの表示量 */}
                      <Select
                        value={state.paginate.itemsPerPage}
                        onChange={(e: SelectChangeEvent<number>) =>
                          changePerPage(e.target.value as unknown as number)
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
                          changePage(page)
                        }
                      />
                    </Box>
                    <TableContainer component={Paper}>
                      <Table sx={{ width: "950px" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell width={"25px"}></TableCell>
                            <TableCell width={"50px"}>
                              <Typo>ID</Typo>
                            </TableCell>
                            <TableCell width={"150px"}>
                              <Typo>件名</Typo>
                            </TableCell>
                            <TableCell width={"80px"}>
                              <Typo>区分</Typo>
                            </TableCell>
                            <TableCell width={"150px"}>
                              <Typo>お客様名</Typo>
                            </TableCell>
                            <TableCell width={"100px"}>
                              <Typo>担当者</Typo>
                            </TableCell>
                            <TableCell width={"100px"}>
                              <Typo>取引日付</Typo>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {state.transactions.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell></TableCell>
                              {/* ID */}
                              <TableCell
                                onClick={() => onClickSearchResult(row.id)}
                              >
                                <Typo>
                                  <Link
                                    onClick={() => onClickSearchResult(row.id)}
                                  >
                                    {row.id}
                                  </Link>
                                </Typo>
                              </TableCell>
                              {/* 件名 */}
                              <TableCell
                                onClick={() => onClickSearchResult(row.id)}
                              >
                                <Typo>
                                  <Link
                                    onClick={() => onClickSearchResult(row.id)}
                                  >
                                    {row.transactionTitle}
                                  </Link>
                                </Typo>
                              </TableCell>
                              {/* 区分 */}
                              <TableCell>
                                <Typo>{operations.getDivName(row)}</Typo>
                              </TableCell>
                              {/* お客様名 */}
                              <TableCell>
                                <Typo>{operations.getCustomerName(row)}</Typo>
                              </TableCell>
                              {/* 担当者 */}
                              <TableCell>
                                <Typo>{row.transactionPicName}</Typo>
                              </TableCell>
                              {/* 取引日付 */}
                              <TableCell>
                                <Typo>{row.transactionDate}</Typo>
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
                        value={state.paginate.itemsPerPage}
                        onChange={(e: SelectChangeEvent<number>) =>
                          changePerPage(e.target.value as unknown as number)
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
                          changePage(page)
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
