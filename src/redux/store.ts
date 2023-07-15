import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice.ts';
import bookReducer from './features/books/bookSlice.ts';
export const store = configureStore({
  reducer: {
    book: bookReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
