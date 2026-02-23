"use client";

import { baseUriBackend } from "@/redux/url/url";
import React from "react";
import SocialShare2 from "./SocialShare2";
import Link from "next/link";
import Image from "next/image";

const AuthorSection = ({ product }) => {
  return (
    <div className="mt-10 pt-6 bg-white rounded-xl border border-gray-300 px-4 md:px-6 pb-6">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-shrink-0">
          <div className="relative size-20">
            <Image
              src={`${baseUriBackend}${product?.createBy?.image}`}
              alt={product?.createBy?.fullName || "Author"}
              height={80}
              width={80}
              className="size-20 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-primary font-semibold text-lg">
              <Link
                href={`/author/${product?.createBy?.userName}`}
                className="hover:underline"
              >
                {product?.createBy?.fullName}
              </Link>
            </p>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            {product?.createBy?.bio ||
              product?.createBy?.bio ||
              "Our expert author brings you detailed insights and analysis based on extensive research and experience in the field."}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <SocialShare2 title={product?.productName_en} />
      </div>
    </div>
  );
};

export default AuthorSection;
