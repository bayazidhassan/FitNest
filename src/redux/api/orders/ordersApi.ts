import type { TStatus } from "../../../types/TOrder";
import { baseApi } from "../BaseApi";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrdersByStatus: builder.query({
      query: (status) => ({
        url: `/order/byStatus/${status}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation<
      any,
      { id: string; status: TStatus }
    >({
      query: ({ id, status }) => ({
        url: `/order/updateStatus/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetOrdersByStatusQuery, useUpdateOrderStatusMutation } =
  ordersApi;
