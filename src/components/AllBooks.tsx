import { Grid } from '@mui/material';
import SingleCard from './Card.tsx';
import { useGetAllBooksQuery } from '../redux/features/books/booksApi.ts';
import { IBook } from '../types/book.ts';
import { useAppDispatch, useAppSelector } from '../hooks/reduxTypedHooks.ts';
import { useEffect } from 'react';
import { getAllBooks } from '../redux/features/books/bookSlice.ts';

const AllBooks = () => {
  const { genre, publicationDate, searchTerm } = useAppSelector(
    (state) => state.book.filterOptions
  );
  const { data } = useGetAllBooksQuery({ publicationDate, genre, searchTerm });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data && data.data) dispatch(getAllBooks(data.data));
  }, [dispatch, data]);

  const { allBooks } = useAppSelector((state) => state.book);

  return (
    <Grid container spacing={4}>
      {allBooks.map((book: IBook) => (
        <Grid
          key={book.id}
          item
          md={4}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <SingleCard wishlisted={false} book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AllBooks;
