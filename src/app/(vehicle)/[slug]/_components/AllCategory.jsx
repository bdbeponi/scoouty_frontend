import React from "react";
import Link from "next/link";
import { FaCar, FaMotorcycle, FaBiking, FaBicycle } from "react-icons/fa";

const AllCategory = () => {
  const categories = [
    {
      id: 1,
      name: "Car",
      count: 210,
      icon: <FaCar />,
      color: "bg-blue-100 text-blue-600",
      href: "/car",
    },
    {
      id: 2,
      name: "Bikes",
      count: 156,
      icon: <FaMotorcycle />,
      color: "bg-red-100 text-red-600",
      href: "/bikes",
    },
    {
      id: 3,
      name: "Scooties",
      count: 89,
      icon: <FaBiking />,
      color: "bg-green-100 text-green-600",
      href: "/scooties",
    },
    {
      id: 4,
      name: "Cycles",
      count: 64,
      icon: <FaBicycle />,
      color: "bg-purple-100 text-purple-600",
      href: "/cycles",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-300 hover:shadow-md p-2 md:p-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">All Categories</h3>

      <div className="space-y-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 w-full"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-4 rounded-full ${category.color} group-hover:scale-110 transition-transform duration-200`}
              >
                <div className="text-xl">{category.icon}</div>
              </div>
              <div className="flex flex-col">
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors duration-200">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {category.count} models available
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 group-hover:text-primary transition-colors duration-200 group-hover:translate-x-1 text-lg">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
