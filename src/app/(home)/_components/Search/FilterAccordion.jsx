"use client";

import { BsChevronRight } from "react-icons/bs";
import {
  MdLocalGasStation,
  MdColorLens,
  MdCalendarToday,
  MdSpeed,
} from "react-icons/md";
import { RiCarWashingFill, RiSettings5Line } from "react-icons/ri";
import {
  GiGearStickPattern,
  GiWeight,
  GiPowerLightning,
  GiCycle,
  GiCarWheel,
} from "react-icons/gi";
import { BsCarFront, BsGearWideConnected } from "react-icons/bs";
import {
  IoCarSportOutline,
  IoShieldCheckmarkOutline,
  IoBatteryCharging,
} from "react-icons/io5";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaTachometerAlt, FaCogs } from "react-icons/fa";
import { TbEngine } from "react-icons/tb";

const iconMap = {
  budget: <BiPurchaseTagAlt className="text-base" />,
  brand: <BsCarFront className="text-base" />,
  body: <RiCarWashingFill className="text-base" />,
  fuel: <MdLocalGasStation className="text-base" />,
  transmission: <GiGearStickPattern className="text-base" />,
  seating: <IoCarSportOutline className="text-base" />,
  type: <BsCarFront className="text-base" />,
  engine: <TbEngine className="text-base" />,
  range: <FaTachometerAlt className="text-base" />,
  size: <GiCycle className="text-base" />,
  year: <MdCalendarToday className="text-base" />,
  color: <MdColorLens className="text-base" />,
  features: <RiSettings5Line className="text-base" />,
  drivetrain: <GiCarWheel className="text-base" />,
  mileage: <MdSpeed className="text-base" />,
  weight: <GiWeight className="text-base" />,
  power: <GiPowerLightning className="text-base" />,
  battery: <IoBatteryCharging className="text-base" />,
  charging: <IoBatteryCharging className="text-base" />,
  speed: <MdSpeed className="text-base" />,
  warranty: <IoShieldCheckmarkOutline className="text-base" />,
  gears: <BsGearWideConnected className="text-base" />,
  material: <GiWeight className="text-base" />,
  electric: <IoBatteryCharging className="text-base" />,
  suspension: <FaCogs className="text-base" />,
};

export function FilterAccordion({
  section,
  isOpen,
  onToggle,
  options,
  selectedValues = [],
  onOptionSelect,
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-300">
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full p-4 text-left transition-all duration-200 ${
          isOpen
            ? "bg-secondary/10 border-b border-gray-200"
            : "hover:bg-gray-50"
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-secondary">{iconMap[section.icon]}</span>
          <div>
            <h4 className="font-semibold text-gray-900">{section.title}</h4>
            {selectedValues.length > 0 && (
              <p className="text-sm text-secondary mt-1">
                {selectedValues.length} selected
              </p>
            )}
          </div>
        </div>
        <BsChevronRight
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {options.map((option, index) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  key={index}
                  onClick={() => onOptionSelect(section.id, option.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                    isSelected
                      ? "border-secondary bg-secondary/10 text-secondary shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="text-sm font-medium text-gray-900 text-center">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
