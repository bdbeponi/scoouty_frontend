"use client";

import Link from "next/link";
import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

const ButtonPrimary2 = ({ text, href }) => {
  return (
    <Link
      href={href}
      className="
      w-full g
        flex items-center justify-center gap-[15px]
        px-[15px] py-[10px]
        rounded-[5px]
        bg-secondary
        outline outline-[3px] outline-secondary outline-offset-[-3px]
         cursor-pointer
        transition-all duration-400
        text-white
        
      "
    >
      <p
        className="
          font-bold text-[1em] 
          transition-all duration-400
        "
      >
        {text}
      </p>

      <FaArrowAltCircleRight
        className="
        
          transition-all duration-400
        "
      />
    </Link>
  );
};

export default ButtonPrimary2;
