"use client";

import { useParams } from "next/navigation";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { useGetAllBrandsQuery } from "@/redux/features/brandApi";
import { useGetCardListProductsApiQuery } from "@/redux/features/productApi";
import { baseUriBackend } from "@/redux/url/url";
import { skipToken } from "@reduxjs/toolkit/query";

const BrandSlug = () => {
  const { slug } = useParams();

  /* ------------------ GET ALL BRANDS ------------------ */
  const { data: brandsData, isLoading: brandLoading } = useGetAllBrandsQuery();

  const brands = brandsData?.data || [];

  /* ------------------ FIND BRAND BY SLUG ------------------ */
  const brand = brands.find((item) => item.slug === slug);

  /* ------------------ FETCH PRODUCTS BY BRAND ID ------------------ */
  const { data: productData, isLoading: productLoading } =
    useGetCardListProductsApiQuery(
      brand
        ? {
            page: 1,
            limit: 20,
            brand: brand._id,
          }
        : skipToken,
    );

  /* ------------------ STATIC BANNER IMAGE ------------------ */
  const bannerImage = "/scooters/s1.jpg"; // static image

  /* ------------------ MAP PRODUCTS ------------------ */
  const products = (productData?.data?.products || []).map((item) => ({
    id: item.id || item._id,
    name: item.name,
    brand: item.brand,
    image: item.image ? `${baseUriBackend}${item.image}` : "/placeholder.png",
    price: item.price,
    slug: item.slug,
    rating: item.rating || 4.5,
  }));

  /* ------------------ LOADING & ERROR ------------------ */
  if (brandLoading) {
    return null;
  }

  if (!brand) {
    return (
      <div className="text-center py-20 text-gray-500">Brand not found</div>
    );
  }

  return (
    <>
      {/* ===================== BANNER ===================== */}
      <section
        className="relative h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-2">
            {brand.name}
          </h1>
          <p className="text-lg opacity-90">
            Explore all {brand.name} products
          </p>
        </div>
      </section>

      {/* ===================== PRODUCTS ===================== */}
      <section className="container max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : products.length ? (
            products.map((item, index) => (
              <ProductCard key={item.id} car={item} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No products found for this brand
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BrandSlug;
