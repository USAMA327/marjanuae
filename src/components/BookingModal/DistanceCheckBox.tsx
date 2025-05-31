"use client";

import { Icon } from "@iconify/react";
import React from "react";



const DistanceCheckbox: React.FC = () => {
  return (
    <div className="border mt-2 rounded-lg p-4 flex items-center justify-between w-full bg-gray-100">
      <div className="flex items-center space-x-2">
      <Icon icon="material-symbols:info" className="text-primary" width="24" height="24" />
        <div>
          <p className="text-lg font-medium">Unlimited KM</p>
         
        </div>
      </div>
      <p className="text-black font-semibold">{"Included"}</p>
    </div>
  );
};

export default DistanceCheckbox;
