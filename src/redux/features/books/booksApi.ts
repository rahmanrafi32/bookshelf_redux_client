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
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useAddBookReviewMutation,
  useGetReviewByIdQuery,
} = booksApi;
