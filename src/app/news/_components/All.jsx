import React from "react";
import NewsCard from "@/components/shared/NewsCard";
import NewsCard3 from "@/components/shared/NewsCard3";
import NewsCard3Skeleton from "@/components/shared/NewsCard3Skeleton";
import Pagination from "@/components/custom/Pagination";

const All = ({ data, info, isLoading, pagination, onPageChange }) => {
  // const isLoading = !data;
  const hasData = data?.length > 0;

  return (
    <>
      {/* Banner */}
      <section
        className="relative h-[300px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${info.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <h1 className="relative z-10 text-white font-bold text-xl md:text-2xl lg:text-3xl">
          {info.name}
        </h1>
      </section>

      {/* Content */}
      <section className="container max-w-[1200px] mx-auto px-4 py-10">
        {/* MOBILE */}
        <div className="lg:hidden grid grid-cols-2 gap-4">
          {isLoading &&
            [...Array(6)].map((_, i) => <NewsCard3Skeleton key={i} />)}

          {!isLoading &&
            hasData &&
            data.map((news, index) => (
              <NewsCard key={news.id} news={news} index={index} />
            ))}
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {isLoading &&
            [...Array(6)].map((_, i) => <NewsCard3Skeleton key={i} />)}

          {!isLoading &&
            hasData &&
            data.map((news, index) => (
              <NewsCard3 key={news.id} news={news} index={index} />
            ))}
        </div>

        {/* EMPTY STATE */}
        {!isLoading && !hasData && (
          <div className="text-center text-gray-500 py-20">
            No news found in this category.
          </div>
        )}

        {/* PAGINATION */}
        {pagination && (
          <Pagination pagination={pagination} onPageChange={onPageChange} />
        )}
      </section>
    </>
  );
};

export default All;
