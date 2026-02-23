// src/redux/features/blogApi.ts
import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const settingsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // 📰 Public Endpoints

    updatePassword: builder.mutation({
      query: (formData) => ({
        url: endpoints.settings.updatePassword,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Settings"],
    }),

    getSettings: builder.query({
      query: () => ({
        url: endpoints.settings.getSettings,
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),

    // ✍️ Protected Endpoints
    updateSettings: builder.mutation({
      query: (formData) => ({
        url: endpoints.settings.updateSettings,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useUpdatePasswordMutation,
} = settingsApi;
