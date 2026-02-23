"use client";

import React, { useState } from "react";
import { FaUser, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Image from "next/image";

const CommentsShow = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      time: "2 hours ago",
      avatar: "/placeholder.jpg",
      content:
        "Great review! I've been using Ather 450X for 6 months now and it's been an amazing experience. The performance is unmatched in its price range.",
      likes: 42,
      dislikes: 2,
      isVerified: true,
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      time: "1 day ago",
      avatar: "/placeholder.jpg",
      content:
        "Good review but I think the price is still on the higher side. Ola S1 Pro offers similar features at a lower price point.",
      likes: 28,
      dislikes: 8,
      isVerified: true,
    },
    {
      id: 3,
      name: "David Wilson",
      time: "3 days ago",
      avatar: "/placeholder.jpg",
      content:
        "The dashboard is the best part! Never seen such intuitive interface on any scooter. Worth every penny.",
      likes: 56,
      dislikes: 3,
      isVerified: false,
    },
  ]);

  const handleLike = (commentId) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment,
      ),
    );
  };

  const handleDislike = (commentId) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, dislikes: comment.dislikes + 1 }
          : comment,
      ),
    );
  };

  const renderComment = (comment) => (
    <div key={comment.id}>
      <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={comment.avatar}
              alt={comment.name}
              height={40}
              width={40}
              className="size-10 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-gray-900">{comment.name}</h4>
              {comment.isVerified && (
                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                  Verified
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500">{comment.time}</div>
          </div>

          {/* Comment Text */}
          <p className="text-gray-700 my-3">{comment.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
            >
              <FaThumbsUp />
              <span>{comment.likes}</span>
            </button>

            <button
              onClick={() => handleDislike(comment.id)}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
            >
              <FaThumbsDown />
              <span>{comment.dislikes}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="car_h3 font-bold text-gray-900">Comments</h3>
          <p className="text-gray-600">{comments.length} comments</p>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Sort by:</span>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>Newest</option>
            <option>Top Rated</option>
            <option>Most Liked</option>
          </select>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => renderComment(comment))
        ) : (
          <div className="text-center py-8">
            <FaUser className="mx-auto text-4xl text-gray-300 mb-4" />
            <p className="text-gray-600">
              No comments yet. Be the first to comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsShow;
