"use client";
import React, { useState, useEffect } from "react";

export default function NoInternet() {
  const [isOffline, setIsOffline] = useState<boolean>();

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

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
      <div className=" ">No Internet Connection! Please try to reconnect.</div>
    </div>
  );
}
