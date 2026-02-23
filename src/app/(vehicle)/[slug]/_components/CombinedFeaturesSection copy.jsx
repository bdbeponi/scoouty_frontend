"use client";

import React, { useState } from "react";
import {
  FaCog,
  FaShieldAlt,
  FaWrench,
  FaPalette,
  FaStar,
} from "react-icons/fa";
import { GiScooter, GiGearStickPattern, GiCarDoor } from "react-icons/gi";
import { MdLocalGasStation, MdSpeed } from "react-icons/md";
import { IoIosSpeedometer } from "react-icons/io";
import {
  FaRupeeSign,
  FaShoppingCart,
  FaCreditCard,
  FaRoad,
  FaUsers,
  FaRuler,
  FaWeight,
  FaCalendar,
  FaBriefcase,
  FaBox,
  FaChair,
  FaTired,
  FaKey,
  FaWifi,
  FaMapMarkerAlt,
  FaPlug,
  FaCarBattery,
  FaBatteryHalf,
  FaStopwatch,
  FaCertificate,
  FaFire,
  FaBell,
  FaTachometerAlt,
  FaBolt,
} from "react-icons/fa";

const CombinedFeaturesSection = ({ product }) => {
  const [activeSection, setActiveSection] = useState("dimensions");

  // Format value
  const formatValue = (value, type = "text") => {
    if (!value) {
      return <span className="text-red-500">N/A</span>;
    }

    if (type === "price" && typeof value === "string") {
      return `₹ ${parseInt(value).toLocaleString()}`;
    }

    if (type === "date") {
      return new Date(value).toLocaleDateString();
    }

    if (type === "yesno") {
      return value === "yes" ? (
        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-gray-500">No</span>
      );
    }

    return value;
  };

  // All specification sections (same as CompareSlugPage)
  const specificationSections = [
    {
      id: "dimensions",
      title: "Dimensions & Weight",
      fields: [
        { label: "Weight", key: "weight.name_en", icon: <FaWeight /> },
        { label: "Size", key: "size.name_en", icon: <FaRuler /> },
        {
          label: "Seating Capacity",
          key: "seatingCapacity.name_en",
          icon: <FaUsers />,
        },
        { label: "Boot Space", key: "bootSpace", icon: <GiCarDoor /> },
        {
          label: "Underseat Storage",
          key: "underseatStorage",
          icon: <FaBox />,
        },
      ],
    },
    {
      id: "engine",
      title: "Engine & Performance",
      fields: [
        { label: "Engine/Motor Type", key: "engineMotorType", icon: <FaCog /> },
        {
          label: "Engine Capacity",
          key: "engineCapacity",
          icon: <MdLocalGasStation />,
        },
        { label: "CC", key: "cc.name_en", icon: <FaTachometerAlt /> },
        { label: "Power", key: "power.name_en", icon: <FaBolt /> },
        { label: "Torque", key: "torque.name_en", icon: <IoIosSpeedometer /> },
        { label: "Top Speed", key: "topSpeed.name_en", icon: <MdSpeed /> },
        {
          label: "Gear Box",
          key: "gearboxe.name_en",
          icon: <GiGearStickPattern />,
        },
        {
          label: "Transmission",
          key: "transmission.name_en",
          icon: <GiGearStickPattern />,
        },
        { label: "Drivetrain", key: "drivetrain.name_en", icon: <GiScooter /> },
      ],
    },
    {
      id: "fuel",
      title: "Fuel & Battery",
      fields: [
        {
          label: "Fuel Type",
          key: "fuelType.name_en",
          icon: <MdLocalGasStation />,
        },
        {
          label: "Fuel Tank",
          key: "fuelTank.name_en",
          icon: <MdLocalGasStation />,
        },
        {
          label: "Fuel Tank Capacity",
          key: "fuelTankCapacity",
          icon: <MdLocalGasStation />,
        },
        { label: "BS Norm", key: "bsNorm", icon: <FaCertificate /> },
        { label: "Mileage", key: "mileage.name_en", icon: <FaRoad /> },
        { label: "Mileage (Claimed)", key: "mileageClaimed", icon: <FaRoad /> },
        {
          label: "Mileage (Real World)",
          key: "mileageRealWorld",
          icon: <FaRoad />,
        },
        { label: "Battery Type", key: "batteryType", icon: <FaCarBattery /> },
        {
          label: "Battery Capacity",
          key: "batteryCapacity",
          icon: <FaBatteryHalf />,
        },
        { label: "Range (Claimed)", key: "rangeClaimed", icon: <FaRoad /> },
        { label: "Charging Time", key: "chargingTime", icon: <FaStopwatch /> },
        {
          label: "Fast Charging",
          key: "fastCharging",
          icon: <FaBolt />,
          type: "yesno",
        },
      ],
    },
    {
      id: "body",
      title: "Body & Chassis",
      fields: [
        { label: "Body Type", key: "bodyType.name_en", icon: <GiScooter /> },
        { label: "Seat Height", key: "seatHeight.name_en", icon: <FaChair /> },
        { label: "Seat Type", key: "seatType", icon: <FaChair /> },
        {
          label: "External Fuel Lid",
          key: "externalFuelLid",
          icon: <MdLocalGasStation />,
        },
        { label: "Grab Rail", key: "grabRail", icon: <FaChair /> },
        {
          label: "Manufacturing Year",
          key: "manufacturingYear.name_en",
          icon: <FaCalendar />,
        },
      ],
    },
    {
      id: "brakes",
      title: "Brakes & Safety",
      fields: [
        { label: "Brakes", key: "brake.name_en", icon: <FaTired /> },
        { label: "Front Brake", key: "frontBrake", icon: <FaTired /> },
        { label: "Rear Brake", key: "rearBrake", icon: <FaTired /> },
        {
          label: "Combi Braking",
          key: "combiBraking",
          icon: <FaShieldAlt />,
          type: "yesno",
        },
        { label: "ABS", key: "abs", icon: <FaShieldAlt />, type: "yesno" },
        { label: "Tyre Type", key: "tyreType", icon: <FaTired /> },
      ],
    },
    {
      id: "features",
      title: "Features & Technology",
      fields: [
        {
          label: "Instrument Console",
          key: "instrumentConsole",
          icon: <FaTachometerAlt />,
        },
        {
          label: "Bluetooth Connectivity",
          key: "bluetoothConnectivity",
          icon: <FaWifi />,
        },
        {
          label: "Navigation Support",
          key: "navigationSupport",
          icon: <FaMapMarkerAlt />,
          type: "yesno",
        },
        {
          label: "USB Charging",
          key: "usbCharging",
          icon: <FaPlug />,
          type: "yesno",
        },
        { label: "Key Type", key: "keyType", icon: <FaKey /> },
        { label: "Anti-Theft", key: "antiTheft", icon: <FaShieldAlt /> },
      ],
    },
  ];

  // Get nested value from object
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  // Get value for a field
  const getFieldValue = (field) => {
    if (field.format) {
      return field.format(product);
    }

    const value = getNestedValue(product, field.key);
    return formatValue(value, field.type || "text");
  };

  // Get active section fields
  const activeSectionFields =
    specificationSections.find((section) => section.id === activeSection)
      ?.fields || [];

  return (
    <section id="combined-features" className="scroll-mt-24">
      <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 sm:p-6 lg:p-8 mb-8">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Features & Specifications
          </h3>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {specificationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-2 py-1 md:px-3 md:py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <span>{section.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Section Content */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Section Header */}
          <div className="border-b border-gray-200">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <span className="text-primary">
                  {
                    specificationSections.find((s) => s.id === activeSection)
                      ?.icon
                  }
                </span>
                {
                  specificationSections.find((s) => s.id === activeSection)
                    ?.title
                }
              </h2>
            </div>
          </div>

          {/* Section Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {activeSectionFields.map((field, index) => (
                  <tr
                    key={`${activeSection}-${index}`}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="p-4 border-r border-gray-200 w-1/2">
                      <div className="flex items-center gap-3">
                        <div className="size-6 lg:size-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary text-xs md:text-sm">
                            {field.icon}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 block">
                            {field.label}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">
                        {getFieldValue(field)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedFeaturesSection;
