import Container from "@/components/custom/Container";
import InfoSection from "../_components/InfoSection";
import BrandsSection from "../_components/BrandsSection";

const FeaturedBrands = () => {
  // Section Info
  const info = {
    title: "Brands",
    sub_title: "Find your perfect brands",
    link: "/brand",
  };

  return (
    <Container className="px-4 pt-10 pb-4">
      <InfoSection info={info} />
      <BrandsSection />
    </Container>
  );
};

export default FeaturedBrands;
