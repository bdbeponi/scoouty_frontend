// src/redux/features/ccTypeApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const ccTypeApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({

    // Create CC Type
    createCcTypeApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.CcType.createCc,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Cc"],
    }),

    // Update CC Type by ID
    updateCcTypeByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.CcType.updateCc}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Cc"],
    }),

    // Get All CC Types (no pagination)
    getAllCcTypesApi: builder.query({
      query: () => ({
        url: endpoints.CcType.getAllMCc,
        method: "GET",
      }),
      providesTags: ["Cc"],
    }),

    // Get List of CC Types (pagination / search)
    getCcTypeListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.CcType.getListCc}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Cc"],
    }),

    // Get CC Type by ID
    getCcTypeByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.CcType.getCcById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Cc"],
    }),

    // Delete CC Type by ID
    deleteCcTypeByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.CcType.deleteCc}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cc"],
    }),

  }),
});

export const {
  useCreateCcTypeApiMutation,
  useUpdateCcTypeByIdApiMutation,
  useGetAllCcTypesApiQuery,
  useGetCcTypeListApiQuery,
  useGetCcTypeByIdApiQuery,
  useDeleteCcTypeByIdApiMutation,
} = ccTypeApi;