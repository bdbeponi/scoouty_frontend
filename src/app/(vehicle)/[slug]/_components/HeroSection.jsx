"use client";

import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
  CreditCard,
  Tag,
  Car,
} from "lucide-react";
import Image from "next/image";
import { baseUriBackend } from "@/redux/url/url";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaCreditCard,
  FaRoad,
  FaRupeeSign,
  FaShoppingCart,
} from "react-icons/fa";

const HeroSection = ({
  galleryImages,
  currentImageIndex,
  setCurrentImageIndex,
  setShowImageModal,
  nextImage,
  prevImage,
  product,
  isLoading,
}) => {
  const [showSingleImageModal, setShowSingleImageModal] = useState(false);

  /* ================= IMAGE ZOOM STATE (ONLY ADDITION) ================= */
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);
  /* ==================================================================== */

  // Format currency values
  const formatPrice = (price) => {
    if (!price) return null;
    const numPrice = parseInt(price);
    if (isNaN(numPrice)) return price;
    return `₹ ${numPrice.toLocaleString()}`;
  };

  // Format EMI available
  const formatEMI = (value) => {
    if (value === "yes") return "Available";
    if (value === "no") return "Not Available";
    return value || "N/A";
  };

  const formatDate = (dateString, timeString = null) => {
    if (!dateString) return "Date not available";
    try {
      const [year, month, day] = dateString.split("-").map(Number);
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const formattedDate = `${day} ${monthNames[month - 1]} ${year}`;

      if (timeString) {
        const [h, m] = timeString.split(":").map(Number);
        const hours = h % 12 || 12;
        const ampm = h >= 12 ? "PM" : "AM";
        return `${formattedDate} , ${hours}:${m
          .toString()
          .padStart(2, "0")} ${ampm}`;
      }

      if (product?.createdAt) {
        const d = new Date(product.createdAt);
        let h = d.getHours();
        const m = d.getMinutes().toString().padStart(2, "0");
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        return `${formattedDate} , ${h}:${m} ${ampm}`;
      }

      return `${formattedDate} , 12:00 PM`;
    } catch {
      return "Date not available";
    }
  };

  if (isLoading || !product) {
    return (
      <section id="hero-section">
        <div className="bg-white rounded-xl md:border md:border-gray-300 overflow-hidden mb-8 p-8">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[4/3] bg-gray-200 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero-section">
      <div className="bg-white rounded-xl md:border md:border-gray-300 md:hover:shadow-md overflow-hidden mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 lg:p-8">
          {/* LEFT SIDE */}
          <div>
            {/* MAIN IMAGE WITH CUSTOM ZOOM */}
            <div
              ref={imageRef}
              className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mb-4 cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => setShowSingleImageModal(true)}
            >
              {galleryImages.length > 0 && (
                <>
                  <Image
                    src={galleryImages[currentImageIndex]}
                    alt={product.productName_en || "Car"}
                    width={400}
                    height={300}
                    priority
                    className="w-full h-full object-cover"
                  />

                  {/* ZOOM OVERLAY */}
                  {isZoomed && (
                    <div
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundImage: `url(${galleryImages[currentImageIndex]})`,
                        backgroundSize: "200%",
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-20"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg z-20"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`size-14 md:size-20 border-2 rounded-lg overflow-hidden ${
                    idx === currentImageIndex
                      ? "border-secondary"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE - UPDATED WITH PRICING SECTION */}
          <div className="space-y-6">
            <h2 className="car_h2 mb-2">{product.productName_en}</h2>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-2">
                <Image
                  src={`${baseUriBackend}${product?.createBy?.image}`}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <Link
                  href={`/author/${product?.createBy?.userName}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {product?.createBy?.fullName}
                </Link>
              </span>

              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                {formatDate(product?.post_date)}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.shortDescription_en}</p>

            {/* PRICING SECTION */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* On-Road Price */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                      <FaRoad className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">On Road Price</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(product.onRoadPrice) || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* EMI Available */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <FaCreditCard className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">EMI Available</p>
                      <p
                        className={`text-lg font-bold ${product.emiAvailable === "yes" ? "text-green-600" : "text-gray-900"}`}
                      >
                        {formatEMI(product.emiAvailable)}
                      </p>
                      {product.emiRange && (
                        <p className="text-xs text-gray-500 mt-1">
                          {product.emiRange}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Discount Badge if Sale Price exists */}
              {product.salePrice && product.regularPrice && (
                <div className="mt-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="text-red-600" size={20} />
                      <span className="font-medium text-gray-900">
                        You Save
                      </span>
                    </div>
                    <span className="text-xl font-bold text-red-600">
                      ₹{" "}
                      {(
                        parseInt(product.regularPrice) -
                        parseInt(product.salePrice)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Ex-Showroom Price */}
            <div className="bg-gradient-to-r from-secondary/10 to-indigo-50 p-5 rounded-xl mt-6">
              <p className="text-sm text-gray-600 mb-2">Ex-Showroom Price</p>
              <div className="flex items-center justify-between">
                <h3 className="car_h3">
                  {formatPrice(product.salePrice || product.regularPrice)}
                </h3>
                <button className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium">
                  Check Availability
                </button>
              </div>
            </div>

            {/* Showroom Info */}
            <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <MapPin className="text-secondary mt-1" />
              <div>
                <p className="font-medium text-gray-900">
                  Available at Premium Showroom
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Visit our nearest showroom for test drive
                </p>
              </div>
            </div>

            {product.brochure && (
              <div className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg mt-2 hover:bg-gray-50">
                {product?.brochure ? (
                  <a
                    href={`${baseUriBackend}${product.brochure}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full transition-colors"
                  >
                    <span className="text-secondary">📄</span>
                    <span className="font-medium">Download Brochure</span>
                  </a>
                ) : (
                  <>
                    <MapPin className="text-secondary" />
                    <span>Available at Premium Showroom</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* IMAGE MODAL (UNCHANGED) */}
      {showSingleImageModal && (
        <div className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center">
          <button
            onClick={() => setShowSingleImageModal(false)}
            className="absolute top-5 right-5 bg-red-600 text-white p-2 rounded-full"
          >
            <X />
          </button>

          <Image
            src={galleryImages[currentImageIndex]}
            alt="Preview"
            width={900}
            height={600}
            className="h-[90vh] w-auto object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
