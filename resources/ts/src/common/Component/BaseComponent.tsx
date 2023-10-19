import { useAppDispatch, useAppSelector } from "@src/app/hooks"
import { RootState } from "@src/app/store"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  BoxProps,
  Button,
  Drawer,
  Grid,
  Tooltip,
  styled,
} from "@mui/material"
import { Loading } from "@resource/ts/src/common/Component/Loading"
import { Spacer } from "./Spacer"
import { actions } from "../commonReducer"
import { H2, H5 } from "./Typo"
import DehazeIcon from "@mui/icons-material/Dehaze"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

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
          <Box
            sx={{
              minWidth: "1024px",
              margin: "auto 0",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                {/* ドロワー開くボタン */}
                <Box>
                  <Tooltip title="メニューを開く" placement="right">
                    <Button onClick={() => dispatch(actions.openDrawer())}>
                      <DehazeIcon sx={{ color: "#000" }} />
                    </Button>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box>
                  <form action="/logout" method="post">
                    <input
                      type="hidden"
                      name="_token"
                      value={commonState.csrfToken}
                    />
                    <Button type="submit">ログアウト</Button>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Spacer />
        {/* データ */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "1024px", margin: "0 5px" }}>{children}</Box>
        </Box>
      </Box>
      {/* drawer */}
      <Drawer
        anchor="left"
        open={commonState.isOpenDrawer}
        onClose={() => dispatch(actions.closeDrawer())}
        PaperProps={{ style: { width: "250px", backgroundColor: "#eff" } }}
      >
        <Box sx={{ margin: "16px", color: "#000" }}>
          {/* 取引メニュー */}
          <H2>メニュー</H2>
          <Accordion sx={{ backgroundColor: "#fff" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <H5>取引</H5>
            </AccordionSummary>
            <AccordionDetails>
              {/* 取引一覧 */}
              <Box sx={{ borderTop: "1px solid #ddd", padding: "5px 5px" }}>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => (location.href = "/transaction/search")}
                >
                  取引一覧
                </Button>
              </Box>
              {/* 取引作成 */}
              <Box sx={{ borderTop: "1px solid #ddd", padding: "5px 5px" }}>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => (location.href = "/transaction/store")}
                >
                  取引新規登録
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: "#fff" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <H5>商品</H5>
            </AccordionSummary>
            <AccordionDetails>
              {/* 取引一覧 */}
              <Box sx={{ borderTop: "1px solid #ddd", padding: "5px 5px" }}>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => (location.href = "/product/search")}
                >
                  商品一覧
                </Button>
              </Box>
              {/* 取引作成 */}
              <Box sx={{ borderTop: "1px solid #ddd", padding: "5px 5px" }}>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => (location.href = "/product/store")}
                >
                  商品新規登録
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ backgroundColor: "#fff" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <H5>事業所</H5>
            </AccordionSummary>
            <AccordionDetails>
              {/* 取引一覧 */}
              <Box sx={{ borderTop: "1px solid #ddd", padding: "5px 5px" }}>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => (location.href = "/product/search")}
                  disabled
                >
                  事業所一覧
                </Button>
              </Box>
              {/* 取引作成 */}
              <Box sx={{ borderTop: "1px solid #ddd", padding: "5px 5px" }}>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => (location.href = "/product/store")}
                  disabled
                >
                  事業所新規登録
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </>
  )
}

BaseComponent.defaultProps = {
  processing: true,
}
