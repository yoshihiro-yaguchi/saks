import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState, store } from "@src/app/store"
// import { actions } from './reducer'
// import { operations } from './operations'
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import React, { useEffect } from "react"
import {
  Box,
  BoxProps,
  Button,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material"
import { Loading } from "@common/Loading/Loading"
import { commonOperations } from "../commonOperations"
// import logo from "../../../public/image-logo.svg"

// styledBox
const StyledBox = styled(Box)(({ theme }) => ({
  height: "100%",
  "@media screen and (max-width:599px)": {
    margin: "0 32px 0 32px",
  },
  "@media (min-width:600px) and (max-width:900px)": {
    margin: "0 32px 0 0",
  },
}))

type Props = BoxProps & {
  processing: boolean
}
export const BaseComponent = (props: Props) => {
  const { children, processing } = props
  const dispatch = useAppDispatch()

  // 共通ステート
  const commonState = useAppSelector((s: RootState) => s.common)

  return (
    <>
      <Loading processing={processing} />
      <Box sx={{ height: "100%" }}>
        {/* ヘッダー */}
        <Box
          sx={{
            height: "55px",
            backgroundColor: "#1cc1cc",
            borderBottom: "1px solid #dddddd",
          }}
        >
          <form action="/logout" method="post">
            <input type="hidden" name="_token" value={commonState.csrfToken} />
            <Button type="submit">ログアウト</Button>
          </form>
        </Box>
        <Grid container spacing={4} sx={{ height: "100%" }}>
          {/* 左メニュー */}
          <Grid item xs={0} sm={3} md={2}>
            <Box
              sx={{
                height: "100%",
                borderRight: "1px solid #1cc1cc",
              }}
            >
              <Box height={"32px"}></Box>
            </Box>
          </Grid>
          {/* コンテンツ */}
          <Grid item xs={12} sm={9} md={8}>
            <StyledBox>
              <Box height={"32px"}></Box>
              {children}
            </StyledBox>
          </Grid>
          {/* 右メニュー */}
          <Grid item xs={0} sm={0} md={2}>
            <Box sx={{ height: "100%", borderLeft: "1px solid #1cc1cc" }}>
              <Box height={"32px"}></Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

BaseComponent.defaultProps = {
  processing: true,
}
