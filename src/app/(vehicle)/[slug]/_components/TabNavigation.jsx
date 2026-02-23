// src/app/(vehicle)/[slug]/_components/TabNavigation.jsx
"use client";

import React, { useState } from "react";
import {
  Settings,
  Info,
  Palette,
  Images,
  Timer,
  ListChecks, // Changed from ListCheck to ListChecks
} from "lucide-react";
import { UserGroupIcon } from "@heroicons/react/24/outline";

const TabNavigation = ({
  hasCombinedFeatures,
  hasDescription,
  hasColors,
  hasGallery,
}) => {
  const [activeTab, setActiveTab] = useState("combined-features");

  const tabs = [
    hasCombinedFeatures && {
      id: "combined-features",
      label: "Features",
      icon: <ListChecks className="w-4 h-4" />, // Changed from ListCheck to ListChecks
    },
    hasDescription && {
      id: "description",
      label: "Description",
      icon: <Info className="w-4 h-4" />,
    },
    hasColors && {
      id: "colors",
      label: "Colors",
      icon: <Palette className="w-4 h-4" />,
    },
    hasGallery && {
      id: "gallery",
      label: "Gallery",
      icon: <Images className="w-4 h-4" />,
    },
    {
      id: "recent",
      label: "Recent",
      icon: <Timer className="w-4 h-4" />,
    },
    {
      id: "popular",
      label: "Popular",
      icon: <UserGroupIcon className="w-4 h-4" />,
    },
  ].filter(Boolean); // Remove falsy values

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    setActiveTab(id);
    window.scrollTo({
      top: section.offsetTop - 90,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-29 md:top-18 z-40 bg-white border-b md:border border-gray-200 w-full mb-6">
      <div className="container max-w-[1200px] mx-auto md:px-4 py-2 md:py-0">
        <div className="flex md:items-center md:justify-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>button:first-child]:ml-4 [&>button:last-child]:mr-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`flex items-center gap-2 p-1 md:px-4 md:py-3 whitespace-nowrap border-b-2 transition
                ${
                  activeTab === tab.id
                    ? "border-secondary text-secondary font-semibold"
                    : "border-transparent text-gray-600 hover:text-secondary"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;

// "use client";

// import React, { useState } from "react";
// import {
//   ListCheck,
//   Settings,
//   Info,
//   Palette,
//   Images,
//   Timer,
// } from "lucide-react";
// import { UserGroupIcon } from "@heroicons/react/24/outline";

// const TabNavigation = ({
//   hasKeyFeatures,
//   hasSpecifications,
//   hasDescription,
//   hasColors,
//   hasGallery,
// }) => {
//   const [activeTab, setActiveTab] = useState("features");

//   const tabs = [
//     hasKeyFeatures && {
//       id: "features",
//       label: "Key Features",
//       icon: <ListCheck className="w-4 h-4" />,
//     },
//     hasSpecifications && {
//       id: "specifications",
//       label: "Specifications",
//       icon: <Settings className="w-4 h-4" />,
//     },
//     hasDescription && {
//       id: "description",
//       label: "Description",
//       icon: <Info className="w-4 h-4" />,
//     },
//     hasColors && {
//       id: "colors",
//       label: "Colors",
//       icon: <Palette className="w-4 h-4" />,
//     },
//     hasGallery && {
//       id: "gallery",
//       label: "Gallery",
//       icon: <Images className="w-4 h-4" />,
//     },
//     {
//       id: "recent",
//       label: "Recent",
//       icon: <Timer className="w-4 h-4" />,
//     },
//     {
//       id: "popular",
//       label: "Popular",
//       icon: <UserGroupIcon className="w-4 h-4" />,
//     },
//   ].filter(Boolean); // Remove falsy values

//   const scrollToSection = (id) => {
//     const section = document.getElementById(id);
//     if (!section) return;

//     setActiveTab(id);
//     window.scrollTo({
//       top: section.offsetTop - 90,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="sticky top-29 md:top-18 z-40 bg-white border-b md:border border-gray-200 w-full mb-6">
//       <div className="container max-w-[1200px] mx-auto md:px-4 py-2 md:py-0">
//         <div className="flex md:items-center md:justify-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>button:first-child]:ml-4 [&>button:last-child]:mr-4">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => scrollToSection(tab.id)}
//               className={`flex items-center gap-2 p-1 md:px-4 md:py-3 whitespace-nowrap border-b-2 transition
//                 ${
//                   activeTab === tab.id
//                     ? "border-secondary text-secondary font-semibold"
//                     : "border-transparent text-gray-600 hover:text-secondary"
//                 }`}
//             >
//               {tab.icon}
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TabNavigation;
