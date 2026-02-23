// src/redux/features/fuelTankTypeApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const fuelTankTypeApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Fuel Tank Type
    createFuelTankTypeApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.fuelTank.createFT,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["FuelTank"],
    }),

    // Update Fuel Tank Type by ID
    updateFuelTankTypeByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.fuelTank.updateFT}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["FuelTank"],
    }),

    // Get All Fuel Tank Types (no pagination)
    getAllFuelTankTypesApi: builder.query({
      query: () => ({
        url: endpoints.fuelTank.getAllFT,
        method: "GET",
      }),
      providesTags: ["FuelTank"],
    }),

    // Get List of Fuel Tank Types (pagination / search)
    getFuelTankTypeListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.fuelTank.getListFT}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["FuelTank"],
    }),

    // Get Fuel Tank Type by ID
    getFuelTankTypeByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.fuelTank.getFTById}/${id}`,
        method: "GET",
      }),
      providesTags: ["FuelTank"],
    }),

    // Delete Fuel Tank Type by ID
    deleteFuelTankTypeByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.fuelTank.deleteFT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FuelTank"],
    }),
  }),
});

export const {
  useCreateFuelTankTypeApiMutation,
  useUpdateFuelTankTypeByIdApiMutation,
  useGetAllFuelTankTypesApiQuery,
  useGetFuelTankTypeListApiQuery,
  useGetFuelTankTypeByIdApiQuery,
  useDeleteFuelTankTypeByIdApiMutation,
} = fuelTankTypeApi;
