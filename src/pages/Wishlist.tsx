import { useAppSelector } from '../hooks/reduxTypedHooks.ts';
import { IBook } from '../types/book.ts';
import { Grid, Typography } from '@mui/material';
import SingleCard from '../components/Card.tsx';

const Wishlist = () => {
  const { wishListBook } = useAppSelector((state) => state.book);
  return (
    <Grid
      container
      spacing={4}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 3,
      }}
    >
      {wishListBook.length === 0 ? (
        <Typography variant={'h6'}>No book is added to wishlist</Typography>
      ) : null}
      {wishListBook.map((book: IBook) => (
        <Grid
          key={book.id}
          item
          md={4}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <SingleCard wishlisted={true} book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Wishlist;
