// src/redux/features/searchApi.js

import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const searchApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getListProductsSearchApi: builder.query({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 12,
          search,
          category,
          brand,
          weight,
          size,
          bodyType,
          drivetrain,
          fuelType,
          manufacturingYear,
          mileage,
          seatingCapacity,
          transmission,
          newArrival,
          trending,
          topSelling,
          featuredProducts,
          flashSale,
          minPrice,
          maxPrice,
          is_active = true,
          vehicleType,
        } = params;

        const queryParams = new URLSearchParams();

        // Required params
        queryParams.append("page", page);
        queryParams.append("limit", limit);
        queryParams.append("is_active", is_active);

        // Search query
        if (search) queryParams.append("search", search);

        // Vehicle type (category filter)
        if (vehicleType) {
          queryParams.append("category", vehicleType);
        }

        // Filter parameters
        const filterParams = {
          brands: brand,
          weight,
          size,
          bodyType,
          drivetrain,
          fuelType,
          manufacturingYear,
          mileage,
          seatingCapacity,
          transmission,
          minPrice,
          maxPrice,
        };

        Object.entries(filterParams).forEach(([key, value]) => {
          if (value) {
            // Handle array values (multiple selections)
            if (Array.isArray(value)) {
              value.forEach((val) => queryParams.append(key, val));
            } else {
              queryParams.append(key, value);
            }
          }
        });

        // Special flags
        const flagParams = {
          newArrival: newArrival ? "yes" : undefined,
          trending: trending ? "yes" : undefined,
          topSelling: topSelling ? "yes" : undefined,
          featuredProducts: featuredProducts ? "yes" : undefined,
          flashSale: flashSale ? "yes" : undefined,
        };

        Object.entries(flagParams).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });

        return {
          url: `${endpoints.Product.getCardListProduct}?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const { useGetListProductsSearchApiQuery } = searchApi;
