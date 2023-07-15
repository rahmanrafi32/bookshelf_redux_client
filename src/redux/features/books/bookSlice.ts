import { createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../../types/book.ts';

interface IState {
  book: IBook;
}

const initialState: IState = {
  book: {
    id: '',
    title: '',
    author: '',
    genre: '',
    cover: '',
    publicationDate: '',
    reviews: [],
  },
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    booDetails: (state, action) => {
      state.book = action.payload;
    },
  },
});

export const { booDetails } = bookSlice.actions;
export default bookSlice.reducer;
