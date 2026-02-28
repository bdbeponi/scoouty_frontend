"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const BrandCard = ({ brand }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      href={`/scooters/${brand.slug}`}
      className="flex flex-col items-center justify-center gap-2 p-4 border border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative w-[60px] h-[60px]">
        {/* Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 rounded-md" />
        )}

        <Image
          src={brand.logo}
          alt={brand.name}
          width={60}
          height={60}
          className={`object-contain transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </div>

      <span className="text-sm text-gray-700 font-medium">{brand.name} Name</span>
    </Link>
  );
};

export default BrandCard;
