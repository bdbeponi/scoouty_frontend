// src/app/author/[id]/page.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import PopularNews from "./_components/PopularNews";
import { useGetAuthorApiIdApiQuery } from "@/redux/features/authorApi";
import { baseUriBackend } from "@/redux/url/url";
import MatchedNews from "./_components/MatchedNews";

const SingleAuthor = () => {
  const { slug } = useParams();
  const userName = slug;

  const [imgError, setImgError] = useState(false);

  const { data, isLoading, isError } = useGetAuthorApiIdApiQuery(userName);
  const author = data?.data;

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return <p className="text-center py-10">Failed to load author</p>;

  return (
    <section className="container max-w-[1200px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= Left Column ================= */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Author Image */}
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-300">
                  {!imgError && author?.image ? (
                    <Image
                      src={`${baseUriBackend}${author.image}`}
                      alt={author?.fullName || "Author"}
                      fill
                      className="object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 rounded-full" />
                  )}
                </div>
              </div>

              {/* Author Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-xl font-semibold text-primary">
                    {author?.fullName}
                  </h1>

                  {author?.is_active && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      active
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-3">@{author?.userName}</p>

                {author?.bio && (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {author?.bio ||
                      "This author has not added a biography yet."}
                  </p>
                )}
              </div>
            </div>
          </div>

          <MatchedNews createBy={author?._id} />
        </div>

        {/* ================= Right Column ================= */}
        <aside className="space-y-6 md:sticky md:top-24 self-start">
          <PopularNews />
        </aside>
      </div>
    </section>
  );
};

export default SingleAuthor;
