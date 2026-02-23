"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import BrandCard from "@/components/shared/BrandCard";
import { useGetBlogListQuery } from "@/redux/features/blogApi";
import { baseUriBackend } from "@/redux/url/url";
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";

const RelatedCard = ({ category }) => {
  const [activeTab, setActiveTab] = useState("news");

  const { data: blogData, isLoading: blogLoading } = useGetBlogListQuery({
    page: 1,
    limit: 5,
    category,
  });

  const categoryLower = category ? category.toLowerCase() : "";
  const blogs = blogData?.data?.blogs || [];

  const { data: categoriesData } = useGetAllCategoryQuery();
  const categories = categoriesData?.data || [];

  const matchedCategory = categories.find(
    (cat) => cat.name.toLowerCase() === category?.toLowerCase(),
  );

  const relatedBrands = matchedCategory?.brands || [];

  const brands =
    relatedBrands?.map((brand) => ({
      _id: brand._id,
      name: brand.name,
      slug: brand.slug,
      logo: brand.image ? `${baseUriBackend}${brand.image}` : "",
    })) || [];

  return (
    <div className="bg-white rounded-xl border border-gray-300 hover:shadow-md p-2 md:p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          onClick={() => setActiveTab("news")}
          className={`flex-1 py-3 font-semibold transition ${
            activeTab === "news"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Related News
        </button>

        <button
          onClick={() => setActiveTab("brand")}
          className={`flex-1 py-3 font-semibold transition ${
            activeTab === "brand"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Other Brands
        </button>
      </div>

      {/* Content */}
      {activeTab === "news" ? (
        <>
          {blogLoading ? (
            <p className="text-sm text-gray-500">Loading news...</p>
          ) : blogs.length === 0 ? (
            <p className="text-sm text-gray-500">No related news found</p>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/news/${blog.slug}`}
                  className="group block cursor-pointer hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg hover:shadow-sm transition"
                >
                  <div className="flex gap-4 p-2">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={`${baseUriBackend}${blog.image}`}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary line-clamp-2">
                        {blog.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(blog.publishedAt).toDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* See all news */}
          <div className="mt-4 text-center">
            <Link
              href={`/news/${categoryLower}`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              See All News →
            </Link>
          </div>
        </>
      ) : (
        <>
          {!categoriesData ? (
            <p className="text-sm text-gray-500">Loading brands...</p>
          ) : relatedBrands.length === 0 ? (
            <p className="text-sm text-gray-500">No brands found</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {brands.slice(0, 8).map((brand) => (
                <BrandCard key={brand._id} brand={brand} />
              ))}
            </div>
          )}

          {/* See all brands */}
          <div className="mt-4 text-center">
            <Link
              href="/brand"
              className="text-sm font-semibold text-primary hover:underline"
            >
              See All Brands →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RelatedCard;
