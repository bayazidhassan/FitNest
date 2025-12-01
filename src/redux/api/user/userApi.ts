import { baseApi } from "../BaseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (formData: FormData) => ({
        url: "/user/registration",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterMutation } = userApi;
