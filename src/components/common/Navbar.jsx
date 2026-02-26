"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Search from "../custom/Search";
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";

const NAVIGATION = [
  { name: "Home", href: "/", subMenu: null },
  { name: "Scooters", href: "/scooters", subMenu: null },
  { name: "Scooty Brand", href: "/brands", subMenu: "SCOOTY" },
  { name: "Compare", href: "/compare", subMenu: null },
  { name: "News", href: "/news", subMenu: null },
];

export default function Navbar() {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const { data, isLoading } = useGetAllCategoryQuery();

  const scootyMenu =
    data?.data
      ?.find((cat) => cat.slug?.toLowerCase() === "scooty")
      ?.brands?.map((brand) => ({
        name: brand.name,
        models: brand.productCount || 0,
        href: `/scooters/${brand.slug}`,
      })) || [];

  return (
    <div className="fixed inset-x-0 top-0 z-80 bg-white shadow-sm">
      {/* ================= DESKTOP ================= */}
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between p-2">
        {/* Logo */}
        <Link href="/" className="p-1.5">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={200}
            height={56}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          {NAVIGATION.map((item) => {
            const subMenu = item.subMenu === "SCOOTY" ? scootyMenu : null;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => subMenu && setOpenSubMenu(item.name)}
                onMouseLeave={() => setOpenSubMenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-3 pt-4 pb-3 text-sm lg:text-base text-gray-800 hover:text-primary border-b-4 border-transparent hover:border-secondary"
                >
                  {item.name}

                  {item.subMenu === "SCOOTY" &&
                    (openSubMenu === item.name ? (
                      <ChevronUpIcon className="size-4" />
                    ) : (
                      <ChevronDownIcon className="size-4" />
                    ))}
                </Link>

                {/* Desktop Dropdown */}
                {subMenu?.length > 0 && openSubMenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 left-0 min-w-96 pt-2"
                  >
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-b-lg max-w-md max-h-96 overflow-y-auto px-2 py-1">
                      <div
                        className={`grid ${
                          subMenu.length === 1 ? "grid-cols-1" : "grid-cols-2"
                        } gap-2 p-1`}
                      >
                        {subMenu.map((subItem, index) => (
                          <Link
                            key={index}
                            href={subItem.href}
                            className="
              rounded-xl px-4 py-2
              shadow-[0_4px_12px_rgba(0,0,0,0.06)]
              text-slate-700
              flex flex-col justify-between
              transition-all duration-300
              border border-gray-300
              bg-white
              hover:bg-secondary hover:text-white
            "
                          >
                            <div className="text-lg font-semibold">
                              {subItem.name}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Search */}
        <Search />
      </nav>

      {/* ================= MOBILE ================= */}
      <div className="lg:hidden border-t border-gray-200">
        <div className="flex items-center space-x-2 overflow-x-auto px-4 py-2">
          {NAVIGATION.map((item) => {
            const subMenu = item.subMenu === "SCOOTY" ? scootyMenu : null;

            return (
              <div key={item.name} className="relative flex-shrink-0">
                <Link
                  href={item.href}
                  className="flex gap-1 items-center px-2 text-sm font-medium text-gray-700"
                  onClick={(e) => {
                    if (item.subMenu === "SCOOTY") {
                      e.preventDefault();
                      setOpenSubMenu(item.name);
                    }
                  }}
                >
                  {item.name}

                  {item.subMenu === "SCOOTY" && (
                    <ChevronDownIcon className="size-3" />
                  )}
                </Link>

                {/* Mobile Fullscreen Sheet */}
                {subMenu?.length > 0 && openSubMenu === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed inset-x-0 bottom-0 top-24 z-50 bg-gray-50 rounded-t-xl"
                  >
                    <div className="bg-secondary flex items-center justify-between gap-4 px-4 py-2">
                      <h3 className="text-white font-semibold">
                        Scooty Brands
                      </h3>
                      <button onClick={() => setOpenSubMenu(null)}>
                        <XMarkIcon className="h-5 w-5 text-white" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-4 overflow-y-auto max-h-[calc(100vh-96px)]">
                      {subMenu.map((brand) => (
                        <Link
                          key={brand.name}
                          href={brand.href}
                          onClick={() => setOpenSubMenu(null)}
                          className="rounded-xl bg-white border px-4 py-2 hover:bg-secondary hover:text-white transition"
                        >
                          <div className="font-semibold">{brand.name}</div>
                          <div className="text-sm opacity-70">
                            {brand.models} models
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
