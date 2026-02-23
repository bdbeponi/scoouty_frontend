"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function SearchPagination({ pagination, onPageChange }) {
  const { page, totalPages } = pagination;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            page === i
              ? "bg-secondary text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <FiChevronLeft />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <FiChevronRight />
      </button>

      <div className="ml-4 text-sm text-gray-600">
        Page {page} of {totalPages}
      </div>
    </div>
  );
}
