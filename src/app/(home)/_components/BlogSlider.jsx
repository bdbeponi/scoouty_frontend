"use client";

import React, { useRef, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/navigation";

import { fadeIn } from "@/utils/motion";
import { motion } from "framer-motion";
import BlogCard from "@/components/shared/BlogCard";

const BlogSlider = ({ blogs }) => {
  const swiperRef = useRef(null);
  const [isBeginning, setBeginning] = useState(true);
  const [isEnd, setEnd] = useState(false);

  return (
    <motion.div
      variants={fadeIn("fade", 0.2)}
      initial="hidden"
      viewport={{ once: true }}
      animate="show"
      className="relative"
    >
      <Swiper
        style={{ padding: "20px 12px" }}
        modules={[Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setBeginning(swiper.isBeginning);
          setEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setBeginning(swiper.isBeginning);
          setEnd(swiper.isEnd);
        }}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {blogs?.map((car, index) => (
          <SwiperSlide key={car.id}>
            {blogs?.slice(0, 5)?.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* LEFT ARROW */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isBeginning}
        aria-label="Previous blog"
        title="Show previous blog"
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 size-10 flex items-center justify-center
          rounded-full bg-secondary border border-white transition-all text-white
          ${isBeginning ? "opacity-30 cursor-not-allowed" : "hover:bg-primary"}`}
      >
        <HiChevronLeft size={22} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
        aria-label="Next blog"
        title="Show Next blog"
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 size-10 flex items-center justify-center
          rounded-full bg-secondary border border-white transition-all text-white
          ${isEnd ? "opacity-30 cursor-not-allowed" : "hover:bg-primary"}`}
      >
        <HiChevronRight size={22} />
      </button>
    </motion.div>
  );
};

export default BlogSlider;
