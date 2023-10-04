import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from './reducer'
// import { operations } from './operations'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React from "react"
import reportWebVitals from "@resource/ts/src/reportWebVitals"
import { Box, Button, Grid, Paper } from "@mui/material"
import { H1, Typo } from "@resource/ts/src/common/Text/Typo"
import { Input } from "@resource/ts/src/common/Input/Input"

export const Index = () => {
  const dispatch = useAppDispatch()
  // 画面項目
  //   const contactStates = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.screenState)
  // 画面コントロール
  //   const contactScreenControl = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.controlState)
  // 値入力時ハンドラ
  //   const onInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     dispatch(contactActions.onInputHandle({ name: e.target.name, value: e.target.value }))
  //   }
  return (
    <>
      <Box
        className="maxHeight"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper
          elevation={3}
          sx={{ display: "inline-block", height: "230px", width: "450px" }}
        >
          <Box sx={{ margin: "10px 10px" }}>
            <H1>メールを確認してください。</H1>
            <Typo>
              {document.body.querySelector<HTMLInputElement>("#email")?.value}
              宛に、メールアドレス確認のURLを送信しました。
              <br />
              メールをご確認の上、24時間以内に記載されているURLをクリックして、メールアドレスの確認を完了させてください。
            </Typo>
            <Box height={"25px"}></Box>
            <Button type="submit" variant="contained" fullWidth>
              メールの再送信はこちら
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

const container = document.getElementById("confirm_mail")!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
