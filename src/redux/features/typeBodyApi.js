// src/redux/features/typeBodyApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeBodyApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Body Type
    createBodyTypeApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.BodyType.createBodyType,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["BodyType"],
    }),

    // Update Body Type by ID
    updateBodyTypeByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.BodyType.updateBodyTypeById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["BodyType"],
    }),

    // Get All Body Types
    getAllBodyTypesApi: builder.query({
      query: () => ({
        url: endpoints.BodyType.getAllBodyTypes,
        method: "GET",
      }),
      providesTags: ["BodyType"],
    }),

    // Get List Body Types (pagination / search)
    getBodyTypeListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.BodyType.getListBodyTypes}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["BodyType"],
    }),

    // Get Body Type by ID
    getBodyTypeByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.BodyType.getBodyTypeById}/${id}`,
        method: "GET",
      }),
      providesTags: ["BodyType"],
    }),

    // Delete Body Type by ID
    deleteBodyTypeByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.BodyType.deleteBodyTypeById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BodyType"],
    }),
  }),
});

export const {
  useCreateBodyTypeApiMutation,
  useUpdateBodyTypeByIdApiMutation,
  useGetAllBodyTypesApiQuery,
  useGetBodyTypeListApiQuery,
  useGetBodyTypeByIdApiQuery,
  useDeleteBodyTypeByIdApiMutation,
} = typeBodyApi;
