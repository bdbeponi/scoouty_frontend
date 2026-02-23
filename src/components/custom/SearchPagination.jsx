"use client";

import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SearchPagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null;

  const { page, totalPages } = pagination;

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      {/* PREV */}
      <button
        disabled={!hasPrev}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-2 border rounded disabled:opacity-40"
      >
        <FiChevronLeft />
      </button>

      {/* PAGE NUMBERS */}
      {[...Array(totalPages)].map((_, i) => {
        const pageNumber = i + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-2 border rounded ${
              pageNumber === page ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* NEXT */}
      <button
        disabled={!hasNext}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-2 border rounded disabled:opacity-40"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default SearchPagination;
