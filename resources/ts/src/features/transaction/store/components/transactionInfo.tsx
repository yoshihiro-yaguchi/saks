import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "@resource/ts/src/app/hooks"
import { FullWidthInput } from "@resource/ts/src/common/Component/Input"
import { LinedContainerBox } from "@resource/ts/src/common/Component/LinedContainerBox"
import { H2 } from "@resource/ts/src/common/Component/Typo"
import { actions } from "../reducer"
import { RootState } from "@resource/ts/src/app/store"
import { Office } from "../types"

export const TransactionInfo = () => {
  const dispatch = useAppDispatch()

  // 取引情報ステート
  const transactionInfoState = useAppSelector(
    (s: RootState) => s.storeTransaction.transactionInfo
  )

  // commonコンポーネント
  const commonState = useAppSelector(
    (s: RootState) => s.storeTransaction.common
  )

  // 事業所情報
  const offices: Array<Office> = useAppSelector(
    (s: RootState) => s.storeTransaction.offices
  )

  return (
    <>
      <LinedContainerBox>
        <H2>取引情報</H2>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <FullWidthInput
              id="transactionDate"
              name="transactionInfo[transactionDate]"
              label="取引日付"
              type="date"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  actions.updateTransactionInfoHandle({
                    name: e.target.id,
                    value: e.target.value,
                  })
                )
              }}
              value={transactionInfoState.transactionDate}
              error={commonState.errors.hasOwnProperty(
                "transactionInfo.transactionDate"
              )}
            ></FullWidthInput>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ padding: "8px 8px 8px 0" }}>
              <FormControl fullWidth>
                <InputLabel>取引区分</InputLabel>
                <Select
                  id="transactionDivision"
                  name="transactionInfo[transactionDivision]"
                  size="small"
                  labelId="transactionDivision"
                  value={transactionInfoState.transactionDivision}
                  label="取引区分"
                  onChange={(e: SelectChangeEvent<string>) => {
                    dispatch(
                      actions.updateTransactionInfoHandle({
                        name: "transactionDivision",
                        value: e.target.value,
                      })
                    )
                  }}
                >
                  <MenuItem value={"1"}>買取</MenuItem>
                  <MenuItem value={"2"}>販売</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={2}>
            <Box sx={{ padding: "8px 8px 8px 0" }}>
              <FormControl fullWidth>
                <InputLabel>取引支店</InputLabel>
                {offices.length > 0 && (
                  <Select
                    id="transactionBranch"
                    name="transactionInfo[transactionBranch]"
                    size="small"
                    labelId="transactionBranch"
                    value={transactionInfoState.transactionBranch}
                    label="取引支店"
                    defaultValue=""
                    onChange={(e: SelectChangeEvent<string>) => {
                      dispatch(
                        actions.updateTransactionInfoHandle({
                          name: "transactionBranch",
                          value: e.target.value,
                        })
                      )
                    }}
                  >
                    {offices.map((office, index) => (
                      <MenuItem value={office.officeCode} key={index}>
                        {office.officeName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <FullWidthInput
              id="transactionPicName"
              name="transactionInfo[transactionPicName]"
              label="担当者"
              inputProps={{
                maxLength: "10",
              }}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  actions.updateTransactionInfoHandle({
                    name: e.target.id,
                    value: e.target.value,
                  })
                )
              }}
              value={transactionInfoState.transactionPicName}
              error={commonState.errors.hasOwnProperty(
                "transactionInfo.transactionPicName"
              )}
            ></FullWidthInput>
          </Grid>
          <Grid item xs={4}>
            <FullWidthInput
              id="transactionTitle"
              name="transactionInfo[transactionTitle]"
              label="件名"
              inputProps={{
                maxLength: "50",
              }}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(
                  actions.updateTransactionInfoHandle({
                    name: e.target.id,
                    value: e.target.value,
                  })
                )
              }}
              value={transactionInfoState.transactionTitle}
              error={commonState.errors.hasOwnProperty(
                "transactionInfo.transactionTitle"
              )}
            ></FullWidthInput>
          </Grid>
        </Grid>
      </LinedContainerBox>
    </>
  )
}
