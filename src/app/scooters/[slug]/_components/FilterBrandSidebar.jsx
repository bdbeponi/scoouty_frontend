"use client";

import { useState, useEffect, useMemo } from "react";
import { FiFilter, FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  MdAttachMoney,
  MdBrandingWatermark,
  MdColorLens,
  MdSpeed,
  MdStraighten,
  MdFitnessCenter,
  MdDirectionsCar,
  MdLocalGasStation,
  MdSettings,
  MdChair,
  MdCalendarToday,
  MdTune,
  MdOilBarrel,
  MdEngineering,
  MdPower,
  MdHeight,
  MdRocketLaunch,
  MdRotateRight,
  MdStop,
} from "react-icons/md";

// All API hooks for scooty
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

// Additional APIs for scooty
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

const FilterAccordion = ({ title, icon, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-600">{icon}</span>
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {isOpen ? (
          <FiChevronUp className="text-gray-500" />
        ) : (
          <FiChevronDown className="text-gray-500" />
        )}
      </button>
      {isOpen && <div className="pb-4 px-4">{children}</div>}
    </div>
  );
};

const FilterCheckbox = ({ label, value, checked, onChange }) => {
  return (
    <label className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 px-2 rounded">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          value={value}
          className="h-4 w-4 text-secondary rounded border-gray-300 focus:ring-secondary"
        />
        <span className="text-gray-700">{label}</span>
      </div>
    </label>
  );
};

const PriceRangeSlider = ({
  minPrice,
  maxPrice,
  onChange,
  min = 0,
  max = 1000000,
}) => {
  const [localMin, setLocalMin] = useState(minPrice || min);
  const [localMax, setLocalMax] = useState(maxPrice || max);

  useEffect(() => {
    setLocalMin(minPrice || min);
    setLocalMax(maxPrice || max);
  }, [minPrice, maxPrice, min, max]);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value) || min;
    if (value <= localMax) {
      setLocalMin(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value) || max;
    if (value >= localMin) {
      setLocalMax(value);
    }
  };

  const handleBlur = () => {
    onChange(localMin, localMax);
  };

  const minPercent = ((localMin - min) / (max - min)) * 100;
  const maxPercent = ((localMax - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="relative h-2">
        <div className="absolute h-2 w-full rounded-full bg-gray-300">
          <div
            className="absolute h-2 rounded-full bg-secondary"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={localMin}
          onChange={handleMinChange}
          onMouseUp={handleBlur}
          onTouchEnd={handleBlur}
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localMax}
          onChange={handleMaxChange}
          onMouseUp={handleBlur}
          onTouchEnd={handleBlur}
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Min Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(parseInt(e.target.value) || min)}
              onBlur={handleBlur}
              min={min}
              max={localMax}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-600 mb-1">Max Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <input
              type="number"
              value={localMax}
              onChange={(e) => setLocalMax(parseInt(e.target.value) || max)}
              onBlur={handleBlur}
              min={localMin}
              max={max}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FilterBrandSidebar({
  currentFilters,
  onFilterChange,
  onClearFilters,
}) {
  const [openSections, setOpenSections] = useState({});
  const [localFilters, setLocalFilters] = useState(currentFilters || {});

  // Update local filters when currentFilters prop changes
  useEffect(() => {
    setLocalFilters(currentFilters || {});
  }, [currentFilters]);

  // API Queries - All APIs for scooty
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

  // Additional APIs for scooty
  const { data: brakesData } = useGetAllBrakesApiQuery();
  const { data: ccTypesData } = useGetAllCcTypesApiQuery();
  const { data: fuelTankTypesData } = useGetAllFuelTankTypesApiQuery();
  const { data: gearboxesData } = useGetAllGearboxesApiQuery();
  const { data: powersData } = useGetAllPowersApiQuery();
  const { data: seatHeightsData } = useGetAllSeatHeightsApiQuery();
  const { data: topSpeedTypesData } = useGetAllTopSpeedTypesApiQuery();
  const { data: torquesData } = useGetAllTorquesApiQuery();

  // Map API data to options - All filters for scooty
  const filterOptions = useMemo(
    () => ({
      bodyType: getApiData(bodyTypesData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      fuelType: getApiData(fuelTypesData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      transmission: getApiData(transmissionData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      color: getApiData(colorsData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      manufacturingYear: getApiData(yearsData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      mileage: getApiData(mileageData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      seatingCapacity: getApiData(seatingData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      size: getApiData(sizesData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      weight: getApiData(weightsData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      drivetrain: getApiData(drivetrainsData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      brakes: getApiData(brakesData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      ccType: getApiData(ccTypesData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      fuelTankType: getApiData(fuelTankTypesData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      gearbox: getApiData(gearboxesData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      power: getApiData(powersData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      seatHeight: getApiData(seatHeightsData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      topSpeed: getApiData(topSpeedTypesData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
      torque: getApiData(torquesData).map((item) => ({
        label: item.name_en || item.name || "Unknown",
        value: item._id || item.id || item.name,
      })),
    }),
    [
      bodyTypesData,
      fuelTypesData,
      transmissionData,
      colorsData,
      yearsData,
      mileageData,
      seatingData,
      sizesData,
      weightsData,
      drivetrainsData,
      brakesData,
      ccTypesData,
      fuelTankTypesData,
      gearboxesData,
      powersData,
      seatHeightsData,
      topSpeedTypesData,
      torquesData,
    ],
  );

  // All filter sections for scooty
  const filterSections = [
    {
      id: "priceRange",
      title: "Price Range",
      icon: <MdAttachMoney className="text-lg" />,
      component: (
        <PriceRangeSlider
          minPrice={parseInt(localFilters.minPrice) || 0}
          maxPrice={parseInt(localFilters.maxPrice) || 1000000}
          onChange={(min, max) => {
            const newFilters = { ...localFilters };
            if (min > 0) newFilters.minPrice = min.toString();
            else newFilters.minPrice = "";

            if (max < 1000000) newFilters.maxPrice = max.toString();
            else newFilters.maxPrice = "";

            setLocalFilters(newFilters);
            onFilterChange(newFilters);
          }}
        />
      ),
    },
    {
      id: "bodyType",
      title: "Body Type",
      icon: <MdDirectionsCar className="text-lg" />,
      options: filterOptions.bodyType,
    },
    {
      id: "fuelType",
      title: "Fuel Type",
      icon: <MdLocalGasStation className="text-lg" />,
      options: filterOptions.fuelType,
    },
    {
      id: "transmission",
      title: "Transmission",
      icon: <MdSettings className="text-lg" />,
      options: filterOptions.transmission,
    },
    {
      id: "color",
      title: "Color",
      icon: <MdColorLens className="text-lg" />,
      options: filterOptions.color,
    },
    {
      id: "manufacturingYear",
      title: "Manufacturing Year",
      icon: <MdCalendarToday className="text-lg" />,
      options: filterOptions.manufacturingYear,
    },
    {
      id: "mileage",
      title: "Mileage",
      icon: <MdSpeed className="text-lg" />,
      options: filterOptions.mileage,
    },
    {
      id: "seatingCapacity",
      title: "Seating Capacity",
      icon: <MdChair className="text-lg" />,
      options: filterOptions.seatingCapacity,
    },
    {
      id: "size",
      title: "Size",
      icon: <MdStraighten className="text-lg" />,
      options: filterOptions.size,
    },
    {
      id: "weight",
      title: "Weight",
      icon: <MdFitnessCenter className="text-lg" />,
      options: filterOptions.weight,
    },
    {
      id: "drivetrain",
      title: "Drivetrain",
      icon: <MdTune className="text-lg" />,
      options: filterOptions.drivetrain,
    },
    {
      id: "brakes",
      title: "Brakes",
      icon: <MdStop className="text-lg" />,
      options: filterOptions.brakes,
    },
    {
      id: "ccType",
      title: "Engine CC",
      icon: <MdEngineering className="text-lg" />,
      options: filterOptions.ccType,
    },
    {
      id: "fuelTankType",
      title: "Fuel Tank",
      icon: <MdOilBarrel className="text-lg" />,
      options: filterOptions.fuelTankType,
    },
    {
      id: "gearbox",
      title: "Gearbox",
      icon: <MdSettings className="text-lg" />,
      options: filterOptions.gearbox,
    },
    {
      id: "power",
      title: "Power",
      icon: <MdPower className="text-lg" />,
      options: filterOptions.power,
    },
    {
      id: "seatHeight",
      title: "Seat Height",
      icon: <MdHeight className="text-lg" />,
      options: filterOptions.seatHeight,
    },
    {
      id: "topSpeed",
      title: "Top Speed",
      icon: <MdRocketLaunch className="text-lg" />,
      options: filterOptions.topSpeed,
    },
    {
      id: "torque",
      title: "Torque",
      icon: <MdRotateRight className="text-lg" />,
      options: filterOptions.torque,
    },
  ];

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleCheckboxChange = (sectionId, value) => {
    const currentValues = localFilters[sectionId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    const newFilters = { ...localFilters, [sectionId]: newValues };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const getSelectedCount = (sectionId) => {
    if (sectionId === "priceRange") {
      return (localFilters.minPrice && localFilters.minPrice !== "") ||
        (localFilters.maxPrice && localFilters.maxPrice !== "")
        ? 1
        : 0;
    }
    return (localFilters[sectionId] || []).length;
  };

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FiFilter className="text-secondary" />
            Filters
          </h2>
          <button
            onClick={onClearFilters}
            className="text-sm text-gray-600 hover:text-secondary transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Filter Sections */}
      <div className="">
        {filterSections.map((section) => (
          <FilterAccordion
            key={section.id}
            title={`${section.title} ${getSelectedCount(section.id) > 0 ? `(${getSelectedCount(section.id)})` : ""}`}
            icon={section.icon}
            isOpen={openSections[section.id] || false}
            onToggle={() => toggleSection(section.id)}
          >
            {section.component ? (
              section.component
            ) : section.options && section.options.length > 0 ? (
              <div className="max-h-60 overflow-y-auto">
                {section.options.map((option) => (
                  <FilterCheckbox
                    key={option.value}
                    label={option.label}
                    value={option.value}
                    checked={(localFilters[section.id] || []).includes(
                      option.value,
                    )}
                    onChange={() =>
                      handleCheckboxChange(section.id, option.value)
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm py-2">No options available</p>
            )}
          </FilterAccordion>
        ))}
      </div>
    </div>
  );
}
