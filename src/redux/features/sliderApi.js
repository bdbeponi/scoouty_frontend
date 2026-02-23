// src/redux/features/sliderApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const sliderApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Slider
    createSliderApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.slider.createSlider,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Slider"],
    }),

    // Update Slider
    updateSliderApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.slider.updateSlider}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Slider"],
    }),

    // Get All Sliders
    getAllSlidersApi: builder.query({
      query: () => ({
        url: endpoints.slider.getAllSliders,
        method: "GET",
      }),
      providesTags: ["Slider"],
    }),

    // Get List of Sliders (with pagination + search)
    getListSlidersLeftApi: builder.query({
      query: ({ page = 1, limit = 100, search = "", side = "left" }) => ({
        url: `${endpoints.slider.getListSliders}?page=${page}&limit=${limit}&search=${search}&side=${side}`,
        method: "GET",
      }),
      providesTags: ["Slider"],
    }),

    // Get List of Sliders (with pagination + search)
    getListSlidersRightApi: builder.query({
      query: ({ page = 1, limit = 100, search = "", side = "right" }) => ({
        url: `${endpoints.slider.getListSliders}?page=${page}&limit=${limit}&search=${search}&side=${side}`,
        method: "GET",
      }),
      providesTags: ["Slider"],
    }),

    // Get Slider by ID
    getSliderByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.slider.getSliderById}/${id}`,
        method: "GET",
      }),
    }),

    // Delete Slider
    deleteSliderApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.slider.deleteSlider}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slider"],
    }),

    // Toggle Slider Status
    toggleSliderStatusApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.slider.toggleSliderStatus}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Slider"],
    }),

    // Update Display Order
    updateDisplayOrderApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.slider.updateDisplayOrder}/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Slider"],
    }),
  }),
});

export const {
  useCreateSliderApiMutation,
  useUpdateSliderApiMutation,
  useGetAllSlidersApiQuery,
  useGetListSlidersLeftApiQuery,
  useGetListSlidersRightApiQuery,
  useGetSliderByIdApiQuery,
  useDeleteSliderApiMutation,
  useToggleSliderStatusApiMutation,
  useUpdateDisplayOrderApiMutation,
} = sliderApi;
