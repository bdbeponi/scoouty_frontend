import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      {/* IMAGE SKELETON */}
      <div className="w-full aspect-3/2 bg-gray-400"></div>

      {/* CONTENT */}
      <div className="p-2 lg:px-3 lg:py-2 space-y-2">
        {/* BRAND */}
        <div className="h-3 w-16 bg-gray-400 rounded"></div>

        {/* TITLE */}
        <div className="h-4 w-full bg-gray-400 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-400 rounded"></div>

        <div className="border-t border-gray-400 my-2"></div>

        {/* PRICE + BUTTON */}
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="h-2 w-16 bg-gray-400 rounded"></div>
            <div className="h-4 w-20 bg-gray-400 rounded"></div>
          </div>

          <div className="h-8 w-24 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
