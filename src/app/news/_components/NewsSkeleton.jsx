import React from "react";

const NewsSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="w-full aspect-[3/2] bg-gray-200" />

      <div className="p-3 space-y-2">
        <div className="h-3 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-3 w-20 bg-gray-200 rounded mt-3" />
      </div>
    </div>
  );
};

export default NewsSkeleton;
