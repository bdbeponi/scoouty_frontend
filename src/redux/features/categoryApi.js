// src/redux/features/categoryApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create category
    createCategoryApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.category.createCategory,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    // Update category
    updateCategoryByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.category.updateCategoryById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    // Get all categories
    getAllCategory: builder.query({
      query: () => ({
        url: endpoints.category.getAllCategory,
        method: "GET",
      }),
    }),

    // Get list categories
    getListCategory: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: `${endpoints.category.getListCategory}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // Get category by ID
    getCategoryByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.category.getCategoryById}/${id}`,
        method: "GET",
      }),
    }),

    // Delete category by ID
    deleteCategoryByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.category.deleteBCategoryById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryApiMutation,
  useUpdateCategoryByIdApiMutation,
  useGetAllCategoryQuery,
  useGetListCategoryQuery,
  useGetCategoryByIdApiQuery,
  useDeleteCategoryByIdApiMutation,
} = categoryApi;
