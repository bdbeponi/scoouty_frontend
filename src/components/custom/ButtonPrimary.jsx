"use client";

import Link from "next/link";
import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

const ButtonPrimary = ({ text, href }) => {
  return (
    <Link
      href={href}
      aria-label={text}
      className="
        group
        flex items-center justify-center gap-3
        px-4 py-2
        rounded-md
        bg-red-600
        text-white
        font-semibold
        outline outline-2 outline-red-600
        outline-offset-0
        transition-all duration-300
        hover:bg-red-700
        focus-visible:outline-offset-2
      "
    >
      <span
        className="
          transition-colors duration-300
        "
      >
        {text}
      </span>

      <FaArrowAltCircleRight
        className="transition-colors duration-300"
        aria-hidden="true"
      />
    </Link>
  );
};

export default ButtonPrimary;
