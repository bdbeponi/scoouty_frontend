// src/redux/features/commentsApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const commentsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create a new comment
    createCommentApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.comments.createComment,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Comments"],
    }),

    // Get all comments for a blog by blogId
    getCommentsByBlogIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.comments.getBlogCommentsById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Comments"],
    }),
  }),
});

export const { useCreateCommentApiMutation, useGetCommentsByBlogIdApiQuery } =
  commentsApi;
