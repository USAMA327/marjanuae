// Define Car Type
export interface Car {
    name: string;
    image: string;
    type: string;
    passengers: number;
    isAuto: boolean;
    airConditioner: boolean;
    doors: number;
    price: number;
    isTop: boolean;
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
    displayName: string;
    email: string;
    password: string;
  confirmPassword: string;
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