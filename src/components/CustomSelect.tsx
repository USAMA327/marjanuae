import { useState } from "react";

interface Option {
  value: string;
  label: string;
  description?: string;
  price?: number;
}

interface CustomSelectProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  isTop: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  isTop = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Select Field */}
      <div
        className="w-full p-3 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between bg-white hover:border-gray-400 transition-all duration-300"
        onClick={toggleDropdown}
      >
        <span className={`${selectedValue ? "text-black" : "text-gray-400"}`}>
          {selectedValue || placeholder}
        </span>
        <span className="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""
              }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className={`absolute ${
            isTop ? "top-full" : "bottom-full"
          }  mb-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-80 overflow-y-auto`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 border-b  hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => handleSelect(option.value)}
            >
              <div className="font-medium text-sm text-gray-800">
                {option.label}{" "}
                <span className="text-primary font-semibold text-xs "></span>
              </div>
              {/* {option.description && (
                <div className="text-sm text-gray-600  text-right">
             
                  {option.price !== undefined && (
                    <span className="text-primary font-semibold text-sm ">
                     (+{option.price} AED)
                    </span>
                  )}
                </div>
              )} */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
