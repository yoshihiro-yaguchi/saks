import { BaseComponent } from "@resource/ts/src/common/Component/BaseComponent"
import { H1 } from "@resource/ts/src/common/Component/Typo"
import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import React, { useEffect } from "react"
import { operations } from "./operations"
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { ContainerBox } from "@resource/ts/src/common/Component/ContainerBox"
import { Spacer } from "@resource/ts/src/common/Component/Spacer"
import { LinedContainerBox } from "@resource/ts/src/common/Component/LinedContainerBox"
import { FullWidthInput } from "@resource/ts/src/common/Component/Input"
import { ErrorAlert } from "@resource/ts/src/common/Component/ErrorAlert"
import { commonOperations } from "@resource/ts/src/common/commonOperations"
import { useNavigate } from "react-router-dom"

export const Store = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  // 共通ステート
  const commonState = useAppSelector((s: RootState) => s.common)

  const state = useAppSelector((s: RootState) => s.storeProduct)

  // 画面ロード時処理
  useEffect(() => {
    dispatch(operations.init())
  }, [])

  const handleInput = (name: string, value: string | number) => {
    dispatch(operations.handleInput(name, value))
  }

  return (
    <>
      <BaseComponent processing={commonState.processing}>
        {/* ヘッダー部分 */}
        <Box>
          <ContainerBox>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <H1>商品登録</H1>
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
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate("/product/search")
                  }}
                >
                  一覧へ戻る
                </Button>
              </Grid>
            </Grid>
          </ContainerBox>
        </Box>
        <Spacer />
        {/* 入力部分 */}
        <Box>
          <LinedContainerBox>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={() => dispatch(operations.doStore(navigate))}
              >
                登録する
              </Button>
            </Box>
            {/*
              商品コード	production_code	varchar	8
              商品名	production_name	varchar	100
              単価	unit_price	decimal	12	3
            */}
            <Grid container spacing={2} sx={{ marginTop: "16px" }}>
              <Grid item xs={12} md={4}>
                <FullWidthInput
                  label="商品コード"
                  name="productionCode"
                  value={state.inputState.productionCode}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInput(e.target.name, e.target.value)
                  }
                  error={commonState.errors.hasOwnProperty("productionCode")}
                  inputProps={{
                    maxLength: "50",
                  }}
                ></FullWidthInput>
              </Grid>
              <Grid item xs={12} md={4}>
                <FullWidthInput
                  label="商品名"
                  name="productionName"
                  value={state.inputState.productionName}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInput(e.target.name, e.target.value)
                  }
                  error={commonState.errors.hasOwnProperty("productionName")}
                  inputProps={{
                    maxLength: "100",
                  }}
                ></FullWidthInput>
              </Grid>
              <Grid item xs={12} md={4}>
                <FullWidthInput
                  label="単価"
                  name="unitPrice"
                  type="number"
                  value={state.inputState.unitPrice}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleInput(e.target.name, e.target.value)
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">&yen;</InputAdornment>
                    ),
                  }}
                  error={commonState.errors.hasOwnProperty("unitPrice")}
                ></FullWidthInput>
              </Grid>
            </Grid>
            {/*
              税区分	tax_division	tinyint unsigned
              税率	tax_rate	decimal	8	3
              単位	unit	varchar	5
            */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ padding: "8px 8px 8px 0" }}>
                  <FormControl fullWidth>
                    <InputLabel>税区分</InputLabel>
                    <Select
                      name="taxDivision"
                      size="small"
                      value={state.inputState.taxDivision}
                      label="税区分"
                      onChange={(e: SelectChangeEvent<string>) => {
                        dispatch(
                          operations.handleInput("taxDivision", e.target.value)
                        )
                      }}
                      error={commonState.errors.hasOwnProperty("taxDivision")}
                    >
                      <MenuItem value={"1"}>内税</MenuItem>
                      {/* <MenuItem value={"2"}>外税</MenuItem>
                      <MenuItem value={"3"}>非課税</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ padding: "8px 8px 8px 0" }}>
                  <FormControl fullWidth>
                    <InputLabel>税率</InputLabel>
                    <Select
                      name="taxRate"
                      size="small"
                      value={state.inputState.taxRate}
                      label="税率"
                      onChange={(e: SelectChangeEvent<number>) => {
                        dispatch(
                          operations.handleInput("taxRate", e.target.value)
                        )
                      }}
                      error={commonState.errors.hasOwnProperty("taxRate")}
                    >
                      <MenuItem value={10}>標準税率 10%</MenuItem>
                      <MenuItem value={8}>軽減税率 8%</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <FullWidthInput
                  label="単位"
                  name="unit"
                  value={state.inputState.unit}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInput(e.target.name, e.target.value)
                  }
                  error={commonState.errors.hasOwnProperty("unit")}
                  inputProps={{
                    maxLength: "5",
                  }}
                ></FullWidthInput>
              </Grid>
            </Grid>
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
