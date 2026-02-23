// src/redux/features/seatHeightApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const seatHeightApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Seat Height
    createSeatHeightApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.SeatHeight.createSeatHeight,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["SeatHeight"],
    }),

    // Update Seat Height by ID
    updateSeatHeightByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.SeatHeight.updateSeatHeight}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["SeatHeight"],
    }),

    // Get All Seat Heights (no pagination)
    getAllSeatHeightsApi: builder.query({
      query: () => ({
        url: endpoints.SeatHeight.getAllSeatHeight,
        method: "GET",
      }),
      providesTags: ["SeatHeight"],
    }),

    // Get List of Seat Heights (pagination / search)
    getSeatHeightListApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.SeatHeight.getListSeatHeight}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["SeatHeight"],
    }),

    // Get Seat Height by ID
    getSeatHeightByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.SeatHeight.getSeatHeightById}/${id}`,
        method: "GET",
      }),
      providesTags: ["SeatHeight"],
    }),

    // Delete Seat Height by ID
    deleteSeatHeightByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.SeatHeight.deleteSeatHeight}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SeatHeight"],
    }),
  }),
});

export const {
  useCreateSeatHeightApiMutation,
  useUpdateSeatHeightByIdApiMutation,
  useGetAllSeatHeightsApiQuery,
  useGetSeatHeightListApiQuery,
  useGetSeatHeightByIdApiQuery,
  useDeleteSeatHeightByIdApiMutation,
} = seatHeightApi;
