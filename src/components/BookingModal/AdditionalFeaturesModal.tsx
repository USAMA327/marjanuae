import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { Addon, BookingValues, Car, Package } from "@/types/types";
import { setDoc, doc, onSnapshot, collection, runTransaction, getDoc } from "firebase/firestore";
import { Icon } from "@iconify/react";
import DriverDetailsForm from "./DriverDetailsForm";
import toast from "react-hot-toast";
import OldBookingForm from "../OldBookingForm";
import { useSearchParams } from "next/navigation";
import PackageSelection from "./PackageSelection";
import ToggleSwitch from "../ToggleSwitch";
import BookingSummary from "./BookingSummary";
import RefundableDeposit from "./RefunableDeposit";
import moment from "moment";
import axios from "axios";

interface ModalProps {
  car?: Car;
  onClose: () => void;
}



const AdditionalFeaturesModal: React.FC<ModalProps> = ({ car, onClose }) => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());

  // Default values from query params
  const getDefaultValues = (): BookingValues => ({
    location: params.get("location") || "",
    dropoffLocation: params.get("dropoffLocation") || "",
    pickupDate: params.get("pickupDate") ? new Date(params.get("pickupDate")!) : undefined,
    pickupTime: params.get("pickupTime") ? new Date(params.get("pickupTime")!) : undefined,
    dropoffDate: params.get("dropoffDate") ? new Date(params.get("dropoffDate")!) : undefined,
    dropoffTime: params.get("dropoffTime") ? new Date(params.get("dropoffTime")!) : undefined,
  });

  const [values, setValues] = useState<BookingValues>(getDefaultValues());
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({});
  const [addons, setAddons] = useState<Addon[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [driverDetails, setDriverDetails] = useState<any>(null);
  const [apiLoader, setApiLoader] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package |  null>(null);
  const [mileStone,setMileStone]=useState(true)
  const [apiloading, setApiLoading] = useState(true);
  const [currentDiscount, setCurrentDiscount] = useState<number>(0);
  if (!car) return null;
  useEffect(() => {
    const discountDocId = "QZef7kBLZHRZGu2kUYt9"; 
    const fetchDiscount = async () => {
      try {
        const docRef = doc(db, "discount", discountDocId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCurrentDiscount(docSnap.data().discount);
        } else {
          console.error("No discount document found.");
        }
      } catch (error) {
        toast.error("Error fetching discount!");
      } finally {
        setApiLoading(false);
      }
    };

    fetchDiscount();
  }, []);

  // Calculate number of days
  const numberOfDays = useMemo(() => {
    if (values.pickupDate && values.dropoffDate) {
      return Math.ceil(
        (values.dropoffDate.getTime() - values.pickupDate.getTime()) / (1000 * 3600 * 24)
      );
    }
    return 0;
  }, [values.pickupDate, values.dropoffDate]);

  // Calculate base price
  const basePrice = useMemo(() => car.price * numberOfDays, [car.price, numberOfDays]);

  // Calculate add-ons total
  const addOnsTotal = useMemo(() => {
    return addons.reduce((total, addon) => {
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

        return total + (addon.perDay ? price * numberOfDays * quantity : price * quantity);
      }
      return total;
    }, 0);
  }, [addons, selectedAddOns, numberOfDays, car.category]);

  // Calculate final total
  const finalTotal = useMemo(() => basePrice + addOnsTotal, [basePrice, addOnsTotal]);

  // Calculate discount (25% of base price)
  const discount = useMemo(() => basePrice * currentDiscount, [basePrice,currentDiscount]);

  // Calculate discounted total
  const discountedTotal = useMemo(() => finalTotal - discount, [finalTotal, discount]);


  const [loading, setLoading] = useState<boolean>(false);

  // const initiatePayment = async () => {

  //   interface Customer {
  //     name: string;
  //     email: string;
  //     phoneCountryCode: string;
  //     phoneNumber: string;
  //   }
    
  //   interface EInvoiceDetails {
  //     subtotal: number;
  //     grandTotal: number;
  //     extraChargesType: string;
  //     invoiceDiscountType: string;
  //   }

    
  //   try {
  //     const response = await fetch('/api/initiate-payment', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         amount: 20,
  //         currency: 'SAR',
  //         customer: {
  //           name: 'Kiran',
  //           email: 'testmail@geidea.com',
  //           phoneCountryCode: '+20',
  //           phoneNumber: '8003030083',
  //         } as Customer,
  //         eInvoiceDetails: {
  //           subtotal: 20,
  //           grandTotal: 20,
  //           extraChargesType: 'Amount',
  //           invoiceDiscountType: 'Amount',
  //         } as EInvoiceDetails,
  //       }),
  //     });
  
  //     const data = await response.json();
  //     console.log('Payment Response:', data);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  

  // Handle booking submission
  const handleBooking = async (isPayNow: boolean) => {
    setApiLoader(true);
    const generateAutoIncrementId = async () => {
      const counterRef = doc(db, "metadata", "counter");
    
      return await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        let newId = 1;
    
        if (counterDoc.exists()) {
          const currentValue = counterDoc.data().value;
          newId = currentValue + 1;
          transaction.update(counterRef, { value: newId });
        } else {
          transaction.set(counterRef, { value: newId });
        }
    
        return newId;
      });
    };
    
    const bookingId = await generateAutoIncrementId(); // Get new ID
    const selectedAddOnsList = addons.filter((addon) => selectedAddOns[addon.id]);

    const bookingDetails = {
      id: bookingId,
      user: user?.uid ? doc(db, "users", user.uid) : null,
      car: doc(db, "cars", car.id),
      location: values.location,
      dropoffLocation:values.dropoffLocation,
      pickupDate: values.pickupDate?.toISOString(),
      pickupTime: values.pickupTime?.toISOString(),
      dropoffDate:values.dropoffDate?.toISOString(),
      dropoffTime:values.dropoffTime?.toISOString(),
      totalPrice: finalTotal,
      isPaid: isPayNow,
      selectedPackage:selectedPackage,
      createdAt: new Date().toISOString(),
      selectedAddOns: selectedAddOnsList,
      mileStone:mileStone,
      status: 1,
      numberOfDays:numberOfDays
    };

    try {
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          displayName: driverDetails.displayName,
          phone: driverDetails.contactNumber,
          email: driverDetails.email,
          nationality: driverDetails.nationality,
          createdAt: new Date(),
        });
      }

      await setDoc(doc(db, "bookings", bookingId.toString()), bookingDetails);

      // Send confirmation email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: driverDetails.email,
          subject: "Your Booking Confirmation",
          text: `Thank you for your booking! Here are your details:
          Booking ID: ${bookingId}
          Car: ${car.name}
          
        `,
      
          html:`<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Booking Confirmation</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; line-height: 1.6; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden;">
              
              <!-- Header -->
              <div style="background-color: #dbeafe; color: #045A85; padding: 20px; text-align: center;">
                <h1 style="font-size: 24px; margin: 0;">Booking Confirmation</h1>
              </div>
          
              <!-- Body -->
              <div style="padding: 20px;">
                <h2 style="font-size: 20px; margin-bottom: 15px; color: #045A85; text-align: center;">Thank you for your booking! 🎉</h2>
                <p style="margin-bottom: 15px;">Your booking has been confirmed. Below are the details of your reservation:</p>
                
                <!-- Booking ID -->
                <div style="background-color: #dbeafe; color: #045A85; padding: 15px; border-radius: 4px; text-align: center; margin-bottom: 20px; font-weight: bold; border: 1px solid #045A85;">
                  <strong>Booking ID:</strong> ${bookingDetails.id}
                </div>
          
                <!-- Booking Details -->
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                  <ul style="list-style: none; padding: 0;">
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Car:</strong> ${car.name}
                    </li>
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Pickup Date & Time:</strong> 
                      ${moment(bookingDetails.pickupDate).format("ddd, DD, MM, YYYY")} | ${moment(bookingDetails.pickupTime).format("hh:mm A")}
                    </li>
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Dropoff Date & Time:</strong> 
                      ${moment(bookingDetails.dropoffDate).format("ddd, DD, MM, YYYY")} | ${moment(bookingDetails.dropoffTime).format("hh:mm A")}
                    </li>
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Pickup Location:</strong> ${bookingDetails.location}
                    </li>
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Dropoff Location:</strong> ${bookingDetails.dropoffLocation}
                    </li>
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Selected Package:</strong> ${bookingDetails?.selectedPackage?.name}
                    </li>
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Payment Status:</strong> ${bookingDetails.isPaid ? "Paid" : "Payable upon pickup"}
                    </li>
                    <!-- Pricing -->
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Total Price:</strong> AED ${bookingDetails.totalPrice}
                    </li>
                    <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Discount:</strong> -AED ${discount}
                    </li>
                    <li style="padding: 10px 0;">
                      <strong style="display: inline-block; width: 140px; color: #555;">Payable upon pickup:</strong> AED ${discountedTotal}
                    </li>
                  </ul>
                </div>
          
                <p style="text-align: center;">If you have any questions, feel free to contact us.</p>
              </div>
          
              <!-- Footer -->
              <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 14px; color: #666;">
                <p>&copy; 2010 Al Marjan. All rights reserved.</p>
              </div>
          
            </div>
          </body>
          </html>
          `
        }),
      });

      if (emailResponse.ok) {
        toast.success("Booking successfully added and confirmation email sent!");
      } else {
        toast.error("Booking added, but failed to send confirmation email.");
      }

      onClose();
    } catch (error) {
      console.error("Error adding booking to Firestore", error);
      toast.error("Error adding booking to Firestore");
    } finally {
      setApiLoader(false);
    }
  };

  // Fetch add-ons from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "addons"),
      (snapshot) => {
        const addonsData: Addon[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Addon[];
        setAddons(addonsData);
      },
      (err) => {
        toast.error("Error while fetching addons!");
        console.error(err);
      }
    );

    return () => unsubscribe();
  }, []);

  // Step navigation
  const nextStep = () => setCurrentStep((prev) => (prev < 5 ? prev + 1 : prev));
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-screen h-screen   rounded-lg shadow-lg relative overflow-y-auto">
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

       

        <div className="p-2 md:p-8">
          {/* Progress Bar */}
          <div className="flex justify-center my-8">
          {/* <button onClick={initiatePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button> */}
            <div className="hidden lg:flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`px-6 py-2 flex items-center justify-center gap-2 rounded-lg transition-all duration-300 ${
                      currentStep >= step ? "bg-primary text-white shadow-lg" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Icon
                      icon={
                        step === 1
                          ? "mdi:calendar-check"
                          : step === 2
                          ? "mdi:account"
                          : step === 3
                          ? "mdi:plus-box"
                          : step === 4
                          ? "mdi:package-variant"
                          : "mdi:credit-card-check"
                      }
                      className={`w-6 h-6 ${currentStep >= step ? "text-white" : "text-gray-600"}`}
                    />
                    <span className="font-semibold">
                      {step === 1
                        ? "Booking Dates"
                        : step === 2
                        ? "Driver Details"
                        : step === 3
                        ? "Add-ons"
                        : step === 4
                        ? "Package"
                        : "Pay Now"}
                    </span>
                  </div>
                  {step < 5 && (
                    <div
                      className={`w-20 h-1 ${currentStep > step ? "bg-primary" : "bg-gray-200"}`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          
          
          {/* Step 1: Booking Dates */}
          {currentStep === 1 && (
            <OldBookingForm title="Next" nextStep={nextStep} setValues={setValues} defaultValues={values} showFull={false} />
          )}

          {/* Step 2: Driver Details */}
          {currentStep === 2 && (
            <DriverDetailsForm
              prevStep={prevStep}
              onSubmit={(values) => {
                setDriverDetails(values);
                nextStep();
              }}
            />
          )}

          {/* Step 3: Add-ons */}
          {currentStep === 3 && (
            <div>
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
                    <tr key={addon.id} className="border-b hover:bg-gray-50 transition-all duration-300">
                      <td className="p-3">
                        <div className="font-semibold">{addon.name}</div>
                        <div className="text-sm text-gray-600 hidden md:block">{addon.description}</div>
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
                         <ToggleSwitch
                         checked={!!selectedAddOns[addon.id]}
                         onChange={() => setSelectedAddOns((prev) => ({ ...prev, [addon.id]: prev[addon.id] ? 0 : 1 }))}
                         
                       />
                        ) : (
                          <input
                            type="number"
                            min={0}
                            value={selectedAddOns[addon.id] || 0}
                            onChange={(e) =>
                              setSelectedAddOns((prev) => ({ ...prev, [addon.id]: parseInt(e.target.value) }))
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

          {/* Step 4: Package Selection */}
          {currentStep === 4 && (
            <PackageSelection
              mileStone={mileStone}
              setMileStone={setMileStone}
              total={basePrice}
          packages={packages}
          setPackages={setPackages}
          selectedPackage={selectedPackage}
          onSelectPackage={(packageName) => setSelectedPackage(packageName)} // Pass setSelectedPackage
          onNext={nextStep}
          onPrev={prevStep}
          setSelectedPackage={setSelectedPackage} // Pass setSelectedPackage
        />
          )}

          {/* Step 5: Summary and Payment */}
          {currentStep === 5 && (
            <div>
           

              <BookingSummary
                
                car={car}
        values={values}
        basePrice={basePrice}
        numberOfDays={numberOfDays}
        addons={addons}
        selectedAddOns={selectedAddOns}
        selectedPackage={selectedPackage}
                discount={discount}
                discountPercentage={currentDiscount *100}
        finalTotal={finalTotal}
                discountedTotal={discountedTotal}
                mileStone={mileStone}
              />

             <RefundableDeposit/>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <button
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-gray-700 transition-all duration-300"
                >
                  Back
                </button>
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    disabled={apiLoader}
                    onClick={() => handleBooking(true)}
                    className={`${
                      apiLoader ? "bg-success-400" : "bg-success-600"
                    } text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-success-700 transition-all duration-300`}
                  >
                    {apiLoader ? "Loading..." : `Pay Now (Save AED ${discount})`}
                  </button>

                
                  <button
                    disabled={apiLoader || apiloading}
                    onClick={() => handleBooking(false)}
                    className={`${
                      apiLoader ? "bg-blue-400" : "border border-blue-600"
                    } text-blue-600 px-8 py-2 rounded-sm text-lg font-medium hover:bg-blue-700 hover:text-white transition-all duration-300`}
                  >
                    {apiLoader ? "Loading..." : "Book now & Pay Later"}
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