// src/redux/features/gearboxApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const gearboxApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({

    // Create Gearbox
    createGearboxApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.Gearbox.createGearbox,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Gearbox"],
    }),

    // Update Gearbox by ID
    updateGearboxByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.Gearbox.updateGearbox}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Gearbox"],
    }),

    // Get All Gearboxes (no pagination)
    getAllGearboxesApi: builder.query({
      query: () => ({
        url: endpoints.Gearbox.getAllGearbox,
        method: "GET",
      }),
      providesTags: ["Gearbox"],
    }),

    // Get List of Gearboxes (pagination / search)
    getGearboxListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.Gearbox.getListGearbox}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Gearbox"],
    }),

    // Get Gearbox by ID
    getGearboxByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.Gearbox.getGearboxById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Gearbox"],
    }),

    // Delete Gearbox by ID
    deleteGearboxByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Gearbox.deleteGearbox}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gearbox"],
    }),

  }),
});

export const {
  useCreateGearboxApiMutation,
  useUpdateGearboxByIdApiMutation,
  useGetAllGearboxesApiQuery,
  useGetGearboxListApiQuery,
  useGetGearboxByIdApiQuery,
  useDeleteGearboxByIdApiMutation,
} = gearboxApi;