"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { useGetBlogBySlugQuery } from "@/redux/features/blogApi";
import { useParams } from "next/navigation";
import SocialShare2 from "./SocialShare2";
import RichTextDisplay from "./RichTextDisplay";
import { baseUriBackend } from "@/redux/url/url";
import { BiCategory } from "react-icons/bi";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

const BlogDetails = ({ setCategory, setTags, setBlogId }) => {
  const params = useParams();
  const { data: blog, isLoading, error } = useGetBlogBySlugQuery(params.slug);

  useEffect(() => {
    if (blog?.data?.category) {
      setCategory(blog.data.category);
    }
    if (blog?.data?.id) {
      setBlogId(blog.data.id);
    }
    if (blog?.data?.tags) {
      setTags(blog.data.tags);
    }
  }, [blog, setCategory, setTags]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    try {
      const date = new Date(dateString);

      // Format date part: 14 December 2025
      const day = date.getDate();
      const month = date.toLocaleDateString("en-US", { month: "long" });
      const year = date.getFullYear();

      // Format time part: 07:08 PM
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours.toString().padStart(2, "0") : "12"; // 00 becomes 12

      return `${day} ${month} ${year} , ${hours}:${minutes} ${ampm}`;
    } catch {
      return "Date not available";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-300 p-4 md:p-6">
        <div className="animate-pulse space-y-6">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="flex flex-wrap gap-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog?.data) {
    return (
      <div className="bg-white rounded-xl border border-gray-300 p-6 text-center">
        <h3 className="text-xl font-bold text-gray-700 mb-2">Blog Not Found</h3>
        <p className="text-gray-500">
          The blog you are looking for does not exist or failed to load.
        </p>
      </div>
    );
  }

  const blogData = blog.data;

  return (
    <div className="bg-white rounded-xl border border-gray-300">
      {/* Meta Information */}
      <div className="border-b border-gray-300 pb-6 mb-0 px-4 md:px-6 pt-4 md:pt-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {blogData.title || "Untitled Blog"}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Image
                  src={`${baseUriBackend}${blogData.autor?.image}`}
                  alt={blogData.autor?.fullName || "Author"}
                  height={20}
                  width={20}
                  className="size-5 rounded-full object-cover"
                />
                Author:{" "}
                <Link
                  href={`/author/${blogData.autor?.userName}`}
                  className="hover:underline"
                >
                  {blogData.autor?.fullName}
                </Link>
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                {formatDate(blogData.publishedAt || blogData.createdAt)}
              </span>
              {blogData.category && (
                <span className="flex items-center gap-2">
                  <BiCategory className="text-primary" />
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    {blogData.category}
                  </span>
                </span>
              )}
              {blogData.views !== undefined && blogData.views > 0 && (
                <span className="flex items-center gap-2">
                  <EyeIcon className="text-primary" />
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    {blogData.views} view{blogData.views !== 1 ? "s" : ""}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mb-0 px-0">
        {blogData.longDescription ? (
          <div className="rich-text-content">
            <RichTextDisplay value={blogData.longDescription} />
          </div>
        ) : (
          <div className="text-gray-500 italic text-center py-8">
            No detailed content available for this blog.
          </div>
        )}
      </div>

      {/* Author Section */}
      <div className="mt-10 pt-6 border-t border-gray-300 px-4 md:px-6 pb-6">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-shrink-0">
            <div className="relative size-20">
              <Image
                src={`${baseUriBackend}${blogData.autor?.image}`}
                alt={blogData.autor?.fullName || "Author"}
                height={80}
                width={80}
                className="size-20 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-primary font-semibold text-lg">
                <Link
                  href={`/author/${blogData.autor?.userName}`}
                  className="hover:underline"
                >
                  {blogData.autor?.fullName || "Author"}
                </Link>
              </p>
              {blogData.autor?.isActive && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              {blogData.autor?.bio ||
                blogData.shortDescription ||
                "Our expert author brings you detailed insights and analysis based on extensive research and experience in the field."}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <SocialShare2
            title={blogData.title}
            description={blogData.shortDescription}
            url={typeof window !== "undefined" ? window.location.href : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
