import * as React from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import {
  LocalizationProvider,
  LocalizationProviderProps,
} from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export default function Date() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker format="YYYY/MM/DD" />
    </LocalizationProvider>
  )
}
