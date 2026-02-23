// src/redux/features/typeFuelApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeFuelApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Fuel Type
    createFuelTypeApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.FuelType.createFuelType,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["FuelType"],
    }),

    // Update Fuel Type by ID
    updateFuelTypeByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.FuelType.updateFuelTypeById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["FuelType"],
    }),

    // Get All Fuel Types (no pagination)
    getAllFuelTypesApi: builder.query({
      query: () => ({
        url: endpoints.FuelType.getAllFuelTypes,
        method: "GET",
      }),
      providesTags: ["FuelType"],
    }),

    // Get List of Fuel Types (pagination / search)
    getFuelTypeListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.FuelType.getListFuelTypes}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["FuelType"],
    }),

    // Get Fuel Type by ID
    getFuelTypeByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.FuelType.getFuelTypeById}/${id}`,
        method: "GET",
      }),
      providesTags: ["FuelType"],
    }),

    // Delete Fuel Type by ID
    deleteFuelTypeByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.FuelType.deleteFuelTypeById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FuelType"],
    }),
  }),
});

export const {
  useCreateFuelTypeApiMutation,
  useUpdateFuelTypeByIdApiMutation,
  useGetAllFuelTypesApiQuery,
  useGetFuelTypeListApiQuery,
  useGetFuelTypeByIdApiQuery,
  useDeleteFuelTypeByIdApiMutation,
} = typeFuelApi;
