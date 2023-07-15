import { forwardRef } from 'react';
import { AlertColor, AlertProps, Snackbar, Stack } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

interface IProps {
  openSnackbar: boolean;
  handleCloseSnackbar: () => void;
  snackbarMessage: string;
  snackbarSeverity: AlertColor | undefined;
}

const CustomSnackbar = ({
  openSnackbar,
  handleCloseSnackbar,
  snackbarMessage,
  snackbarSeverity,
}: IProps) => {
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
