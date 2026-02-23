"use client";

import React, { useState } from "react";
import { useGetBlogListQuery } from "@/redux/features/blogApi";
import All from "./_components/All";
const PageInfo = {
  name: "Scooty",
  image: "/scooters/s1.jpg",
};

const BikePage = () => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: blogData, isLoading } = useGetBlogListQuery({
    page,
    limit,
    category: "Scootie",
  });

  const BikeData = blogData?.data?.blogs?.map((blog, index) => ({
    id: blog.id || index,
    title: blog.title,
    image: blog.image,
    author: blog.author || "Admin",
    date: new Date(blog.publishedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    tag: blog.category || "General",
    excerpt: blog.shortDescription || "",
    slug: blog.slug,
  }));

  return (
    <All
      data={BikeData}
      info={PageInfo}
      isLoading={isLoading}
      pagination={blogData?.data?.pagination}
      onPageChange={setPage}
    />
  );
};

export default BikePage;
