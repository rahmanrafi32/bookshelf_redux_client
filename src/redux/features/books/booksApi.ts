import { api } from '../../api/apiSlice.ts';

const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => '/books/',
    }),
    getBookById: build.query({
      query: (id) => `/books/${id}`,
    }),
    addBook: build.mutation({
      query: (data) => ({
        url: `/books/addBook`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookByIdQuery, useAddBookMutation } =
  booksApi;
