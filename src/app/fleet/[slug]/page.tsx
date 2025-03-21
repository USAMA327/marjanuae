"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { Addon, BookingValues, Car, Package } from "@/types/types";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  runTransaction,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import OldBookingForm from "@/components/OldBookingForm";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PackageSelection from "@/components/BookingModal/PackageSelection";
import ToggleSwitch from "@/components/ToggleSwitch";
import BookingSummary from "@/components/BookingModal/BookingSummary";
import RefundableDeposit from "@/components/BookingModal/RefunableDeposit";
import moment from "moment";
import axios from "axios";
import DriverDetailsForm from "@/components/BookingModal/DriverDetailsForm";
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeft } from "lucide-react";
type CheckoutSession = {
  checkoutMode: string;
  merchant: string;
  result: "SUCCESS" | "FAILURE";
  session: {
    id: string;
    updateStatus: "SUCCESS" | "FAILED";
    version: string;
  };
  successIndicator: string;
};

const AdditionalFeaturesModal: React.FC = () => {
  const { user } = useAuth();
  const { slug } = useParams() ?? {};
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const router=useRouter()

  // Default values from query params
  const getDefaultValues = (): BookingValues => ({
    location: params.get("location") || "",
    dropoffLocation: params.get("dropoffLocation") || "",
    pickupDate: params.get("pickupDate")
      ? new Date(params.get("pickupDate")!)
      : undefined,
    pickupTime: params.get("pickupTime")
      ? new Date(params.get("pickupTime")!)
      : undefined,
    dropoffDate: params.get("dropoffDate")
      ? new Date(params.get("dropoffDate")!)
      : undefined,
    dropoffTime: params.get("dropoffTime")
      ? new Date(params.get("dropoffTime")!)
      : undefined,
  });

  const [car, setCar] = useState<Car | null>(null);
  const [carApiLoader, setCarApiLoader] = useState(true);
  const [values, setValues] = useState<BookingValues>(getDefaultValues());
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>(
    {}
  );
  const [addons, setAddons] = useState<Addon[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [driverDetails, setDriverDetails] = useState<any>(null);
  const [apiLoader, setApiLoader] = useState(false);
  const [packages, setPackages] = useState<Package[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [currentDiscount, setCurrentDiscount] = useState<number>(0);
  const [sessionId, setSessionID] = useState<CheckoutSession | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uuid,setUuid]=useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [verifiedLoader,setVerifiedLoader]=useState<boolean>(false)

  // Fetch car details
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const docRef = doc(db, "cars", slug as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const carData = docSnap.data() as Car;
          setCar({ ...carData, id: docSnap.id });
        } else {
          setCar(null);
        }
      } catch (error) {
        toast.error("Error while getting car details!");
        console.error("Error fetching car details:", error);
      } finally {
        setCarApiLoader(false);
      }
    };

    fetchCarDetails();
  }, [slug]);

  // Fetch discount
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
      }
    };

    fetchDiscount();
  }, []);

  // Fetch add-ons
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

  // Calculate number of days
  const numberOfDays = useMemo(() => {
    if (values.pickupDate && values.dropoffDate) {
      return Math.ceil(
        (values.dropoffDate.getTime() - values.pickupDate.getTime()) /
          (1000 * 3600 * 24)
      );
    }
    return 0;
  }, [values.pickupDate, values.dropoffDate]);

  // Calculate base price
  const basePrice = useMemo(
    () => (car ? car.price * numberOfDays : 0),
    [car, numberOfDays]
  );

  // Calculate add-ons total
  const addOnsTotal = useMemo(() => {
    if (!car) return 0;
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

        return (
          total +
          (addon.perDay ? price * numberOfDays * quantity : price * quantity)
        );
      }
      return total;
    }, 0);
  }, [addons, selectedAddOns, numberOfDays, car]);

 // Function to calculate the discounted price based on car category
const calculateDiscountedPrice = (pkg: Package) => {
  if (!car?.category) return 0; // Handle case where car category is undefined

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

// Calculate package price
const packagePrice = useMemo(() => {
  if (!selectedPackage) return 0; // Return 0 if no package is selected

  // Calculate the discounted price for the selected package
  const discountedPrice = calculateDiscountedPrice(selectedPackage);

  // Multiply the discounted price by the number of days
  return discountedPrice * numberOfDays;
}, [selectedPackage, numberOfDays, car?.category]); // Add car.category as a dependency
  // Calculate extra hours
  const extraHours = useMemo(() => {
    if (values.pickupTime && values.dropoffTime) {
      return (
        moment(values.dropoffTime).get("h") - moment(values.pickupTime).get("h")
      );
    }
    return 0;
  }, [values.pickupTime, values.dropoffTime]);

  const hourRate = useMemo(
    () => (extraHours > 0 ? extraHours * 20 : 0),
    [extraHours]
  );
  const collectionPickupAmount = (values.location == "Ras Al Khaimah City Office" && values.dropoffLocation == "Ras Al Khaimah City Office") || (values.location == "Ras Al Khaimah City Office" && !values.dropoffLocation) ? 0 : 80
  // Calculate final total
  const finalTotal = useMemo(
    () => basePrice + addOnsTotal + packagePrice + hourRate + collectionPickupAmount,
    [basePrice, addOnsTotal, packagePrice, hourRate,collectionPickupAmount]
  );

  // Calculate discount
  const discount = useMemo(
    () => basePrice * currentDiscount,
    [basePrice, currentDiscount]
  );

  // Calculate discounted total
  const discountedTotal = useMemo(
    () => finalTotal - discount,
    [finalTotal, discount]
  );

  // Handle checkout
  const handleCheckout = 
    async (amount: number, orderId: string | number, carId: string,uuid:string) => {
      setLoading(true);
      try {
        const response = await axios.post("/api/initiate-checkout", {
          amount,
          orderId,
          description: "Check out for renting a car",
          carId: carId,
          uuid,
        });

        if (!response.data.session?.id) {
          toast.error("Failed to retrieve session ID");
          console.error("Failed to retrieve session ID");
          return;
        }

        setSessionID(response.data);

        // Load Mastercard Hosted Checkout script
        const script = document.createElement("script");
        script.src = `https://${process.env.NEXT_PUBLIC_MPGS_REGION}-gateway.mastercard.com/static/checkout/checkout.min.js`;
        script.onload = () => {
          // @ts-ignore
          Checkout.configure({
            session: { id: response.data.session.id },
          });
          setTimeout(() => {
            // @ts-ignore
            Checkout.showEmbeddedPage("#embed-target");
          }, 1000);
        };
        document.body.appendChild(script);
      } catch (error: any) {
        console.error(error.response?.data || error.message);
        toast.error(error.response?.data?.error?.explanation || error.message);
      } finally {
        setLoading(false);
      }
    }

 


  const updateBookingToPaid = async (bookingId:string) => {
    try {
      // Reference the specific document in the 'bookings' collection
      const bookingRef = doc(db, "bookings", bookingId);
  
      // Update the 'isPaid' field to true
      await updateDoc(bookingRef, {
        isPaid: true,
      });
  
      console.log("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking: ", error);
    }
  };

  
  const verifyPayment = async () => {
    setVerifiedLoader(true)
    try {
      const response = await axios.get(
        `/api/check-payment/${params.get("uuid")}`
      );
      const status = response.data.status;
      if (status === "CAPTURED") {
        if (params.get("orderId")) {
          updateBookingToPaid(params?.get("orderId") || "")
        }
        router.replace(`/payment-verification?status=success&oderId=${params?.get("orderId")}`);
      } else {
        router.replace(`/payment-verification?status=failed&oderId=${params?.get("orderId")}`);
      }
    } catch (err) {
      router.replace(`/payment-verification?status=failed&oderId=${params?.get("orderId")}`);
      console.log(err);
    } finally {
      setVerifiedLoader(false)
    }
  };

  useEffect(() => {
    if (params.get("orderId")) {
      verifyPayment();
    }
  }, [params.get("orderId")]);
  // Handle booking
  const handleBooking = async (isPayNow: boolean) => {
    const uuid = uuidv4();
    setUuid(uuid)
    // Generate auto-increment ID
    const generateAutoIncrementId = async () => {
      const counterRef = doc(db, "metadata", "counter");
      try {
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
      } catch (error) {
        console.error("Error generating auto-increment ID:", error);
        throw new Error("Failed to generate booking ID.");
      }
    };
  
    // Save booking details to Firestore
    const saveBookingToFirestore = async (bookingDetails: any) => {
      try {
        await setDoc(doc(db, "bookings", bookingDetails.id.toString()), bookingDetails);
      } catch (error) {
        console.error("Error saving booking to Firestore:", error);
        throw new Error("Failed to save booking details.");
      }
    };
  
    // Send confirmation email
    const sendConfirmationEmail = async (bookingDetails: any, isPayNow: boolean) => {
      try {
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: driverDetails.email,
            subject: "Your Booking Confirmation",
            text: `Thank you for your booking! Here are your details:
            Booking ID: ${bookingDetails.id}
            Car: ${car?.name}`,
            html: `
            <!DOCTYPE html>
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
                        <strong style="display: inline-block; width: 140px; color: #555;">Car:</strong> ${car?.name}
                      </li>
                      <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <strong style="display: inline-block; width: 140px; color: #555;">UUID:</strong> ${bookingDetails.uuid}
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
                        <strong style="display: inline-block; width: 140px; color: #555;">Dropoff Location:</strong> ${bookingDetails.dropoffLocation || bookingDetails.location}
                      </li>
                      <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <strong style="display: inline-block; width: 140px; color: #555;">Selected Package:</strong> ${bookingDetails?.selectedPackage?.name}
                      </li>
                      <li style="padding: 10px 0; border-bottom: 1px solid #eee;">
                        <strong style="display: inline-block; width: 140px; color: #555;">
                          ${!isPayNow ? 'Total Price' : 'Payable upon pickup'}:
                        </strong> AED ${(!isPayNow ? bookingDetails.totalPrice : discountedTotal).toFixed(2)}
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
            `,
          }),
        });
  
        if (!emailResponse.ok) {
          throw new Error("Failed to send email.");
        }
  
        if (!isPayNow) {
          toast.success("Booking successfully added and confirmation email sent!");
        } else {
          toast.success("Don't close the window/tab, you will be redirected to the payment page!", { duration: 4000 });
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        throw new Error("Failed to send confirmation email.");
      }
    };
  
    // Main function logic
    setApiLoader(true);
    try {
      const bookingId = await generateAutoIncrementId();
      setOrderId(bookingId?.toString())
  
      const selectedAddOnsList = addons.filter((addon) => selectedAddOns[addon.id]);
  
      const bookingDetails = {
        id: bookingId,
        user: user?.uid
          ? doc(db, "users", user.uid)
          : {
              displayName: driverDetails.displayName,
              phone: driverDetails.contactNumber,
              email: driverDetails.email,
              nationality: driverDetails.nationality,
            },
        car: doc(db, "cars", car?.id || ""),
        location: values.location,
        dropoffLocation: values.dropoffLocation,
        pickupDate: values.pickupDate?.toISOString(),
        pickupTime: values.pickupTime?.toISOString(),
        dropoffDate: values.dropoffDate?.toISOString(),
        dropoffTime: values.dropoffTime?.toISOString(),
        totalPrice: finalTotal,
        isPaid: false,
        selectedPackage: selectedPackage,
        createdAt: new Date().toISOString(),
        selectedAddOns: selectedAddOnsList,
        status: 1,
        numberOfDays: numberOfDays,
        uuid: uuid,
      };
  
      await saveBookingToFirestore(bookingDetails);
      await sendConfirmationEmail(bookingDetails, isPayNow);
  
      if (isPayNow) {
        nextStep();
        await handleCheckout(discountedTotal, bookingId, car?.id || "", uuid);
      } else {
        router.push("/fleet");
      }
    } catch (error) {
      console.error("Error during booking process:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : "An unexpected error occurred."}`);
    } finally {
      setApiLoader(false);
    }
  };


  // Step navigation
  const nextStep = useCallback(
    () => setCurrentStep((prev) => (prev < 6 ? prev + 1 : prev)),
    []
  );
  const prevStep = useCallback(
    () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev)),
    []
  );

  return (
    <div className=" flex overflow-scroll  fixed inset-0 bg-white  justify-center ">
      {
        verifiedLoader &&    <div className="fixed indent-0 z-[99999] flex bg-black h-screen w-screen justify-center items-center">
        <span className="text-white text-4xl">Verifying....</span>
        </div>
      }
   
      {carApiLoader ? (
        <div className=" flex justify-center items-center">

          {!verifiedLoader && <span>Loading....</span>}
     
        </div>
      ) : !car ? (
        <div className=" flex justify-center items-center">Car not found!</div>
        ) :
          
          (
        <div className="p-2 md:p-8">
              {/* Progress Bar */}
              
              {currentStep < 6 &&   <div className="flex justify-center my-8">
            <div className="hidden lg:flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <React.Fragment key={step}>
                  <div
                    className={`px-6 py-2 flex items-center justify-center gap-2 rounded-lg transition-all duration-300 ${
                      currentStep >= step
                        ? "bg-primary text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <Icon
                      icon={
                        step === 1
                          ? "mdi:calendar-check"
                          : step === 2
                          ? "mdi:account"
                          : step === 3
                          ? "mdi:package-variant"
                          : step === 4
                          ? "mdi:plus-box"
                          : "mdi:credit-card-check"
                      }
                      className={`w-4 h-4 ${
                        currentStep >= step ? "text-white" : "text-gray-600"
                      }`}
                    />
                    <span className="font-semibold text-sm">
                      {step === 1
                        ? "Booking Dates"
                        : step === 2
                        ? "Driver Details"
                        : step === 3
                        ? "Package"
                        : step === 4
                        ? "Add-ons"
                        : step === 5
                        ? "Booking"
                        : "Pay Now"}
                    </span>
                  </div>
                  {step < 5 &&  (
                    <div
                      className={`w-10 h-1 ${
                        currentStep > step ? "bg-primary" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>} 
        

          {/* Step 1: Booking Dates */}
          {currentStep === 1 && (
            <OldBookingForm
              title="Next"
              nextStep={nextStep}
              setValues={setValues}
              defaultValues={values}
              showFull={false}
            />
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

          {/* Step 3: Package Selection */}
          {currentStep === 3 && (
                <PackageSelection
                  car={car}
              total={basePrice}
              packages={packages}
              setPackages={setPackages}
              selectedPackage={selectedPackage}
              onSelectPackage={(packageName) => setSelectedPackage(packageName)}
              onNext={nextStep}
              onPrev={prevStep}
              setSelectedPackage={setSelectedPackage}
            />
          )}

          {/* Step 4: Add-ons */}
          {currentStep === 4 && (
            <div>
              <table className="w-full text-left overflow-x-auto border-collapse">
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
                        <div className="text-sm text-gray-600">
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
                          <ToggleSwitch
                            checked={!!selectedAddOns[addon.id]}
                            onChange={() =>
                              setSelectedAddOns((prev) => ({
                                ...prev,
                                [addon.id]: prev[addon.id] ? 0 : 1,
                              }))
                            }
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

          {/* Step 5: Summary and Payment */}
          {currentStep === 5 && (
            <div>
                  <BookingSummary
                  collectionPickupAmount={collectionPickupAmount}
                car={car}
                values={values}
                basePrice={basePrice}
                numberOfDays={numberOfDays}
                addons={addons}
                selectedAddOns={selectedAddOns}
                selectedPackage={selectedPackage}
                discount={discount}
                discountPercentage={currentDiscount * 100}
                finalTotal={finalTotal}
                discountedTotal={discountedTotal}
                hourRate={hourRate}
                extraHours={extraHours}
                  />
                  
              

              <RefundableDeposit />
              <div className="flex flex-col md:flex-row justify-between gap-4 pb-10">
                <button
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-gray-700 transition-all duration-300"
                >
                  Back
                </button>
                <div className="flex flex-col md:flex-row gap-4 ">
                  <button
                    disabled={apiLoader || loading}
                    onClick={() => handleBooking(true)}
                    className={`${
                      apiLoader || loading ? "bg-success-400" : "bg-success-600"
                    } text-white px-8 py-2 rounded-sm text-lg font-medium hover:bg-success-700 transition-all duration-300`}
                  >
                    {apiLoader || loading
                      ? "Loading..."
                      : `Pay now & Save AED ${discount.toFixed(2)} Instantly`}
                  </button>

                  <button
                    disabled={apiLoader || loading}
                    onClick={() => handleBooking(false)}
                    className={`${
                      apiLoader || loading
                        ? "bg-blue-400"
                        : "border border-blue-600"
                    } text-blue-600 px-8 py-2 rounded-sm text-lg font-medium hover:bg-blue-700 hover:text-white transition-all duration-300`}
                  >
                    {apiLoader || loading
                      ? "Loading..."
                      : "Book now & Pay Later"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 5  Payment */}
          {currentStep === 6 && (
                <div className="w-full ">
                  {/* <h1 className="bg-secondary w-full text-white px-2 mb-4">UUID : { orderId}</h1> */}
            <button
                   className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                    onClick={() => {
         
                     router.replace(`/fleet/${slug}?orderId=${orderId}&uuid=${uuid}`)
                    }
                    }
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" size={20} />
            <span>Pay Later</span>
          </button>
                  <div className="w-full" id="embed-target">
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdditionalFeaturesModal;
