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
  }),
});

export const { useLoginUserMutation } = authApi;
