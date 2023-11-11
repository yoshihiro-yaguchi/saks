import { Alert, AlertProps, Box } from "@mui/material"

export const ErrorAlert = (props: AlertProps) => {
  const { children } = props
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: "60px",
          right: "10px",
          width: "350px",
          opacity: "0.8",
        }}
      >
        <Alert {...props}>{children}</Alert>
      </Box>
    </>
  )
}
