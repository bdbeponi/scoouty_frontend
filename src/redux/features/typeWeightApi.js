// src/redux/features/typeWeightApi.js
import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const typeWeightApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Product Weight
    createProductWeightApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.ProductWeight.createProductWeight,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ProductWeight"],
    }),

    // Update Product Weight by ID
    updateProductWeightByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.ProductWeight.updateProductWeightById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["ProductWeight"],
    }),

    // Get All Product Weights (no pagination)
    getAllProductWeightsApi: builder.query({
      query: () => ({
        url: endpoints.ProductWeight.getAllProductWeights,
        method: "GET",
      }),
      providesTags: ["ProductWeight"],
    }),

    // Get List of Product Weights (for pagination or filtered list)
    getProductListWeightsApi: builder.query({
      query: ({ page = 1, limit = 10, search = "" } = {}) => ({
        url: `${endpoints.ProductWeight.getListProductWeights}?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["ProductWeight"],
    }),

    // Get Product Weight by ID
    getProductWeightByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.ProductWeight.getProductWeightById}/${id}`,
        method: "GET",
      }),
      providesTags: ["ProductWeight"],
    }),

    // Delete Product Weight by ID
    deleteProductWeightByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.ProductWeight.deleteProductWeightById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProductWeight"],
    }),
  }),
});

export const {
  useCreateProductWeightApiMutation,
  useUpdateProductWeightByIdApiMutation,
  useGetAllProductWeightsApiQuery,
  useGetProductListWeightsApiQuery,
  useGetProductWeightByIdApiQuery,
  useDeleteProductWeightByIdApiMutation,
} = typeWeightApi;
