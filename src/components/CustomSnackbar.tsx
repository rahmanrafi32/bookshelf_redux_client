import React, { useState } from 'react';
import { AlertProps, Snackbar, Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

const CustomSnackbar = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomSnackbar;
