import Image from 'next/image';
import React from 'react'
import Payment from '../../../public/payments/payment.png'
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col pt-32 items-center">
      <div className=" w-full  rounded-sm p-8">
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
        <p className="text-gray-600 leading-relaxed my-4">
          We accept all <strong>Master / Visa Credit / Debit cards</strong> in
          AED.
        </p>
        <Image src={Payment} alt="payments"/>
      </div>
    </div>
  );
}
