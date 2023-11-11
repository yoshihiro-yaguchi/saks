import { Box, CircularProgress } from "@mui/material"

export const Loading = ({ processing = true, content = "ロード中..." }) => {
  return (
    <>
      {(() => {
        if (processing) {
          return (
            <>
              <Box
                sx={{
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  opacity: 1,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            </>
          )
        }
      })()}
    </>
  )
}
