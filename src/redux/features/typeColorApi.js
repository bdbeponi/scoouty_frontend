// src/redux/features/typeColorApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeColorApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Product Color
    createProductColorApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.ProductColor.createProductColor,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ProductColor"],
    }),

    // Update Product Color by ID
    updateProductColorByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.ProductColor.updateProductColorById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ProductColor"],
    }),

    // Get All Product Colors (no pagination)
    getAllProductColorsApi: builder.query({
      query: () => ({
        url: endpoints.ProductColor.getAllProductColors,
        method: "GET",
      }),
      providesTags: ["ProductColor"],
    }),

    // Get List of Product Colors (for pagination or filtered list)
    getProductListColorsApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.ProductColor.getListProductColors}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["ProductColor"],
    }),

    // Get Product Color by ID
    getProductColorByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.ProductColor.getProductColorById}/${id}`,
        method: "GET",
      }),
      providesTags: ["ProductColor"],
    }),

    // Delete Product Color by ID
    deleteProductColorByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.ProductColor.deleteProductColorById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductColor"],
    }),
  }),
});

export const {
  useCreateProductColorApiMutation,
  useUpdateProductColorByIdApiMutation,
  useGetAllProductColorsApiQuery,
  useGetProductListColorsApiQuery,
  useGetProductColorByIdApiQuery,
  useDeleteProductColorByIdApiMutation,
} = typeColorApi;
