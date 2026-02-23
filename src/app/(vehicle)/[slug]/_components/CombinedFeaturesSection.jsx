"use client";

import React, { useState } from "react";
import {
  FaCog,
  FaShieldAlt,
  FaWrench,
  FaPalette,
  FaStar,
  FaWeight,
  FaRuler,
  FaUsers,
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
  FaBolt,
  FaRoad,
  FaCalendar,
  FaTachometerAlt,
  FaDollarSign,
  FaCreditCard,
  FaFire,
  FaBell,
} from "react-icons/fa";
import {
  GiScooter,
  GiGearStickPattern,
  GiCarDoor,
  GiSpeedometer,
} from "react-icons/gi";
import {
  MdLocalGasStation,
  MdSpeed,
  MdSettings,
  MdOutlineStorage,
} from "react-icons/md";
import { IoIosSpeedometer } from "react-icons/io";
import { TbEngine } from "react-icons/tb";
import { BsSpeedometer2 } from "react-icons/bs";
import { AiOutlineSafety } from "react-icons/ai";

const CombinedFeaturesSection = ({ product }) => {
  const [activeSection, setActiveSection] = useState("engine");

  // Format value
  const formatValue = (value, type = "text") => {
    if (!value || value === "") {
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
      ) : value === "no" ? (
        <span className="text-gray-500">No</span>
      ) : (
        <span className="text-red-500">N/A</span>
      );
    }

    return value;
  };

  // All specification sections matching AddProductPage
  const specificationSections = [
    {
      id: "engine",
      title: "Engine / Motor Type",
      icon: <TbEngine />,
      fields: [
        {
          label: "Engine/Motor Type",
          key: "engineMotorType",
          icon: <FaCog />,
          type: "text",
        },
        {
          label: "Mileage (Claimed)",
          key: "mileageClaimed",
          icon: <GiSpeedometer />,
          type: "text",
        },
        {
          label: "Engine Capacity",
          key: "engineCapacity",
          icon: <MdLocalGasStation />,
          type: "text",
        },
        {
          label: "Mileage (Real World)",
          key: "mileageRealWorld",
          icon: <BsSpeedometer2 />,
          type: "text",
        },
        {
          label: "Fuel Tank Capacity",
          key: "fuelTankCapacity",
          icon: <MdLocalGasStation />,
          type: "text",
        },
        {
          label: "BS Norm",
          key: "bsNorm",
          icon: <FaCertificate />,
          type: "text",
        },
        {
          label: "Battery Type",
          key: "batteryType",
          icon: <FaCarBattery />,
          type: "text",
        },
        {
          label: "Battery Capacity",
          key: "batteryCapacity",
          icon: <FaBatteryHalf />,
          type: "text",
        },
        {
          label: "Range (Claimed)",
          key: "rangeClaimed",
          icon: <FaRoad />,
          type: "text",
        },
        {
          label: "Charging Time",
          key: "chargingTime",
          icon: <FaStopwatch />,
          type: "text",
        },
        {
          label: "Fast Charging",
          key: "fastCharging",
          icon: <FaBolt />,
          type: "yesno",
        },
      ],
    },
    {
      id: "performance",
      title: "Performance",
      icon: <MdSpeed />,
      fields: [
        {
          label: "Boot Space",
          key: "bootSpace",
          icon: <GiCarDoor />,
          type: "text",
        },
        {
          label: "Underseat Storage",
          key: "underseatStorage",
          icon: <MdOutlineStorage />,
          type: "text",
        },
        {
          label: "External Fuel Lid",
          key: "externalFuelLid",
          icon: <MdLocalGasStation />,
          type: "text",
        },
        {
          label: "Seat Type",
          key: "seatType",
          icon: <FaChair />,
          type: "text",
        },
        {
          label: "Grab Rail",
          key: "grabRail",
          icon: <FaChair />,
          type: "text",
        },
        {
          label: "CC",
          key: "cc.name_en",
          icon: <FaTachometerAlt />,
          type: "text",
        },
        {
          label: "Power",
          key: "power.name_en",
          icon: <FaBolt />,
          type: "text",
        },
        {
          label: "Torque",
          key: "torque.name_en",
          icon: <IoIosSpeedometer />,
          type: "text",
        },
        {
          label: "Top Speed",
          key: "topSpeed.name_en",
          icon: <MdSpeed />,
          type: "text",
        },
        {
          label: "Gear Box",
          key: "gearboxe.name_en",
          icon: <GiGearStickPattern />,
          type: "text",
        },
        {
          label: "Drivetrain",
          key: "drivetrain.name_en",
          icon: <GiScooter />,
          type: "text",
        },
      ],
    },
    {
      id: "brakes",
      title: "Brakes, Tyres & Safety",
      icon: <FaTired />,
      fields: [
        {
          label: "Front Brake",
          key: "frontBrake",
          icon: <FaTired />,
          type: "text",
        },
        {
          label: "Rear Brake",
          key: "rearBrake",
          icon: <FaTired />,
          type: "text",
        },
        {
          label: "Combi Braking (CBS)",
          key: "combiBraking",
          icon: <FaShieldAlt />,
          type: "yesno",
        },
        {
          label: "ABS",
          key: "abs",
          icon: <AiOutlineSafety />,
          type: "yesno",
        },
        {
          label: "Tyre Type",
          key: "tyreType",
          icon: <FaTired />,
          type: "text",
        },
        {
          label: "Brakes",
          key: "brake.name_en",
          icon: <FaTired />,
          type: "text",
        },
      ],
    },
    {
      id: "features",
      title: "Features & Technology",
      icon: <MdSettings />,
      fields: [
        {
          label: "Instrument Console",
          key: "instrumentConsole",
          icon: <FaTachometerAlt />,
          type: "text",
        },
        {
          label: "Bluetooth Connectivity",
          key: "bluetoothConnectivity",
          icon: <FaWifi />,
          type: "text",
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
        {
          label: "Key Type",
          key: "keyType",
          icon: <FaKey />,
          type: "text",
        },
        {
          label: "Anti-Theft",
          key: "antiTheft",
          icon: <FaShieldAlt />,
          type: "text",
        },
      ],
    },
    {
      id: "others",
      title: "Others",
      icon: <FaWrench />,
      fields: [
        {
          label: "Body Type",
          key: "bodyType.name_en",
          icon: <GiScooter />,
          type: "text",
        },
        {
          label: "Drivetrain",
          key: "drivetrain.name_en",
          icon: <GiScooter />,
          type: "text",
        },
        {
          label: "Fuel Type",
          key: "fuelType.name_en",
          icon: <MdLocalGasStation />,
          type: "text",
        },
        {
          label: "Manufacturing Year",
          key: "manufacturingYear.name_en",
          icon: <FaCalendar />,
          type: "text",
        },
        {
          label: "Mileage",
          key: "mileage.name_en",
          icon: <FaRoad />,
          type: "text",
        },
        {
          label: "Seating Capacity",
          key: "seatingCapacity.name_en",
          icon: <FaUsers />,
          type: "text",
        },
        {
          label: "Transmission",
          key: "transmission.name_en",
          icon: <GiGearStickPattern />,
          type: "text",
        },
        {
          label: "Weight",
          key: "weight.name_en",
          icon: <FaWeight />,
          type: "text",
        },
        {
          label: "Size",
          key: "size.name_en",
          icon: <FaRuler />,
          type: "text",
        },
        {
          label: "Fuel Tank",
          key: "fuelTank.name_en",
          icon: <MdLocalGasStation />,
          type: "text",
        },
        {
          label: "Seat Height",
          key: "seatHeight.name_en",
          icon: <FaChair />,
          type: "text",
        },
      ],
    },
  ];

  // Get nested value from object
  const getNestedValue = (obj, path) => {
    if (!obj) return undefined;

    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  // Get value for a field
  const getFieldValue = (field) => {
    const value = getNestedValue(product, field.key);

    // Handle nested object values (like name_en)
    if (field.key.includes(".") && typeof value === "object") {
      return value && value.name_en
        ? value.name_en
        : formatValue(value, field.type);
    }

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
                  <span className="hidden sm:inline">{section.title}</span>
                  <span className="sm:hidden">
                    {section.title.split(" ")[0]}
                  </span>
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
                <span className="text-primary text-2xl">
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

        {/* Empty State */}
        {activeSectionFields.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">
              {specificationSections.find((s) => s.id === activeSection)?.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Specifications Added
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Specifications for this section have not been added yet. Check
              back later or explore other sections.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CombinedFeaturesSection;
