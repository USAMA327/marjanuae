import Image from 'next/image';
import React from 'react'
import Payment from '../../../public/payments/payment.png'
import HelpSection from '@/components/HelpSection';
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col pt-28 items-center">


    <div className="w-full bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-primary bg-[#1572D310] px-4 py-3 rounded-sm mb-4 text-center">
       Privacy & Policies
      </h1>
    
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
      <HelpSection />
    </div>
  );
}
