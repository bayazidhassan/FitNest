import type { TStatus } from '../../../types/TOrder';
import { baseApi } from '../BaseApi';

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderInformation) => ({
        url: '/order/placeOrder',
        method: 'POST',
        body: orderInformation,
      }),
    }),
    getOrdersByStatus: builder.query({
      query: (status) => ({
        url: `/order/byStatus/${status}`,
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),
    updateOrderStatus: builder.mutation<
      any,
      { id: string; fromStatus: TStatus; toStatus: TStatus }
    >({
      query: ({ id, fromStatus, toStatus }) => ({
        url: `/order/updateStatus/${id}`,
        method: 'PATCH',
        body: { fromStatus, toStatus },
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { usePlaceOrderMutation, useGetOrdersByStatusQuery, useUpdateOrderStatusMutation } =
  ordersApi;
