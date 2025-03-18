import { Icon } from "@iconify/react";
import React from "react";

const RefundableDeposit: React.FC = () => {
  return (
    <div className="bg-gray-50 p-5 mb-4 mt-2 rounded-sm  border border-gray-200">
      <h3 className="text-lg font-semibold flex gap-1 items-center text-primary"><Icon icon="material-symbols:info-outline" className="size-5 text-primary" />Refundable Deposit</h3>
      <div className="text-gray-700">
        <ul className="list-disc px-5">
          <li>
        <p>
          An additional <span className="font-semibold">AED 2000</span> security deposit will be
          blocked on your credit card at the time of pickup and released within 3 weeks after the vehicle’s
          return.
        </p>
            
          </li>
          <li >
          <p>
         In case if a debit card is presented for security deposit, an amount of  <span className="font-semibold">AED 2000</span> will be charged and refunded back to your card within 3 weeks after the vehicle’s
          return.
        </p>
            
          </li>
        </ul>
       
      </div>
    </div>
  );
};

export default RefundableDeposit;