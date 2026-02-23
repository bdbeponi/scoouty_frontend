// src/redux/features/typeTransmissionApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeTransmissionApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Transmission Type
    createTransmissionTypeApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.TransmissionType.createTransmission,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["TransmissionType"],
    }),

    // Update Transmission Type by ID
    updateTransmissionTypeByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.TransmissionType.updateTransmission}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["TransmissionType"],
    }),

    // Get All Transmission Types (no pagination)
    getAllTransmissionTypesApi: builder.query({
      query: () => ({
        url: endpoints.TransmissionType.getAllTransmissions,
        method: "GET",
      }),
      providesTags: ["TransmissionType"],
    }),

    // Get List of Transmission Types (pagination / search)
    getTransmissionTypeListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.TransmissionType.getListTransmissions}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["TransmissionType"],
    }),

    // Get Transmission Type by ID
    getTransmissionTypeByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.TransmissionType.getTransmissionById}/${id}`,
        method: "GET",
      }),
      providesTags: ["TransmissionType"],
    }),

    // Delete Transmission Type by ID
    deleteTransmissionTypeByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.TransmissionType.deleteTransmission}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TransmissionType"],
    }),
  }),
});

export const {
  useCreateTransmissionTypeApiMutation,
  useUpdateTransmissionTypeByIdApiMutation,
  useGetAllTransmissionTypesApiQuery,
  useGetTransmissionTypeListApiQuery,
  useGetTransmissionTypeByIdApiQuery,
  useDeleteTransmissionTypeByIdApiMutation,
} = typeTransmissionApi;
