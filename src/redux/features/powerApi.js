// src/redux/features/powerApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const powerApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({

    // Create Power
    createPowerApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.Power.createPower,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Power"],
    }),

    // Update Power by ID
    updatePowerByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.Power.updatePower}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Power"],
    }),

    // Get All Powers (no pagination)
    getAllPowersApi: builder.query({
      query: () => ({
        url: endpoints.Power.getAllPower,
        method: "GET",
      }),
      providesTags: ["Power"],
    }),

    // Get List of Powers (pagination / search)
    getPowerListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.Power.getListPower}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Power"],
    }),

    // Get Power by ID
    getPowerByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.Power.getPowerById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Power"],
    }),

    // Delete Power by ID
    deletePowerByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Power.deletePower}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Power"],
    }),

  }),
});

export const {
  useCreatePowerApiMutation,
  useUpdatePowerByIdApiMutation,
  useGetAllPowersApiQuery,
  useGetPowerListApiQuery,
  useGetPowerByIdApiQuery,
  useDeletePowerByIdApiMutation,
} = powerApi;