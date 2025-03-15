"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import FancyButton from "./FancyButton";

const UserDetailButton = () => {
  const { user, loading, openAuthModal } = useAuth();

  if (loading) return null;

  return user?.email ? (
    <div className="relative">
      {/* Profile Picture / Default Icon (Click to Toggle Dropdown) */}
      <Link href={"/profile"}>
        <div className="w-12 h-12 flex justify-center items-center bg-black overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
          {user.photoURL !== null ? (
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
    <FancyButton
      onClick={openAuthModal}
      className=""
      color="primary"
      variant="outline"
    >
      Login
    </FancyButton>
  );
};

export default UserDetailButton;
