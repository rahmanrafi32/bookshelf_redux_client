import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { AlertColor, Grid, Tooltip } from '@mui/material';
import { useAppDispatch } from '../hooks/reduxTypedHooks.ts';
import { Link } from 'react-router-dom';
import {
  addReadList,
  addToWishlist,
  isFinished,
} from '../redux/features/books/bookSlice.ts';
import CustomSnackbar from './CustomSnackbar.tsx';
import { useState } from 'react';

type IProps = {
  book: {
    id: string;
    title: string;
    author: string;
    genre: string;
    cover: string;
    publicationDate: string;
    isFinished?: boolean;
    isReading?: boolean;
  };
  wishlisted: boolean;
};
const SingleCard = ({ book, wishlisted }: IProps) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    AlertColor | undefined
  >('success');
  const dispatch = useAppDispatch();
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleWishlist = () => {
    dispatch(addToWishlist(book));
    setOpenSnackbar(true);
    setSnackbarMessage('Whishlist added');
    setSnackbarSeverity('success');
  };

  const handleReadingList = () => {
    dispatch(addReadList(book));
    setOpenSnackbar(true);
    setSnackbarMessage('Book added to reading list');
    setSnackbarSeverity('success');
  };
  return (
    <Card sx={{ width: 350 }}>
      <Link
        style={{ textDecoration: 'none', color: '#000' }}
        to={`/book-details/${book.id}`}
      >
        <CardMedia sx={{ height: 240 }} image={book.cover} title={book.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body1">Author: {book.author}</Typography>
          <Typography variant="body1">Genre: {book.genre}</Typography>
          <Typography variant="body1">
            Publication Date: {book.publicationDate}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Grid
          container
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Grid item>
            <Button size="medium" onClick={handleReadingList}>
              {book.isReading ? 'Reading...' : 'Read book'}
            </Button>
          </Grid>
          <Grid item>
            {!wishlisted ? (
              <IconButton aria-label="Add to wishlist" onClick={handleWishlist}>
                <Tooltip title={'Add to wishlist'}>
                  <BookmarkAddIcon color={'primary'} />
                </Tooltip>
              </IconButton>
            ) : null}
            <IconButton
              aria-label="Finished Reading"
              onClick={() => dispatch(isFinished(book.id))}
            >
              <Tooltip title={'Finished Reading'}>
                {book.isFinished ? (
                  <DoneAllRoundedIcon color={'primary'} />
                ) : (
                  <DoneRoundedIcon color={'primary'} />
                )}
              </Tooltip>
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      <CustomSnackbar
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
      />
    </Card>
  );
};

export default SingleCard;
