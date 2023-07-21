import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from './reducer'
// import { operations } from './operations'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React from "react"
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
} from "@mui/material"
import { LinedContainerBox } from "@resource/ts/src/common/Box/LinedContainerBox"
import { H1, H2, H3 } from "@resource/ts/src/common/Text/Typo"
import {
  StyledTableRow,
  StyledTableRowCell,
} from "@resource/ts/src/common/Table/Table"
import styled from "@emotion/styled"

const TextCenterdTableCell = styled(StyledTableRowCell)(({ theme }) => ({
  textAlign: "center",
}))

export const Index = () => {
  const dispatch = useAppDispatch()
  // // 画面項目
  // const contactStates = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.screenState)
  // // 画面コントロール
  // const contactScreenControl = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.controlState)
  // // 値入力時ハンドラ
  // const onInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(contactActions.onInputHandle({ name: e.target.name, value: e.target.value }))
  // }
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
                <Table size="small">
                  <TableBody>
                    {/* 件名 */}
                    <StyledTableRow>
                      <TextCenterdTableCell sx={{ width: "160px" }}>
                        <H3>件名</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 取引区分 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>取引区分</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 取引日付 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>取引日付</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 取引支店 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>取引支店</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 担当者 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>担当者</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 取引備考 */}
                    <StyledTableRow sx={{ height: "280px" }}>
                      <TextCenterdTableCell>
                        <H3>取引備考</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
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
                <Table size="small">
                  <TableBody>
                    {/* 法人区分 */}
                    <StyledTableRow>
                      <TextCenterdTableCell sx={{ width: "160px" }}>
                        <H3>法人区分</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 登録番号 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>登録番号</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 会社名 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>会社名</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 支店名 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>支店名</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* お名前 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>お名前</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 電話番号 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>電話番号</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ height: "16px" }}></Box>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableBody>
                    {/* 郵便番号 */}
                    <StyledTableRow>
                      <TextCenterdTableCell sx={{ width: "160px" }}>
                        <H3>郵便番号</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 都道府県 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>都道府県</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 市区町村 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>市区町村</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 町・番地 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>町・番地</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                    {/* 建物名等 */}
                    <StyledTableRow>
                      <TextCenterdTableCell>
                        <H3>建物名等</H3>
                      </TextCenterdTableCell>
                      <StyledTableRowCell></StyledTableRowCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </LinedContainerBox>
          </Grid>
        </Grid>
        {/* 明細情報 */}

        {/* ページ内フッター */}
      </BaseComponent>
    </>
  )
}

const container = document.getElementById("showTransaction")!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
