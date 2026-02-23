// src/redux/features/topSpeedTypeApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const topSpeedTypeApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({

    // Create Top Speed Type
    createTopSpeedTypeApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.TopSpeed.createTopSpeed,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["TopSpeed"],
    }),

    // Update Top Speed Type by ID
    updateTopSpeedTypeByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.TopSpeed.updateTopSpeed}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["TopSpeed"],
    }),

    // Get All Top Speed Types (no pagination)
    getAllTopSpeedTypesApi: builder.query({
      query: () => ({
        url: endpoints.TopSpeed.getAllTopSpeed,
        method: "GET",
      }),
      providesTags: ["TopSpeed"],
    }),

    // Get List of Top Speed Types (pagination / search)
    getTopSpeedTypeListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.TopSpeed.getListTopSpeed}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["TopSpeed"],
    }),

    // Get Top Speed Type by ID
    getTopSpeedTypeByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.TopSpeed.getTopSpeedById}/${id}`,
        method: "GET",
      }),
      providesTags: ["TopSpeed"],
    }),

    // Delete Top Speed Type by ID
    deleteTopSpeedTypeByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.TopSpeed.deleteTopSpeed}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TopSpeed"],
    }),

  }),
});

export const {
  useCreateTopSpeedTypeApiMutation,
  useUpdateTopSpeedTypeByIdApiMutation,
  useGetAllTopSpeedTypesApiQuery,
  useGetTopSpeedTypeListApiQuery,
  useGetTopSpeedTypeByIdApiQuery,
  useDeleteTopSpeedTypeByIdApiMutation,
} = topSpeedTypeApi;