import {api} from "../../api/apiSlice.ts";

const booksApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllBooks: build.query({
            query:()=>'/books/'
        }),
        getBookById: build.query({
            query: id => `/books/${id}`
        })
    })
})


export const {useGetAllBooksQuery, useGetBookByIdQuery} = booksApi;
