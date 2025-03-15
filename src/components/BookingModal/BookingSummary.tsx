import { Icon } from "@iconify/react";
import React from "react";
import moment from "moment";
import { Package } from "@/types/types";
import SummaryItem from "../SummaryItem";

interface SummaryProps {
  car: any;
  values: any;
  basePrice: number;
  numberOfDays: number;
  addons: any[];
  selectedAddOns: Record<string, number>;
  selectedPackage: Package | null;
  discount: number;
  finalTotal: number;
  discountedTotal: number;
  mileStone: boolean;
  discountPercentage: number;
}

const Summary: React.FC<SummaryProps> = ({
  car,
  values,
  basePrice,
  numberOfDays,
  addons,
  selectedAddOns,
  selectedPackage,
  discount,
  finalTotal,
  discountedTotal,
  mileStone,
  discountPercentage,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="space-y-3">
        {/* Car Details */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <img
            className="h-32 w-44 object-contain"
            src={car.image}
            alt={car.name}
          />
          <div className="flex flex-col justify-between">
            <p className="text-lg mb-3">
              {car.name}{" "}
              <small className="text-slate-500 text-xs">( or Similar )</small>
            </p>

            <p className="font-semibold">{numberOfDays} rental days</p>
          </div>
        </div>

        <hr />

        {/* Pickup and Return Details */}
        <div className="border-b border-gray-200 pb-4 flex gap-2">
          {/* Connector Line */}
          <div className="flex flex-col gap-3 items-center justify-between">
            <Icon icon="fluent-color:person-key-20" className="size-8" />
            <div className="border-l-2 border-secondary h-6"></div>
            <Icon
              icon="fluent:person-key-32-filled"
              className="size-8 text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-4 justify-between">
            {/* Pickup Details */}
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-lg font-semibold text-primary">
                  {values.location}
                </span>
                <p className="text-sm text-gray-500">
                  {moment(values.pickupDate).format("ddd, DD, MM, YYYY")} |{" "}
                  {moment(values.pickupTime).format("hh:mm A")}
                </p>
              </div>
            </div>

            {/* Return Details */}
            <div className="flex items-center space-x-3">
              <div>
                <span className="text-lg font-semibold text-primary">
                  {values.dropoffLocation || values.location}
                </span>
                <p className="text-sm text-gray-500">
                  {moment(values.dropoffDate).format("ddd, DD, MM, YYYY")} |{" "}
                  {moment(values.dropoffTime).format("hh:mm A")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Package */}
        <SummaryItem
          label={`Package : ${selectedPackage ? selectedPackage.name : ""}`}
          value={`AED ${(numberOfDays * (selectedPackage?.newPrice || 0)).toFixed(2)}`}
          formula={`${numberOfDays} days × ${selectedPackage?.newPrice?.toFixed(2) || "0.00"} AED `}
        />

        {mileStone && (
          <>
            <hr className="border-gray-200" />
            <SummaryItem label="Mileage (Allowance)" value={"400 km"} />
          </>
        )}

        <hr className="border-gray-200" />

        {/* Base Price Calculation */}
        <SummaryItem
          label={`Base Price`}
          value={`AED ${basePrice.toFixed(2)}`}
          formula={`Daily Rate × Rental Days = ${(basePrice / numberOfDays).toFixed(2)} × ${numberOfDays}`}
        />

        {/* Add-Ons Calculation */}
        {addons
          .filter((addon) => selectedAddOns[addon.id])
          .map((addon) => {
            const price =
              car.category === "Economy"
                ? addon.priceEconomy
                : car.category === "SUVs"
                ? addon.priceSmallSUV
                : car.category === "Mid size Sedan"
                ? addon.priceStandardSUV
                : addon.price7Seater;

            const totalPrice = addon.perDay
              ? price * numberOfDays * (selectedAddOns[addon.id] || 1)
              : price * (selectedAddOns[addon.id] || 1);

            return (
              <SummaryItem
                key={addon.id}
                label={`${addon.name}`}
                value={`AED ${totalPrice.toFixed(2)}`}
                formula={`${
                  addon.perDay
                    ? `${numberOfDays} days × ${price.toFixed(2)} AED × ${
                        selectedAddOns[addon.id] || 1
                      }`
                    : `1 time × ${price.toFixed(2)} AED`
                }`}
              />
            );
          })}
        <hr className="border-gray-200" />

        {/* Total Price Calculation */}
        <SummaryItem
          label="Total Price"
          value={`AED ${finalTotal.toFixed(2)}`}
          formula={""}
        />

        {/* Discount Calculation */}
        <SummaryItem
          label="Discount"
          value={`-AED ${discount.toFixed(2)}`}
          formula={`${discountPercentage.toFixed(2)}%`}
        />

        <hr className="border-gray-200" />

        {/* Final Price Calculation */}
        <SummaryItem
          label="Final"
          value={<strong className="text-success-600">AED {discountedTotal.toFixed(2)}</strong>}
          formula={`Total Price - Discount = ${finalTotal.toFixed(2)} - ${discount.toFixed(2)}`}
        />

        <hr className="border-gray-200" />
      </div>
    </div>
  );
};

export default Summary;
