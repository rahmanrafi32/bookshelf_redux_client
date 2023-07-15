import { AlertColor, Button, Grid, TextField, Typography } from '@mui/material';
import { useAppSelector } from '../hooks/reduxTypedHooks.ts';
import { useState } from 'react';
import { useEditBookMutation } from '../redux/features/books/booksApi.ts';
import CustomSnackbar from '../components/CustomSnackbar.tsx';

const EditBook = () => {
  const { book } = useAppSelector((state) => state.book);
  const [editBook] = useEditBookMutation();
  const [bookData, setBookData] = useState({
    title: book.title,
    author: book.author,
    genre: book.genre,
    bookCoverLink: book.cover,
    publicationDate: book.publicationDate,
  });
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
    const options = {
      id: book.id,
      data: bookData,
    };
    const response = await editBook(options);
    if ('data' in response) {
      const { data } = response;
      if (data.success === true) {
        setOpenSnackbar(true);
        setSnackbarMessage(data.message);
        setSnackbarSeverity('success');
      } else {
        setOpenSnackbar(true);
        setSnackbarMessage(data.message);
        setSnackbarSeverity('error');
      }
    }
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
        <Typography variant={'h5'}>Edit Book</Typography>
      </Grid>
      <Grid item>
        <TextField
          label="Title"
          sx={{ width: '30vw' }}
          value={bookData.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: '30vw' }}
          label="Author"
          value={bookData.author}
          onChange={(e) => handleFieldChange('author', e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Genre"
          sx={{ width: '30vw' }}
          value={bookData.genre}
          onChange={(e) => handleFieldChange('genre', e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: '30vw' }}
          label="Cover"
          value={bookData.bookCoverLink}
          onChange={(e) => handleFieldChange('bookCoverLink', e.target.value)}
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: '30vw' }}
          value={bookData.publicationDate}
          label={'Publication Date'}
          onChange={(e) => handleFieldChange('publicationDate', e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" size="large" onClick={handleSubmitButton}>
          Edit Book
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

export default EditBook;
