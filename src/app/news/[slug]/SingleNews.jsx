// src/app/news/[slug]/SingleNews.jsx

"use client";

import React, { useState } from "react";
import BlogDetails from "./_components/BlogDetails";
import PopularNews from "./_components/PopularNews";
import RecentNews from "./_components/RecentNews";
import RelatedCard from "./_components/RelatedCard";
import AllCategory from "./_components/AllCategory";
import TopTags from "./_components/TopTags";
import CommentsForm from "./_components/CommentsForm";
import CommentsShow from "./_components/CommentsShow";

const SingleNews = () => {
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [blogId, setBlogId] = useState("");

  return (
    <section className="container max-w-[1200px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* ================= Left Column (2/3 width) ================= */}
        <div className="lg:col-span-2 space-y-6">
          <BlogDetails
            setCategory={setCategory}
            setTags={setTags}
            setBlogId={setBlogId}
          />
          {/* <CommentsForm blogId={blogId} />
          <CommentsShow blogId={blogId} /> */}
        </div>

        {/* ================= Right Column (1/3 width) ================= */}
        <aside className="space-y-6 md:sticky md:top-24 md:self-start">
          <RelatedCard category={category} />
          <RecentNews />
          <PopularNews />
          <AllCategory />
          <TopTags tags={tags} />
        </aside>
      </div>
    </section>
  );
};

export default SingleNews;
