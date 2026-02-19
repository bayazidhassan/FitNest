import { baseApi } from '../BaseApi';

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (formData: FormData) => ({
        url: '/user/registration',
        method: 'POST',
        body: formData,
      }),
    }),
    countTotalUser: builder.query<{ data: number }, void>({
      query: () => ({
        url: '/user/totalUser',
        method: 'GET',
      }),
    }),
  }),
});

export const { useRegisterMutation, useCountTotalUserQuery } = userApi;
