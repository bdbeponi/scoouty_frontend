"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX, FiChevronDown } from "react-icons/fi";
import { BsSliders } from "react-icons/bs";
import { BiCar, BiCycling } from "react-icons/bi";
import { GiScooter } from "react-icons/gi";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaCarSide, FaGasPump } from "react-icons/fa";
import {
  MdAttachMoney,
  MdColorLens,
  MdBrandingWatermark,
  MdSpeed,
  MdStraighten,
  MdFitnessCenter,
} from "react-icons/md";
import { FilterAccordion } from "./Search/FilterAccordion";
import { baseUriBackend } from "@/redux/url/url";
import Image from "next/image";

// API imports
import { useGetAllCategoryQuery } from "@/redux/features/categoryApi";
import { useGetAllBrandsQuery } from "@/redux/features/brandApi";
import { useGetAllBodyTypesApiQuery } from "@/redux/features/typeBodyApi";
import { useGetAllProductColorsApiQuery } from "@/redux/features/typeColorApi";
import { useGetAllDrivetrainsApiQuery } from "@/redux/features/typeDrivetrainApi";
import { useGetAllFuelTypesApiQuery } from "@/redux/features/typeFuelApi";
import { useGetAllManufacturingYearsTypesApiQuery } from "@/redux/features/typeManufacturingYearsApi";
import { useGetAllMileagesTypesApiQuery } from "@/redux/features/typeMileagesApi";
import { useGetAllSeatingCapacitiesApiQuery } from "@/redux/features/typeSeatingCapacityApi";
import { useGetAllProductSizeApiQuery } from "@/redux/features/typeSizeApi";
import { useGetAllTransmissionTypesApiQuery } from "@/redux/features/typeTransmissionApi";
import { useGetAllProductWeightsApiQuery } from "@/redux/features/typeWeightApi";
import { useGetCardListProductsApiQuery } from "@/redux/features/productApi";

import { useGetAllBrakesApiQuery } from "@/redux/features/brakesApi";
import { useGetAllCcTypesApiQuery } from "@/redux/features/ccApi";
import { useGetAllFuelTankTypesApiQuery } from "@/redux/features/fuelTankApi";
import { useGetAllGearboxesApiQuery } from "@/redux/features/gearboxApi";
import { useGetAllPowersApiQuery } from "@/redux/features/powerApi";
import { useGetAllSeatHeightsApiQuery } from "@/redux/features/seatHeightApi";
import { useGetAllTopSpeedTypesApiQuery } from "@/redux/features/topSpeedApi";
import { useGetAllTorquesApiQuery } from "@/redux/features/torqueApi";

// Helper function to get API data
const getApiData = (apiResponse) => {
  if (!apiResponse?.data) return [];

  if (Array.isArray(apiResponse.data)) return apiResponse.data;
  if (apiResponse.data.data && Array.isArray(apiResponse.data.data))
    return apiResponse.data.data;
  if (apiResponse.data.result && Array.isArray(apiResponse.data.result))
    return apiResponse.data.result;
  if (apiResponse.data.brands && Array.isArray(apiResponse.data.brands))
    return apiResponse.data.brands;

  return [];
};

// Format price ranges based on vehicle type
const formatPriceRanges = (type) => {
  switch (type) {
    case "car":
      return [
        { label: "Under ₹5 Lakh", value: "0-500000" },
        { label: "₹5 - ₹10 Lakh", value: "500000-1000000" },
        { label: "₹10 - ₹15 Lakh", value: "1000000-1500000" },
        { label: "₹15 - ₹20 Lakh", value: "1500000-2000000" },
        { label: "₹20 - ₹30 Lakh", value: "2000000-3000000" },
        { label: "₹30 - ₹50 Lakh", value: "3000000-5000000" },
        { label: "₹50 Lakh & Above", value: "5000000-999999999" },
      ];
    case "bike":
      return [
        { label: "Under ₹50,000", value: "0-50000" },
        { label: "₹50,000 - ₹1 Lakh", value: "50000-100000" },
        { label: "₹1 - ₹2 Lakh", value: "100000-200000" },
        { label: "₹2 - ₹5 Lakh", value: "200000-500000" },
        { label: "₹5 - ₹10 Lakh", value: "500000-1000000" },
        { label: "₹10 Lakh & Above", value: "1000000-999999999" },
      ];
    case "scooty":
      return [
        { label: "Under ₹50,000", value: "0-50000" },
        { label: "₹50,000 - ₹80,000", value: "50000-80000" },
        { label: "₹80,000 - ₹1.2 Lakh", value: "80000-120000" },
        { label: "₹1.2 - ₹2 Lakh", value: "120000-200000" },
        { label: "₹2 Lakh & Above", value: "200000-999999999" },
      ];
    case "cycle":
      return [
        { label: "Under ₹5,000", value: "0-5000" },
        { label: "₹5,000 - ₹10,000", value: "5000-10000" },
        { label: "₹10,000 - ₹20,000", value: "10000-20000" },
        { label: "₹20,000 - ₹50,000", value: "20000-50000" },
        { label: "₹50,000 - ₹1 Lakh", value: "50000-100000" },
        { label: "₹1 Lakh & Above", value: "100000-999999999" },
      ];
    default:
      return [];
  }
};

export default function SearchBar() {
  const router = useRouter();

  const [vehicleType, setVehicleType] = useState("scooty");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const [openAccordion, setOpenAccordion] = useState("");
  const [tempSelections, setTempSelections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef(null);

  // API Queries
  const { data: categoriesData } = useGetAllCategoryQuery();
  const { data: brandsData } = useGetAllBrandsQuery();
  const { data: bodyTypesData } = useGetAllBodyTypesApiQuery();
  const { data: colorsData } = useGetAllProductColorsApiQuery();
  const { data: drivetrainsData } = useGetAllDrivetrainsApiQuery();
  const { data: fuelTypesData } = useGetAllFuelTypesApiQuery();
  const { data: yearsData } = useGetAllManufacturingYearsTypesApiQuery();
  const { data: mileageData } = useGetAllMileagesTypesApiQuery();
  const { data: seatingData } = useGetAllSeatingCapacitiesApiQuery();
  const { data: sizesData } = useGetAllProductSizeApiQuery();
  const { data: transmissionData } = useGetAllTransmissionTypesApiQuery();
  const { data: weightsData } = useGetAllProductWeightsApiQuery();
  const { data: brakesData } = useGetAllBrakesApiQuery();
  const { data: ccTypesData } = useGetAllCcTypesApiQuery();
  const { data: fuelTankTypesData } = useGetAllFuelTankTypesApiQuery();
  const { data: gearboxesData } = useGetAllGearboxesApiQuery();
  const { data: powersData } = useGetAllPowersApiQuery();
  const { data: seatHeightsData } = useGetAllSeatHeightsApiQuery();
  const { data: topSpeedTypesData } = useGetAllTopSpeedTypesApiQuery();
  const { data: torquesData } = useGetAllTorquesApiQuery();

  const { data: searchData, isLoading: isSearching } =
    useGetCardListProductsApiQuery(
      { limit: 5, search: searchQuery },
      { skip: searchQuery.length < 1 },
    );

  const searchedProducts = searchData?.data?.products || [];

  // Get category mapping
  const categories = getApiData(categoriesData);
  const getCategoryIdBySlug = (slug) => {
    const category = categories.find((cat) => cat.slug === slug);
    return category?._id || "";
  };

  // Map API data to filter options
  const mapToOptions = (data, nameKey = "name_en", valueKey = "_id") => {
    if (!Array.isArray(data)) return [];

    return data
      .map((item) => ({
        label: item[nameKey] || item.name || "Unknown",
        value: item[valueKey] || item.id || item._id || item.name,
      }))
      .filter((opt) => opt.label && opt.value);
  };

  // Get vehicle type options
  const vehicleTypes = [
    { value: "car", label: "Car", icon: "car", slug: "car" },
    { value: "bike", label: "Bike", icon: "bike", slug: "bike" },
    { value: "scooty", label: "Scooty", icon: "scooty", slug: "scooty" },
    { value: "cycle", label: "Cycle", icon: "cycle", slug: "cycle" },
  ];

  const iconMap = {
    car: <BiCar className="text-lg" />,
    bike: <RiMotorbikeFill className="text-lg" />,
    scooty: <GiScooter className="text-lg" />,
    cycle: <BiCycling className="text-lg" />,
  };

  // Filter options for all vehicle types
  const filterOptions = {
    budget: formatPriceRanges(vehicleType),
    brand: mapToOptions(getApiData(brandsData)),
    bodyType: mapToOptions(getApiData(bodyTypesData)),
    color: mapToOptions(getApiData(colorsData)),
    drivetrain: mapToOptions(getApiData(drivetrainsData)),
    fuelType: mapToOptions(getApiData(fuelTypesData)),
    manufacturingYear: mapToOptions(getApiData(yearsData)),
    mileage: mapToOptions(getApiData(mileageData)),
    seatingCapacity: mapToOptions(getApiData(seatingData)),
    size: mapToOptions(getApiData(sizesData)),
    transmission: mapToOptions(getApiData(transmissionData)),
    weight: mapToOptions(getApiData(weightsData)),

    brakes: mapToOptions(getApiData(brakesData)),
    ccType: mapToOptions(getApiData(ccTypesData)),
    fuelTankType: mapToOptions(getApiData(fuelTankTypesData)),
    gearbox: mapToOptions(getApiData(gearboxesData)),
    power: mapToOptions(getApiData(powersData)),
    seatHeight: mapToOptions(getApiData(seatHeightsData)),
    topSpeed: mapToOptions(getApiData(topSpeedTypesData)),
    torque: mapToOptions(getApiData(torquesData)),
  };

  // Filter sections structure (updated with proper icons)
  const filterSections = [
    { id: "budget", title: "Budget", icon: "budget" },
    { id: "brand", title: "Brand", icon: "brand" },
    { id: "bodyType", title: "Body Type", icon: "body" },
    { id: "fuelType", title: "Fuel Type", icon: "fuel" },
    { id: "transmission", title: "Transmission", icon: "transmission" },
    { id: "color", title: "Color", icon: "color" },
    { id: "manufacturingYear", title: "Year", icon: "year" },
    { id: "mileage", title: "Mileage", icon: "mileage" },
    { id: "seatingCapacity", title: "Seating", icon: "seating" },
    { id: "size", title: "Size", icon: "size" },
    { id: "weight", title: "Weight", icon: "weight" },
    { id: "drivetrain", title: "Drivetrain", icon: "drivetrain" },
    { id: "ccType", title: "Engine CC", icon: "engine" },
    { id: "power", title: "Power", icon: "power" },
    { id: "seatHeight", title: "Seat Height", icon: "size" },
    { id: "fuelTankType", title: "Fuel Tank", icon: "fuel" },
    { id: "gearbox", title: "Gearbox", icon: "gears" },
    { id: "topSpeed", title: "Top Speed", icon: "speed" },
    { id: "torque", title: "Torque", icon: "engine" },
    { id: "brakes", title: "Brakes", icon: "suspension" },
  ];

  // Filter buttons for quick access - matching previous design
  const filterButtons = {
    car: [
      {
        id: "budget",
        icon: <MdAttachMoney className="text-lg" />,
        label: "Budget",
      },
      {
        id: "bodyType",
        icon: <FaCarSide className="text-lg" />,
        label: "Body Type",
      },
      {
        id: "fuelType",
        icon: <FaGasPump className="text-lg" />,
        label: "Fuel Type",
      },
      {
        id: "color",
        icon: <MdColorLens className="text-lg" />,
        label: "Color",
      },
    ],

    bike: [
      {
        id: "budget",
        icon: <MdAttachMoney className="text-lg" />,
        label: "Budget",
      },
      {
        id: "brand",
        icon: <MdBrandingWatermark className="text-lg" />,
        label: "Brand",
      },
      {
        id: "fuelType",
        icon: <FaGasPump className="text-lg" />,
        label: "Fuel Type",
      },
      {
        id: "mileage",
        icon: <MdSpeed className="text-lg" />,
        label: "Mileage",
      },
    ],

    scooty: [
      {
        id: "budget",
        icon: <MdAttachMoney className="text-lg" />,
        label: "Budget",
      },
      {
        id: "brand",
        icon: <MdBrandingWatermark className="text-lg" />,
        label: "Brand",
      },
      { id: "size", icon: <MdStraighten className="text-lg" />, label: "Size" },
      {
        id: "weight",
        icon: <MdFitnessCenter className="text-lg" />,
        label: "Weight",
      },
      {
        id: "mileage",
        icon: <MdSpeed className="text-lg" />,
        label: "Mileage",
      },
    ],

    cycle: [
      {
        id: "budget",
        icon: <MdAttachMoney className="text-lg" />,
        label: "Budget",
      },
      {
        id: "brand",
        icon: <MdBrandingWatermark className="text-lg" />,
        label: "Brand",
      },
      { id: "size", icon: <MdStraighten className="text-lg" />, label: "Size" },
      {
        id: "weight",
        icon: <MdFitnessCenter className="text-lg" />,
        label: "Weight",
      },
    ],
  };

  // Event handlers
  const openFilterModal = useCallback((filterType) => {
    setActiveFilter(filterType);
    setIsModalOpen(true);
    setOpenAccordion(filterType === "all" ? "" : filterType);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setActiveFilter("");
    setOpenAccordion("");
  }, []);

  const toggleAccordion = useCallback((section) => {
    setOpenAccordion((prev) => (prev === section ? "" : section));
  }, []);

  const handleOptionClick = useCallback((sectionId, optionValue) => {
    setTempSelections((prev) => {
      const currentSection = prev[sectionId] || [];
      const isSelected = currentSection.includes(optionValue);

      if (isSelected) {
        return {
          ...prev,
          [sectionId]: currentSection.filter((v) => v !== optionValue),
        };
      } else {
        return {
          ...prev,
          [sectionId]: [...currentSection, optionValue],
        };
      }
    });
  }, []);

  const clearFilters = useCallback(() => {
    setTempSelections({});
  }, []);

  const handleSearch = useCallback(() => {
    if (searchQuery && searchedProducts.length === 0) {
      setSearchQuery("");
      setShowSuggestions(false);
      return;
    }

    // Prepare search parameters
    const params = new URLSearchParams();

    // Add search query
    if (searchQuery) {
      params.append("search", searchQuery);
    }

    // Add vehicle type (category)
    const selectedVehicle = vehicleTypes.find((v) => v.value === vehicleType);
    if (selectedVehicle) {
      const categoryId = getCategoryIdBySlug(selectedVehicle.slug);
      if (categoryId) {
        params.append("category", categoryId);
      }
    }

    // Add filter selections
    Object.entries(tempSelections).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        values.forEach((value) => {
          params.append(key, value);
        });
      }
    });

    // Navigate to search results page
    router.push(`/search?${params.toString()}`);
  }, [
    searchQuery,
    searchedProducts.length,
    vehicleType,
    tempSelections,
    router,
  ]);

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Main Search Bar - Matching previous design */}
      <div className="w-full bg-white shadow-lg rounded-xl p-4 lg:px-8 lg:py-6 max-w-sm md:mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            Find Your Perfect Scooty
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Search and filter vehicles based on your preferences
          </p>
        </header>

        {/* Vehicle Type Dropdown + Search */}
        <div className="flex gap-4 border border-gray-200 rounded-full pl-1 pr-3 lg:px-1 py-1 focus-within:border-secondary transition-colors duration-200">
          {/* Search box */}
          <div
            ref={searchWrapperRef}
            className="relative flex items-center w-full"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              onKeyPress={handleKeyPress}
              placeholder={`Search ${vehicleType}s...`}
              className="w-full py-2 lg:px-3 outline-none text-sm bg-transparent text-gray-900 placeholder-gray-500"
              aria-label="Search vehicles"
            />

            <button
              className="flex items-center justify-between w-full px-5 py-2 gap-2 text-sm font-medium rounded-full bg-secondary text-white cursor-default max-w-28 cursor-pointer"
              aria-label="Search"
              onClick={handleSearch}
            >
              <FiSearch className="text-white text-xl hover:text-secondary transition-colors duration-200" />
              <span>Search</span>
            </button>

            {showSuggestions && searchQuery.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                {isSearching ? (
                  <p className="p-4 text-sm text-center text-gray-500">
                    Searching...
                  </p>
                ) : searchedProducts.length ? (
                  <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
                    {searchedProducts.map((item) => (
                      <li key={item._id}>
                        <button
                          onClick={() => {
                            setShowSuggestions(false);
                            router.push(`/${item.slug}`);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left"
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
                            className="rounded-md border border-gray-200 object-cover"
                          />

                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-800 line-clamp-1">
                              {item.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              ₹ {item.price}
                            </span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-sm text-center text-gray-500">
                    No results found
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Filter Buttons - Vehicle Specific */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          {/* All Filters Button */}
          <FilterButton
            icon={<BsSliders />}
            label="All Filters"
            onClick={() => openFilterModal("all")}
          />

          {(filterButtons[vehicleType] || []).map((button) => (
            <FilterButton
              key={button.id}
              icon={button.icon}
              label={button.label}
              onClick={() => openFilterModal(button.id)}
            />
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <FilterModal
          vehicleType={vehicleType}
          filterType={activeFilter}
          openAccordion={openAccordion}
          tempSelections={tempSelections}
          onToggleAccordion={toggleAccordion}
          onOptionSelect={handleOptionClick}
          onClear={clearFilters}
          onApply={handleSearch}
          onClose={closeModal}
          filterSections={filterSections}
          filterOptions={filterOptions}
        />
      )}
    </>
  );
}

function FilterButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex text-nowrap items-center gap-2 border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 px-4 py-2"
      aria-label={`Filter by ${label}`}
    >
      <span className="text-lg text-secondary">{icon}</span>
      <span className="font-medium">{label}</span>
      <FiChevronDown className="text-gray-400 ml-1" />
    </button>
  );
}

function FilterModal({
  filterType,
  openAccordion,
  tempSelections,
  onToggleAccordion,
  onOptionSelect,
  onClear,
  onApply,
  onClose,
  filterSections,
  filterOptions,
}) {
  const sectionsToShow =
    filterType === "all"
      ? filterSections
      : filterSections.filter((section) => section.id === filterType);

  const selectedCount = Object.values(tempSelections).flat().length;

  return (
    <div
      className="fixed inset-0 top-20 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Filter options"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[65vh] lg:max-h-[70vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-2 lg:px-6 py-2 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {filterType === "all"
                ? "All Filters"
                : `Filter by ${filterSections.find((f) => f.id === filterType)?.title || filterType}`}
            </h2>
            {selectedCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                {selectedCount} filter(s) selected
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close modal"
          >
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[30vh] lg:max-h-[35vh]">
          {sectionsToShow.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No filters available for this vehicle type
            </div>
          ) : (
            <div className="space-y-3">
              {sectionsToShow.map((section) => {
                const options = filterOptions[section.id] || [];
                if (options.length === 0) return null;

                return (
                  <FilterAccordion
                    key={section.id}
                    section={section}
                    isOpen={openAccordion === section.id}
                    onToggle={() => onToggleAccordion(section.id)}
                    options={options}
                    selectedValues={tempSelections[section.id] || []}
                    onOptionSelect={onOptionSelect}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Filters Chips */}
        {selectedCount > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {Object.entries(tempSelections).map(([sectionId, options]) =>
                options.map((option, index) => {
                  const section = filterSections.find(
                    (s) => s.id === sectionId,
                  );
                  const optionData = filterOptions[sectionId]?.find(
                    (o) => o.value === option,
                  );

                  return (
                    <div
                      key={`${sectionId}-${option}`}
                      className="flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm"
                    >
                      <span>{optionData?.label || option}</span>
                      <button
                        onClick={() => onOptionSelect(sectionId, option)}
                        className="ml-1 hover:text-secondary/80 transition-colors duration-200"
                        aria-label={`Remove ${optionData?.label || option} filter`}
                      >
                        <FiX className="text-sm" />
                      </button>
                    </div>
                  );
                }),
              )}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <footer className="flex items-center justify-between px-2 lg:px-6 py-2 border-t border-gray-200">
          <button
            onClick={onClear}
            className="px-2 md:px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            aria-label="Clear all filters"
          >
            Clear All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-2 md:px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onApply}
              className="px-2 md:px-6 py-2 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-200"
            >
              Apply Filters
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
