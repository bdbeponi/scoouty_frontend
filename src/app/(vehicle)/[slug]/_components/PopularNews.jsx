import React from "react";
import Link from "next/link";
import Image from "next/image";

const PopularNews = () => {
  const popularArticles = [
    {
      id: 1,
      title: "Top 10 Bikes Under 2 Lakhs in 2024",
      views: "15.2K",
      image: "/bikes/b4.jpg",
      rank: 1,
    },
    {
      id: 2,
      title: "Electric vs Petrol Scooters: Cost Comparison",
      views: "12.8K",
      image: "/scooters/s4.jpg",
      rank: 2,
    },
    {
      id: 3,
      title: "Royal Enfield Hunter 350 Long Term Review",
      views: "10.5K",
      image: "/scooters/s4.jpg",
      rank: 3,
    },
    {
      id: 4,
      title: "Aprilia RS 457: Italian Beast in India",
      views: "9.3K",
      image: "/bikes/b4.jpg",
      rank: 4,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-300 hover:shadow-md p-2 md:p-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Popular News</h3>

      <div className="space-y-6">
        {popularArticles.map((article) => (
          <div
            key={article.id}
            className="group cursor-pointer hover:bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg hover:shadow-sm  transition"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  height={80}
                  width={80}
                  className="h-20 w-20 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-0 left-0 bg-primary text-white w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {article.rank}
                </div>
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition mb-1 line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{article.views} views</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularNews;
