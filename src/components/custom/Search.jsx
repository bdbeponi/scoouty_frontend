"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useGetCardListProductsApiQuery } from "@/redux/features/productApi";
import { baseUriBackend } from "@/redux/url/url";

const Search = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const { data, isLoading } = useGetCardListProductsApiQuery(
    { limit: 5, search },
    { skip: search.length < 1 },
  );

  const products = data?.data?.products || [];

  console.log(products, "products.......")

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Blur Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/10 transition"
        />
      )}

      <div ref={wrapperRef} className="relative z-50 w-full max-w-xs">
        {/* Search Input */}
        <div className="relative flex items-center rounded-full border border-gray-300 bg-white shadow-sm transition focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
          {/* Search Icon */}
          <span className="absolute left-4 text-gray-500">
            <FaSearch className="h-4 w-4" />
          </span>

          <input
            type="text"
            placeholder="Search vehicles, brands, models..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className="
              w-full rounded-full bg-transparent
              py-2.5 pl-10 pr-10
              text-sm text-gray-800
              outline-none
              placeholder:text-gray-400
            "
          />

          {/* Clear Button */}
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setOpen(false);
              }}
              className="
                absolute right-3
                flex h-6 w-6 items-center justify-center
                rounded-full
                text-gray-400
                hover:bg-gray-100 hover:text-gray-600
                transition
              "
              aria-label="Clear search"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Search Results */}
        {open && search.length >= 1 && (
          <div className="absolute left-0 right-0 mt-2 overflow-hidden rounded-b-xl border border-gray-300 bg-white shadow-xl">
            {isLoading ? (
              <p className="p-4 text-center text-sm text-gray-500">
                Searching...
              </p>
            ) : products.length ? (
              <ul className="max-h-80 overflow-y-auto divide-y divide-gray-300">
                {products.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
                    >
                      <Image
                        src={
                          item.image
                            ? `${baseUriBackend}${item.image}`
                            : "/images/default-product.png"
                        }
                        alt={item.name}
                        width={44}
                        height={44}
                        className="rounded-md object-cover border border-gray-300"
                      />

                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800 line-clamp-1">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          ₹ {item.price}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-center text-sm text-gray-500">
                No results found
              </p>
            )}

            {/* View All */}
            {/* <Link
              href={`/all-product?search=${search}`}
              onClick={() => setOpen(false)}
              className="
                block border-t border-gray-300 bg-gray-50
                px-4 py-2 text-center text-sm
                font-medium text-secondary
                hover:bg-gray-100 transition
              "
            >
              View all results
            </Link> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
