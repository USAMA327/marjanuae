"use client";

import React from "react";

interface DistanceCheckboxProps {
  checked: boolean;
  setChecked: (value: boolean) => void;
}

const DistanceCheckbox: React.FC<DistanceCheckboxProps> = ({ checked, setChecked }) => {
  return (
    <div className="border mt-2 rounded-lg p-4 flex items-center justify-between w-full bg-gray-100">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          id="distanceCheckbox"
          className="w-5 h-5 accent-black cursor-pointer "
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div>
          <p className="text-lg font-medium">400 km</p>
          <p className="text-gray-500 text-sm">+AED 0.50 / for every additional km</p>
        </div>
      </div>
      <p className="text-black font-semibold">{!checked ? "Not Included" : "Included"}</p>
    </div>
  );
};

export default DistanceCheckbox;
