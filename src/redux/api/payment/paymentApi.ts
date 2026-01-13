import { baseApi } from "../BaseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (orderInfo) => ({
        url: "/payment/create_checkout_session",
        method: "POST",
        body: orderInfo,
      }),
    }),
    getOrderIdByStripeSession: builder.query({
      query: (sessionId) => ({
        url: `/payment/getOrderId_BySession/${sessionId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetOrderIdByStripeSessionQuery,
} = paymentApi;
