import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from "./reducer"
// import { operations } from "./operations"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React, { useEffect } from "react"
import reportWebVitals from "@resource/ts/src/reportWebVitals"
import { Box, Button, Grid, Paper } from "@mui/material"
import { H1, H3, Typo } from "@resource/ts/src/common/Component/Typo"
import { FullWidthInput } from "@resource/ts/src/common/Component/Input"
import { ErrorAlert } from "@resource/ts/src/common/Component/ErrorAlert"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { actions } from "./reducer"
import { operations } from "./operation"
import { commonFunc } from "@resource/ts/src/common/commonFunc"
import { Dialpad } from "@mui/icons-material"

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

  // commonステート
  const commonState = useAppSelector((s: RootState) => s.common)

  // 画面項目
  const inputState = useAppSelector(
    (s: RootState) => s.registerContract.inputState
  )

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init())
  }, [])

  // 入力項目更新
  const updateInputState = (name: string, value: string) => {
    dispatch(actions.onInputHandle({ name: name, value: value }))
  }

  return (
    <>
      <Box
        className="maxHeight"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper elevation={3} sx={{ display: "inline-block", height: "750px" }}>
          <form>
            <Box sx={{ margin: "10px" }}>
              <H1>情報を入力してください。</H1>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ width: "300px", margin: "10px" }}>
                  <Typo>契約者本人について教えてください。</Typo>
                  <Box sx={{ margin: "10px" }}>
                    <FullWidthInput
                      label="契約法人名"
                      name="contractCompanyName"
                      value={inputState.contractCompanyName}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateInputState(e.target.name, e.target.value)
                      }
                      error={commonState.errors.hasOwnProperty(
                        "contractCompanyName"
                      )}
                      inputProps={{ maxLength: 100 }}
                    ></FullWidthInput>
                    <FullWidthInput
                      label="契約者名"
                      name="contractersName"
                      value={inputState.contractersName}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateInputState(e.target.name, e.target.value)
                      }
                      error={commonState.errors.hasOwnProperty(
                        "contractersName"
                      )}
                      required
                      inputProps={{ maxLength: 100 }}
                    ></FullWidthInput>
                    <FullWidthInput
                      label="登録番号"
                      name="invoiceNumber"
                      value={inputState.invoiceNumber}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateInputState(e.target.name, e.target.value)
                      }
                      error={commonState.errors.hasOwnProperty("invoiceNumber")}
                      inputProps={{ maxLength: 14 }}
                    ></FullWidthInput>
                    <FullWidthInput
                      label="代表電話番号"
                      name="hqPhoneNumber"
                      value={inputState.hqPhoneNumber}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateInputState(e.target.name, e.target.value)
                      }
                      error={commonState.errors.hasOwnProperty("hqPhoneNumber")}
                      required
                      inputProps={{ maxLength: 15 }}
                    ></FullWidthInput>
                    <FullWidthInput
                      label="郵便番号"
                      name="contractZipcode"
                      value={commonFunc.zipCodeHyphen(
                        inputState.contractZipcode
                      )}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const zipCode = e.target.value.replace("-", "")
                        updateInputState(e.target.name, zipCode)
                      }}
                      onBlur={() => dispatch(operations.zipCodeOnBlur())}
                      error={commonState.errors.hasOwnProperty(
                        "contractZipcode"
                      )}
                      inputProps={{ maxLength: 8 }}
                    ></FullWidthInput>
                    <FullWidthInput
                      label="契約者住所 都道府県"
                      name="contractAddress1"
                      value={inputState.contractAddress1}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateInputState(e.target.name, e.target.value)
                      }
                      required
                      error={commonState.errors.hasOwnProperty(
                        "contractAddress1"
                      )}
                      inputProps={{ maxLength: 10 }}
                    ></FullWidthInput>
                    <FullWidthInput
                      label="契約者住所 市区町村"
                      name="contractAddress2"
                      value={inputState.contractAddress2}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateInputState(e.target.name, e.target.value)
                      }
                      error={commonState.errors.hasOwnProperty(
                        "contractAddress2"
                      )}
                      required
                      inputProps={{ maxLength: 50 }}
                    ></FullWidthInput>
                    <FullWidthInput
                      label="契約者住所 町・番地"
                      name="contractAddress3"
                      value={inputState.contractAddress3}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateInputState(e.target.name, e.target.value)
                      }
                      error={commonState.errors.hasOwnProperty(
                        "contractAddress3"
                      )}
                      required
                      inputProps={{ maxLength: 100 }}
                    ></FullWidthInput>
                    <FullWidthInput
                      label="契約者住所 建物名等"
                      name="contractAddress4"
                      value={inputState.contractAddress4}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateInputState(e.target.name, e.target.value)
                      }
                      error={commonState.errors.hasOwnProperty(
                        "contractAddress4"
                      )}
                      inputProps={{ maxLength: 100 }}
                    ></FullWidthInput>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ margin: "0 10px 10px 10px" }}>
              <Box sx={{ height: "15px" }}></Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => dispatch(operations.storeContract())}
              >
                登録する
              </Button>
            </Box>
          </form>
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

const container = document.getElementById("register_contract")!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Index />
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
