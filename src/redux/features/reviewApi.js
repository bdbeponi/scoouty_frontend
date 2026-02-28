// src/redux/features/adsApi.js

import { apiSlice } from "../apiSlice/apiSlice";
import { endpoints } from "../apiSlice/endpoints";

export const reviewApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Ads
    createReviewApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.review.postReview,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Review"],
    }),

    // Update Ads

    // Get All Ads
    getAllReviewApi: builder.query({
      query: () => ({
        url: endpoints.review.getReview,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    // Get List of Ads (with pagination + search)

    getReviewByProductIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.review.productReviewById}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateReviewApiMutation,
  useGetAllReviewApiQuery,
  useGetReviewByProductIdApiQuery,
} = reviewApi;
