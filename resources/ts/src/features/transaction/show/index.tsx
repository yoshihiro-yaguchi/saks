import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from './reducer'
// import { operations } from './operations'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React from "react"
import reportWebVitals from "@src/reportWebVitals"
import { BaseComponent } from "@resource/ts/src/common/BaseComponent/BaseComponent"
import { Box, Button, Grid } from "@mui/material"
import { LinedContainerBox } from "@resource/ts/src/common/Box/LinedContainerBox"
import { H1 } from "@resource/ts/src/common/Text/Typo"

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
