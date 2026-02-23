"use client";

import React, { useState } from "react";
import { useGetBlogListQuery } from "@/redux/features/blogApi";
import AllNewsAuthor from "./AllNewsAuthor";
import AllVehicleAuthor from "./AllVehicleAuthor";

const MatchedNews = ({ createBy }) => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: blogData, isLoading } = useGetBlogListQuery({
    page,
    limit,
    createBy,
  });

  const data = blogData?.data?.blogs?.map((blog, index) => ({
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
    <>
      {blogData?.data?.blogs.length > 0 && (
        <AllNewsAuthor
          data={data}
          isLoading={isLoading}
          pagination={blogData?.data?.pagination}
          onPageChange={setPage}
        />
      )}

      <AllVehicleAuthor createBy={createBy}/>
    </>
  );
};

export default MatchedNews;
