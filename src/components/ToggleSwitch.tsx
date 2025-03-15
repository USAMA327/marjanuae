import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, label, className }) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      {/* Hidden Checkbox */}
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      
      {/* Switch Track */}
      <div
        className={`relative w-11 h-6 rounded-full transition-colors 
          ${checked ? "bg-primary" : "bg-gray-300"} 
          peer-focus:ring-4 peer-focus:ring-secondary`}
      >
        {/* Switch Knob */}
        <div
          className={`absolute top-[2px] left-[2px] h-5 w-5 bg-white border border-gray-300 rounded-full transition-transform 
            ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>

      {/* Optional Label */}
      {label && <span className="ms-3 text-sm font-medium text-gray-700">{label}</span>}
    </label>
  );
};

export default ToggleSwitch;
