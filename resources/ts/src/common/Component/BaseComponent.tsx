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
import { Loading } from "@resource/ts/src/common/Component/Loading"
import { commonOperations } from "../commonOperations"
import { Spacer } from "./Spacer"
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
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #dddddd",
          }}
        >
          <Box sx={{ minWidth: "1024px" }}>
            <form action="/logout" method="post">
              <input
                type="hidden"
                name="_token"
                value={commonState.csrfToken}
              />
              <Button type="submit">ログアウト</Button>
            </form>
          </Box>
        </Box>
        <Spacer />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "1024px", margin: "0 5px" }}>{children}</Box>
        </Box>
      </Box>
    </>
  )
}

BaseComponent.defaultProps = {
  processing: true,
}
