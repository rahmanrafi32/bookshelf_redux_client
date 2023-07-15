import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice.ts';
import bookReducer from './features/books/bookSlice.ts';
import userReducer from './features/user/userSlice.ts';
export const store = configureStore({
  reducer: {
    book: bookReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
