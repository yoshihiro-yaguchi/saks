import { Box, BoxProps } from "@mui/material"

export const LinedContainerBox = (props: BoxProps) => {
  const { children } = props
  return (
    <>
      <Box
        {...props}
        sx={{
          margin: "0",
          padding: "16px",
          border: "1px solid #dddddd",
          borderRadius: "8px",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </>
  )
}
