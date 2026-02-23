"use client";

import React, { useRef, useState, useEffect } from "react";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules"; // Add Grid module
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid"; // Add Grid CSS

import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";

const ProductSlider = ({ products = [], isLoading }) => {
  const swiperRef = useRef(null);
  const [isBeginning, setBeginning] = useState(true);
  const [isEnd, setEnd] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Add this useEffect to fix arrow visibility issue
  useEffect(() => {
    setIsMounted(true);

    // Update swiper on mount to fix initial arrow states
    const updateNavigation = () => {
      if (swiperRef.current) {
        swiperRef.current.update();
        setBeginning(swiperRef.current.isBeginning);
        setEnd(swiperRef.current.isEnd);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateNavigation, 100);
    return () => clearTimeout(timer);
  }, [products, isLoading]);

  return (
    <motion.div
      variants={fadeIn("fade", 0.2)}
      initial="hidden"
      viewport={{ once: true }}
      animate="show"
      className="relative"
    >
      <Swiper
        style={{ padding: "20px 0px" }}
        modules={[Navigation, Grid]} // Add Grid module
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setBeginning(swiper.isBeginning);
          setEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setBeginning(swiper.isBeginning);
          setEnd(swiper.isEnd);
        }}
        onAfterInit={(swiper) => {
          // Add this callback
          setBeginning(swiper.isBeginning);
          setEnd(swiper.isEnd);
        }}
        grid={{
          rows: 2, // Set 2 rows
          fill: "row", // Fill rows first
        }}
        spaceBetween={12}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
            grid: { rows: 2 },
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
            grid: { rows: 2 },
          },
        }}
      >
        {isLoading
          ? Array.from({ length: 8 }).map(
              (
                _,
                index, // Change to 8 for 2 rows
              ) => (
                <SwiperSlide key={index}>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ),
            )
          : products.map((car, index) => (
              <SwiperSlide key={car.id}>
                <ProductCard car={car} index={index} />
              </SwiperSlide>
            ))}
      </Swiper>

      {/* LEFT ARROW - Updated styling for better visibility */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isBeginning || isLoading || !isMounted}
        aria-label="Previous slide"
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 size-10 flex items-center justify-center
        rounded-full bg-secondary border-2 border-white transition-all text-white shadow-lg
        ${isBeginning ? "opacity-30 cursor-not-allowed" : "hover:bg-primary hover:scale-110"}`}
      >
        <HiChevronLeft size={22} />
      </button>

      {/* RIGHT ARROW - Updated styling for better visibility */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd || isLoading || !isMounted}
        aria-label="Next slide"
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 size-10 flex items-center justify-center
        rounded-full bg-secondary border-2 border-white transition-all text-white shadow-lg
        ${isEnd ? "opacity-30 cursor-not-allowed" : "hover:bg-primary hover:scale-110"}`}
      >
        <HiChevronRight size={22} />
      </button>
    </motion.div>
  );
};

export default ProductSlider;
