"use client";

import React from "react";
import Link from "next/link";
import NewsCard from "@/components/shared/NewsCard";
import NewsCard2 from "@/components/shared/NewsCard2";
import { useGetBlogListQuery } from "@/redux/features/blogApi";

const NewsSection = () => {
  const newsInfo = {
    title: "Latest News",
    sub_title: "News, reviews & buying guides for scooters",
    link: "/news",
  };

  const {
    data: blogData,
    isLoading,
    isError,
  } = useGetBlogListQuery({ page: 1, limit: 6, search: "" });

  const newses =
    blogData?.data?.blogs?.map((blog, index) => ({
      id: blog.id || index,
      title: blog.title,
      image:
        blog.image && blog.image !== "default.png"
          ? blog.image
          : "/placeholder.jpg",
      author: blog.author || "Admin",
      date: new Date(blog.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      tag: blog.category || "General",
      excerpt: blog.shortDescription || "",
      slug: blog.slug,
    })) || [];

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-10 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mx-auto" />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container mx-auto px-4 py-10 text-center text-red-600">
        Failed to load news
      </section>
    );
  }

  return (
    <section className="container max-w-[1200px] mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-start lg:items-center mb-6">
        <div>
          <h3 className="car_h3 text-2xl md:text-3xl font-bold text-gray-900">
            {newsInfo.title}
          </h3>
          <p className="car_p text-gray-600 mt-2">{newsInfo.sub_title}</p>
        </div>

        <Link
          href={newsInfo.link}
          className="text-primary car_h5 hover:text-primary-dark font-semibold transition-colors min-w-20"
        >
          View All →
        </Link>
      </div>

      {/* News Grid (Mobile) */}
      <div className="lg:hidden grid grid-cols-2 gap-4">
        {newses?.slice(0, 4)?.map((news, index) => (
          <NewsCard key={news.id} news={news} index={index} />
        ))}
      </div>

      {/* News Grid (Desktop) */}
      <div className="hidden lg:flex gap-4">
        {/* First Column: 1 news */}
        <div className="flex-1">
          {newses.slice(0, 1).map((news, index) => (
            <NewsCard key={news.id} news={news} index={index} />
          ))}
        </div>

        {/* Second Column: 3 news */}
        <div className="flex-1 flex flex-col gap-4">
          {newses.slice(1, 4).map((news, index) => (
            <NewsCard2 key={news.id} news={news} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
