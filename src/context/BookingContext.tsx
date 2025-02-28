"use client"; // Mark this as a Client Component

import { createContext, useState, ReactNode } from "react";

// Define the shape of the booking data
interface BookingData {
  location: string;
  dropOffLocation: string;
  pickupDate: Date;
  dropOffDate: Date;
}

// Define the shape of the context
interface BookingContextType {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
}

// Create the context with default values
export const BookingContext = createContext<BookingContextType>({
  bookingData: {
    location: "",
    dropOffLocation: "",
    pickupDate: new Date(),
    dropOffDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  setBookingData: () => {},
});

// Define the provider component
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<BookingData>({
    location: "",
    dropOffLocation: "",
    pickupDate: new Date(),
    dropOffDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};