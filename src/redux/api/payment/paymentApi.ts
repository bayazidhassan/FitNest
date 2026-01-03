import { baseApi } from "../BaseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (orderInfo) => ({
        url: "/payment/create_checkout_session",
        method: "POST",
        body: orderInfo,
        //credentials: "include", //include cookies if using JWT in cookies
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = paymentApi;
