import { baseApi } from '../BaseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (loginInformation) => ({
        url: '/auth/login',
        method: 'POST',
        body: loginInformation,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include', //Required for cookies
      }),
    }),
    googleLogin: builder.mutation({
      query: (token: string) => ({
        url: '/auth/google',
        method: 'POST',
        body: { token },
      }),
    }),
  }),
});

export const { useLoginUserMutation, useLogoutMutation, useGoogleLoginMutation } = authApi;
