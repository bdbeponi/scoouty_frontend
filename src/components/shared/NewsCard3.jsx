"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { baseUriBackend } from "@/redux/url/url";

const NewsCard3 = ({ news, index }) => {
  const { id, slug, image, title, author, date, tag, excerpt } = news || {};

  return (
    <Link href={`/news/${slug}`}>
      <motion.div
        variants={fadeIn("fade", 0.1 * (index + 0.5))}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-full w-full aspect-[3/2] overflow-hidden">
          <Image
            src={`${baseUriBackend}${image}`}
            alt={title}
            width={600}
            height={600}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Tag */}
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-md">
            {tag}
          </span>
        </div>

        {/* Text Section */}
        <div className="px-3 py-2 col-span-2">
          {/* Date + Author */}
          <div className="flex items-center gap-4 text-[10px] md:text-xs text-gray-500 mb-1">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-primary" />
              {date}
            </span>

            {/* <span className="hidden sm:flex items-center gap-1">
              <FaUser className="text-primary" />
              {author}
            </span> */}
          </div>

          {/* Title */}

          <h2 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h2>

          <p className="text-gray-600 text-xs md:text-sm mt-1 line-clamp-2">
            {excerpt}
          </p>

          {/* Read More */}
          <Link
            href={`/news/${id}`}
            className="text-primary text-xs md:text-sm font-semibold mt-1.5 inline-block hover:underline"
          >
            Read More →
          </Link>
        </div>
      </motion.div>
    </Link>
  );
};

export default NewsCard3;
