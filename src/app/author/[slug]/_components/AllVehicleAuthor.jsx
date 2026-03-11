"use client";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";
import { useGetCardListProductsApiQuery } from "@/redux/features/productApi";
import { baseUriBackend } from "@/redux/url/url";

const AllVehicleAuthor = ({ createBy }) => {
  const { data: product, isLoading } = useGetCardListProductsApiQuery({
    limit: 20,
    createBy,
  });

  const { data: category } = useGetAllCategoryQuery();

  const products = (product?.data?.products || []).map((item) => ({
    id: item.id || item._id,
    name: item.name || item.productName_en || "Unnamed Product",
    brand: item.brand || "",
    image: `${baseUriBackend}${item.image}`,
    rating: item.rating || 4.5,
    price: item.price || 0,
    isPopular: item.isPopular,
    isNew: item.isNew,
    slug: item.slug,
  }));

  return (
    <>
      <section className="container max-w-[1200px] mx-auto py-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            // Show 8 skeleton cards while loading
            Array.from({ length: 3 }).map((_, index) => (
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
      </section>
    </>
  );
};

export default AllVehicleAuthor;
