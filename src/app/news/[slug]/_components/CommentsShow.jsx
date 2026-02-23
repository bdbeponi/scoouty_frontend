"use client";

import React from "react";
import { useGetCommentsByBlogIdApiQuery } from "@/redux/features/commentsApi";

const CommentsShow = ({ blogId }) => {
  const {
    data: res,
    isLoading,
    isError,
  } = useGetCommentsByBlogIdApiQuery(blogId);

  const comments = res?.data || [];

  // Custom time formatter
  const formatTime = (dateString) => {
    const commentDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - commentDate;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 7) {
      // Show date if older than 7 days
      return commentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } else if (diffDays >= 1) {
      return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
    } else if (diffHours >= 1) {
      return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
    } else if (diffMinutes >= 1) {
      return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
    } else {
      return "Just now";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-300 p-4 mt-8 space-y-4 animate-pulse">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-gray-200 h-6 w-32 rounded"></h3>
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-50 rounded-lg flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </div>
            <div className="pl-12 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-xl border border-gray-300 p-4 mt-8 space-y-4 animate-pulse">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-gray-200 h-6 w-32 rounded"></h3>
        {[1, 2, 3].map((_, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-50 rounded-lg flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
              <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </div>
            <div className="pl-12 h-4 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-300 hover:shadow-md p-4 mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Comments</h3>

      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          No comments yet. Be the first to comment!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 bg-gray-50 rounded-lg flex flex-col gap-2"
            >
              {/* Header: Avatar, Name and Time */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-300"></div>
                  <span className="font-semibold text-gray-900">
                    {comment.name}
                  </span>
                </div>

                <div className="text-gray-400 text-sm">
                  {comment.createdAt && formatTime(comment.createdAt)}
                </div>
              </div>

              {/* Comment Text */}
              <div className="text-gray-700  pl-12">{comment.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsShow;
