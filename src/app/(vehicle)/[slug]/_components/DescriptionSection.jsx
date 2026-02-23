"use client";

import RichTextDisplay from "@/components/custom/RichTextDisplay";
import React from "react";

const DescriptionSection = ({ description }) => {
  if (!description || description.trim() === "") {
    return (
      <section id="description" className="scroll-mt-20">
        <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 lg:p-8 mb-8">
          <h3 className="car_h3 font-bold text-gray-900 mb-2 md:mb-6 text-center">
            About This Car
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
    <section id="description" className="scroll-mt-20 ">
      {/* <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 lg:p-8 mb-8">
        <RichTextDisplay value={description} />
      </div> */}

      {description ? (
        <div className="rich-text-content">
          <RichTextDisplay value={description} />
        </div>
      ) : (
        <div className="text-gray-500 italic text-center py-8">
          No detailed content available for this blog.
        </div>
      )}
    </section>
  );
};

export default DescriptionSection;
