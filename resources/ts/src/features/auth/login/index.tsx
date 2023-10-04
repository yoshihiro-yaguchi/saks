import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from './reducer'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React, { useEffect } from "react"
import reportWebVitals from "@resource/ts/src/reportWebVitals"
import { Box, Button, Paper } from "@mui/material"
import { H1, Typo } from "@resource/ts/src/common/Text/Typo"
import { Input } from "@resource/ts/src/common/Input/Input"
import { InfoOutlined, Visibility, VisibilityOff } from "@mui/icons-material"
import { operations } from "./operations"
import { ErrorAlert } from "@resource/ts/src/common/ErrorAlert/ErrorAlert"
import { commonOperations } from "@resource/ts/src/common/commonOperations"

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

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init())
  }, [])

  // commonステート
  const commonState = useAppSelector((s: RootState) => s.common)

  // 新規登録に移動
  const locationToRegister = () => {
    document.location = "register"
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
            height: "290px",
            margin: "auto",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ margin: "10px", width: "100%", alignItems: "center" }}>
              <Box>
                <H1>ログイン</H1>

                <Input name="email" label="メールアドレス"></Input>
                <Input
                  name="password"
                  label="パスワード"
                  type="password"
                ></Input>
              </Box>
              <Box sx={{ marginTop: "30px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  ログイン
                </Button>
                <Button
                  type="button"
                  variant="text"
                  sx={{ width: "100%" }}
                  onClick={() => locationToRegister()}
                >
                  新規登録
                </Button>
              </Box>
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

const container = document.getElementById("loginForm")!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
