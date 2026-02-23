// src/redux/features/typeSeatingCapacityApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeSeatingCapacityApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Seating Capacity
    createSeatingCapacityApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.SeatingCapacity.createSeatingCapacity,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["SeatingCapacity"],
    }),

    // Update Seating Capacity by ID
    updateSeatingCapacityByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.SeatingCapacity.updateSeatingCapacityById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["SeatingCapacity"],
    }),

    // Get All Seating Capacities (no pagination)
    getAllSeatingCapacitiesApi: builder.query({
      query: () => ({
        url: endpoints.SeatingCapacity.getAllSeatingCapacities,
        method: "GET",
      }),
      providesTags: ["SeatingCapacity"],
    }),

    // Get List of Seating Capacities (pagination / search)
    getSeatingCapacityListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.SeatingCapacity.getListSeatingCapacities}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["SeatingCapacity"],
    }),

    // Get Seating Capacity by ID
    getSeatingCapacityByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.SeatingCapacity.getSeatingCapacityById}/${id}`,
        method: "GET",
      }),
      providesTags: ["SeatingCapacity"],
    }),

    // Delete Seating Capacity by ID
    deleteSeatingCapacityByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.SeatingCapacity.deleteSeatingCapacityById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SeatingCapacity"],
    }),
  }),
});

export const {
  useCreateSeatingCapacityApiMutation,
  useUpdateSeatingCapacityByIdApiMutation,
  useGetAllSeatingCapacitiesApiQuery,
  useGetSeatingCapacityListApiQuery,
  useGetSeatingCapacityByIdApiQuery,
  useDeleteSeatingCapacityByIdApiMutation,
} = typeSeatingCapacityApi;
