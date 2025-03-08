"use client";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";
import FancyButton from "./FancyButton";

const BookNowButton = ({ onClick }: { onClick: () => void }) => {
  const { user, openAuthModal } = useAuth();

  const handleBookNow = async () => {
    if (user) {
      onClick();
      console.log("User is logged in. Hitting the API...");
    } else {
      openAuthModal();
    }
  };

  return (
    <>
      <FancyButton onClick={handleBookNow}>Book Now</FancyButton>
      <AuthModal />
    </>
  );
};

export default BookNowButton;
