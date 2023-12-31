import { api } from '../../api/apiSlice.ts';

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    userSignIn: build.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      }),
    }),
    userSignUp: build.mutation({
      query: (data) => ({
        url: '/users/create-user',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useUserSignInMutation, useUserSignUpMutation } = userApi;
