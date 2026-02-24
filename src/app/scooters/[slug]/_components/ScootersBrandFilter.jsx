"use client";

import { useParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { useGetListProductsSearchApiQuery } from "@/redux/features/searchApi";
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";
import { baseUriBackend } from "@/redux/url/url";
import { FiFilter, FiX } from "react-icons/fi";
import SearchPagination from "./SearchPagination";
import FilterBrandSidebar from "./FilterBrandSidebar";

// All filter data hooks
import { useGetAllBrandsQuery } from "@/redux/features/brandApi";
import { useGetAllBodyTypesApiQuery } from "@/redux/features/typeBodyApi";
import { useGetAllProductColorsApiQuery } from "@/redux/features/typeColorApi";
import { useGetAllDrivetrainsApiQuery } from "@/redux/features/typeDrivetrainApi";
import { useGetAllFuelTypesApiQuery } from "@/redux/features/typeFuelApi";
import { useGetAllManufacturingYearsTypesApiQuery } from "@/redux/features/typeManufacturingYearsApi";
import { useGetAllMileagesTypesApiQuery } from "@/redux/features/typeMileagesApi";
import { useGetAllSeatingCapacitiesApiQuery } from "@/redux/features/typeSeatingCapacityApi";
import { useGetAllProductSizeApiQuery } from "@/redux/features/typeSizeApi";
import { useGetAllTransmissionTypesApiQuery } from "@/redux/features/typeTransmissionApi";
import { useGetAllProductWeightsApiQuery } from "@/redux/features/typeWeightApi";

// Additional APIs for scooty filters
import { useGetAllBrakesApiQuery } from "@/redux/features/brakesApi";
import { useGetAllCcTypesApiQuery } from "@/redux/features/ccApi";
import { useGetAllFuelTankTypesApiQuery } from "@/redux/features/fuelTankApi";
import { useGetAllGearboxesApiQuery } from "@/redux/features/gearboxApi";
import { useGetAllPowersApiQuery } from "@/redux/features/powerApi";
import { useGetAllSeatHeightsApiQuery } from "@/redux/features/seatHeightApi";
import { useGetAllTopSpeedTypesApiQuery } from "@/redux/features/topSpeedApi";
import { useGetAllTorquesApiQuery } from "@/redux/features/torqueApi";

const ScootersBrandFilter = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const brandSlug = params?.slug;
  const category = "scooters";
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Local filter state (not in URL) - All scooty filters
  const [filterParams, setFilterParams] = useState({
    bodyType: [],
    fuelType: [],
    transmission: [],
    color: [],
    manufacturingYear: [],
    mileage: [],
    seatingCapacity: [],
    size: [],
    weight: [],
    drivetrain: [],
    minPrice: "",
    maxPrice: "",
    // Scooty specific filters
    brakes: [],
    ccType: [],
    fuelTankType: [],
    gearbox: [],
    power: [],
    seatHeight: [],
    topSpeed: [],
    torque: [],
  });

  // Get initial params from URL (only for initial load)
  const search = searchParams.get("search") || "";

  // Fetch all filter data APIs for scooty
  const { data: brandsData } = useGetAllBrandsQuery();
  const { data: bodyTypesData } = useGetAllBodyTypesApiQuery();
  const { data: colorsData } = useGetAllProductColorsApiQuery();
  const { data: drivetrainsData } = useGetAllDrivetrainsApiQuery();
  const { data: fuelTypesData } = useGetAllFuelTypesApiQuery();
  const { data: yearsData } = useGetAllManufacturingYearsTypesApiQuery();
  const { data: mileageData } = useGetAllMileagesTypesApiQuery();
  const { data: seatingData } = useGetAllSeatingCapacitiesApiQuery();
  const { data: sizesData } = useGetAllProductSizeApiQuery();
  const { data: transmissionData } = useGetAllTransmissionTypesApiQuery();
  const { data: weightsData } = useGetAllProductWeightsApiQuery();

  // Additional APIs for scooty
  const { data: brakesData } = useGetAllBrakesApiQuery();
  const { data: ccTypesData } = useGetAllCcTypesApiQuery();
  const { data: fuelTankTypesData } = useGetAllFuelTankTypesApiQuery();
  const { data: gearboxesData } = useGetAllGearboxesApiQuery();
  const { data: powersData } = useGetAllPowersApiQuery();
  const { data: seatHeightsData } = useGetAllSeatHeightsApiQuery();
  const { data: topSpeedTypesData } = useGetAllTopSpeedTypesApiQuery();
  const { data: torquesData } = useGetAllTorquesApiQuery();

  // Helper function to get API data
  const getApiData = (apiResponse) => {
    if (!apiResponse?.data) return [];

    if (Array.isArray(apiResponse.data)) return apiResponse.data;
    if (apiResponse.data.data && Array.isArray(apiResponse.data.data))
      return apiResponse.data.data;
    if (apiResponse.data.result && Array.isArray(apiResponse.data.result))
      return apiResponse.data.result;
    if (apiResponse.data.brands && Array.isArray(apiResponse.data.brands))
      return apiResponse.data.brands;

    return [];
  };

  // Helper function to get display name from filter data
  const getFilterDisplayName = useMemo(() => {
    // Create lookup objects for each filter type
    const createLookup = (data) => {
      if (!data?.data) return {};

      const items = Array.isArray(data.data)
        ? data.data
        : data.data.data || data.data.result || data.data.brands || [];

      return items.reduce((acc, item) => {
        const id = item._id || item.id;
        const name = item.name_en || item.name || "Unknown";
        if (id) {
          acc[id] = name;
        }
        // Also add name as key for backward compatibility
        if (item.name) {
          acc[item.name] = name;
        }
        return acc;
      }, {});
    };

    const lookups = {
      brand: createLookup(brandsData),
      bodyType: createLookup(bodyTypesData),
      fuelType: createLookup(fuelTypesData),
      transmission: createLookup(transmissionData),
      color: createLookup(colorsData),
      manufacturingYear: createLookup(yearsData),
      mileage: createLookup(mileageData),
      seatingCapacity: createLookup(seatingData),
      size: createLookup(sizesData),
      weight: createLookup(weightsData),
      drivetrain: createLookup(drivetrainsData),
      brakes: createLookup(brakesData),
      ccType: createLookup(ccTypesData),
      fuelTankType: createLookup(fuelTankTypesData),
      gearbox: createLookup(gearboxesData),
      power: createLookup(powersData),
      seatHeight: createLookup(seatHeightsData),
      topSpeed: createLookup(topSpeedTypesData),
      torque: createLookup(torquesData),
    };

    return (filterType, value) => {
      const lookup = lookups[filterType];
      if (!lookup) return value; // Return original value if no lookup found

      // Try to find by ID first, then by value itself
      return lookup[value] || value;
    };
  }, [
    brandsData,
    bodyTypesData,
    fuelTypesData,
    transmissionData,
    colorsData,
    yearsData,
    mileageData,
    seatingData,
    sizesData,
    weightsData,
    drivetrainsData,
    brakesData,
    ccTypesData,
    fuelTankTypesData,
    gearboxesData,
    powersData,
    seatHeightsData,
    topSpeedTypesData,
    torquesData,
  ]);

  // Prepare API params directly from local state
  const apiParams = useMemo(() => {
    if (!brandSlug) return skipToken;

    const params = {
      page,
      limit: 24,
      search,
      category,
      brand: brandSlug, // Pass brand slug directly
    };

    // Add all filter params from local state
    Object.entries(filterParams).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params[key] = value;
      } else if (value && value !== "") {
        params[key] = value;
      }
    });

    return params;
  }, [page, search, category, brandSlug, filterParams]);

  // Fetch search results with API params
  const { data: product, isLoading } =
    useGetListProductsSearchApiQuery(apiParams);

  // Fetch category results
  const { data: categoryData } = useGetAllCategoryQuery();

  const getCoverImage = () => {
    return "/scooters/s4.jpg";
  };

  const coverImage = useMemo(() => getCoverImage(), [category, categoryData]);

  // Process products data
  const products = (product?.data?.products || product?.data?.data || []).map(
    (item) => ({
      id: item.id || item._id,
      name: item.name || item.productName_en || "Unnamed Product",
      brand: item.brand || "",
      image: item.image ? `${baseUriBackend}${item.image}` : "/placeholder.jpg",
      rating: item.rating || 4.5,
      price: item.price || 0,
      isPopular: item.isPopular,
      isNew: item.isNew,
      slug: item.slug,
    }),
  );

  // Handle filter change from sidebar
  const handleFilterChange = (newFilters) => {
    setFilterParams(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilterParams({
      bodyType: [],
      fuelType: [],
      transmission: [],
      color: [],
      manufacturingYear: [],
      mileage: [],
      seatingCapacity: [],
      size: [],
      weight: [],
      drivetrain: [],
      minPrice: "",
      maxPrice: "",
      brakes: [],
      ccType: [],
      fuelTankType: [],
      gearbox: [],
      power: [],
      seatHeight: [],
      topSpeed: [],
      torque: [],
    });
    setPage(1);
  };

  // Remove single filter
  const removeFilter = (key, value = null) => {
    const newFilters = { ...filterParams };

    if (value && Array.isArray(newFilters[key])) {
      // Remove specific value from array
      newFilters[key] = newFilters[key].filter((v) => v !== value);
    } else {
      // Clear entire filter
      if (Array.isArray(newFilters[key])) {
        newFilters[key] = [];
      } else {
        newFilters[key] = "";
      }
    }

    setFilterParams(newFilters);
    setPage(1);
  };

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0;

    Object.entries(filterParams).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        count += value.length;
      } else if (value && value !== "") {
        count += 1;
      }
    });

    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Format filter key for display
  const formatFilterKey = (key) => {
    const formatMap = {
      bodyType: "Body Type",
      fuelType: "Fuel Type",
      transmission: "Transmission",
      color: "Color",
      manufacturingYear: "Year",
      mileage: "Mileage",
      seatingCapacity: "Seats",
      size: "Size",
      weight: "Weight",
      drivetrain: "Drivetrain",
      brakes: "Brakes",
      ccType: "Engine CC",
      fuelTankType: "Fuel Tank",
      gearbox: "Gearbox",
      power: "Power",
      seatHeight: "Seat Height",
      topSpeed: "Top Speed",
      torque: "Torque",
    };
    return formatMap[key] || key;
  };

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-white font-bold text-3xl md:text-4xl mb-4">
            {search ? `Search Results for "${search}"` : "Scooters"}
          </h1>
          <p className="text-gray-200 text-lg">
            {isLoading
              ? "Loading..."
              : `${products.length} ${products.length === 1 ? "result" : "results"} found`}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
            >
              <FiFilter />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-white text-secondary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Sidebar */}
          <div
            className={`${showMobileFilters ? "fixed inset-0 z-50 bg-black/50" : "hidden"} lg:block lg:relative`}
          >
            <div
              className={`${showMobileFilters ? "absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto" : ""} lg:w-80 lg:static`}
            >
              {showMobileFilters && (
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
              )}
              <FilterBrandSidebar
                currentFilters={filterParams}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
              {showMobileFilters && (
                <div className="p-4 border-t">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLoading
                    ? "Loading..."
                    : `${products.length} ${products.length === 1 ? "Scooter" : "Scooters"} Found`}
                </h2>
              </div>

              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Price Filters */}
                  {filterParams.minPrice && (
                    <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      Min Price: ₹
                      {parseInt(filterParams.minPrice).toLocaleString("en-IN")}
                      <button
                        onClick={() => removeFilter("minPrice")}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  )}
                  {filterParams.maxPrice && (
                    <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      Max Price: ₹
                      {parseInt(filterParams.maxPrice).toLocaleString("en-IN")}
                      <button
                        onClick={() => removeFilter("maxPrice")}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  )}

                  {/* Array Filters */}
                  {Object.entries(filterParams).map(([key, value]) => {
                    if (Array.isArray(value) && value.length > 0) {
                      return value.map((val, index) => (
                        <div
                          key={`${key}-${index}`}
                          className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {formatFilterKey(key)}:{" "}
                          {getFilterDisplayName(key, val)}
                          <button
                            onClick={() => removeFilter(key, val)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            <FiX size={14} />
                          </button>
                        </div>
                      ));
                    }
                    return null;
                  })}
                </div>
              )}
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((car, index) => (
                    <ProductCard
                      key={car.id || index}
                      car={car}
                      index={index}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {product?.data?.pagination &&
                  product.data.pagination.totalPages > 1 && (
                    <div className="mt-8">
                      <SearchPagination
                        pagination={product.data.pagination}
                        onPageChange={setPage}
                      />
                    </div>
                  )}
              </>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No scooters found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ScootersBrandFilter;
