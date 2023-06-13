import React from 'react';
import { Box, Button, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import reportWebVitals from 'src/reportWebVitals';

export const DeliverySlip = () => {
  return (
    <>
      <Button variant='contained'>行追加</Button>
      <TableContainer>
        <Table>
          {/* テーブルヘッダー */}
          <TableHead>
            <TableCell>
              商品名称/商品備考
            </TableCell>
            <TableCell>
              数量(重量)
            </TableCell>
            <TableCell>
              単価
            </TableCell>
            <TableCell>
              消費税
            </TableCell>
            <TableCell>
              金額
            </TableCell>
          </TableHead>
          {/* テーブルデータ */}
          <TableRow>
            <TableCell>
              商品名称
            </TableCell>
            <TableCell>
              10
            </TableCell>
            <TableCell>
              12000
            </TableCell>
            <TableCell>
              10
            </TableCell>
            <TableCell>
              金額
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </>
  )
}

const container = document.getElementById('createTransaction')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DeliverySlip />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();