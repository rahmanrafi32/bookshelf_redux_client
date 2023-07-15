import { AlertColor, Button, Grid, TextField, Typography } from '@mui/material';
import CustomSnackbar from '../components/CustomSnackbar.tsx';
import { useAddBookMutation } from '../redux/features/books/booksApi.ts';
import { useState } from 'react';

const AddNewBook = () => {
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
        setOpenSnackbar(true);
        setSnackbarMessage(data.message);
        setSnackbarSeverity('success');
      } else {
        setOpenSnackbar(true);
        setSnackbarMessage(data.message);
        setSnackbarSeverity('error');
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

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '99vw',
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
          onChange={(e) => handleFieldChange('bookCoverLink', e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: '30vw' }}
          placeholder={'Publication Date'}
          onChange={(e) => handleFieldChange('publicationDate', e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" size="large" onClick={handleSubmitButton}>
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
  );
};

export default AddNewBook;
