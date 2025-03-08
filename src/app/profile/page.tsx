"use client";
import Badge from "@/components/Badge";
import UserMetaCard from "@/components/UserMetaCard";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { Booking } from "@/types/types";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

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

      const bookingsData: Booking[] = [];
      querySnapshot.forEach((doc) => {
        const booking = { id: doc.id, ...doc.data() } as Booking;
        bookingsData.push(booking);
      });

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

  type AddOn = {
    id?: string;
    name: string;
    price: number;
    perDay?: boolean;
  };

  return (
    <section className="mt-28 p-10 min-h-screen">
      <UserMetaCard user={user} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
        {loading ? (
          <div className="space-y-6">
            <BookingSkeleton />
            <BookingSkeleton />
            <BookingSkeleton />
          </div>
        ) : bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="mb-6 p-6 border rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold">
                ID: {booking.id}{" "}
                <Badge
                  className={` ${
                    booking.status == 1
                      ? "border shadow-primary border-primary"
                      : booking.status == 2
                      ? "border border-success shadow-success-500"
                      : "border border-error shadow-error-500"
                  }`}
                  color={
                    booking.status == 1
                      ? "primary"
                      : booking.status == 2
                      ? "success"
                      : "error"
                  }
                >
                  {booking.status == 1
                    ? "Processing"
                    : booking.status == 2
                    ? "Active"
                    : "Cancellation"}
                </Badge>
              </h3>
              <p className="text-gray-600">
                Total Price: AED {booking.totalPrice}
              </p>
              <p className="text-gray-600">
                Pickup: {booking.pickUpLocation} on {booking.pickUpDate}
              </p>
              <p className="text-gray-600">
                Dropoff: {booking.dropOffLocation} on {booking.dropOffDate}
              </p>
              {booking.selectedAddOns.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium">Selected Add-ons:</h4>
                  <ul className="list-disc pl-6">
                    {booking.selectedAddOns.map((addOn: AddOn) => (
                      <li key={addOn.id} className="text-gray-600">
                        {addOn.name} - AED {addOn.price}{" "}
                        {addOn.perDay ? "/day" : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No bookings found.</p>
        )}
      </div>
    </section>
  );
}

export default Page;
