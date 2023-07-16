import { api } from '../../api/apiSlice.ts';

const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: (arg) => {
        const publicationDate = arg?.publicationDate;
        const genre = arg?.genre;
        const searchTerm = arg?.searchTerm;
        return {
          url: '/books/',
          params: { publicationDate, genre, searchTerm },
        };
      },
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
    editBook: build.mutation({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: 'PATCH',
        body: data,
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
  useEditBookMutation,
} = booksApi;
