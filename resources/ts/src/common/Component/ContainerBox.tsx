import { Box, BoxProps } from "@mui/material"

export const ContainerBox = (props: BoxProps) => {
  const { children } = props
  return (
    <>
      <Box
        {...props}
        sx={{
          margin: "0",
          padding: "16px",
          borderRadius: "8px",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </>
  )
}
