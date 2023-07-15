import { Grid } from '@mui/material';
import SingleCard from './Card.tsx';
import { useGetAllBooksQuery } from '../redux/features/books/booksApi.ts';
import { IBook } from '../types/book.ts';

const AllBooks = () => {
  const { data: allBooks } = useGetAllBooksQuery(undefined);
  return (
    <Grid container spacing={4}>
      {allBooks?.data?.map((book: IBook) => (
        <Grid
          key={book.id}
          item
          md={4}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <SingleCard book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AllBooks;
