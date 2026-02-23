"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaUser } from "react-icons/fa";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import { baseUriBackend } from "@/redux/url/url";

const NewsCard = ({ news, index }) => {
  const { id, slug, image, title, author, date, tag, excerpt } = news || {};

  return (
    <motion.div
      variants={fadeIn("fade", 0.1 * (index + 0.5))}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
    >
      <Link href={`/news/${slug}`}>
        {/* Image */}
        <div className="relative w-full aspect-[3/2] overflow-hidden">
          <Image
            src={`${baseUriBackend}${image}`}
            alt={title}
            width={600}
            height={400}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Tag */}
          <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full shadow-md">
            {tag}
          </span>
        </div>

        {/* Text Section */}
        <div className="px-3 py-2">
          {/* Date + Author */}
          <div className="flex items-center gap-4 text-[10px] md:text-xs text-gray-500 mb-2">
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
          <h2 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 text-xs md:text-sm mt-2 line-clamp-3">
            {excerpt}
          </p>

          {/* Read More */}
          <p className="text-primary text-xs md:text-sm font-semibold mt-3 inline-block hover:underline">
            Read More →
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default NewsCard;
