// src/redux/features/typeFeaturesApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeFeaturesApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Feature
    createFeatureApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.Features.createFeature,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Feature"],
    }),

    // Update Feature by ID
    updateFeatureByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.Features.updateFeatureById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Feature"],
    }),

    // Get All Features (no pagination)
    getAllFeaturesApi: builder.query({
      query: () => ({
        url: endpoints.Features.getAllFeatures,
        method: "GET",
      }),
      providesTags: ["Feature"],
    }),

    // Get List of Features (pagination / search)
    getFeaturesListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.Features.getListFeatures}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Feature"],
    }),

    // Get Feature by ID
    getFeatureByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.Features.getFeatureById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Feature"],
    }),

    // Delete Feature by ID
    deleteFeatureByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Features.deleteFeatureById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feature"],
    }),
  }),
});

export const {
  useCreateFeatureApiMutation,
  useUpdateFeatureByIdApiMutation,
  useGetAllFeaturesApiQuery,
  useGetFeaturesListApiQuery,
  useGetFeatureByIdApiQuery,
  useDeleteFeatureByIdApiMutation,
} = typeFeaturesApi;
