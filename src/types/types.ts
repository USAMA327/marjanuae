// Define Car Type
export interface Car {
  id: string; // Unique identifier for the car
  number: string; // Car number (e.g., "LEX 12")
  brand: "Nissan" | "Toyota" | "MG" | "Hyundai" | "Kia" | "Mitsubishi" | "Renault"; // Allowed brands
  name: string; // Car name (e.g., "Nissan Kick")
  category: "Economy" | "Mid size Sedan" | "Crossover" | "SUVs"; // Car category
  passengers: number; // Number of passengers
  isAuto: boolean; // Is the car automatic?
  airConditioner: boolean; // Does the car have air conditioning?
  doors: number; // Number of doors
  price: number; // Price in AED
  image: string; // URL of the car image
  isTop: boolean; // Is this a top car?
  bags:number
}

export interface CarCards extends Car {
  onClick: () => void;
}
export interface OfficeLocation {
  img: string;
  name: string;
  openingHours: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}



export interface PaynowFormValues {
  displayName: string;
  phone: string;
}



export interface LoginProps {
  onSwitchToSignup: () => void;
}

export interface SignupProps {
  onSwitchToLogin: () => void;
}

// Define a TypeScript interface for Step component props
export interface StepProps {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  shadow: string;
}


export interface Addon {
  id: string | number; // Optional because it won't exist when creating a new addon
  name: string;
  description: string;
  type: "boolean" | "number";
  priceEconomy: number;
  priceSmallSUV: number;
  priceStandardSUV: number;
  price7Seater: number;
  perDay: boolean; // New field
}


export interface Booking {
  id: string;
  car: any; // Firestore DocumentReference
  createdAt: string;
  dropoffDate: Date;
  dropoffLocation: string;
  pickupDate: Date;
  pickupLocation: string;
  dropoffTime: Date,
  pickupTime: Date;
  selectedAddOns: Addon[];
  totalPrice: number;
  user: any; // Firestore DocumentReference
  status: number; // 1: Confirmed, 2: Active, 3: Completed, 4: Cancelled
  selectedPackage:Package

}

export type AddOn = {
  id?: string;
  name: string;
  price: number;
  perDay?: boolean;
};


export interface Package {
  id?: string; // Optional because it will be added by Firestore
  name: string;
  onlineDiscount: number;
  rating: number;
  excessUpto: number;
  priceEconomy: number;
  priceSmallSUV: number;
  priceStandardSUV: number;
  price7Seater: number;
  list: {
    available: boolean;
    title: string;
    description: string;
  }[];
}


export interface BookingValues {
  location: string;
  dropoffLocation: string;
  pickupDate: Date | undefined;
  pickupTime: Date | undefined;
  dropoffDate: Date | undefined;
  dropoffTime: Date | undefined;
}


// types/payment.ts// types/payment.ts
export interface PaymentRequest {
  amount: string;
  currency: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  callbackUrl: string;
}

export interface PaymentResponse {
  redirectUrl: string;
  orderId: string;
  status: string;
}