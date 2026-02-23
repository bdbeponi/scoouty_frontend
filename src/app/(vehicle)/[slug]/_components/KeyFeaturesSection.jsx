import React from "react";

const KeyFeaturesSection = ({ keyFeatures }) => {
  if (!keyFeatures || keyFeatures.length === 0) {
    return (
      <section id="features" className="scroll-mt-20">
        <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 lg:p-8 mb-8">
          <h3 className="car_h3 text-gray-900 mb-2 md:mb-6">Key Features</h3>
          <p className="text-gray-500 text-center py-4">
            No key features available
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="features" className="scroll-mt-20">
      <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 lg:p-8 mb-8">
        <h3 className="car_h3 text-gray-900 mb-2 md:mb-6">Key Features</h3>
        <div className="grid md:grid-cols-2 gap-2 md:gap-4">
          {keyFeatures.map((feature, idx) => (
            <div
              key={feature._id || idx}
              className="flex items-center justify-between p-2 md:p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
            >
              <div className="flex items-center gap-3">
                <h5 className="car_h6 text-gray-700">{feature.title}</h5>
              </div>
              <h5 className="car_h6 font-semibold text-gray-900">
                {feature.details}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
