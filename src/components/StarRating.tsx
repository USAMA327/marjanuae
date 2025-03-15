import React from "react";
import { Icon } from "@iconify/react"; // Using Iconify for React

interface StarRatingProps {
  rating: number; // Prop for rating value
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1.5 w-fit  rounded-full">
      {[...Array(3)].map((_, index) => (
          <span key={index} className="text-primary">
              {index < rating ? "⭐️":"☆"}
       </span>
      ))}
    </div>
  );
};

export default StarRating;