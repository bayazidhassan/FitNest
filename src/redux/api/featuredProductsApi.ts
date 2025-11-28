import type { GetProductsResponse, TProduct } from "../../types/TProduct";
import { baseApi } from "./BaseApi";

const featuredProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //getFeaturedProducts: builder.query<GetProductsResponse, void>({
    getFeaturedProducts: builder.query<TProduct[], void>({
      query: () => ({
        url: "/products/featuredProducts",
        method: "GET",
      }),
      //only return the products array
      transformResponse: (response: GetProductsResponse) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetFeaturedProductsQuery } = featuredProductsApi;
