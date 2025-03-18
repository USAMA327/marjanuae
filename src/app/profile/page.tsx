"use client";
import Badge from "@/components/Badge";
import SummaryItem from "@/components/SummaryItem";
import UserMetaCard from "@/components/UserMetaCard";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { AddOn } from "@/types/types";
import { Icon } from "@iconify/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import moment from "moment";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function BookingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

function Page() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen,setIsOpen]=useState(false)

  // Redirect to home if user is not authenticated
  useEffect(() => {
    if (!user) {
      redirect("/");
    }
  }, [user]);

  async function fetchUserBookings(userId: string) {
    try {
      const bookingsRef = collection(db, "bookings");
      const userRef = doc(db, "users", userId);
      const q = query(bookingsRef, where("user", "==", userRef));
      const querySnapshot = await getDocs(q);

      const bookingsData: any[] = [];
      for (const doc of querySnapshot.docs) {
        const booking = { id: doc.id, ...doc.data() } as any;

        // Fetch car details
        if (booking.car) {
          const carDoc = await getDoc(booking.car);
          if (carDoc.exists()) {
            booking.car = carDoc.data();
          }
        }

        bookingsData.push(booking);
      }

      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.uid);
    }
  }, [user]);

  // If user is not authenticated, return null (redirection will happen in useEffect)
  if (!user) {
    return null;
  }

 

  return (
    <section className="mt-28 p-4 md:p-10 min-h-screen">
      <UserMetaCard user={user} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
        {loading ? (
          <div className="space-y-6">
            <BookingSkeleton />
            <BookingSkeleton />
            <BookingSkeleton />
          </div>
        ) : bookings.length > 0 ? (
          <div className="flex flex-col gap-6">
              {bookings.map((booking) => {

                return(
                  <div
                    onClick={()=>setIsOpen(!isOpen)}
                  key={booking.id}
                  className="bg-white p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 "
                >
                  <h3 className="text-xl font-semibold flex items-center justify-between">
                    <span>Booking ID: {booking.id}</span>
                    <Badge
                      className={`${booking.status == 1
                          ? "border shadow-primary border-primary"
                          : booking.status == 2
                            ? "border border-success shadow-success-500"
                            : "border border-error shadow-error-500"
                        }`}
                      color={
                        booking.status == 1
                          ? "primary"
                          : booking.status == 2
                            ? "warning"
                            : booking.status == 3
                            ? "success"
                            : "error"
                      }
                    >
                      {booking.status == 1
                     ? "Confirmed"
                     : booking.status == 2
           ? "Active"
           : booking.status == 3
                       ? "Completed"
                       : "Cancellation "}
                    </Badge>
                  </h3>
                  <div className="mt-4 space-y-3">
                    {/* Car Details */}
                    <div className="flex flex-col md:flex-row md:items-center items-start gap-2">
                      <img
                        className="h-32 w-44 object-contain"
                        src={booking.car.image}
                        alt={booking.car.name}
                      />
                      <div className="flex flex-col justify-between">
                        <p className="text-lg mb-3">
                          {booking.car.name}{" "}
                          <small className="text-slate-500 text-xs">
                            ( or Similar )
                          </small>
                        </p>
                        {booking.numberOfDays && (
                          <p className="font-semibold">
                            {booking.numberOfDays} rental days
                          </p>
                        )}
                      </div>
                    </div>

                    <SummaryItem
                      label="Total Price"
                      value={
                        <strong
                          className={`${booking.isPaid
                              ? "text-success-600"
                              : "text-warning-600"
                            } `}
                        >
                          AED {booking.totalPrice}{" "}
                          <span
                            className={` px-2 rounded-full border ${booking.isPaid
                                ? " border-success-500 "
                                : "border-warning-400 border-dotted"
                              }`}
                          >
                            {booking.isPaid ? "Paid" : "UnPaid"}
                          </span>
                        </strong>
                      }
                    />
                      
                      {
                        isOpen &&
                        
                        <>
                        <hr />
                    {/* Pickup and Return Details with Icons and Connector */}
                    <div className="border-b border-gray-200 pb-4 flex gap-2">
                      {/* Connector Line with "to" Text */}
                      <div className="flex flex-col gap-3  items-center justify-between">
                        <Icon
                          icon="fluent-color:person-key-20"
                          className="size-8"
                        />
                        <div className="border-l-2 border-secondary h-6"></div>{" "}
                        {/* Vertical Line */}
                        <Icon
                          icon="fluent:person-key-32-filled"
                          className="size-8 text-gray-400"
                        />
                      </div>

                      <div className="flex flex-col gap-4 justify-between ">
                        {/* Pickup Details */}
                        <div className="flex items-center space-x-3">
                          <div>
                            <span className="text-lg font-semibold text-primary">
                              {booking.location}
                            </span>
                            <p className="text-sm text-gray-500">
                              {moment(booking.pickupDate).format(
                                "ddd, DD, MM, YYYY"
                              )}{" "}
                              | {moment(booking.pickupTime).format("hh:mm A")}
                            </p>
                          </div>
                        </div>

                        {/* Return Details */}
                        <div className="flex items-center space-x-3">
                          <div>
                            <span className="text-lg font-semibold text-primary">
                              {booking.dropoffLocation || booking.location}
                            </span>
                            <p className="text-sm text-gray-500">
                              {moment(booking.dropoffDate).format(
                                "ddd, DD, MM, YYYY"
                              )}{" "}
                              | {moment(booking.dropoffTime).format("hh:mm A")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                          
                  
                    <hr />
                    {/* Selected Package */}
                    <SummaryItem
                      label="Package"
                      value={
                        booking.selectedPackage
                          ? booking.selectedPackage.name
                          : ""
                      }
                    />

                    {booking.mileStone && (
                      <>
                        <hr className="" />
                        <SummaryItem
                          label="Mileage (Allowance)"
                          value={"400 km"}
                        />
                      </>
                    )}

                    <hr />
                    {booking.selectedAddOns.length > 0 && (
                      <div className="mt-4">
                        <ul className="list-disc ">
                          {booking.selectedAddOns.map((addOn: AddOn) => (
                            <li className="list-none" key={addOn.id}>
                              <SummaryItem
                                key={addOn.id}
                                label={addOn.name}
                                value={addOn.perDay ? "(per day)" : ""}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                        </>
                      }



                  </div>
                </div>
              )})}
          </div>
        ) : (
          <p className="text-gray-600">No bookings found.</p>
        )}
      </div>
    </section>
  );
}

export default Page;
