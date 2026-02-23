// src/redux/apiSlice/apiSlice.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/redux/url/url";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Blog",
    "Slider",
    "Brand",
    "Product",
    "Category",
    "BodyType",
    "Color",
    "Drivetrain",
    "Feature",
    "FuelType",
    "MileagesType",
    "SeatingCapacity",
    "ProductSize",
    "TransmissionType",
    "ProductWeight",
    "ManufacturingYearsType",
    "ProductColor",
    "Mileage",
    "Settings",
    "Email",
    "Comments",
    "Author",
    "Cc",
    "FuelTank",
    "Torque",
    "SeatHeight",
    "TopSpeed",
    "Power",
    "Gearbox",
    "Brakes",
  ],
  endpoints: () => ({}),
});
