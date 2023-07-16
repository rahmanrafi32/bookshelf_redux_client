import { createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../../types/book.ts';

interface IFilter {
  genre: string | null;
  publicationDate: string | null;
  searchTerm: string | null;
}
interface IState {
  singleBook: IBook;
  allBooks: IBook[];
  wishListBook: IBook[];
  filterOptions: IFilter;
  readingList: IBook[];
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
  readingList: [],
  filterOptions: {
    genre: null,
    publicationDate: null,
    searchTerm: null,
  },
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
    filterOptions: (state, action) => {
      const { genre, publicationYear, searchTerm } = action.payload;
      state.filterOptions.genre = genre;
      state.filterOptions.publicationDate = publicationYear;
      state.filterOptions.searchTerm = searchTerm;
    },
    addReadList: (state, action) => {
      state.readingList.push(action.payload);
    },
  },
});

export const {
  getAllBooks,
  booDetails,
  isFinished,
  isReading,
  filterOptions,
  addToWishlist,
  addReadList,
} = bookSlice.actions;
export default bookSlice.reducer;
