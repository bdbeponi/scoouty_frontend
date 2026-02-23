// src/app/(vehicle)/[slug]/_components/FAQSection.jsx
"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="scroll-mt-20 mt-8">
      <div className="bg-white rounded-xl md:border border-gray-300 hover:shadow-md p-4 lg:p-8 mb-8">
        <div className="mb-8">
          <h3 className="car_h3 text-gray-900">Frequently Asked Questions</h3>
          <p className="text-gray-600 mt-2">
            Find answers to common questions about this vehicle
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq._id || index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-4 md:p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <h5 className="car_h6 font-semibold text-gray-900 pr-4">
                  {faq.question_en}
                </h5>
                <span className="flex-shrink-0 ml-2">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-secondary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </span>
              </button>

              {openIndex === index && (
                <div className="p-4 md:p-6 pt-0">
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line">
                      {faq.answer_en}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* All FAQ Accordion Alternative */}
        {false && (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq._id || index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full p-4 md:p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <h5 className="car_h6 font-medium text-gray-900 pr-4">
                    {faq.question_en}
                  </h5>
                  <span className="flex-shrink-0 ml-2">
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-secondary" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="p-4 md:p-6 pt-0 bg-gray-50">
                    <div className="pt-4">
                      <p className="text-gray-600 whitespace-pre-line">
                        {faq.answer_en}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
