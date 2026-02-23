"use client";

import React from "react";
import Image from "next/image";
import ButtonPrimarySmall from "../custom/ButtonPrimarySmall";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import Link from "next/link";

const ProductCard = ({ car = {}, index }) => {
  const { slug, name, brand, image, price, isPopular, isNew } = car;

  // Price formatting
  const formatPrice = (value) => {
    if (!value) return "";
    if (typeof value === "string" && value.includes("-")) {
      const [min, max] = value.split("-").map((v) => Number(v.trim()));
      return `${formatPrice(min)} – ${formatPrice(max)}`;
    }
    const num = Number(value);
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <motion.div
      variants={fadeIn("fade", 0.1 * (index + 0.5))}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-white rounded-sm lg:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden group"
    >
      {/* Entire card is clickable */}
      <Link href={`/${slug}`} className="block relative">
        {/* IMAGE */}
        <div className="relative w-full aspect-4/3 overflow-hidden rounded-t-sm lg:rounded-t-2xl">
          <Image
            src={image}
            alt={`${brand} ${name}`}
            width={400}
            height={300}
            loading="lazy"
            itemProp="image"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex justify-between gap-2">
            {isPopular && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[9px] font-semibold px-3 py-1 rounded-full shadow-md">
                Popular
              </span>
            )}
            {isNew && (
              <span className="bg-gradient-to-r from-green-400 to-teal-500 text-white text-[9px] font-semibold px-3 py-1 rounded-full shadow-md">
                New
              </span>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-2 lg:p-3">
          {brand && (
            <span
              className="text-[10px] uppercase font-semibold tracking-wider text-gray-600 bg-gray-100 px-2 py-1 rounded-lg inline-block mb-2"
              itemProp="brand"
            >
              {brand}
            </span>
          )}

          <h5
            className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 mb-2"
            itemProp="name"
          >
            {name}
          </h5>

          <div className="border-t border-gray-200 my-2"></div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-[9px] md:text-xs">
                Starting From
              </p>
              <p
                className="text-gray-900 font-bold text-sm md:text-base"
                itemProp="price"
              >
                ₹{formatPrice(price)}
              </p>
            </div>

            {/* Plain button, no <a> inside <a> */}
            <ButtonPrimarySmall text="View Details" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
