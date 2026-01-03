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
  }),
});

export const { useCreateCheckoutSessionMutation } = paymentApi;
