"use client";

import React from "react";
import Image from "next/image";

const ColorsSection = ({
  variations,
  baseUriBackend,
  setSelectedColor,
  setShowColorModal,
  setModalImageIndex,
}) => {
  // If no variations available, don't render the section
  if (!variations || variations.length === 0) {
    return null;
  }

  return (
    <section id="colors" className="scroll-mt-20">
      <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 lg:p-8 my-8">
        <h3 className="car_h3 font-bold text-gray-900 mb-6">
          Available Colors
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {variations.map((variation, idx) => {
            const color = variation.color;
            const images = variation.images || [];
            const firstImage =
              images.length > 0 ? `${baseUriBackend}${images[0]}` : null;
            const colorName = color?.name_en || `Color ${idx + 1}`;
            const colorCode = color?.color_code || "#000000";
            const colorCode2 = color?.color_code2 || null;

            return (
              <button
                key={variation._id || idx}
                onClick={() => {
                  setSelectedColor(idx);
                  setShowColorModal(true);
                  setModalImageIndex(0);
                }}
                className="group"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 border-2 border-gray-200 group-hover:border-blue-600 transition">
                  {firstImage ? (
                    <Image
                      src={firstImage}
                      alt={colorName}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: colorCode }}
                    >
                      <span className="text-white font-semibold text-sm">
                        {colorName}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 overflow-hidden flex">
                    {colorCode2 ? (
                      <>
                        <div
                          className="w-1/2 h-full"
                          style={{ backgroundColor: colorCode }}
                        />
                        <div
                          className="w-1/2 h-full"
                          style={{ backgroundColor: colorCode2 }}
                        />
                      </>
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: colorCode }}
                      />
                    )}
                  </div>

                  <span className="font-medium text-gray-700 text-sm">
                    {colorName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ColorsSection;
