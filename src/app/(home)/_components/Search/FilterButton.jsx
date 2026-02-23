"use client";

import { FiChevronDown } from "react-icons/fi";

export default function FilterButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 px-4 py-2 hover:border-secondary hover:text-secondary"
      aria-label={`Open ${label} filter`}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
      <FiChevronDown className="text-gray-400 ml-1" />
    </button>
  );
}
