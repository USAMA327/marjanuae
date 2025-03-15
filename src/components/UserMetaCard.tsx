"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useAuth } from "@/context/AuthContext";

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface UserData {
  displayName?: string;
  email?: string;
  nationality?: string;
  phone?: string;
}

// Skeleton Loading Component
const SkeletonLoader = () => {
  return (
    <div className="p-5 rounded-lg lg:p-6 shadow-lg border-white border-2 animate-pulse">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          {/* Skeleton for Avatar */}
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div className="order-3 xl:order-2 flex-1 space-y-3">
            {/* Skeleton for Name and Email */}
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            {/* Skeleton for Additional Info */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function UserMetaCard({ user }: { user: User }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user.uid) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data() as UserData);
        } else {
          console.log("No such document!");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [user.uid]);

  // Provide default values for `null` properties
  const email = user.email || "No email provided";
  const displayName = user.displayName || "";
  const photoURL = user.photoURL; // Provide a fallback image

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="p-5 rounded-lg lg:p-6 shadow-lg border-white border-2">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="w-20 h-20 flex justify-center items-center bg-black overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
            {photoURL !== null ? (
              <Image
                width={80}
                height={80}
                src={photoURL}
                alt="user"
                className="object-cover"
              />
            ) : (
              <p className="font-semibold text-3xl text-white">
                {email.charAt(0).toLocaleUpperCase()}
              </p>
            )}
          </div>
          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 xl:text-left">
              {email} | {displayName || userData?.displayName}
            </h4>
            {userData && (
              <div className="">
                <p className="text-sm text-gray-600">
                  <strong>Nationality:</strong> {userData.nationality || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {userData.phone || "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <h3
          onClick={() => logout()}
          className="text-error-500 font-semibold border w-fit  px-4 py-2 bg-error-200 border-error-600 rounded-sm self-end cursor-pointer"
        >
          Log Out
        </h3>
      </div>
    </div>
  );
}
