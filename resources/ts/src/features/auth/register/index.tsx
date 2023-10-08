import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from './reducer'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React, { useEffect } from "react"
import reportWebVitals from "@resource/ts/src/reportWebVitals"
import { Box, Button, Paper } from "@mui/material"
import { H1, Typo } from "@resource/ts/src/common/Component/Typo"
import { FullWidthInput } from "@resource/ts/src/common/Component/Input"
import { InfoOutlined, Visibility, VisibilityOff } from "@mui/icons-material"
import { operations } from "./operations"
import { ErrorAlert } from "@resource/ts/src/common/Component/ErrorAlert"
import { actions } from "./reducer"

export const Index = () => {
  const dispatch = useAppDispatch()
  // 画面項目
  // const contactStates = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.screenState)
  // 画面コントロール
  // const contactScreenControl = useAppSelector((s: RootState) => s.#{REDUCER_NAME}.controlState)
  // 値入力時ハンドラ
  // const onInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(contactActions.onInputHandle({ name: e.target.name, value: e.target.value }))
  // }

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init())
  }, [])

  // commonステート
  const commonState = useAppSelector((s: RootState) => s.common)

  // register state
  const registerState = useAppSelector((s: RootState) => s.authRegister)

  // ログインに戻るボタン押下時処理
  const locationToLogin = () => {
    document.location = "/login"
  }

  return (
    <>
      <Box className="maxHeight" sx={{ position: "relative" }}>
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            width: "350px",
            height: "450px",
            margin: "auto",
          }}
        >
          <Box sx={{ margin: "10px" }}>
            <Box>
              <H1>ユーザー登録</H1>

              <FullWidthInput
                name="name"
                label="お名前"
                value={registerState.name}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(actions.putName({ value: e.target.value }))
                }
              ></FullWidthInput>
              <FullWidthInput
                name="email"
                label="メールアドレス"
                value={registerState.email}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch(actions.putEmail({ value: e.target.value }))
                }
              ></FullWidthInput>
              <FullWidthInput
                name="password"
                label="パスワード"
                type="password"
              ></FullWidthInput>
              <Box>
                <InfoOutlined sx={{ float: "left" }}></InfoOutlined>
                <Typo>パスワードは6文字以上の半角英数字で入力してください</Typo>
              </Box>
              <FullWidthInput
                name="password_confirmation"
                label="もう一度パスワードを入力してください"
                type="password"
              ></FullWidthInput>
            </Box>
            <Box sx={{ marginTop: "30px" }}>
              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                新規登録
              </Button>
              <Button
                type="button"
                variant="text"
                sx={{ width: "100%" }}
                onClick={() => locationToLogin()}
              >
                ログインに戻る
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
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

const container = document.getElementById("registerForm")!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
