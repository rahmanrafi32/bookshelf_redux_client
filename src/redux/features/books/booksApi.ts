import { api } from '../../api/apiSlice.ts';

const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => '/books/',
      providesTags: ['books'],
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
      invalidatesTags: ['books'],
    }),
    addBookReview: build.mutation({
      query: ({ id, data }) => ({
        url: `/books/addReview/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReviewById: build.query({
      query: (id) => `/books/reviews/${id}`,
      providesTags: ['reviews'],
    }),
    deleteBookById: build.mutation({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useAddBookReviewMutation,
  useGetReviewByIdQuery,
  useDeleteBookByIdMutation,
} = booksApi;
