"use client";

import React from "react";
import Link from "next/link";

const ButtonPrimarySmall = ({ text, href }) => {
  // If href is provided, use Link; else, use button
  const ButtonContent = (
    <span className="block p-1 lg:px-4 lg:py-2 rounded-md bg-secondary text-white font-semibold text-xs sm:text-sm transition-colors duration-300 hover:bg-secondary/90">
      {text}
    </span>
  );

  return href ? (
    <Link href={href} aria-label={text}>
      {ButtonContent}
    </Link>
  ) : (
    <button type="button" aria-label={text}>
      {ButtonContent}
    </button>
  );
};

export default ButtonPrimarySmall;
