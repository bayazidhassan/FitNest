import { baseApi } from "../BaseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (loginInformation) => ({
        url: "/auth/login",
        method: "POST",
        body: loginInformation,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include", //Required for cookies
      }),
    }),
  }),
});

export const { useLoginUserMutation, useLogoutMutation } = authApi;
