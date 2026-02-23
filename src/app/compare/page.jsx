"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { useGetCardListProductsApiQuery } from "@/redux/features/productApi";
import { baseUriBackend } from "@/redux/url/url";

const MAX_COMPARE = 3;

const ComparePage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [selected, setSelected] = useState(Array(MAX_COMPARE).fill(null));

  const { data } = useGetCardListProductsApiQuery(
    { limit: 10, search },
    { skip: search.length < 1 },
  );

  const products = data?.data?.products || [];

  const handleSelect = (product) => {
    const updated = [...selected];
    updated[activeIndex] = product;
    setSelected(updated);
    setSearch("");
    setActiveIndex(null);
  };

  const handleCompare = () => {
    const slugs = selected.filter(Boolean).map((p) => p.slug);
    if (slugs.length >= 2) {
      router.push(`/compare/${slugs.join("-vs-")}`);
    }
  };

  // Calculate how many more can be selected
  const selectedCount = selected.filter(Boolean).length;
  const remainingSlots = MAX_COMPARE - selectedCount;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Compare Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {selected.map((item, index) => (
          <div
            key={index}
            className="relative rounded-xl border bg-white p-6 text-center shadow-sm"
          >
            {!item ? (
              <>
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-dashed">
                  <FaPlus className="text-xl text-gray-400" />
                </div>

                <p className="mt-3 font-medium text-gray-500">Add bike</p>

                <button
                  onClick={() => setActiveIndex(index)}
                  className="mt-6 w-full rounded-lg border px-4 py-2 text-left text-sm text-gray-600"
                >
                  Select Brand/Model
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    const updated = [...selected];
                    updated[index] = null;
                    setSelected(updated);
                  }}
                  className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <Image
                  src={`${baseUriBackend}${item.image}`}
                  alt={item.name}
                  width={140}
                  height={140}
                  className="mx-auto rounded-md object-cover"
                />

                <h3 className="mt-4 text-sm font-semibold line-clamp-2">
                  {item.name}
                </h3>

                <p className="mt-1 text-xs text-gray-500">{item.brand}</p>

                <p className="mt-2 text-lg font-bold text-secondary">
                  ₹ {item.price}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Compare Button */}
      <div className="mt-10 flex justify-center">
        <button
          disabled={selected.filter(Boolean).length < 2}
          onClick={handleCompare}
          className="rounded-xl bg-red-600 px-12 py-4 text-lg font-semibold text-white disabled:opacity-40"
        >
          Compare Now
        </button>
      </div>

      {/* Search Modal */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pt-6">
              <div>
                <h3 className="text-lg font-semibold">
                  Add Vehicle to Compare
                </h3>
              </div>
              <button
                onClick={() => setActiveIndex(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-6">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bikes..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Products List */}
            <div className="max-h-80 overflow-y-auto px-6 pb-6">
              {products.length > 0 ? (
                <ul className="space-y-3">
                  {products.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-200 p-4 hover:border-red-500 hover:bg-red-50"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
                        <Image
                          src={`${baseUriBackend}${item.image}`}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                        <p className="mt-1 text-sm font-bold text-secondary">
                          ₹ {item.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <button className="rounded-lg bg-red-600 px-3 py-1 text-xs font-medium text-white">
                          Add
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No products found</p>
                  {search && (
                    <p className="mt-1 text-sm text-gray-400">
                      Try searching with different keywords
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
