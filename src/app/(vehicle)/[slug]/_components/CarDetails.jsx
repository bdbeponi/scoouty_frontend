"use client";

import React from "react";
import Image from "next/image";
import SocialShare2 from "./SocialShare2";

const CarDetails = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 hover:shadow-md p-4 md:p-6">
      {/* Car Title */}
      <div className="border-b border-gray-300 mb-4 pb-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          2025 Tesla Model S – Full Review & Specifications
        </h1>
      </div>

      {/* Intro Paragraph */}
      <p className="text-gray-700 mb-4">
        The 2025 Tesla Model S continues to redefine electric vehicles with its
        cutting-edge technology, luxurious design, and exceptional performance.
        This review explores every aspect of the car, from speed to comfort and
        overall value.
      </p>

      {/* Feature Image */}
      <figure className="mb-8 mt-4">
        <Image
          src="/blogs/1.avif"
          alt="Tesla Model S"
          height={360}
          width={640}
          className="w-full h-auto rounded-xl"
        />
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          Tesla Model S – Sleek Exterior Design
        </figcaption>
      </figure>

      {/* Article / Description */}
      <div className="prose max-w-none">
        <p className="text-gray-700 mb-4">
          The 2025 Tesla Model S delivers an unparalleled driving experience
          with instant torque, advanced autopilot features, and superior energy
          efficiency. Its minimalist interior focuses on comfort and modern
          technology.
        </p>

        {/* Inline Image */}
        <figure className="my-8">
          <Image
            src="/blogs/2.avif"
            alt="Tesla Model S Interior"
            height={360}
            width={640}
            className="w-full h-auto rounded-xl"
          />
          <figcaption className="text-center text-sm text-gray-500 mt-2">
            Minimalist Interior with 17” Touchscreen
          </figcaption>
        </figure>

        {/* Specifications Table */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <tbody>
              {[
                { key: "Model", value: "Tesla Model S" },
                { key: "Price", value: "$94,990" },
                { key: "Top Speed", value: "200 mph" },
                { key: "Acceleration (0-60 mph)", value: "1.99 sec" },
                { key: "Range", value: "396 miles" },
                { key: "Motor", value: "Dual Motor AWD" },
                { key: "Seating Capacity", value: "5 Adults" },
                { key: "Charging Time", value: "15 min (Supercharger)" },
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="px-4 py-2 font-semibold text-gray-800">
                    {item.key}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Performance Section */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Performance & Driving Experience
        </h3>
        <p className="text-gray-700 mb-6">
          The Model S accelerates like no other car, maintaining exceptional
          stability even at high speeds. The adaptive suspension ensures a
          smooth ride over city roads and highways alike.
        </p>

        {/* Quote */}
        <blockquote className="border-l-4 border-primary bg-gray-50 p-6 rounded-md my-8">
          <p className="text-lg italic text-gray-700">
            "Tesla Model S sets the benchmark for electric luxury sedans."
          </p>
        </blockquote>

        <h3 className="text-xl font-bold text-gray-900 mb-4">Final Verdict</h3>
        <p className="text-gray-700 mb-8">
          If you want a luxury electric car that combines speed, technology, and
          style, the 2025 Tesla Model S is the ultimate choice. It’s a premium
          investment, but the performance and innovation are unmatched.
        </p>
      </div>

      {/* Social Share */}
      <div className="mt-10 pt-4 border-t border-gray-300">
        <SocialShare2 />
      </div>
    </div>
  );
};

export default CarDetails;
