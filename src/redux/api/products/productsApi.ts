import type {
  GetCategoriesResponse,
  GetProductResponse,
  GetProductsResponse,
} from "../../../types/TProduct";
import { baseApi } from "../BaseApi";

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
    getAllCategories: builder.query<GetCategoriesResponse, void>({
      query: () => ({
        url: "/products/categories",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetAProductQuery,
  useGetAllCategoriesQuery,
} = productsApi;
