"use client";

import React from "react";
import Image from "next/image";
import { useGetBlogListQuery } from "@/redux/features/blogApi";
import { baseUriBackend } from "@/redux/url/url";
import Link from "next/link";

const PopularNews = () => {
  const { data: blogData, isLoading } = useGetBlogListQuery({
    page: 1,
    limit: 4, // fetch enough to find top viewed articles
    sortBy: "views",
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Extract blogs and sort by views descending
  const blogs = blogData?.data?.blogs || [];

  return (
    <div className="bg-white rounded-xl border border-gray-300 hover:shadow-md p-2 md:p-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Popular News</h3>

      <div className="space-y-6">
        {blogs.map((article, index) => (
          <Link
            href={`/news/${article.slug}`}
            key={article.id}
            className="group cursor-pointer hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg hover:shadow-sm transition"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={`${baseUriBackend}${article.image}`}
                  alt={article.title}
                  height={80}
                  width={80}
                  className="h-20 w-20 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-0 left-0 bg-primary text-white w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition mb-1 line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{article.views} views</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularNews;
