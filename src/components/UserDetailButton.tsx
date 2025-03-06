"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const UserDetailButton = () => {
  const { user, loading,openAuthModal} = useAuth();

  if (loading) return null;

  return user?.email ? (
    <div className="relative">
      {/* Profile Picture / Default Icon (Click to Toggle Dropdown) */}
      <Link href={"/profile"}>
      <div className="w-12 h-12 flex justify-center items-center bg-black overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            {user.photoURL  !== null ? (
              <Image
                width={80}
                height={80}
                src={user.photoURL}
                alt="user"
                className="object-cover"
              />
            ) : (
              <p className=" text-2xl text-white">
                {user.email.charAt(0).toLocaleUpperCase()}
              </p>
            )}
          </div>
      </Link>
   
    </div>
  ) : (
    <button onClick={openAuthModal} className="text-primary hover:text-white font-semibold hover:bg-secondary border border-primary px-6 py-2 rounded-sm w-full">
      Login
    </button>
  );
};

export default UserDetailButton;
