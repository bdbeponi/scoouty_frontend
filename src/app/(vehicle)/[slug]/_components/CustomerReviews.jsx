"use client";

import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { toast } from "sonner";
import {
  useCreateReviewApiMutation,
  useGetReviewByProductIdApiQuery,
} from "@/redux/features/reviewApi";

const CustomerReviews = ({ product }) => {
  const [createReviewApi] = useCreateReviewApiMutation();

  // Review states
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reviews
  const { data: getReviewByProductIdApi } = useGetReviewByProductIdApiQuery(
    product?._id,
  );

  // Normalize reviews
  const transformedReviews =
    getReviewByProductIdApi?.data?.map((review) => ({
      user: review.name,
      rating: review.review_num,
      comment: review.feedback,
      userImage: "/default-user.png",
      createdAt: review.createdAt,
    })) || [];

  // Average rating
  const averageRating =
    transformedReviews.length > 0
      ? transformedReviews.reduce((sum, r) => sum + r.rating, 0) /
        transformedReviews.length
      : 0;

  // Submit review
  const handleSubmitReview = async () => {
    if (!rating || !name || !email || !feedback) {
      toast.error("Please fill all fields");
      return;
    }

    if (!product?._id) {
      toast.error("Product not found");
      return;
    }

    setIsSubmitting(true);

    try {
      await createReviewApi({
        productId: product._id,
        review_num: rating,
        name,
        email,
        feedback,
      }).unwrap();

      toast.success("Review submitted successfully!");

      setRating(0);
      setName("");
      setEmail("");
      setFeedback("");
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="review" className="scroll-mt-20 mt-10">
      <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 md:p-6 lg:p-8">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* ===== Summary ===== */}
          <div className="grid grid-cols-1 gap-6 border-b border-gray-300 pb-8 md:grid-cols-3">
            {/* Total Reviews */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Total Reviews
              </h3>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {transformedReviews.length}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Growth in reviews this year
              </p>
            </div>

            {/* Average Rating */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Average Rating
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-3xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </p>
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => {
                    if (i + 1 <= Math.floor(averageRating))
                      return <FaStar key={i} />;
                    if (i < averageRating) return <FaStarHalfAlt key={i} />;
                    return <FaRegStar key={i} className="text-gray-300" />;
                  })}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Average rating this year
              </p>
            </div>

            {/* Rating Breakdown */}
            <div>
              {[5, 4, 3, 2, 1].map((star) => {
                const total = transformedReviews.length;
                const count = transformedReviews.filter(
                  (r) => r.rating === star,
                ).length;
                const width = total ? (count / total) * 100 : 0;

                return (
                  <div
                    key={star}
                    className="flex items-center gap-2 text-sm text-gray-600 mb-1"
                  >
                    <div className="flex w-20 gap-1">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < star ? (
                          <FaStar key={i} className="text-yellow-400" />
                        ) : (
                          <FaRegStar key={i} className="text-gray-300" />
                        ),
                      )}
                    </div>

                    <div className="relative h-2 w-full rounded bg-gray-200">
                      <div
                        className="absolute left-0 top-0 h-2 rounded bg-sky-700"
                        style={{ width: `${width}%` }}
                      />
                    </div>

                    <span className="w-8 text-right text-xs text-gray-500">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== Reviews List ===== */}
          <div className="space-y-5">
            {transformedReviews.length > 0 ? (
              transformedReviews.map((review, i) => (
                <div
                  key={i}
                  className="flex gap-4 border-b border-gray-200 pb-4"
                >
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-sky-700 flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                    {review.user?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div className="w-full">
                    <h4 className="font-semibold text-gray-800">
                      {review.user}
                    </h4>

                    <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <FaStar
                          key={j}
                          className={
                            j < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-xs text-gray-500">
                        ({review.rating.toFixed(1)})
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm italic text-gray-500">
                No reviews yet. Be the first to review this product!
              </p>
            )}
          </div>

          {/* ===== Submit Review ===== */}
          <div className="pt-8">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Submit Your Review
            </h3>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    disabled={isSubmitting}
                  >
                    {starValue <= (hoverRating || rating) ? (
                      <FaStar className="text-yellow-400 text-xl" />
                    ) : (
                      <FaRegStar className="text-gray-300 text-xl" />
                    )}
                  </button>
                );
              })}
              <span className="ml-2 text-sm text-gray-600">
                ({rating.toFixed(1)})
              </span>
            </div>

            {/* Name & Email */}
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-gray-400 p-3 text-sm"
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border border-gray-400 p-3 text-sm"
                disabled={isSubmitting}
              />
            </div>

            {/* Feedback */}
            <textarea
              rows="4"
              placeholder="Write your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-400 p-3 text-sm"
              disabled={isSubmitting}
            />

            <button
              onClick={handleSubmitReview}
              disabled={isSubmitting}
              className="rounded-lg bg-primary/80 px-6 py-3 text-sm text-white hover:bg-primary disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
