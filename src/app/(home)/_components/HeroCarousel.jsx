"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import ButtonPrimary from "@/components/custom/ButtonPrimary";

import { useGetListSlidersLeftApiQuery } from "@/redux/features/sliderApi";
import { baseUriBackend } from "@/redux/url/url";
import HomeCarouselSkeleton from "./HomeCarouselSkeleton";
import SearchBar from "./SearchBar";

const HomeCarousel = () => {
  const { data: sliders, isLoading } = useGetListSlidersLeftApiQuery({
    page: 1,
    limit: 100,
  });

  console.log("Sliders Data:", sliders);

  if (isLoading) return <HomeCarouselSkeleton />;

  const scootySlide = sliders?.data?.sliders?.find(
    (item) => item.side === "left",
  );

  if (!scootySlide) return null;

  const image = `${baseUriBackend}${scootySlide.image}`;

  return (
    <section className="relative w-full min-h-[520px] min-h-lg:h-[560px] overflow-hidden py-10 lg:pt-20">
      {/* Background Image */}
      <Image
        src={image}
        alt="Scooty Banner"
        fill
        priority
        quality={80}
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto h-full space-y-10 lg:space-y-0 lg:flex items-center justify-center px-4 gap-8">
        <div className="w-full text-white text-center lg:text-left">
          <motion.h1
            variants={fadeIn("fade", 0.1)}
            initial="hidden"
            animate="show"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
          >
            Find Your Perfect
            <br />
            <span className="text-ternary">Scooty Today</span>
          </motion.h1>

          <motion.p
            variants={fadeIn("fade", 0.2)}
            initial="hidden"
            animate="show"
            className="mt-4 text-sm sm:text-base text-gray-200"
          >
            Welcome to{" "}
            <span className="text-ternary font-semibold">Scooty Lelo</span> —
            Bangladesh’s trusted scooty marketplace. Compare brands, explore
            features, and ride smart with{" "}
            <span className="text-ternary font-semibold">scootylelo.com</span>
          </motion.p>

          <motion.div
            variants={fadeIn("fade", 0.3)}
            initial="hidden"
            animate="show"
            className="mt-6 flex gap-4 justify-center lg:justify-start"
          >
            <ButtonPrimary text="Explore Scooties" href="/scooty" />
          </motion.div>
        </div>

        <SearchBar />
      </div>
    </section>
  );
};

export default HomeCarousel;
