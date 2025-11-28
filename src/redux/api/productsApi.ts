import type { TProduct } from "../../types/TProduct";
import { baseApi } from "./BaseApi";

interface GetProductsResponse {
  success: boolean;
  message: string;
  data: TProduct[];
}
interface GetProductResponse {
  success: boolean;
  message: string;
  data: TProduct;
}

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getAProduct: builder.query<GetProductResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery, useGetAProductQuery } = productsApi;
