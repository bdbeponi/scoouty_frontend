"use client";

import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

const ColorModal = ({
  showColorModal,
  setShowColorModal,
  selectedColor,
  setSelectedColor,
  modalImageIndex,
  setModalImageIndex,
  variations,
  baseUriBackend,
}) => {
  if (!showColorModal || !variations || variations.length === 0) return null;

  const selectedVariation = variations[selectedColor] || {};
  const selectedColorData = selectedVariation.color || {};
  const images = selectedVariation.images || [];

  const colorName = selectedColorData?.name_en || `Color ${selectedColor + 1}`;
  const colorCode = selectedColorData?.color_code || "#000000";

  const nextColorImage = () => {
    if (images.length > 0) {
      setModalImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevColorImage = () => {
    if (images.length > 0) {
      setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Get current image URL
  const currentImage = images[modalImageIndex]
    ? `${baseUriBackend}${images[modalImageIndex]}`
    : null;

  return (
    <div
      className="fixed bottom-0 lg:inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Color gallery"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[70vh] lg:max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
          <div>
            <h5 className="car_h5 font-bold text-gray-900">
              {colorName} - Color Gallery
            </h5>
            {images.length > 0 && (
              <p className="text-sm text-gray-600 mt-0.5 lg:mt-1">
                {modalImageIndex + 1} of {images.length} photos
              </p>
            )}
          </div>
          <button
            onClick={() => setShowColorModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content - Main Image */}
        <div className="p-4 flex items-center justify-center bg-gray-50">
          <div className="relative w-full max-h-[50vh] flex items-center justify-center">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={colorName}
                width={800}
                height={600}
                className="max-w-full max-h-[40vh] object-contain rounded-lg"
              />
            ) : (
              <div
                className="w-full h-[300px] rounded-lg flex items-center justify-center"
                style={{ backgroundColor: colorCode }}
              >
                <span className="text-white text-2xl font-bold">
                  {colorName}
                </span>
              </div>
            )}

            {/* Navigation buttons for images */}
            {images.length > 1 && currentImage && (
              <>
                <button
                  onClick={prevColorImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button
                  onClick={nextColorImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>

        {/* Color Selector */}
        <div className="p-2 border-b border-gray-200 bg-gray-50">
          <div className="flex gap-1 md:gap-3 overflow-x-auto justify-center px-4">
            {variations.map((variation, idx) => {
              const color = variation.color || {};
              const colorName = color.name_en || `Color ${idx + 1}`;
              const colorCode = color.color_code || "#000000";

              return (
                <button
                  key={variation._id || idx}
                  onClick={() => {
                    setSelectedColor(idx);
                    setModalImageIndex(0);
                  }}
                  className={`flex flex-col items-center gap-1 md:gap-2 p-1 md:p-2 rounded-lg transition flex-shrink-0 ${
                    selectedColor === idx
                      ? "bg-blue-50 border-2 border-blue-200"
                      : "hover:bg-gray-100 border-2 border-transparent"
                  }`}
                >
                  <div
                    className="size-5 md:size-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: colorCode }}
                  />
                  <span className="car_p font-medium text-gray-700 text-sm">
                    {colorName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorModal;
