// src/redux/features/authorApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const authorApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Get all Author for a blog by blogId
    getAuthorApiIdApi: builder.query({
      query: (userName) => ({
        url: `${endpoints.author.getAuthorById}/${userName}`,
        method: "GET",
      }),
      providesTags: ["Author"],
    }),
  }),
});

export const { useGetAuthorApiIdApiQuery } = authorApi;
