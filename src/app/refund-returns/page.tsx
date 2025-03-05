import HelpSection from "@/components/HelpSection";
import { termsData } from "@/data/terms";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col pt-32 items-center">
    
      <div className="w-full bg-white shadow-lg rounded-lg p-6">

              <h1 className="text-2xl font-semibold text-primary bg-[#1572D310]  px-4 py-3 rounded-sm mb-4 text-center">Terms and Conditions</h1>

        {/* Dynamically Render Sections */}
        <div className="space-y-6 text-gray-700">
          {termsData.map((section, index) => (
            <section key={index}>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {section.title}
                  </h3>
                  
              <p className="whitespace-pre-line">{section.content}</p>
            </section>
          ))}
        </div>
          </div>
          <HelpSection />
          
    </div>
  );
};

export default TermsAndConditions;