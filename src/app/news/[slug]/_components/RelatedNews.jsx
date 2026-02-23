import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";

const RelatedNews = () => {
  const relatedArticles = [
    {
      id: 1,
      title: "TVS Jupiter – Why It's Still the Best Family Scooter",
      date: "Dec 1, 2024",
      image: "/scooters/s2.jpg",
      category: "Scooter",
    },
    {
      id: 2,
      title: "Ola S1 Pro vs Ather 450X: Which One to Buy?",
      date: "Nov 28, 2024",
      image: "/scooters/s3.jpg",
      category: "Electric",
    },
    {
      id: 3,
      title: "2024 Hero Splendor Plus: Still the King of Mileage",
      date: "Nov 25, 2024",
      image: "/bikes/b1.jpg",
      category: "Bike",
    },
    {
      id: 4,
      title: "Yamaha R15 V4 Review: Track Monster on Streets",
      date: "Nov 20, 2024",
      image: "/bikes/b2.jpg",
      category: "Sports",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b">
        Related News
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            href="#"
            className="group block hover:no-underline"
          >
            <div className="flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  {article.category}
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center text-sm text-gray-500">
                  <FaCalendarAlt className="mr-2" />
                  {article.date}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedNews;
