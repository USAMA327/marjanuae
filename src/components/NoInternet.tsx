"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function NoInternet() {
  const [isOffline, setIsOffline] = useState<boolean>();

  useEffect(() => {
    const handleOnline = () => {
      toast.success("Internet is Connected! Try to Reload Page.")
      setIsOffline(false);
    } 
    const handleOffline = () => {
      toast.error("No Internet Connection! Please Try to connect.")
      setIsOffline(true);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;
  return (
    <div className="bg-error-300 text-center border border-0.5 text-error-800 border-error-600 py-2s overflow-hidden relative">
      <div className=" ">No Internet Connection! Please try to connect.</div>
    </div>
  );
}
