// src/app/compare/[slug]/_components/EmptyState.jsx

import React from "react";
import Link from "next/link";

const EmptyState = ({ icon, title, description, actionText, onAction }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 text-gray-400">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-8">{description}</p>
        {onAction && actionText && (
          <button
            onClick={onAction}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
