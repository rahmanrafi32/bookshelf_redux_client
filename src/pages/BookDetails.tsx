import { useParams } from 'react-router-dom';
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {
  useAddBookReviewMutation,
  useGetBookByIdQuery,
  useGetReviewByIdQuery,
} from '../redux/features/books/booksApi.ts';
import { ChangeEvent, useState } from 'react';
// import CustomSnackbar from '../components/CustomSnackbar.tsx';

const BookDetails = () => {
  const [writeReview, setWriteReview] = useState('');

  const { id } = useParams();

  const { data: book, isLoading } = useGetBookByIdQuery(id);

  const [addBookReview] = useAddBookReviewMutation();

  const { data } = useGetReviewByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  console.log(data?.data?.reviews);

  const handleReview = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setWriteReview(target.value);
  };

  const handleReviewSubmit = async () => {
    const options = {
      id,
      data: { reviews: writeReview },
    };

    await addBookReview(options);
    setWriteReview('');
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
              <Button sx={{ mt: 1 }} variant={'contained'} size={'large'}>
                Edit Book
              </Button>
              <Button
                sx={{ ml: 3, mt: 1 }}
                variant={'contained'}
                size={'large'}
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
          <Divider
            sx={{ mt: 4 }}
            orientation={'horizontal'}
            variant={'fullWidth'}
          />
        </Grid>
      ))}
      <Grid item xs={12} sx={{ mt: 4 }}>
        <TextField
          fullWidth
          multiline
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
      {/*<CustomSnackbar />*/}
    </Grid>
  );
};

export default BookDetails;
