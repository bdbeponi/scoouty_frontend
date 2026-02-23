import React from "react";
import Link from "next/link";

const buttonStyles = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium",
  secondary:
    "bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg transition font-medium",
  outline:
    "border border-gray-400 hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-lg transition font-medium",
  danger:
    "bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition font-medium",
  success:
    "bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition font-medium",
  link: "text-blue-600 hover:underline font-medium",
};

const Button = ({ text, href, type = "primary", icon, width }) => {
  const className = `${buttonStyles[type]} ${width ? width : ""}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        <span className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          {text}
        </span>
      </Link>
    );
  }

  return (
    <button className={className}>
      <span className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        {text}
      </span>
    </button>
  );
};

export default Button;
