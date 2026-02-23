import React from "react";
import NewsCard from "@/components/shared/NewsCard";
import NewsCard3 from "@/components/shared/NewsCard3";
import NewsCard3Skeleton from "@/components/shared/NewsCard3Skeleton";
import Pagination from "@/components/custom/Pagination";

const AllNewsAuthor = ({ data, isLoading, pagination, onPageChange }) => {
  // const isLoading = !data;
  const hasData = data?.length > 0;

  return (
    <>
      {/* Content */}
      <section className="container max-w-[1200px] mx-auto px-4 py-10 border border-gray-300 rounded-xl ">
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

export default AllNewsAuthor;
