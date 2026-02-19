import type {
  GetCategoriesResponse,
  GetProductResponse,
  GetProductsResponse,
  TProduct,
} from '../../../types/TProduct';
import { baseApi } from '../BaseApi';

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewProduct: builder.mutation({
      query: (formData: FormData) => ({
        url: '/products/createNewProduct',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Products'],
    }),
    getAllProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),
    getAProduct: builder.query<GetProductResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
    /*
    getProductsBySearch: builder.query({
      query: (searchText) => `/products/search?searchText=${encodeURIComponent(searchText)}`,
    }),
    */
    getProductsBySearch: builder.query({
      query: (searchText) => ({
        url: '/products/search',
        method: 'GET',
        params: { searchText },
      }),
    }),
    //getFeaturedProducts: builder.query<GetProductsResponse, void>({
    getFeaturedProducts: builder.query<TProduct[], void>({
      query: () => ({
        url: '/products/featuredProducts',
        method: 'GET',
      }),
      //only return the products array
      transformResponse: (response: GetProductsResponse) => {
        return response.data;
      },
    }),
    getAllCategories: builder.query<GetCategoriesResponse, void>({
      query: () => ({
        url: '/products/categories',
        method: 'GET',
      }),
    }),
    updateAProduct: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteAProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    countTotalProducts: builder.query<{ data: number }, void>({
      query: () => ({
        url: '/products/totalProducts',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateNewProductMutation,
  useGetAllProductsQuery,
  useGetAProductQuery,
  useGetProductsBySearchQuery,
  useGetFeaturedProductsQuery,
  useGetAllCategoriesQuery,
  useUpdateAProductMutation,
  useDeleteAProductMutation,
  useCountTotalProductsQuery,
} = productsApi;
