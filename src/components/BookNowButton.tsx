'use client';
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";

const BookNowButton = ({onClick}:{onClick:()=>void}) => {
    const { user, openAuthModal } = useAuth();

    const handleBookNow = async () => {
      if (user) {
        // User is logged in, hit the API
        onClick()
        console.log("User is logged in. Hitting the API...");
        // Replace with your API call
        // await fetch('/api/book', { method: 'POST' });
      } else {
        // User is not logged in, open the login modal
        openAuthModal();
      }
    };
  

  return (
    <>
      <button
   onClick={handleBookNow}
        className="w-full bg-primary text-white py-3 rounded-sm hover:bg-secondary transition-colors duration-300"
      >
        Book Now
      </button>
      <AuthModal
      />
    </>
  );
};

export default BookNowButton;