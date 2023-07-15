import { useNavigate, useParams } from 'react-router-dom';
import {
  AlertColor,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import {
  useAddBookReviewMutation,
  useDeleteBookByIdMutation,
  useGetBookByIdQuery,
  useGetReviewByIdQuery,
} from '../redux/features/books/booksApi.ts';
import { ChangeEvent, useState } from 'react';
import CustomSnackbar from '../components/CustomSnackbar.tsx';
import { useAppDispatch } from '../hooks/reduxTypedHooks.ts';
import { booDetails } from '../redux/features/books/bookSlice.ts';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [writeReview, setWriteReview] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    AlertColor | undefined
  >('success');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const { data: book, isLoading } = useGetBookByIdQuery(id);
  const { data } = useGetReviewByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const [addBookReview] = useAddBookReviewMutation();
  const [deleteBook] = useDeleteBookByIdMutation();

  const handleReview = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setWriteReview(target.value);
  };

  const handleReviewSubmit = async () => {
    const options = {
      id,
      data: { reviews: writeReview },
    };

    const response = await addBookReview(options);
    setWriteReview('');

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

  const handleConfirmButton = async () => {
    const response = await deleteBook(id);
    if (response && 'data' in response) {
      const { data } = response;
      if (data.success === true) {
        navigate('/');
      } else {
        setOpenSnackbar(true);
        setSnackbarMessage(data.message);
        setSnackbarSeverity('error');
      }
    }
    handleClose();
  };

  const handleDeleteBook = () => {
    handleOpen();
  };

  const handleEditBook = () => {
    dispatch(booDetails(book?.data));
    navigate('/edit-book');
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      sx={{ width: '97vw' }}
    >
      {isLoading ? (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={6}
              sx={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <img
                style={{ width: '10vw', height: '30vh' }}
                src={book?.data.cover}
                alt={book?.data.title}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant={'h6'}>Title: {book?.data.title}</Typography>
              <Typography sx={{ mt: 5 }} variant={'h6'}>
                Author: {book?.data.author}
              </Typography>
              <Typography sx={{ mt: 5 }} variant={'h6'}>
                Genre: {book?.data.genre}
              </Typography>
              <Typography sx={{ mt: 5 }} variant={'h6'}>
                Publication Date: {book?.data.publicationDate}
              </Typography>
              <Button
                sx={{ mt: 1 }}
                variant={'contained'}
                size={'large'}
                onClick={handleEditBook}
              >
                Edit Book
              </Button>
              <Button
                sx={{ ml: 3, mt: 1 }}
                variant={'contained'}
                size={'large'}
                onClick={handleDeleteBook}
              >
                Delete Book
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} sx={{ mb: 3 }}>
        <Typography variant={'h4'} sx={{ mb: 3 }}>
          Reviews:
        </Typography>
      </Grid>
      {data?.data?.reviews.map((review: string) => (
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Avatar>H</Avatar>
          <Typography variant={'h6'} sx={{ ml: 3 }}>
            {review}
          </Typography>
        </Grid>
      ))}
      <Grid item xs={12} sx={{ mt: 4 }}>
        <TextField
          fullWidth
          multiline
          value={writeReview}
          rows={4}
          placeholder={'Write Review'}
          onChange={handleReview}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
      >
        <Button
          variant={'contained'}
          size={'large'}
          onClick={handleReviewSubmit}
        >
          Submit
        </Button>
      </Grid>
      <CustomSnackbar
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you wanna delete this book?
          </Typography>
          <Button onClick={handleConfirmButton}>Confirm</Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default BookDetails;
