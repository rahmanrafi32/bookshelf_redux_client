import { createSlice } from '@reduxjs/toolkit';
import { IBook } from '../../../types/book.ts';

type IState = {
  book: IBook[];
};

const initialState: IState = {
  book: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.book.push(action.payload);
    },
  },
});

export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
