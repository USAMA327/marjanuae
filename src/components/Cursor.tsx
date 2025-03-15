"use client"; // Mark this as a client component

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let targetRotation = 0; // Target rotation angle
    let currentRotation = 0; // Current rotation angle

    const handleMouseMove = (e: MouseEvent) => {
      // Update cursor position
      setPosition({ x: e.clientX, y: e.clientY });

      // Calculate target rotation based on horizontal mouse movement
      const centerX = window.innerWidth / 2; // Center of the screen
      const deltaX = e.clientX - centerX; // Horizontal distance from the center
      const maxRotation = 90; // Maximum rotation angle in degrees
      targetRotation = (deltaX / centerX) * maxRotation; // Calculate target rotation
    };

    const smoothRotation = () => {
      // Linear interpolation for smooth rotation
      const smoothingFactor = 0.2; // Increased for faster response
      currentRotation += (targetRotation - currentRotation) * smoothingFactor;
      setRotation(currentRotation);

      // Request the next frame
      requestAnimationFrame(smoothRotation);
    };

    // Start the smooth rotation loop
    const animationFrame = requestAnimationFrame(smoothRotation);

    // Add mousemove listener
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.tagName === "A" || e.target.tagName === "BUTTON")
      ) {
        document.querySelector(".custom-cursor")?.classList.add("hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        (e.target.tagName === "A" || e.target.tagName === "BUTTON")
      ) {
        document.querySelector(".custom-cursor")?.classList.remove("hover");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        transition: "transform 0.05s linear", // Faster transition for transform
      }}
    >
      <span className="icon-[icon-park--steering-wheel] text-xl text-orange-500"></span>
    </div>
  );
};

export default CustomCursor;
