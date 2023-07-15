import {
  AlertColor,
  Button,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import { useAddBookMutation } from '../redux/features/books/booksApi.ts';
import CustomSnackbar from './CustomSnackbar.tsx';

type IProps = {
  open: boolean;
  handleClose: () => void;
};

const AddBook = ({ open, handleClose }: IProps) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    bookCoverLink: '',
    publicationDate: '',
  });

  const [addNewBook] = useAddBookMutation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    AlertColor | undefined
  >('success');
  const handleClickSnackbar = (
    message: string,
    severity: AlertColor | undefined
  ) => {
    setOpenSnackbar(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleFieldChange = (field: string, value: string) => {
    setBookData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmitButton = async () => {
    const response = await addNewBook(bookData);

    if ('data' in response) {
      // Successful response
      const { data } = response;
      if (data.success) {
        handleClickSnackbar(data.message, 'success');
      } else {
        handleClickSnackbar(data.message, 'error');
      }
    }
    setBookData({
      title: '',
      author: '',
      genre: '',
      bookCoverLink: '',
      publicationDate: '',
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          spacing={4}
        >
          <Grid item>
            <Typography variant={'h5'}>Add New Book</Typography>
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: '30vw' }}
              placeholder={'Title'}
              onChange={(e) => handleFieldChange('title', e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: '30vw' }}
              placeholder={'Author'}
              onChange={(e) => handleFieldChange('author', e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: '30vw' }}
              placeholder={'Genre'}
              onChange={(e) => handleFieldChange('genre', e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: '30vw' }}
              placeholder={'Book Cover Link'}
              onChange={(e) =>
                handleFieldChange('bookCoverLink', e.target.value)
              }
            />
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: '30vw' }}
              placeholder={'Publication Date'}
              onChange={(e) =>
                handleFieldChange('publicationDate', e.target.value)
              }
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmitButton}
            >
              Add Book
            </Button>
          </Grid>
          <CustomSnackbar
            openSnackbar={openSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
            snackbarMessage={snackbarMessage}
            snackbarSeverity={snackbarSeverity}
          />
        </Grid>
      </Paper>
    </Modal>
  );
};

export default AddBook;
