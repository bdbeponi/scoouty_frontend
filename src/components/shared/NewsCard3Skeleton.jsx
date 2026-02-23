"use client";

import React from "react";

const NewsCard3Skeleton = () => {
  return (
    <div className="grid grid-cols-3 bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative h-full w-full aspect-[3/2] bg-gray-200 overflow-hidden">
        <div className="absolute top-3 left-3">
          <div className="bg-gray-300 text-xs px-3 py-1 rounded-full w-16 h-6"></div>
        </div>
      </div>

      {/* Text Section skeleton */}
      <div className="px-3 py-2 col-span-2">
        {/* Date + Author skeleton */}
        <div className="flex items-center gap-4 text-xs mb-1">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <div className="bg-gray-300 w-20 h-4 rounded"></div>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <div className="bg-gray-300 w-16 h-4 rounded"></div>
          </div>
        </div>

        {/* Title skeleton */}
        <div className="space-y-1 mb-1">
          <div className="bg-gray-300 h-4 rounded w-full"></div>
          <div className="bg-gray-300 h-4 rounded w-4/5"></div>
        </div>

        {/* Excerpt skeleton */}
        <div className="space-y-1">
          <div className="bg-gray-200 h-3 rounded w-full"></div>
          <div className="bg-gray-200 h-3 rounded w-5/6"></div>
          <div className="bg-gray-200 h-3 rounded w-4/6"></div>
        </div>

        {/* Read More skeleton */}
        <div className="bg-gray-300 w-20 h-4 rounded mt-1.5"></div>
      </div>
    </div>
  );
};

export default NewsCard3Skeleton;
