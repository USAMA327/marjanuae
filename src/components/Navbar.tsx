"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../public/logo/logo.png";
import Link from "next/link";
import routes from "../data/routes.json";
import { useAuth } from "@/context/AuthContext";
import UserDetailButton from "./UserDetailButton";
import { Icon } from "@iconify/react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <div className="py-4 px-2 sm:px-8 w-full absolute z-30 text-black">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <Image className="h-20 w-20" src={Logo} alt="Al-Marjan" priority />
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* User Profile Icon (Mobile) */}
          {user?.email && (
            <button onClick={toggleUserMenu} className="relative focus:outline-none">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              ) : (
                <Icon icon="mdi:account-circle" className="w-8 h-8 text-gray-600" />
              )}
            </button>
          )}

          {/* Hamburger Menu */}
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <ul className="hidden md:flex space-x-6 cursor-pointer text-black">
          {routes.map((item) => (
            <Link key={item.id} href={item.route}>
              <li className={`${pathname === item.route ? "font-semibold text-primary" : ""} hover:font-semibold hover:text-primary`}>
                {item.title}
              </li>
            </Link>
          ))}
        </ul>

        {/* User Details (Desktop) */}
        <div className="hidden md:flex gap-4 items-center">
          <UserDetailButton />
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 p-4 bg-white">
          <ul className="flex flex-col space-y-4 cursor-pointer text-black">
            {routes.map((item) => (
              <Link key={item.id} href={item.route}>
                <li className="hover:font-semibold hover:text-primary">{item.title}</li>
              </Link>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile User Dropdown */}
      {isUserMenuOpen && (
        <div className="absolute right-2 top-16 w-48 bg-white shadow-lg rounded-md border border-gray-200 transition-all duration-300 p-3">
          <UserDetailButton />
        </div>
      )}
    </div>
  );
}
