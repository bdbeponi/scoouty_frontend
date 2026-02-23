// src/redux/features/productApi.js
import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { endpoints } from "@/redux/apiSlice/endpoints";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create Product
    createProductApi: builder.mutation({
      query: (formData) => ({
        url: endpoints.Product.createProduct,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Update Product by ID
    updateProductByIdApi: builder.mutation({
      query: ({ id, formData }) => ({
        url: `${endpoints.Product.updateProductById}/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // Get All Products
    getAllProductsApi: builder.query({
      query: () => ({
        url: endpoints.Product.getAllProducts,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Get List of Products (with pagination & search)
    getListProductsApi: builder.query({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 10,
          search = "",
          category = "",
          brand = "",
          discount = "",
          minPrice = "",
          maxPrice = "",
          is_active = true,
          flashSale = "",
          trending = "",
          topSelling = "",
          newArrival = "",
        } = params;

        return {
          url: `${endpoints.Product.getListProduct}?page=${page}&limit=${limit}&search=${search}&category=${category}&brand=${brand}&discount=${discount}&minPrice=${minPrice}&maxPrice=${maxPrice}&is_active=${is_active}&flashSale=${flashSale}&trending=${trending}&topSelling=${topSelling}&newArrival=${newArrival}`,
          method: "GET",
        };
      },
      providesTags: ["Product", "Category"],
    }),

    // Get List of Products (with pagination & search)
    getCardListProductsApi: builder.query({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 10,
          search,
          category,
          brand,
          minPrice,
          maxPrice,
          bodyType,
          fuelType,
          transmission,
          color,
          manufacturingYear,
          mileage,
          seatingCapacity,
          size,
          weight,
          drivetrain,

          // NEW
          brakes,
          ccType,
          fuelTankType,
          gearbox,
          power,
          seatHeight,
          topSpeed,
          torque,

          is_active = true,

          newArrival,
          trending,

          flashSale,
          topSelling,
          featuredProducts,
        } = params;

        const queryParams = new URLSearchParams();

        // defaults
        queryParams.append("page", page);
        queryParams.append("limit", limit);
        queryParams.append("is_active", is_active);

        // common
        if (search) queryParams.append("search", search);
        if (category) queryParams.append("category", category);
        if (brand) queryParams.append("brand", brand);
        if (minPrice) queryParams.append("minPrice", minPrice);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);

        // vehicle filters
        if (bodyType) queryParams.append("bodyType", bodyType);
        if (fuelType) queryParams.append("fuelType", fuelType);
        if (transmission) queryParams.append("transmission", transmission);
        if (color) queryParams.append("color", color);
        if (manufacturingYear)
          queryParams.append("manufacturingYear", manufacturingYear);
        if (mileage) queryParams.append("mileage", mileage);
        if (seatingCapacity)
          queryParams.append("seatingCapacity", seatingCapacity);
        if (size) queryParams.append("size", size);
        if (weight) queryParams.append("weight", weight);
        if (drivetrain) queryParams.append("drivetrain", drivetrain);

        // NEW specs
        if (brakes) queryParams.append("brakes", brakes);
        if (ccType) queryParams.append("ccType", ccType);
        if (fuelTankType) queryParams.append("fuelTankType", fuelTankType);
        if (gearbox) queryParams.append("gearbox", gearbox);
        if (power) queryParams.append("power", power);
        if (seatHeight) queryParams.append("seatHeight", seatHeight);
        if (topSpeed) queryParams.append("topSpeed", topSpeed);
        if (torque) queryParams.append("torque", torque);

        // product flags
        if (flashSale) queryParams.append("flashSale", flashSale);
        if (trending) queryParams.append("trending", trending);
        if (topSelling) queryParams.append("topSelling", topSelling);
        if (newArrival) queryParams.append("newArrival", newArrival);
        if (featuredProducts)
          queryParams.append("featuredProducts", featuredProducts);

        return {
          url: `${endpoints.Product.getCardListProduct}?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Product", "Category"],
    }),

    // Get Product by ID
    getProductByIdApi: builder.query({
      query: (id) => ({
        url: `${endpoints.Product.getProductById}/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Get Product by Slug
    getProductBySlugApi: builder.query({
      query: (slug) => ({
        url: `${endpoints.Product.getProductBySlug}/${slug}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Delete Product by ID
    deleteProductByIdApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Product.deleteProductById}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Get Products by Category
    getProductsByCategoryApi: builder.query({
      query: (categoryId) => ({
        url: `${endpoints.Product.getProductsByCategory}/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // Toggle Product Status
    toggleProductStatusApi: builder.mutation({
      query: (id) => ({
        url: `${endpoints.Product.toggleProductStatus}/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductApiMutation,
  useUpdateProductByIdApiMutation,
  useGetAllProductsApiQuery,
  useGetListProductsApiQuery,
  useGetCardListProductsApiQuery,
  useGetProductByIdApiQuery,
  useDeleteProductByIdApiMutation,
  useGetProductBySlugApiQuery,
  useGetProductsByCategoryApiQuery,
  useToggleProductStatusApiMutation,
} = productApi;
