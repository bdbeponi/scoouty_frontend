import React from "react";

const SpecificationsSection = ({ features }) => {
  // Transform the API features data into the format needed by your component
  const transformedFeatures =
    features?.map((feature) => ({
      category: feature.title,
      items:
        feature.featureItems?.map((item) => ({
          label: item.featureName,
          value: item.details,
        })) || [],
    })) || [];

  return (
    <section id="specifications" className="scroll-mt-20">
      <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-6 lg:p-8 mb-8">
        <h3 className="car_h3 text-gray-900 mb-2 md:mb-6">
          Complete Specifications
        </h3>
        {transformedFeatures.length > 0 ? (
          transformedFeatures.map((spec, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <h5 className="car_h5 font-bold text-gray-900 mb-1 md:mb-4 pb-2 border-b-2 border-blue-600">
                {spec.category}
              </h5>
              <div className="space-y-1 md:space-y-3">
                {spec.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <h6 className="car_h6 text-gray-600">{item.label}</h6>
                    <h6 className="car_h6 font-semibold text-gray-900">
                      {item.value}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No specifications available</p>
        )}
      </div>
    </section>
  );
};

export default SpecificationsSection;
