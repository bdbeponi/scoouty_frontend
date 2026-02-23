"use client";

import Container from "@/components/custom/Container";
import InfoSection from "../_components/InfoSection";
import ProductSlider from "../_components/ProductSlider";

import { useGetCardListProductsApiQuery } from "@/redux/features/productApi";
import { baseUriBackend } from "@/redux/url/url";

const Upcoming = () => {
  const info = {
    title: "Upcoming Scooters",
    sub_title: "Upcoming Scooters, Find your perfect scooter",
    link: "/scooters",
  };

  const { data: product, isLoading } = useGetCardListProductsApiQuery({
    limit: 20,
    topSelling: "yes",
  });

  const normalizedProducts = (product?.data?.products || []).map((item) => ({
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
    <Container className="p-4">
      <InfoSection info={info} />
      <ProductSlider products={normalizedProducts} isLoading={isLoading} />
    </Container>
  );
};

export default Upcoming;
