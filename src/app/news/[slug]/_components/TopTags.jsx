import React from "react";

const TopTags = ({ tags }) => {
  const tagss = tags || [];

  return (
    <div className="bg-white rounded-xl border border-gray-300 hover:shadow-md p-2 md:p-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Top Tags</h3>

      <div className="flex flex-wrap gap-3">
        {tagss.map((tag, index) => (
          <div key={tag.name} className="group cursor-pointer">
            <div className="flex items-center gap-2 text-sm text-gray-700 px-2 py-1 bg-gray-100 rounded-full hover:bg-primary hover:text-white transition">
              <span className="font-medium">{tag}</span>
              {/* <span className="font-medium">{tag.name}</span> */}
              {/* <span className="opacity-75">({tag.count})</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopTags;
