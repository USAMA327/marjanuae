"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const UserDetailButton = () => {
  const { user, loading, logout ,openAuthModal} = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  return user?.email ? (
    <div className="relative">
      {/* Profile Picture / Default Icon (Click to Toggle Dropdown) */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center focus:outline-none"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="size-12 rounded-full border-primary border"
          />
        ) : (
          <Icon icon="mdi:account-circle" className="w-10 h-10 text-gray-600" />
        )}
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 transition-all duration-300 p-3">
          <Link onClick={()=>setOpen(!open)} href={"/profile"}>
                  <p className="text-secondary border-b py-1  font-semibold text-sm truncate w-full break-words">
            {user.displayName}
          </p>
          <p className="text-gray-700 border-b py-1 font-semibold text-sm truncate w-full break-words">
            {user.email}
                  </p>
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full text-left px-4 py-2 mt-2 text-red-600 hover:bg-gray-100 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <button onClick={openAuthModal} className="text-primary hover:text-white font-semibold hover:bg-secondary border border-primary px-6 py-2 rounded-sm w-full">
      Login
    </button>
  );
};

export default UserDetailButton;
