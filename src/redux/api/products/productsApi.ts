import type {
  GetCategoriesResponse,
  GetProductResponse,
  GetProductsResponse,
  TProduct,
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
      invalidatesTags: ["Products"],
    }),
    getAllProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Products"],
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
    updateAProduct: builder.mutation<
      GetProductResponse,
      { id: string; updateData: Omit<TProduct, "_id" | "images" | "isDeleted"> }
    >({
      query: ({ id, updateData }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateNewProductMutation,
  useGetAllProductsQuery,
  useGetAProductQuery,
  useGetAllCategoriesQuery,
  useUpdateAProductMutation,
} = productsApi;
