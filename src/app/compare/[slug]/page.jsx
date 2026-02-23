// src/app/compare/[...slug]/page.jsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaPlus,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSearch,
  FaRupeeSign,
  FaMotorcycle,
  FaBicycle,
  FaGasPump,
  FaBolt,
  FaBatteryFull,
  FaUsers,
  FaRuler,
  FaWeight,
  FaPalette,
  FaCalendar,
  FaCog,
  FaShieldAlt,
  FaTachometerAlt,
  FaWrench,
  FaStar,
  FaFire,
  FaShoppingCart,
  FaCreditCard,
  FaRoad,
  FaTired,
  FaKey,
  FaWifi,
  FaMapMarkerAlt,
  FaPlug,
  FaBriefcase,
  FaChair,
  FaBox,
  FaBatteryHalf,
  FaGasPump as FaGasPumpIcon,
  FaTachometerAlt as FaSpeedometer,
  FaCarBattery,
  FaStopwatch,
  FaCertificate,
  FaTools,
  FaBell,
  FaMobileAlt,
  FaSatelliteDish,
} from "react-icons/fa";
import { GiGearStickPattern, GiCarDoor, GiScooter } from "react-icons/gi";
import { MdElectricCar, MdSpeed, MdLocalGasStation } from "react-icons/md";
import { IoMdFlash, IoIosSpeedometer } from "react-icons/io";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  useGetProductBySlugApiQuery,
  useGetCardListProductsApiQuery,
} from "@/redux/features/productApi";
import { baseUriBackend } from "@/redux/url/url";
import LoadingSpinner from "./_components/LoadingSpinner";
import EmptyState from "./_components/EmptyState";

const CompareSlugPage = () => {
  const params = useParams();
  const router = useRouter();

  // Extract slugs from URL
  const slugParam = params.slug;
  const slugs = useMemo(() => {
    if (!slugParam) return [];
    if (Array.isArray(slugParam)) {
      return slugParam
        .flatMap((s) => s.split("-vs-"))
        .filter(Boolean)
        .slice(0, 3);
    }
    return slugParam.split("-vs-").filter(Boolean).slice(0, 3);
  }, [slugParam]);

  // Fetch each product
  const productQueries = slugs.map((slug) => useGetProductBySlugApiQuery(slug));

  // Check loading state
  const isLoading = productQueries.some((query) => query.isLoading);

  // Extract product data
  const products = useMemo(
    () =>
      productQueries
        .map((query) => query.data?.data)
        .filter((product) => product && product._id),
    [productQueries],
  );

  // State for search modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Search products query
  const { data: searchData } = useGetCardListProductsApiQuery(
    { limit: 100, search: debouncedSearch },
    { skip: !showAddModal || debouncedSearch.length < 1 },
  );

  // Get vehicle image
  const getVehicleImage = (product) => {
    if (product?.galleryImages?.[0]) {
      return `${baseUriBackend}${product.galleryImages[0]}`;
    }
    if (product?.variations?.[0]?.images?.[0]) {
      return `${baseUriBackend}${product.variations[0].images[0]}`;
    }
    return "/images/default-vehicle.png";
  };

  // Get vehicle type icon
  const getVehicleTypeIcon = (product) => {
    const category = product?.category?.name?.toLowerCase();
    if (category?.includes("car"))
      return <GiScooter className="text-blue-500" />;
    if (category?.includes("bike") || category?.includes("motorcycle")) {
      return <FaMotorcycle className="text-red-500" />;
    }
    if (category?.includes("scooty") || category?.includes("scooter")) {
      return <FaBicycle className="text-green-500" />;
    }
    return <GiScooter className="text-gray-500" />;
  };

  // Helper function to check if value exists
  const hasValue = (value) => {
    if (value === null || value === undefined || value === "") return false;
    if (typeof value === "string" && value.trim() === "") return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0)
      return false;
    return true;
  };

  // Format value with fallback
  const formatValue = (value, type = "text") => {
    if (!hasValue(value)) {
      return (
        <span className="text-red-500">
          <FaTimes className="inline mr-1" /> N/A
        </span>
      );
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

    if (typeof value === "object") {
      if (value.name_en) return value.name_en;
      if (value.name) return value.name;
      if (value.year) return value.year;
      return JSON.stringify(value);
    }

    return value;
  };

  // Get colors from variations
  const getColors = (product) => {
    if (
      !product?.variations ||
      !Array.isArray(product.variations) ||
      product.variations.length === 0
    ) {
      return null;
    }

    const colors = product.variations
      .map((v) => v.color?.name_en)
      .filter(Boolean)
      .join(", ");

    return colors || null;
  };

  // All specification sections
  const specificationSections = [
    {
      id: "basic",
      title: "Basic Information",
      icon: <GiScooter />,
      fields: [
        { label: "Vehicle Name", key: "productName_en", icon: <GiScooter /> },
        { label: "Category", key: "category.name", icon: <FaBriefcase /> },
        { label: "Brand", key: "brand.name", icon: <FaStar /> },
        {
          label: "Post Date",
          key: "post_date",
          icon: <FaCalendar />,
          type: "date",
        },
      ],
    },
    {
      id: "pricing",
      title: "Pricing",
      icon: <FaRupeeSign />,
      fields: [
        {
          label: "Regular Price",
          key: "regularPrice",
          icon: <FaRupeeSign />,
          type: "price",
        },
        {
          label: "Sale Price",
          key: "salePrice",
          icon: <FaShoppingCart />,
          type: "price",
        },
        {
          label: "On-Road Price",
          key: "onRoadPrice",
          icon: <FaRoad />,
          type: "price",
        },
        {
          label: "EMI Available",
          key: "emiAvailable",
          icon: <FaCreditCard />,
          type: "yesno",
        },
        { label: "EMI Range", key: "emiRange", icon: <FaCreditCard /> },
      ],
    },
    {
      id: "dimensions",
      title: "Dimensions & Weight",
      icon: <FaRuler />,
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
      icon: <FaCog />,
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
      icon: <FaGasPump />,
      fields: [
        {
          label: "Fuel Type",
          key: "fuelType.name_en",
          icon: <FaGasPumpIcon />,
        },
        {
          label: "Fuel Tank",
          key: "fuelTank.name_en",
          icon: <FaGasPumpIcon />,
        },
        {
          label: "Fuel Tank Capacity",
          key: "fuelTankCapacity",
          icon: <FaGasPumpIcon />,
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
          icon: <IoMdFlash />,
          type: "yesno",
        },
      ],
    },
    {
      id: "body",
      title: "Body & Chassis",
      icon: <GiScooter />,
      fields: [
        { label: "Body Type", key: "bodyType.name_en", icon: <GiScooter /> },
        { label: "Seat Height", key: "seatHeight.name_en", icon: <FaChair /> },
        { label: "Seat Type", key: "seatType", icon: <FaChair /> },
        {
          label: "External Fuel Lid",
          key: "externalFuelLid",
          icon: <FaGasPumpIcon />,
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
      icon: <FaShieldAlt />,
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
      icon: <FaWrench />,
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
    {
      id: "colors",
      title: "Colors & Variations",
      icon: <FaPalette />,
      fields: [
        {
          label: "Colors",
          key: "variations",
          icon: <FaPalette />,
          format: (product) => {
            const colors = getColors(product);
            return formatValue(colors);
          },
        },
      ],
    },
    {
      id: "flags",
      title: "Product Flags",
      icon: <FaStar />,
      fields: [
        {
          label: "New Arrival",
          key: "newArrival",
          icon: <FaStar />,
          type: "yesno",
        },
        { label: "Trending", key: "trending", icon: <FaFire />, type: "yesno" },
        {
          label: "Top Selling",
          key: "topSelling",
          icon: <FaShoppingCart />,
          type: "yesno",
        },
        {
          label: "Featured",
          key: "featuredProducts",
          icon: <FaStar />,
          type: "yesno",
        },
        {
          label: "Flash Sale",
          key: "flashSale",
          icon: <FaFire />,
          type: "yesno",
        },
        { label: "Status", key: "status", icon: <FaBell /> },
      ],
    },
  ];

  // Add product from search modal
  const handleSelect = (product) => {
    if (products.length >= 3) {
      alert("You can compare up to 3 vehicles only");
      return;
    }

    const newSlugs = [...slugs, product.slug];
    router.push(`/compare/${newSlugs.join("-vs-")}`);
    setShowAddModal(false);
    setSearchTerm("");
    setActiveIndex(null);
  };

  // Remove product
  const removeProduct = (index) => {
    const newSlugs = slugs.filter((_, i) => i !== index);
    if (newSlugs.length === 0) {
      router.push("/compare");
    } else {
      router.push(`/compare/${newSlugs.join("-vs-")}`);
    }
  };

  // Clear all
  const clearAll = () => {
    router.push("/compare");
  };

  // Filter products for search
  const filteredProducts = useMemo(() => {
    if (!searchData?.data?.products) return [];
    return searchData.data.products.filter(
      (product) => !slugs.includes(product.slug),
    );
  }, [searchData, slugs]);

  // Get nested value from object
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };

  // Get value for a field
  const getFieldValue = (product, field) => {
    if (field.format) {
      return field.format(product);
    }

    const value = getNestedValue(product, field.key);
    return formatValue(value, field.type || "text");
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowAddModal(false);
    setSearchTerm("");
    setDebouncedSearch("");
    setActiveIndex(null);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading vehicles for comparison..." />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<GiScooter className="w-16 h-16 text-gray-400" />}
        title="No Vehicles Selected"
        description="Add vehicles to start comparing"
        actionText="Browse Vehicles"
        onAction={() => router.push("/vehicles")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Compare Vehicles
              </h1>
              <p className="text-gray-600">
                Compare specifications, features, and prices
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearAll}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <FaTrash className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>

          {/* Vehicle Cards - UPDATED WITH NEW CARD FORMAT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {products.map((product, index) => (
              <div
                key={product._id}
                className="relative rounded-lg border border-gray-200 bg-white text-center shadow-xs"
              >
                <button
                  onClick={() => removeProduct(index)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-red-500 z-10 bg-amber-300 rounded-lg p-1"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>

                <div className="h-48 bg-gray-100 relative rounded-md">
                  <Image
                    src={getVehicleImage(product)}
                    alt={product.productName_en}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold line-clamp-2 mb-1">
                    {product.brand?.name || "Brand"}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                    {product.productName_en}
                  </p>

                  <Link
                    href={`/${product.slug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 3 - products.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="relative rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto flex h-48 items-center justify-center rounded-md bg-gray-50">
                  <FaPlus className="text-4xl text-gray-400" />
                </div>

                <p className="mt-4 font-medium text-gray-500">Add vehicle</p>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="mt-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Select Vehicle
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Sections */}
        {products.length >= 1 && (
          <div className="space-y-8">
            {specificationSections.map((section, sectionIndex) => (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* Section Header */}
                <div className="border-b border-gray-200">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <span className="text-blue-600">{section.icon}</span>
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Section Content */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-150">
                    <tbody>
                      {section.fields.map((field, fieldIndex) => (
                        <tr
                          key={`${section.id}-${fieldIndex}`}
                          className={
                            fieldIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="p-4 border-r border-gray-200 w-1/3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-blue-600">
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
                          {products.map((product, productIndex) => (
                            <td
                              key={productIndex}
                              className="p-4 text-center border-r border-gray-200 w-1/3"
                            >
                              <div className="font-medium">
                                {getFieldValue(product, field)}
                              </div>
                            </td>
                          ))}
                          {/* Empty cells for missing products */}
                          {Array.from({ length: 3 - products.length }).map(
                            (_, i) => null,
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Key Features Comparison */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <FaStar className="text-yellow-500" />
                    Key Features
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
                        {product.brand?.name || "Vehicle"} {index + 1}
                      </h3>
                      {product.keyFeatures && product.keyFeatures.length > 0 ? (
                        <ul className="space-y-3">
                          {product.keyFeatures.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                                <FaCheck className="w-3 h-3" />
                              </span>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {feature.title}
                                </div>
                                {feature.details && (
                                  <div className="text-sm text-gray-600 mt-1">
                                    {feature.details}
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center py-8 text-gray-400">
                          <FaTimes className="w-12 h-12 mx-auto mb-3 text-red-200" />
                          <p>No key features available</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Features */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <FaWrench className="text-purple-600" />
                    Detailed Features
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {products.map((product, index) => (
                    <div key={index} className="space-y-6">
                      <h3 className="font-bold text-lg text-gray-900 border-b pb-2">
                        {product.brand?.name || "Vehicle"} {index + 1}
                      </h3>
                      {product.features && product.features.length > 0 ? (
                        product.features.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="space-y-3">
                            <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
                              {section.title}
                            </h4>
                            <ul className="space-y-2">
                              {section.featureItems?.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="text-sm text-gray-700"
                                >
                                  <span className="font-medium text-gray-900">
                                    {item.featureName}:
                                  </span>{" "}
                                  {item.details}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-400">
                          <FaTimes className="w-8 h-8 mx-auto mb-3 text-red-200" />
                          <p>No detailed features available</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Vehicle Modal - UPDATED WITH WORKING SEARCH MODULE */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 pt-6">
                <div>
                  <h3 className="text-lg font-semibold">
                    Add Vehicle to Compare
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {3 - products.length} slot(s) available
                  </p>
                </div>
                <button
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Search Input */}
              <div className="p-6">
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search vehicles..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  autoFocus
                />
              </div>

              {/* Products List */}
              <div className="max-h-80 overflow-y-auto px-6 pb-6">
                {filteredProducts.length > 0 ? (
                  <ul className="space-y-3">
                    {filteredProducts.map((item) => (
                      <li
                        key={item._id}
                        onClick={() => handleSelect(item)}
                        className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-200 p-4 hover:border-red-500 hover:bg-red-50 transition-colors"
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
                          <Image
                            src={`${baseUriBackend}${item.image}`}
                            alt={item.name || item.productName_en}
                            width={48}
                            height={48}
                            className="h-12 w-12 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">
                            {item.name || item.productName_en}
                          </p>

                          <p className="mt-1 text-sm font-bold text-blue-600">
                            ₹{" "}
                            {parseInt(
                              item.price || item.regularPrice || 0,
                            ).toLocaleString()}
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
                    <FaSearch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">
                      {searchTerm ? "No vehicles found" : "Search for vehicles"}
                    </p>
                    {searchTerm && (
                      <p className="mt-1 text-sm text-gray-400">
                        Try different keywords
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareSlugPage;
