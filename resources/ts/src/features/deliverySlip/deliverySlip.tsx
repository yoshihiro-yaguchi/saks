import React from 'react';
import { Box, TextField } from "@mui/material"
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'src/app/store';
import reportWebVitals from 'src/reportWebVitals';

export const DeliverySlip = () => {
  return (
    <>
      <Box>
        <TextField label="Filled" variant="filled"></TextField>
      </Box>
    </>
  )
}

const container = document.getElementById('deliverySlip')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DeliverySlip />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();