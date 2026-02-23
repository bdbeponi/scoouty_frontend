"use client";

import { useState } from "react";
import BrandCard from "@/components/shared/BrandCard";
import { useGetListBrandsQuery } from "@/redux/features/brandApi";
import { baseUriBackend } from "@/redux/url/url";

const BrandPage = () => {
  const defaultLimit = 24;
  const increment = 12;

  // Fetch brands (all for now)
  const { data: brandData, isLoading } = useGetListBrandsQuery({
    page: 1,
    limit: 100,
  });

  const brands = (brandData?.data?.brands || []).map((brand) => ({
    name: brand.name,
    logo: brand.image ? `${baseUriBackend}${brand.image}` : "/placeholder.png",
    slug: brand.slug,
    _id: brand._id,
  }));

  // Visible limit state
  const [visibleLimit, setVisibleLimit] = useState(defaultLimit);

  const handleShowMore = () =>
    setVisibleLimit((prev) => Math.min(prev + increment, brands.length));

  const handleShowLess = () =>
    setVisibleLimit((prev) => Math.max(prev - increment, defaultLimit));

  // Banner image (first brand logo or default)
  const bannerImage = "/placeholder.jpg";

  return (
    <div>
      {/* Banner Section */}
      <section
        className="relative h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <h1 className="relative z-10 text-white font-bold text-3xl md:text-4xl lg:text-5xl">
          Brands
        </h1>
      </section>

      {/* Brands Grid */}
      <div className="container mx-auto px-4 py-10">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: defaultLimit }).map((_, index) => (
              <div
                key={index}
                className="h-[120px] bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {brands.slice(0, visibleLimit).map((brand, index) => (
                <BrandCard brand={brand} key={brand._id || index} />
              ))}
            </div>

            {/* Show More / Show Less */}
            {brands.length > defaultLimit && (
              <div className="flex justify-center gap-4 mt-8">
                {visibleLimit < brands.length && (
                  <button
                    onClick={handleShowMore}
                    className="inline-block px-8 py-3 rounded-full border border-gray-300 text-gray-800 font-medium hover:bg-secondary hover:text-white transition"
                  >
                    Show More
                  </button>
                )}
                {visibleLimit > defaultLimit && (
                  <button
                    onClick={handleShowLess}
                    className="inline-block px-8 py-3 rounded-full border border-gray-300 text-gray-800 font-medium hover:bg-primary hover:text-white transition"
                  >
                    Show Less
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrandPage;
