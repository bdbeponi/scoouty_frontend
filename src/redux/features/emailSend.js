// src/redux/features/emailSend.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const emailApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Ads
    createEmailApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.emailSend.createEmail,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Email"],
    }),

   
  }),
});

export const {
  useCreateEmailApiMutation
} = emailApi;
