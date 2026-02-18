import { baseApi } from '../BaseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (loginInformation) => ({
        url: '/auth/login',
        method: 'POST',
        body: loginInformation,
        //credentials: 'include', //Required for cookies -> I set it globally in BaseApi
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        //credentials: 'include', //Required for cookies -> I set it globally in BaseApi
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
