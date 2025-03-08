"use client";
import { useState } from "react";

// Define available button variants and colors
const buttonStyles = {
  filled: {
    primary: "from-primary to-secondary text-white",
    success: "from-green-500 to-green-700 text-white",
    error: "from-red-500 to-red-700 text-white",
    warning: "from-yellow-500 to-yellow-700 text-white",
    info: "from-cyan-500 to-cyan-700 text-white",
    normal: "from-gray-500 to-gray-700 text-white",
    disabled: "bg-gray-400 text-gray-200 cursor-not-allowed",
  },
  outline: {
    primary:
      "border border-primary text-primary hover:bg-secondary hover:text-white",
    success:
      "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
    error:
      "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    warning:
      "border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white",
    info: "border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white",
    normal:
      "border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white",
    disabled: "border border-gray-400 text-gray-400 cursor-not-allowed",
  },
};

const FancyButton = ({
  onClick,
  children,
  variant = "filled", // default variant
  color = "primary", // default color
  className = "",
  disabled = false,
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  variant?: "filled" | "outline";
  color?:
    | "primary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "normal"
    | "disabled";
  className?: string;
  disabled?: boolean;
}) => {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (disabled) return;
    if (onClick) onClick(event);

    // Ripple Effect
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = { id: Date.now(), x, y, size };
    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) =>
        prevRipples.filter((r) => r.id !== newRipple.id)
      );
    }, 600);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`relative w-full overflow-hidden py-3 px-6 font-medium tracking-wide  shadow-lg transition-all duration-300 ${
        variant === "filled"
          ? `bg-gradient-to-r ${buttonStyles.filled[color]}`
          : buttonStyles.outline[color]
      } hover:scale-105 hover:shadow-2xl focus:outline-none ${className}`}
    >
      {children}
      {/* Ripple Effect */}
      {!disabled && (
        <span className="absolute inset-0 overflow-hidden">
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute bg-white opacity-50 rounded-full transform scale-0 animate-ripple"
              style={{
                width: ripple.size,
                height: ripple.size,
                left: ripple.x,
                top: ripple.y,
              }}
            />
          ))}
        </span>
      )}
    </button>
  );
};

export default FancyButton;
