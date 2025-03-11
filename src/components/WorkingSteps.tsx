import { StepProps } from "@/types/types";
import React from "react";

const steps = [
  {
    icon: "icon-[ph--map-pin-line-thin]",
    title: "Choose a location",
    description: "Select Locations within the UAE",
    bgColor: "bg-[#f2f2f2] border-4 border-white",
    textColor: "text-secondary",
    shadow: "shadow-lg",
  },
  {
    icon: "icon-[ph--calendar-dots-thin]",
    title: "Pick-up date",
    description: "Pick your dates from calendar",
    bgColor: "bg-gradient-to-t from-primary to-secondary",
    textColor: "text-white",
    shadow: "shadow-lg ",
  },
  {
    icon: "icon-[ph--car-profile-thin]",
    title: "Book Your Car",
    description: "Pick your favorite car from Fleet",
    bgColor: "bg-[#f2f2f2] border-4 border-white",
    textColor: "text-secondary",
    shadow: "shadow-lg",
  },
];

function Step({ icon, title, description, bgColor, textColor, shadow }: StepProps) {
  return (
    <article className="text-center flex flex-col items-center">
      <div className={`w-28 h-28 flex justify-center items-center rounded-md relative z-10 ${bgColor} ${shadow}`}>
        <span className={`${icon} size-16 ${textColor}`} />
      </div>
      <h4 className="mt-5 text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-[#a8a8a8] font-medium">{description}</p>
    </article>
  );
}

export default function WorkingSteps() {
  return (
    <section className="text-black bg-blend-soft-light py-32 flex flex-col items-center justify-center ">
      <h2 className="text-lg font-semibold text-primary bg-[#1572D310] px-4 py-3 rounded-sm mb-4">HOW IT WORKS</h2>
      <h3 className="text-4xl font-bold text-[#323234] text-center">
      Renting is Super-Fast!
      </h3>
      <div className="flex flex-col gap-5 md:gap-0 md:flex-row  justify-center items-center mt-16 ">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <Step {...step} />
            {index < steps.length - 1 && (
              <div className="w-16 md:w-20 h-5 border-t-2 mb-10 border-dashed border-secondary hidden md:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
