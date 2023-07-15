import { createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../../types/book.ts';

interface IState {
  singleBook: IBook;
  allBooks: IBook[];
}

const initialState: IState = {
  singleBook: {
    id: '',
    title: '',
    author: '',
    genre: '',
    cover: '',
    publicationDate: '',
    reviews: [],
  },
  allBooks: [],
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    getAllBooks: (state, action) => {
      state.allBooks = action.payload;
    },
    booDetails: (state, action) => {
      state.singleBook = action.payload;
    },
    isFinished: (state, action) => {
      const selectedBook = state.allBooks.find(
        (book) => book.id === action.payload
      );
      selectedBook ? (selectedBook.isFinished = true) : null;
    },
  },
});

export const { getAllBooks, booDetails, isFinished } = bookSlice.actions;
export default bookSlice.reducer;
