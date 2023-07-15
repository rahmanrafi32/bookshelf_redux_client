import { createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../../types/book.ts';

interface IState {
  singleBook: IBook;
  allBooks: IBook[];
  wishListBook: IBook[];
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
  wishListBook: [],
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
      if (selectedBook) {
        selectedBook.isFinished = true;
        selectedBook.isReading = false;
      }
    },
    isReading: (state, action) => {
      const selectedBook = state.allBooks.find(
        (book) => book.id === action.payload
      );
      if (selectedBook) {
        selectedBook.isReading = true;
        selectedBook.isFinished = false;
      }
    },
    addToWishlist: (state, action) => {
      state.wishListBook.push(action.payload);
    },
  },
});

export const { getAllBooks, booDetails, isFinished, isReading, addToWishlist } =
  bookSlice.actions;
export default bookSlice.reducer;
