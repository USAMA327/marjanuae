import React from 'react'
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-sm p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Privacy Policy
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed">
          All Credit/Debit card details and personally identifiable information
          will <strong>NOT</strong> be stored, sold, shared, or leased to any
          third parties.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          The website policies and Terms and Conditions may be changed or
          updated occasionally to meet requirements and standards. Customers are
          encouraged to frequently visit these sections to stay informed about
          any changes. Modifications will be effective on the day they are
          posted.
        </p>
        <p className="text-gray-600 leading-relaxed mt-4">
          We accept all <strong>Master / Visa Credit / Debit cards</strong> in
          AED.
        </p>
      </div>
    </div>
  );
}
