import { Icon } from "@iconify/react";
import React from "react";

const RefundableDeposit: React.FC = () => {
  return (
    <div className="bg-gray-50 p-5 mb-4 mt-2 rounded-sm  border border-gray-200">
      <h3 className="text-lg font-semibold flex gap-1 items-center text-primary"><Icon icon="material-symbols:info-outline" className="size-5 text-primary" />Refundable Deposit</h3>
      <div className="text-gray-700">
        <p>
          An additional <span className="font-semibold">AED 2000</span> security deposit will be
          blocked on your card at the pickup counter and released within a few days of the vehicle’s
          return.
        </p>
      </div>
    </div>
  );
};

export default RefundableDeposit;