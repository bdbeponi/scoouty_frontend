// src/redux/features/typeManufacturingYearsApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeManufacturingYearsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Manufacturing Years Type
    createManufacturingYearsTypeApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.ManufacturingYearsType.createManufacturingYearsType,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ManufacturingYearsType"],
    }),

    // Update Manufacturing Years Type by ID
    updateManufacturingYearsTypeByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.ManufacturingYearsType.updateManufacturingYearsTypeById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ManufacturingYearsType"],
    }),

    // Get All Manufacturing Years Types (no pagination)
    getAllManufacturingYearsTypesApi: builder.query({
      query: () => ({
        url: endpoints.ManufacturingYearsType.getAllManufacturingYearsTypes,
        method: "GET",
      }),
      providesTags: ["ManufacturingYearsType"],
    }),

    // Get List of Manufacturing Years Types (pagination / search)
    getManufacturingYearsTypeListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.ManufacturingYearsType.getListManufacturingYearsTypes}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["ManufacturingYearsType"],
    }),

    // Get Manufacturing Years Type by ID
    getManufacturingYearsTypeByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.ManufacturingYearsType.getManufacturingYearsTypeById}/${id}`,
        method: "GET",
      }),
      providesTags: ["ManufacturingYearsType"],
    }),

    // Delete Manufacturing Years Type by ID
    deleteManufacturingYearsTypeByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.ManufacturingYearsType.deleteManufacturingYearsTypeById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ManufacturingYearsType"],
    }),
  }),
});

export const {
  useCreateManufacturingYearsTypeApiMutation,
  useUpdateManufacturingYearsTypeByIdApiMutation,
  useGetAllManufacturingYearsTypesApiQuery,
  useGetManufacturingYearsTypeListApiQuery,
  useGetManufacturingYearsTypeByIdApiQuery,
  useDeleteManufacturingYearsTypeByIdApiMutation,
} = typeManufacturingYearsApi;
