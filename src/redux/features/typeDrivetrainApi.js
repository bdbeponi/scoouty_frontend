// src/redux/features/typeDrivetrainApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeDrivetrainApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Drivetrain
    createDrivetrainApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.Drivetrain.createDrivetrain,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Drivetrain"],
    }),

    // Update Drivetrain by ID
    updateDrivetrainByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.Drivetrain.updateDrivetrain}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Drivetrain"],
    }),

    // Get All Drivetrains (no pagination)
    getAllDrivetrainsApi: builder.query({
      query: () => ({
        url: endpoints.Drivetrain.getAllDrivetrains,
        method: "GET",
      }),
      providesTags: ["Drivetrain"],
    }),

    // Get List of Drivetrains (pagination / search)
    getDrivetrainListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.Drivetrain.getListDrivetrains}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Drivetrain"],
    }),

    // Get Drivetrain by ID
    getDrivetrainByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.Drivetrain.getDrivetrainById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Drivetrain"],
    }),

    // Delete Drivetrain by ID
    deleteDrivetrainByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Drivetrain.deleteDrivetrain}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Drivetrain"],
    }),
  }),
});

export const {
  useCreateDrivetrainApiMutation,
  useUpdateDrivetrainByIdApiMutation,
  useGetAllDrivetrainsApiQuery,
  useGetDrivetrainListApiQuery,
  useGetDrivetrainByIdApiQuery,
  useDeleteDrivetrainByIdApiMutation,
} = typeDrivetrainApi;
