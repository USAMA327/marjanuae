import React, { useState, useEffect, useRef } from "react";
import { db } from "@/firebase/firebase";
import { Car, Package } from "@/types/types";
import { collection, onSnapshot } from "firebase/firestore";
import toast from "react-hot-toast";
import StarRating from "../StarRating";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Icon } from "@iconify/react"; // Make sure you're importing Iconify
import DistanceCheckbox from "./DistanceCheckBox";

interface PackageSelectionProps {
  selectedPackage: Package | null;
  onSelectPackage: (packageName: Package | null) => void;
  onNext: () => void;
  onPrev: () => void;
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
  setSelectedPackage?: React.Dispatch<React.SetStateAction<Package | null>>; // Make it optional or ensure it's passed
  total: number;
  car: Car;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({
  selectedPackage,
  onSelectPackage,
  onNext,
  onPrev,
  packages,
  setPackages,
  setSelectedPackage,
  total,
  car,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const tooltipRef = useRef(null); // ✅ Correct usage of ref

  // Fetch packages from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "packages"),
      (snapshot) => {
        const packagesData: Package[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Package[];

        if (packagesData && packagesData.length > 0) {
          const selectedPackages = [
            packagesData.find((e) => e.id === "sOeeG6sOs05cFuX0ZyOs"),
            packagesData.find((e) => e.id === "vDKXAq5wos24FBfZfXqJ"),
            packagesData.find((e) => e.id === "l5GxM7IvokcfDd1R4YA3"),
          ].filter(Boolean) as Package[]; // Remove `undefined` values

          setPackages(selectedPackages);
        }

        setIsLoading(false);
      },
      (err) => {
        toast.error("Error while fetching packages!");
        console.error(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [setPackages]);

  // Function to calculate the discounted price based on car category
  const calculateDiscountedPrice = (pkg: Package) => {
    switch (car.category) {
      case "Economy":
        return (pkg.priceEconomy * (100 - pkg.onlineDiscount)) / 100;
      case "SUVs":
        return (pkg.priceSmallSUV * (100 - pkg.onlineDiscount)) / 100;
      case "Mid size Sedan":
        return (pkg.priceStandardSUV * (100 - pkg.onlineDiscount)) / 100;
      default:
        return (pkg.price7Seater * (100 - pkg.onlineDiscount)) / 100;
    }
  };

  // Function to calculate the original price based on car category
  const calculateOriginalPrice = (pkg: Package) => {
    switch (car.category) {
      case "Economy":
        return pkg.priceEconomy;
      case "SUVs":
        return pkg.priceSmallSUV;
      case "Mid size Sedan":
        return pkg.priceStandardSUV;
      default:
        return pkg.price7Seater;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-4 font-semibold">
        <h3 className="text-sm md:text-2xl ">
          Which Protection Package do you need?
        </h3>

        <h3 className="text-sm md:text-2xl">
          <small className="text-sm md:text-lg font-medium">Total:</small> AED{" "}
          {(
            total +
            (selectedPackage ? calculateDiscountedPrice(selectedPackage) : 0)
          ).toFixed(2)}
        </h3>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="p-6 border rounded-lg bg-gray-100 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="space-y-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-4 bg-gray-200 rounded w-full"
                  ></div>
                ))}
              </div>
              <div className="mt-4 h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-6 border rounded-lg cursor-pointer transition-all duration-300 ${
                selectedPackage?.name === pkg.name
                  ? "bg-primary text-white"
                  : "bg-white-50 hover:bg-gray-100"
              }`}
              onClick={() => {
                onSelectPackage(pkg);
                if (setSelectedPackage) {
                  setSelectedPackage(pkg); // Call setSelectedPackage if provided
                }
              }}
            >
              <div>
                <span className="font-semibold text-lg">{pkg.name} </span>
                <div className="flex flex-col md:flex-row gap-2 my-2">
                  <StarRating rating={pkg.rating} />
                  {pkg.onlineDiscount > 0 && (
                    <p className="text-orange-700 animate-pulse font-medium bg-orange-300 border-orange-500 border rounded-full px-3">
                      Discount -{pkg.onlineDiscount}% online discount
                    </p>
                  )}
                </div>
              </div>

              <p className="text-sm mt-2">
                <span className="font-semibold">Excess:</span>{" "}
                {pkg.excessUpto ? (
                  `Up to AED ${pkg.excessUpto}`
                ) : (
                  <span className="text-success-500 font-semibold">
                    No Excess
                  </span>
                )}
              </p>
              <hr className="my-2" />

              <div className="my-4 space-y-2">
                {pkg.list.map((item, index) => (
                  <div key={index} className="flex items-center">
                    {item.available ? (
                      <span className="text-green-500">✔</span>
                    ) : (
                      <span className="text-red-500">✘</span>
                    )}
                    <span className="ml-2 w-full text-sm flex items-center justify-between">
                      {item.title}{" "}
                      <Tippy
                        ref={tooltipRef}
                        content={item.description}
                        placement="top"
                      >
                        <span>
                          <Icon
                            icon="material-symbols:info-outline-rounded"
                            className="size-5 cursor-pointer"
                          />
                        </span>
                      </Tippy>
                    </span>
                  </div>
                ))}
              </div>

              <hr className="mb-2" />
              {calculateDiscountedPrice(pkg) > 0 ? (
                <span className="text-sm">
                  AED{" "}
                  <strong className="text-lg">
                    {calculateDiscountedPrice(pkg).toFixed(2)}
                  </strong>{" "}
                  <del>
                    AED {calculateOriginalPrice(pkg).toFixed(2)}
                  </del>{" "}
                  <strong>({pkg.onlineDiscount}% off)</strong>
                </span>
              ) : (
                <strong className="text-lg">Included</strong>
              )}
            </div>
          ))}
        </div>
      )}

      <DistanceCheckbox />

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="bg-gray-600 text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          Back
        </button>

        <Tippy
          ref={tooltipRef}
          disabled={selectedPackage ? true : false}
          content={"Must select one package!"}
          placement="top"
        >
          <button
            disabled={!selectedPackage}
            onClick={onNext}
            className={`${
              !selectedPackage ? "bg-gray-200" : "bg-green-600"
            }  text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-green-700 transition-all duration-300`}
          >
            Next
          </button>
        </Tippy>
      </div>
    </div>
  );
};

export default PackageSelection;