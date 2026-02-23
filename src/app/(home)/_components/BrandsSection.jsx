"use client";

import { useState } from "react";
import BrandCard from "@/components/shared/BrandCard";
import { useGetListBrandsQuery } from "@/redux/features/brandApi";
import { baseUriBackend } from "@/redux/url/url";

const BrandsSection = () => {
  const initialMobile = 8;
  const initialDesktop = 18;

  const { data: brandData, isLoading: Loading } = useGetListBrandsQuery({
    page: 1,
    limit: 60,
  });

  // Transform API data to match expected format
  const brands = (brandData?.data?.brands || []).map((brand) => ({
    name: brand.name,
    logo: brand.image ? `${baseUriBackend}${brand.image}` : "/placeholder.png",
    slug: brand.slug,
    _id: brand._id,
  }));

  const [mobileVisible, setMobileVisible] = useState(initialMobile);
  const [desktopVisible, setDesktopVisible] = useState(initialDesktop);

  const isMobileExpanded = mobileVisible >= brands.length;
  const isDesktopExpanded = desktopVisible >= brands.length;

  const toggleMobile = () => {
    setMobileVisible(isMobileExpanded ? initialMobile : brands.length);
  };

  const toggleDesktop = () => {
    setDesktopVisible(isDesktopExpanded ? initialDesktop : brands.length);
  };

  return (
    <div className="rounded-xl overflow-hidden py-4">
      {/* Mobile & Tablet */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:hidden gap-3 py-5">
        {brands.slice(0, mobileVisible).map((brand, index) => (
          <BrandCard brand={brand} key={brand._id || index} />
        ))}
      </div>

      {brands.length > initialMobile && (
        <div className="flex justify-center lg:hidden mt-4">
          <button
            onClick={toggleMobile}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isMobileExpanded ? "View Less Brands" : "View More Brands"}
          </button>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-4">
        {brands.slice(0, desktopVisible).map((brand, index) => (
          <BrandCard brand={brand} key={brand._id || index} />
        ))}
      </div>

      {brands.length > initialDesktop && (
        <div className="hidden lg:flex justify-center mt-4">
          <button
            onClick={toggleDesktop}
            className="inline-block px-8 py-3 rounded-full border border-gray-300 text-gray-800 font-medium hover:bg-red-600 hover:text-white transition"
          >
            {isDesktopExpanded ? "View Less Brands" : "View More Brands"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandsSection;
