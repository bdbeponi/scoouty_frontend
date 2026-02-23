// src/redux/features/typeMileagesApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeMileagesApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Mileage Type
    createMileageTypeApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.MileagesType.createMileage,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Mileage"],
    }),

    // Update Mileage Type by ID
    updateMileageTypeByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.MileagesType.updateMileage}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Mileage"],
    }),

    // Get All Mileage Types (no pagination)
    getAllMileagesTypesApi: builder.query({
      query: () => ({
        url: endpoints.MileagesType.getAllMileages,
        method: "GET",
      }),
      providesTags: ["Mileage"],
    }),

    // Get List of Mileage Types (pagination / search)
    getMileageTypeListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.MileagesType.getListMileages}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Mileage"],
    }),

    // Get Mileage Type by ID
    getMileageTypeByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.MileagesType.getMileageById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Mileage"],
    }),

    // Delete Mileage Type by ID
    deleteMileageTypeByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.MileagesType.deleteMileage}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Mileage"],
    }),
  }),
});

export const {
  useCreateMileageTypeApiMutation,
  useUpdateMileageTypeByIdApiMutation,
  useGetAllMileagesTypesApiQuery,
  useGetMileageTypeListApiQuery,
  useGetMileageTypeByIdApiQuery,
  useDeleteMileageTypeByIdApiMutation,
} = typeMileagesApi;
