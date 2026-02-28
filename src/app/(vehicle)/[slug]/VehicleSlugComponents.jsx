"use client";

import React, { useState } from "react";
import { baseUriBackend } from "@/redux/url/url";

// Import components
import TabNavigation from "./_components/TabNavigation";
import CombinedFeaturesSection from "./_components/CombinedFeaturesSection";
import DescriptionSection from "./_components/DescriptionSection";
import ColorsSection from "./_components/ColorsSection";
import GallerySection from "./_components/GallerySection";
import ImageModal from "./_components/modals/ImageModal";
import ColorModal from "./_components/modals/ColorModal";
import HeroSection from "./_components/HeroSection";
import RecentVehicle from "./_components/RecentVehicle";
import PopularVehicle from "./_components/PopularVehicle";
import { useGetProductBySlugApiQuery } from "@/redux/features/productApi";
import { useParams } from "next/navigation";
import AuthorSection from "./_components/AuthorSection";
import FAQSection from "./_components/FAQSection";
import FeatureImageSection from "./_components/FeatureImageSection";
import CustomerReviews from "./_components/CustomerReviews";

const VehicleSlugComponents = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const params = useParams();
  const { data: product, isLoading } = useGetProductBySlugApiQuery(params.slug);

  // Get gallery images from product data
  const galleryImages =
    product?.data?.galleryImages?.map((img) => `${baseUriBackend}${img}`) || [];

  // Get Feature Images images from product data
  const featureImages =
    product?.data?.featureImages?.map((img) => `${baseUriBackend}${img}`) || [];

  // Get variations from product data
  const variations = product?.data?.variations || [];

  // Get FAQs from product data
  const faqs = product?.data?.faqs || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  // Helper function to safely get feature values
  const getFeatureValue = (value) => {
    if (!value) return null;
    if (typeof value === "object" && value !== null) {
      return value.name_en || value.name || JSON.stringify(value);
    }
    return value;
  };

  // Check if we have any data for the combined features section
  const hasCombinedFeatures =
    !!getFeatureValue(product?.data?.weight) ||
    !!getFeatureValue(product?.data?.size) ||
    !!getFeatureValue(product?.data?.bodyType) ||
    !!getFeatureValue(product?.data?.cc) ||
    !!getFeatureValue(product?.data?.fuelTank) ||
    !!getFeatureValue(product?.data?.torque) ||
    !!getFeatureValue(product?.data?.seatHeight) ||
    !!getFeatureValue(product?.data?.topSpeed) ||
    !!getFeatureValue(product?.data?.power) ||
    !!getFeatureValue(product?.data?.gearboxe) ||
    !!getFeatureValue(product?.data?.brake) ||
    !!getFeatureValue(product?.data?.drivetrain) ||
    !!getFeatureValue(product?.data?.fuelType) ||
    !!getFeatureValue(product?.data?.manufacturingYear) ||
    !!getFeatureValue(product?.data?.mileage) ||
    !!getFeatureValue(product?.data?.seatingCapacity) ||
    !!getFeatureValue(product?.data?.transmission) ||
    product?.data?.keyFeatures?.length > 0 ||
    product?.data?.features?.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-[1200px] mx-auto md:px-4 py-4 md:py-10">
        {/* Hero Section Component */}
        <HeroSection
          galleryImages={galleryImages}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          setShowImageModal={setShowImageModal}
          nextImage={nextImage}
          prevImage={prevImage}
          product={product?.data}
          isLoading={isLoading}
        />

        {featureImages?.length > 0 && (
          <FeatureImageSection featureImages={featureImages} />
        )}

        {/* Sticky Tab Navigation */}
        <TabNavigation
          hasCombinedFeatures={hasCombinedFeatures}
          hasDescription={!!product?.data?.description_en}
          hasColors={!!product?.data?.variations?.length}
          hasGallery={!!product?.data?.galleryImages?.length}
        />

        {/* Tab Sections */}
        {hasCombinedFeatures && (
          <CombinedFeaturesSection
            product={product?.data}
            keyFeatures={product?.data?.keyFeatures || []}
            features={product?.data?.features || []}
          />
        )}

        {product?.data?.description_en && (
          <DescriptionSection description={product.data.description_en} />
        )}

        {/* FAQ Section - Added after description */}
        {faqs.length > 0 && <FAQSection faqs={faqs} />}

        {variations?.length > 0 && (
          <ColorsSection
            variations={variations}
            baseUriBackend={baseUriBackend}
            setSelectedColor={setSelectedColor}
            setShowColorModal={setShowColorModal}
            setModalImageIndex={setModalImageIndex}
          />
        )}

        {galleryImages?.length > 0 && (
          <GallerySection
            setCurrentImageIndex={setCurrentImageIndex}
            setShowImageModal={setShowImageModal}
            galleryImages={galleryImages}
          />
        )}

        <AuthorSection product={product?.data} />

        {isLoading ? (
          <p>Loading reviews...</p>
        ) : (
          <CustomerReviews product={product?.data} />
        )}

        <RecentVehicle categoryId={product?.data?.category?._id} />
        <PopularVehicle categoryId={product?.data?.category?._id} />
      </div>

      {/* Modals */}
      <ImageModal
        showImageModal={showImageModal}
        setShowImageModal={setShowImageModal}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        galleryImages={galleryImages}
        prevImage={prevImage}
        nextImage={nextImage}
      />

      <ColorModal
        showColorModal={showColorModal}
        setShowColorModal={setShowColorModal}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        modalImageIndex={modalImageIndex}
        setModalImageIndex={setModalImageIndex}
        variations={variations}
        baseUriBackend={baseUriBackend}
      />
    </div>
  );
};

export default VehicleSlugComponents;
