import React from 'react'
export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-center">
      <div>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mt-2">About Us</h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Our story begins back in <strong>2010</strong> when we planned to restructure the transportation industry
          with new ways of service and transparency of information.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          <strong>Al Marjan Group</strong> owns companies that deal with private & commercial transportation, providing the
          best automotive services across the UAE. We have grown with a quality-driven, goal-oriented methodology that
          adapts to all transportation requirements.
        </p>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Our Values</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>Convenient and flexible transportation solutions.</li>
            <li>Well-maintained fleet for short & long-term rentals.</li>
            <li>Competitive pricing and wide selection.</li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Our Customer Relationships</h3>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>Excellent customer service.</li>
            <li>Easy reservation and check-in/check-out process.</li>
            <li>Prompt response to inquiries and concerns.</li>
          </ul>
        </div>
        </div>
    </div>
  );
}