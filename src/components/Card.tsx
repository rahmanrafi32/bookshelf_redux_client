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
import { Grid, Tooltip } from '@mui/material';
import { useAppDispatch } from '../hooks/reduxTypedHooks.ts';
import {
  addToReadBook,
  addToWishlist,
} from '../redux/features/wishlist/wishlistSlice.ts';
import { Link } from 'react-router-dom';
import { isFinished } from '../redux/features/books/bookSlice.ts';

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
};
const SingleCard = ({ book }: IProps) => {
  const dispatch = useAppDispatch();
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
            <Button size="medium" onClick={() => dispatch(addToReadBook(book))}>
              Read Book
            </Button>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Add to wishlist"
              onClick={() => dispatch(addToWishlist(book))}
            >
              <Tooltip title={'Add to wishlist'}>
                <BookmarkAddIcon color={'primary'} />
              </Tooltip>
            </IconButton>
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
    </Card>
  );
};

export default SingleCard;
