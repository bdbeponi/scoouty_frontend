"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

import { useGetBlogListQuery } from "@/redux/features/blogApi";
import { baseUriBackend } from "@/redux/url/url";

const RecentNews = () => {
  const { data: blogData, isLoading } = useGetBlogListQuery({
    page: 1,
    limit: 5,
  });

  const blogs = blogData?.data?.blogs || [];

  return (
    <div className="bg-white rounded-xl border border-gray-300 hover:shadow-md p-2 md:p-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent News</h3>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading news...</p>
      ) : blogs.length === 0 ? (
        <p className="text-sm text-gray-500">No recent news found</p>
      ) : (
        <div className="space-y-5">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group cursor-pointer hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg hover:shadow-sm transition"
            >
              <Link
                href={`/news/${blog.slug}`}
                className="group block hover:no-underline"
              >
                <div className="flex gap-4 p-2">
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={`${baseUriBackend}${blog.image}`}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary mb-2 line-clamp-2">
                      {blog.title}
                    </h4>

                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-2 flex-shrink-0" />
                      <span>{new Date(blog.publishedAt).toDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* See all brands */}
          <div className="mt-4 text-center">
            <Link
              href="/news"
              className="text-sm font-semibold text-primary hover:underline"
            >
              See All News →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentNews;
