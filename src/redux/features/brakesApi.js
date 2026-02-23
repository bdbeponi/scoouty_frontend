// src/redux/features/brakesApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const brakesApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({

    // Create Brakes
    createBrakesApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.Brakes.createBrakes,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Brakes"],
    }),

    // Update Brakes by ID
    updateBrakesByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.Brakes.updateBrakes}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Brakes"],
    }),

    // Get All Brakes (no pagination)
    getAllBrakesApi: builder.query({
      query: () => ({
        url: endpoints.Brakes.getAllBrakes,
        method: "GET",
      }),
      providesTags: ["Brakes"],
    }),

    // Get List of Brakes (pagination / search)
    getBrakesListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.Brakes.getListBrakes}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Brakes"],
    }),

    // Get Brakes by ID
    getBrakesByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.Brakes.getBrakesById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Brakes"],
    }),

    // Delete Brakes by ID
    deleteBrakesByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Brakes.deleteBrakes}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brakes"],
    }),

  }),
});

export const {
  useCreateBrakesApiMutation,
  useUpdateBrakesByIdApiMutation,
  useGetAllBrakesApiQuery,
  useGetBrakesListApiQuery,
  useGetBrakesByIdApiQuery,
  useDeleteBrakesByIdApiMutation,
} = brakesApi;