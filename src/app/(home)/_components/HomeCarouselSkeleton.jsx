"use client";

export default function HomeCarouselSkeleton() {
  return (
    <section className="relative w-full h-[520px] lg:h-[560px] overflow-hidden pb-10">
      {/* Background Skeleton */}
      <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"></div>

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto h-full flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center space-y-4 lg:text-left">
          {/* Title */}
          <div className="h-12 sm:h-14 lg:h-16 w-full bg-gray-700 rounded animate-pulse mx-auto"></div>
          <div className="h-12 sm:h-14 lg:h-16 w-3/4 bg-gray-700 rounded animate-pulse mx-auto"></div>

          {/* Subtitle */}
          <div className="h-6 sm:h-7 lg:h-8 w-full bg-gray-700 rounded animate-pulse mt-4 mx-auto"></div>
          <div className="h-6 sm:h-7 lg:h-8 w-5/6 bg-gray-700 rounded animate-pulse mx-auto"></div>

          {/* Button */}
          <div className="h-12 w-40 bg-gray-700 rounded-md animate-pulse mx-auto mt-6"></div>
        </div>
      </div>
    </section>
  );
}
