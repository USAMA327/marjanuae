import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string; // Add placeholder prop
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, selectedValue, onSelect, placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-0.5">
      {/* Select Field with Arrow */}
      <div
        className="w-full   rounded-sm cursor-pointer "
        onClick={toggleDropdown}
      >
        <span className={`${selectedValue ? "text-black":"text-gray-400"}`}>{selectedValue || placeholder}</span>
       
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;