"use client";
import React from "react";

const TextTitle = () => {
  return (
    <section
      className=" py-10
        bg-center bg-no-repeat
        flex items-center justify-center
        text-center backdrop-blur-[1px] 
      "
      style={{
        backgroundImage: `url('/gif/car-big.gif')`,
      }}
    >
      <div className="w-full">
        <div className="rounded-2xl max-w-3xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-snug">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/90">
              MeraGadi
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl text-gray-700 font-semibold mb-6">
            Lets go with MeraGadi Experience
          </h2>
        </div>
      </div>
    </section>
  );
};

export default TextTitle;
