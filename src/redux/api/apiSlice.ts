import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://server-bookshelf.vercel.app/api/v1',
    baseUrl: 'http://localhost:8080/api/v1',
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem('auth') as string);
      headers.set('authorization', `${token?.accessToken}`);
      return headers;
    },
  }),
  tagTypes: ['reviews', 'books'],
  endpoints: () => ({}),
});
