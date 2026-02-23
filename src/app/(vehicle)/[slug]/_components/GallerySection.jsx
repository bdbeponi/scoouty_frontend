"use client";

import React from "react";
import Image from "next/image";

const GallerySection = ({
  setCurrentImageIndex,
  setShowImageModal,
  galleryImages = [],
}) => {
  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  return (
    <section id="gallery" className="scroll-mt-20">
      <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 lg:p-8">
        <h3 className="car_h3 font-bold text-gray-900 mb-6">Photo Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentImageIndex(idx);
                setShowImageModal(true);
              }}
              className="aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 hover:border-blue-600 transition group"
            >
              <Image
                src={img}
                alt={`Gallery ${idx + 1}`}
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
