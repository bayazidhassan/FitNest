import { baseApi } from "../BaseApi";

const getOrdersByStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByStatus: builder.query({
      query: (status) => ({
        url: `/orders/${status}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOrdersByStatusQuery } = getOrdersByStatusApi;
