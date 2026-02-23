"use client";

import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null;

  const { currentPage, totalPages, hasNext, hasPrev } = pagination;

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        disabled={!hasPrev}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-2 border rounded disabled:opacity-40"
      >
        <FiChevronLeft />
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border rounded ${
              page === currentPage
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-2 border rounded disabled:opacity-40"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
