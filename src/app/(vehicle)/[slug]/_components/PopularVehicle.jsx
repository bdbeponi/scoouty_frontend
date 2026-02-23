"use client";

import ProductSlider from "@/app/(home)/_components/ProductSlider";
import { useGetCardListProductsApiQuery } from "@/redux/features/productApi";
import { baseUriBackend } from "@/redux/url/url";

const PopularVehicle = ({ categoryId }) => {
  const { data: product, isLoading } = useGetCardListProductsApiQuery({
    limit: 10,
    category: categoryId,
    topSelling: "yes",
  });

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
    <section id="popular" className="scroll-mt-20">
      <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 lg:p-8 mt-8">
        <h3 className="car_h3 text-gray-900 mb-2">Popular Vehicle</h3>
        <ProductSlider products={products} />
      </div>
    </section>
  );
};

export default PopularVehicle;
