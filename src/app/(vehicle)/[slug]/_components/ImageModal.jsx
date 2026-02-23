"use client";

import React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

const ImageModal = ({
  showImageModal,
  setShowImageModal,
  currentImageIndex,
  setCurrentImageIndex,
  carImages,
  prevImage,
  nextImage,
}) => {
  if (!showImageModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[80vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
            <p className="text-sm text-gray-600 mt-1">
              {currentImageIndex + 1} of {carImages.length} photos
            </p>
          </div>
          <button
            onClick={() => setShowImageModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content - Main Image */}
        <div className="p-6 flex items-center justify-center bg-gray-50">
          <div className="relative w-full max-h-[50vh] flex items-center justify-center">
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <Image
              src={carImages[currentImageIndex]}
              alt="Car"
              width={800}
              height={600}
              className="max-w-full max-h-[50vh] object-contain rounded-lg"
            />
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {carImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                  idx === currentImageIndex
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <footer className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Use arrow keys or click on thumbnails to navigate
          </div>
          <button
            onClick={() => setShowImageModal(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Close Gallery
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ImageModal;
