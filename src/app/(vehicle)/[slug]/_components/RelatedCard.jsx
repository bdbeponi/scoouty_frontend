"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BrandCard from "@/components/shared/BrandCard";

const RelatedCard = () => {
  const [activeTab, setActiveTab] = useState("car");

  const carArticles = [
    {
      id: 1,
      title: "Tata Nexon EV vs Petrol: Which is Better?",
      image: "/cars/c1.jpg",
      date: "Dec 3, 2024",
    },
    {
      id: 2,
      title: "Hyundai Creta 2024 Facelift Review",
      image: "/cars/c2.jpg",
      date: "Nov 30, 2024",
    },
    {
      id: 3,
      title: "Tata Nexon EV vs Petrol: Which is Better?",
      image: "/cars/c1.jpg",
      date: "Dec 3, 2024",
    },
    {
      id: 4,
      title: "Hyundai Creta 2024 Facelift Review",
      image: "/cars/c2.jpg",
      date: "Nov 30, 2024",
    },
  ];

  // Updated brand data with actual brand images
  const brands = [
    { name: "BMW", logo: "/brand/bmw.avif" },
    { name: "BYD", logo: "/brand/byd.avif" },
    { name: "Honda", logo: "/brand/honda.avif" },
    { name: "Hyundai", logo: "/brand/hyundai.avif" },
    { name: "Jeep", logo: "/brand/jeep.avif" },
    { name: "Kia", logo: "/brand/kia.avif" },
    { name: "Land Rover", logo: "/brand/land-rover.avif" },
    { name: "Mahindra", logo: "/brand/mahindra.avif" },
    { name: "Maruti Suzuki", logo: "/brand/maruti-suzuki.avif" },
    { name: "Mercedes-Benz", logo: "/brand/mercedes-benz.avif" },
    { name: "MG", logo: "/brand/mg.avif" },
    { name: "Nissan", logo: "/brand/nissan.avif" },
    { name: "Renault", logo: "/brand/renault.avif" },
    { name: "Skoda", logo: "/brand/skoda.avif" },
    { name: "Tata", logo: "/brand/tata.avif" },
    { name: "Toyota", logo: "/brand/toyota.avif" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-300 hover:shadow-md p-2 md:p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          className={`flex-1 py-3 font-semibold text-center transition ${
            activeTab === "car"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("car")}
        >
          Related News
        </button>
        <button
          className={`flex-1 py-3 font-semibold text-center transition ${
            activeTab === "brand"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("brand")}
        >
          Others Brands
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "car" ? (
          <div className="space-y-4">
            {carArticles.map((article) => (
              <div
                key={article.id}
                className="group cursor-pointer hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg hover:shadow-sm  transition"
              >
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      height={80}
                      width={80}
                      className="h-20 w-20 object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="my-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary transition line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-500">{article.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {brands.slice(0, 8).map((brand, index) => (
              <BrandCard brand={brand} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedCard;
