'use client';

import { useState } from "react";
import Login from "./Login";
import { useAuth } from "@/context/AuthContext";
import Register from "./Register";
import {Icon} from "@iconify/react";
const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
        <button
          onClick={closeAuthModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <Icon className="size-10 text-red-500" icon="carbon:close-filled"  />
         
        </button>
        {isLogin ? (
          <Login onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;