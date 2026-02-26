"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const FeatureImageSection = ({ featureImages = [] }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const scrollContainerRef = useRef(null);

  if (!featureImages || featureImages.length === 0) {
    return null;
  }

  console.log(featureImages, "featureImages");

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width

      if (direction === "next") {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  return (
    <>
      <section id="feature-images" className="scroll-mt-20 mb-6 md:mb-8">
        <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 lg:p-8">
          <h3 className="car_h3 font-bold text-gray-900 mb-6">
            Feature Images
          </h3>

          {/* Slider Container */}
          <div className="relative group">
            {/* Images Container - Shows 2.5 images */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-xl hide-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {featureImages.map((img, idx) => (
                <div
                  key={idx}
                  className="snap-start flex-shrink-0 px-1 first:pl-0 last:pr-0 cursor-pointer"
                  style={{ width: "40%" }} // Each image takes 40% of container = 2.5 images visible
                  onClick={() => openModal(idx)}
                >
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-xl overflow-hidden group/image">
                    <Image
                      src={img}
                      alt={`Feature ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover/image:scale-105"
                      sizes="(max-width: 768px) 40vw, (max-width: 1200px) 40vw, 500px"
                    />
                    {/* Optional overlay hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 text-sm font-medium">
                        Click to view full
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {featureImages.length > 2 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={() => scroll("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
                  aria-label="Previous images"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Button */}
                <button
                  onClick={() => scroll("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
                  aria-label="Next images"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Simple dot indicators */}
          {featureImages.length > 2 && (
            <div className="flex justify-center gap-2 mt-4">
              {featureImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (scrollContainerRef.current) {
                      const container = scrollContainerRef.current;
                      const imageWidth = container.clientWidth * 0.4;
                      container.scrollTo({
                        left: idx * imageWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    idx === 0 ? "bg-blue-600 w-4" : "bg-gray-300"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>

      {/* Modal for full image view */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
          >
            <Image
              src={featureImages[selectedImageIndex]}
              alt={`Feature ${selectedImageIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              quality={100}
            />
          </div>

          {/* Image counter in modal */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {selectedImageIndex + 1} / {featureImages.length}
          </div>
        </div>
      )}
    </>
  );
};

export default FeatureImageSection;
