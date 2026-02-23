// src/redux/features/typeSizeApi.js
import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeSizeApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Product Size
    createProductSizeApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.ProductSize.createProductSize,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ProductSize"],
    }),

    // Update Product Size by ID
    updateProductSizeByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.ProductSize.updateProductSizeById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ProductSize"],
    }),

    // Get All Product Sizes
    getAllProductSizeApi: builder.query({
      query: () => ({
        url: endpoints.ProductSize.getAllProductSize,
        method: "GET",
      }),
      providesTags: ["ProductSize"],
    }),

    // Get List of Product Sizes
    getProductListSizesApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.ProductSize.getProductListSizes}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["ProductSize"],
    }),

    // Get Product Size by ID
    getProductSizeByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.ProductSize.getProductSizeById}/${id}`,
        method: "GET",
      }),
      providesTags: ["ProductSize"],
    }),

    // Delete Product Size by ID
    deleteProductSizeByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.ProductSize.deleteProductSizeById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductSize"],
    }),
  }),
});

export const {
  useCreateProductSizeApiMutation,
  useUpdateProductSizeByIdApiMutation,
  useGetAllProductSizeApiQuery,
  useGetProductListSizesApiQuery,
  useGetProductSizeByIdApiQuery,
  useDeleteProductSizeByIdApiMutation,
} = typeSizeApi;
