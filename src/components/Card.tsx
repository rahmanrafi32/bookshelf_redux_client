import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid } from '@mui/material';
import { useAppDispatch } from '../hooks/reduxTypedHooks.ts';
import { addToWishlist } from '../redux/features/wishlist/wishlistSlice.ts';
import { Link } from 'react-router-dom';

type IProps = {
  book: {
    id: string;
    title: string;
    author: string;
    genre: string;
    cover: string;
    publicationDate: string;
  };
};
const SingleCard = ({ book }: IProps) => {
  const dispatch = useAppDispatch();
  return (
    <Card sx={{ width: 350 }}>
      <Link
        style={{ textDecoration: 'none', color: '#000' }}
        to={`/${book.id}`}
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
            <Button size="medium" onClick={() => dispatch(addToWishlist(book))}>
              Add to Wishlist
            </Button>
          </Grid>
          <Grid item>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SingleCard;
