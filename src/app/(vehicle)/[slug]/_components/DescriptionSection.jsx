"use client";

import RichTextDisplay from "@/components/custom/RichTextDisplay";
import React, { useState } from "react";

const DescriptionSection = ({ description }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  if (!description || description.trim() === "") {
    return (
      <section id="description" className="scroll-mt-20">
        <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 lg:p-8 mb-8">
          <h3 className="car_h3 font-bold text-gray-900 mb-2 md:mb-6 text-center">
            About This Scooters
          </h3>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-gray-500 italic text-center py-4">
              No description available for this vehicle.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="description" className="scroll-mt-20">
      <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 lg:p-8 mb-8">
        <h3 className="car_h3 font-bold text-gray-900 mb-2 md:mb-6 text-center">
          About This Scooters
        </h3>

        {/* Content with conditional height */}
        <div
          className={`relative overflow-hidden transition-all duration-300 ${
            !showFullContent ? "max-h-[400px]" : "max-h-[5000px]"
          }`}
        >
          <RichTextDisplay value={description} />

          {/* Gradient overlay when collapsed */}
          {!showFullContent && (
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
          )}
        </div>

        <div className="flex justify-center">
          {/* Show More/Less Link */}
          {!showFullContent ? (
            <button
              onClick={() => setShowFullContent(true)}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
            >
              Read More →
            </button>
          ) : (
            <button
              onClick={() => setShowFullContent(false)}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline"
            >
              Show Less ↑
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
