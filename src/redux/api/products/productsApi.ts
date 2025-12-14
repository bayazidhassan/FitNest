import type {
  GetCategoriesResponse,
  GetProductResponse,
  GetProductsResponse,
} from "../../../types/TProduct";
import { baseApi } from "../BaseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: "/products/createNewProduct",
        method: "POST",
        body: formData,
      }),
    }),
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
  useCreateNewProductMutation,
  useGetAllProductsQuery,
  useGetAProductQuery,
  useGetAllCategoriesQuery,
} = productsApi;
