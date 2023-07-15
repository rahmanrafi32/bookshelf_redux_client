import { forwardRef } from 'react';
import { AlertProps, Snackbar, Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

const CustomSnackbar = ({
  openSnackbar,
  handleCloseSnackbar,
  snackbarMessage,
  snackbarSeverity,
}: any) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CustomSnackbar;
