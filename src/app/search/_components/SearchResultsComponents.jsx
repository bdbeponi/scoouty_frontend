// src/app/search/page.jsx
"use client";

import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { useGetListProductsSearchApiQuery } from "@/redux/features/searchApi";
import { baseUriBackend } from "@/redux/url/url";
import { useSearchParams } from "next/navigation";
import SearchPagination from "@/components/custom/SearchPagination";
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";

import { useState, useMemo } from "react";

const SearchResultsComponents = () => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  // Get all search params
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const bodyType = searchParams.get("bodyType") || "";
  const fuelType = searchParams.get("fuelType") || "";
  const transmission = searchParams.get("transmission") || "";
  const color = searchParams.get("color") || "";
  const manufacturingYear = searchParams.get("manufacturingYear") || "";
  const mileage = searchParams.get("mileage") || "";
  const seatingCapacity = searchParams.get("seatingCapacity") || "";
  const size = searchParams.get("size") || "";
  const weight = searchParams.get("weight") || "";
  const drivetrain = searchParams.get("drivetrain") || "";

  // Prepare API params
  const apiParams = {
    page,
    limit: 24,
    search,
    category,
    brand,
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
  };

  // Add price range if exists
  if (minPrice) apiParams.minPrice = minPrice;
  if (maxPrice) apiParams.maxPrice = maxPrice;

  // Fetch search results
  const { data: product, isLoading } =
    useGetListProductsSearchApiQuery(apiParams);

  // Fetch category results
  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetAllCategoryQuery();

  const getCoverImage = () => {
    // If category parameter is empty, return default image
    if (!category || !categoryData?.data) {
      return "/cars/c1.jpg";
    }

    // Find the matching category by slug or name
    const matchingCategory = categoryData.data.find(
      (cat) =>
        cat._id === category ||
        cat.slug?.toLowerCase() === category.toLowerCase() ||
        cat.name?.toLowerCase() === category.toLowerCase(),
    );

    // If found and has cover image, return it with baseUriBackend
    if (matchingCategory?.cover && matchingCategory.cover !== "default.png") {
      return `${baseUriBackend}${matchingCategory.cover}`;
    }

    // Fallback to default image
    return "/cars/c1.jpg";
  };

  const coverImage = useMemo(() => getCoverImage(), [category, categoryData]);

  // Process products data - SAME STRUCTURE AS FeaturedCars
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

  return (
    <>
      <section
        className="relative h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex gap-4 text-white font-bold text-xl md:text-2xl lg:text-3xl">
          Search Result
        </div>
      </section>

      <section className="container max-w-[1200px] mx-auto px-4 py-10">
        <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            // Show 8 skeleton cards while loading
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : products.length > 0 ? (
            products.map((car, index) => (
              <ProductCard key={car.id || index} car={car} index={index} />
            ))
          ) : (
            // Empty state when no products are found
            <div className="col-span-4 text-center py-10">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {product?.data?.pagination && (
          <SearchPagination
            pagination={product.data.pagination}
            onPageChange={setPage}
          />
        )}
      </section>
    </>
  );
};

export default SearchResultsComponents;
