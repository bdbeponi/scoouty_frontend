// src/redux/features/brandApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const brandApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create brand
    createBrandApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.brand.createBrand,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),

    // Update brand by ID
    updateBrandByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.brand.updateBrandById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),

    // Get all brands
    getAllBrands: builder.query({
      query: () => ({
        url: endpoints.brand.getAllBrands,
        method: "GET",
      }),
    }),

    // Get list of brands (with pagination/search)
    getListBrands: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `${endpoints.brand.getListBrands}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    // Get brand by ID
    getBrandByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.brand.getBrandById}/${id}`,
        method: "GET",
      }),
    }),

    // Delete brand by ID
    deleteBrandByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.brand.deleteBrandById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useCreateBrandApiMutation,
  useUpdateBrandByIdApiMutation,
  useGetAllBrandsQuery,
  useGetListBrandsQuery,
  useGetBrandByIdApiQuery,
  useDeleteBrandByIdApiMutation,
} = brandApi;
