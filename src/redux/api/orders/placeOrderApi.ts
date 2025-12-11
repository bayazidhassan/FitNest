import { baseApi } from "../BaseApi";

const placeOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderInformation) => ({
        url: "/order/placeOrder",
        method: "POST",
        body: orderInformation,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = placeOrderApi;
