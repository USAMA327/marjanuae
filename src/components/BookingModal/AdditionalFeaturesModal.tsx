import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { Addon, Car } from "@/types/types";
import { setDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { DateRangePicker } from "react-date-range";
import { Icon } from "@iconify/react";
import DriverDetailsForm from "./DriverDetailsForm";
import TimeRangePicker from "./TimeRangePicker";
import CustomSelect from "../CustomSelect";
import BookingJson from "../../data/bookingData.json";
import toast from "react-hot-toast";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
interface ModalProps {
  car?: Car;
  onClose: () => void;
  location?: string | null;
}

const AdditionalFeaturesModal: React.FC<ModalProps> = ({
  car,
  onClose,
  location,
}) => {
  const { user } = useAuth();
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>(
    {}
  );
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)), // Two days greater
    key: "selection",
  });
  
  const [selectedLocation, setSelectedLocation] = useState<string | null>(
    location || ""
  );

  const [addons, setAddons] = useState<Addon[]>([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [timeRange, setTimeRange] = useState({
    pickup: "10:00 AM",
    dropoff: "10:00 AM",
  });

  const [driverDetails, setDriverDetails] = useState<any>(null);
  const [apiLoader, setApiLoader] = useState(false);
  if (!car) return null;

  const numberOfDays = useMemo(
    () =>
      Math.ceil(
        (selectionRange.endDate.getTime() -
          selectionRange.startDate.getTime()) /
          (1000 * 3600 * 24)
      ),
    [selectionRange]
  );

  const basePrice = useMemo(
    () => car.price * numberOfDays,
    [car.price, numberOfDays]
  );

  const toggleAddOn = useCallback((id: string | number) => {
    setSelectedAddOns((prev) => {
      const updated = { ...prev };
      updated[id] ? delete updated[id] : (updated[id] = 1);
      return updated;
    });
  }, []);

  const addOnsTotal = useMemo(
    () =>
      addons.reduce((total, addon) => {
        const quantity = selectedAddOns[addon.id] || 0;
        if (quantity > 0) {
          const price =
            car.category === "Economy"
              ? addon.priceEconomy
              : car.category === "SUVs"
              ? addon.priceSmallSUV
              : car.category === "Mid size Sedan"
              ? addon.priceStandardSUV
              : addon.price7Seater;

          return (
            total +
            (addon.perDay ? price * numberOfDays * quantity : price * quantity)
          );
        }
        return total;
      }, 0),
    [addons, selectedAddOns, numberOfDays, car.category]
  );

  const finalTotal = useMemo(
    () => basePrice + addOnsTotal,
    [basePrice, addOnsTotal]
  );

  const handleBooking = async () => {
    setApiLoader(true);
    const bookingId = uuidv4();
    const selectedAddOnsList = addons.filter(
      (addon) => selectedAddOns[addon.id]
    );
    const carRef = doc(db, "cars", car.id);
    const userRef = user?.uid ? doc(db, "users", user?.uid) : null;

    const bookingDetails = {
      id: bookingId,
      user: userRef,
      car: carRef,
      pickUpDate: selectionRange.startDate.toDateString(),
      dropOffDate: selectionRange.endDate.toDateString(),
      pickUpTime: timeRange.pickup,
      dropOffTime: timeRange.dropoff,
      location: selectedLocation,
      selectedAddOns: selectedAddOnsList,
      totalPrice: finalTotal,
      createdAt: new Date().toISOString(),
      status: 1,
    };

    try {
      if (user) {
        await setDoc(doc(db, "users", user?.uid), {
          displayName: driverDetails.displayName,
          phone: driverDetails.contactNumber,
          email: driverDetails.email,
          nationality: driverDetails.nationality,
          createdAt: new Date(),
        });
      }

      await setDoc(doc(db, "bookings", bookingId), bookingDetails);

      // Send email with booking details
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: driverDetails.email, // Send email to the user's email
          subject: "Your Booking Confirmation", // Email subject
          text: `Thank you for your booking! Here are your details:
            Booking ID: ${bookingId}
            Car: ${car.name}
            Pickup Date: ${selectionRange.startDate.toDateString()}
            Dropoff Date: ${selectionRange.endDate.toDateString()}
            Pickup Time: ${timeRange.pickup}
            Dropoff Time: ${timeRange.dropoff}
            Location: ${selectedLocation}
            Total Price: AED ${finalTotal}
            Selected Add-ons: ${selectedAddOnsList
              .map((addon) => addon.name)
              .join(", ")}
          `,
          html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation</title>
            <style>
              /* Add the CSS styles from the template here */
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <h1>Booking Confirmation</h1>
              </div>
              <div class="email-body">
                <h2>Thank you for your booking!</h2>
                <p>Your booking has been confirmed. Below are the details of your reservation:</p>
                <div class="booking-details">
                  <h3>Your Booking Order</h3>
                  <ul>
                    <li><strong>Booking ID:</strong> ${bookingDetails.id}</li>
                    <li><strong>Car:</strong> ${car.name}</li>
                    <li><strong>Pickup Date:</strong> ${
                      bookingDetails.pickUpDate
                    }</li>
                    <li><strong>Dropoff Date:</strong> ${
                      bookingDetails.dropOffDate
                    }</li>
                    <li><strong>Pickup Time:</strong> ${
                      bookingDetails.pickUpTime
                    }</li>
                    <li><strong>Dropoff Time:</strong> ${
                      bookingDetails.dropOffTime
                    }</li>
                    <li><strong>Location:</strong> ${selectedLocation}</li>
                    <li><strong>Total Price:</strong> $${
                      bookingDetails.totalPrice
                    }</li>
                    <li><strong>Selected Add-ons:</strong> ${selectedAddOnsList
                      .map((addon) => addon.name)
                      .join(", ")}</li>
                  </ul>
                </div>
                <p>If you have any questions, feel free to contact us.</p>
              </div>
              <div class="email-footer">
                <p>&copy; 2023 Your Company. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
        }),
      });

      await emailResponse.json();
      if (emailResponse.ok) {
        toast.success(
          "Booking successfully added and confirmation email sent!"
        );
      } else {
        toast.error("Booking added, but failed to send confirmation email.");
      }

      onClose();
    } catch (error) {
      console.log("Error adding booking to Firestore", error);
      toast.error("Error adding booking to Firestore");
    } finally {
      setApiLoader(false);
    }
  };

  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "addons"),
      (snapshot) => {
        const addonsData: Addon[] = [];
        snapshot.forEach((doc) => {
          addonsData.push({ id: doc.id, ...doc.data() } as Addon);
        });
        setAddons(addonsData);
        setLoading(false);
      },
      (err) => {
        toast.error("Error while fetching addons!");
        setError("Error fetching addons");
        console.error(err);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-screen h-screen md:w-[90%] md:h-[90%] lg:w-[80%] lg:h-[80%] xl:w-[70%] xl:h-[70%] rounded-lg shadow-lg relative overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-8">
          <div className="flex justify-center my-8">
            <div className="block lg:hidden w-full text-center ">
              {/* Progress bar container */}
              <div className="w-full bg-gray-200  h-2.5">
                {/* Progress bar */}
                <div
                  className="bg-primary h-2.5 mt-2 "
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
              {/* Display percentage text */}
              <p className="text-sm mt-1">
                {Math.round((currentStep / 4) * 100)}%
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <div
                className={`px-6 py-2 flex items-center justify-center gap-2 rounded-lg transition-all duration-300 ${
                  currentStep === 1 || currentStep > 1
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <Icon
                  icon="mdi:calendar-check"
                  className={`w-6 h-6 ${
                    currentStep === 1 || currentStep > 1
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                />
                <span className="font-semibold">Booking Dates</span>
              </div>

              <div
                className={`w-20 h-1 ${
                  currentStep > 1 ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>

              <div
                className={`px-6 py-2 flex items-center justify-center gap-2 rounded-lg transition-all duration-300 ${
                  currentStep === 2 || currentStep > 2
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <Icon
                  icon="mdi:plus-box"
                  className={`w-6 h-6 ${
                    currentStep === 2 || currentStep > 2
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                />
                <span className="font-semibold">Add-ons</span>
              </div>

              <div
                className={`w-20 h-1 ${
                  currentStep > 2 ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>

              <div
                className={`px-6 py-2 flex items-center justify-center gap-2 rounded-lg transition-all duration-300 ${
                  currentStep === 3 || currentStep > 3
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <Icon
                  icon="mdi:account"
                  className={`w-6 h-6 ${
                    currentStep === 3 || currentStep > 3
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                />
                <span className="font-semibold">Driver Details</span>
              </div>

              <div
                className={`w-20 h-1 ${
                  currentStep > 3 ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>

              <div
                className={`px-6 py-2 flex items-center justify-center gap-2 rounded-lg transition-all duration-300 ${
                  currentStep === 4
                    ? "bg-primary text-white shadow-lg"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <Icon
                  icon="mdi:credit-card-check"
                  className={`w-6 h-6 ${
                    currentStep === 4 ? "text-white" : "text-gray-600"
                  }`}
                />
                <span className="font-semibold">Pay Now</span>
              </div>
            </div>
          </div>

          {currentStep === 1 && (
            <div>
              <div className="my-4">
                <CustomSelect
                  isTop={true}
                  options={BookingJson}
                  selectedValue={selectedLocation ? selectedLocation : ""}
                  onSelect={(e: string) => {
                    setSelectedLocation(e);
                  }}
                  placeholder="Choose a pick-up location"
                />
              </div>

              <h3 className="text-xl font-bold mb-4">
                Select Pickup and Dropoff Dates
              </h3>
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                minDate={new Date()}
                className="w-full border rounded-sm shadow-sm"
              />
              <div className="mt-4">
                <TimeRangePicker
                  timeRange={timeRange}
                  onTimeRangeChange={setTimeRange}
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={nextStep}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-sm text-lg font-medium transition-all duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Additional Features</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3">Item</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Per day?</th>
                    <th className="p-3">Select</th>
                  </tr>
                </thead>
                <tbody>
                  {addons.map((addon) => (
                    <tr
                      key={addon.id}
                      className="border-b hover:bg-gray-50 transition-all duration-300"
                    >
                      <td className="p-3">
                        <div className="font-semibold">{addon.name}</div>
                        <div className="text-sm text-gray-600 hidden md:block">
                          {addon.description}
                        </div>
                      </td>
                      <td className="p-3">
                        AED{" "}
                        {car.category === "Economy"
                          ? addon.priceEconomy
                          : car.category === "SUVs"
                          ? addon.priceSmallSUV
                          : car.category === "Mid size Sedan"
                          ? addon.priceStandardSUV
                          : addon.price7Seater}
                      </td>
                      <td className="p-3">{addon.perDay ? "Yes" : "No"}</td>
                      <td className="p-3">
                        {addon.type === "boolean" ? (
                          <input
                            type="checkbox"
                            checked={!!selectedAddOns[addon.id]}
                            onChange={() => toggleAddOn(addon.id)}
                            className="w-5 h-5 cursor-pointer"
                          />
                        ) : (
                          <input
                            type="number"
                            min={0}
                            value={selectedAddOns[addon.id] || 0}
                            onChange={(e) =>
                              setSelectedAddOns((prev) => ({
                                ...prev,
                                [addon.id]: parseInt(e.target.value),
                              }))
                            }
                            className="w-20 p-2 border rounded-md"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-gray-700 transition-all duration-300"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="bg-green-600 text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-green-700 transition-all duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Driver Details</h3>
              <DriverDetailsForm
                prevStep={prevStep}
                onSubmit={(values) => {
                  setDriverDetails(values);
                  nextStep();
                }}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Summary</h3>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row justify-between">
                    <span className="text-lg">Location:</span>
                    <span className="text-lg text-right font-semibold">
                      {selectedLocation}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row  justify-between">
                    <span className="text-lg">Date Range:</span>
                    <span className="text-lg text-right font-semibold">
                      {selectionRange.startDate.toDateString()} -{" "}
                      {selectionRange.endDate.toDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row  justify-between">
                    <span className="text-lg">Time Range:</span>
                    <span className="text-lg text-right font-semibold">
                      {timeRange.pickup} - {timeRange.dropoff}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row  justify-between">
                    <span className="text-lg">
                      Base Price ({numberOfDays} days):
                    </span>
                    <span className="text-lg text-right font-semibold">
                      AED {basePrice}
                    </span>
                  </div>
                  {addons
                    .filter((addon) => selectedAddOns[addon.id])
                    .map((addon) => (
                      <div key={addon.id} className="flex flex-col md:flex-row  justify-between">
                        <span className="text-lg">
                          {addon.name} (
                          {addon.perDay ? `${numberOfDays} days` : "1 time"}):
                        </span>
                        <span className="text-lg text-right font-semibold">
                          AED{" "}
                          {addon.perDay
                            ? (car.category === "Economy"
                                ? addon.priceEconomy
                                : car.category === "SUVs"
                                ? addon.priceSmallSUV
                                : car.category === "Mid size Sedan"
                                ? addon.priceStandardSUV
                                : addon.price7Seater) *
                              numberOfDays *
                              (addon.type === "number"
                                ? selectedAddOns[addon.id]
                                : 1)
                            : (car.category === "Economy"
                                ? addon.priceEconomy
                                : car.category === "SUVs"
                                ? addon.priceSmallSUV
                                : car.category === "Mid size Sedan"
                                ? addon.priceStandardSUV
                                : addon.price7Seater) *
                              (addon.type === "number"
                                ? selectedAddOns[addon.id]
                                : 1)}
                        </span>
                      </div>
                    ))}
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-xl font-bold">Total Price:</span>
                    <span className="text-xl font-bold">AED {finalTotal}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-4">
                <button
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-gray-700 transition-all duration-300"
                >
                  Back
                </button>
                <div className="flex flex-col md:flex-row  gap-4">
                  <button
                    disabled={apiLoader}
                    onClick={() => handleBooking()}
                    className={`${
                      apiLoader ? "bg-green-400" : "bg-green-600"
                    } text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-green-700 transition-all duration-300`}
                  >
                    {apiLoader ? "Loading..." : "Pay Now (Save upto 25%)"}
                  </button>
                  <button
                    disabled={apiLoader}
                    onClick={() => handleBooking()} // You can add a different handler for Pay Later if needed
                    className={`${
                      apiLoader ? "bg-blue-400" : "border border-blue-600"
                    } text-blue-600 px-8 py-2 rounded-sm text-lg font-medium hover:bg-blue-700 hover:text-white transition-all duration-300`}
                  >
                    {apiLoader ? "Loading..." : "Pay Later"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalFeaturesModal;
