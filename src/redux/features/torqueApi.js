// src/redux/features/torqueApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const torqueApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({

    // Create Torque
    createTorqueApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.Torque.createTorque,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Torque"],
    }),

    // Update Torque by ID
    updateTorqueByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.Torque.updateTorque}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Torque"],
    }),

    // Get All Torques (no pagination)
    getAllTorquesApi: builder.query({
      query: () => ({
        url: endpoints.Torque.getAllTorque,
        method: "GET",
      }),
      providesTags: ["Torque"],
    }),

    // Get List of Torques (pagination / search)
    getTorqueListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.Torque.getListTorque}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Torque"],
    }),

    // Get Torque by ID
    getTorqueByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.Torque.getTorqueById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Torque"],
    }),

    // Delete Torque by ID
    deleteTorqueByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Torque.deleteTorque}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Torque"],
    }),

  }),
});

export const {
  useCreateTorqueApiMutation,
  useUpdateTorqueByIdApiMutation,
  useGetAllTorquesApiQuery,
  useGetTorqueListApiQuery,
  useGetTorqueByIdApiQuery,
  useDeleteTorqueByIdApiMutation,
} = torqueApi;