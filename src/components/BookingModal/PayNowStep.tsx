"use client";

import React from "react";

interface PayNowStepProps {
  onPrev: () => void;
  onSubmit: () => void;
}

const PayNowStep: React.FC<PayNowStepProps> = ({ onPrev, onSubmit }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Pay Now</h3>
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-lg">Total Price:</span>
            <span className="text-lg font-semibold">AED 500</span>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <p className="text-sm text-gray-600">
          NOTE: IN CASE OF ANY ACCIDENTS/DAMAGE (FAULTY OR NON-FAULTY), A POLICE REPORT IS
          MANDATORY TO COVER THE INSURANCE EVEN IF THE CUSTOMER HAS PAID FOR CDW OR PREMIUM
          COVER. IF NO POLICE REPORT IS PROVIDED, FULL AMOUNT FOR DAMAGE REPAIR WILL BE
          CHARGED TO THE CUSTOMER.
        </p>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="bg-gray-600 text-white px-8 py-2 rounded-md text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-primary text-white px-8 py-2 rounded-md text-lg font-medium hover:bg-secondary transition-all duration-300"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PayNowStep;