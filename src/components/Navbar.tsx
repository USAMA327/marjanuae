'use client'
'use client'
 
import { usePathname } from 'next/navigation'
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../public/logo/logo.png";
import Link from "next/link";
import routes from "../data/routes.json";

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="py-4 px-2 sm:px-8 w-full absolute z-30 text-black">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <Image className="h-20 w-20" src={Logo} alt="Al-Marjan" priority />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
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

        {/* Navigation Links (Hidden on Mobile) */}
        <ul className="hidden md:flex space-x-6 cursor-pointer text-black">
          {routes.map((item) => (
            <Link key={item.id} href={item.route}>
              <li className={`${pathname === item.route ? "font-semibold text-primary":""} hover:font-semibold hover:text-primary`}>{item.title}</li>
            </Link>
          ))}
        </ul>

        {/* Login Button (Hidden on Mobile) */}
        <div className="hidden md:flex gap-4 items-center">
          <button className="btn text-primary hover:text-white font-semibold hover:bg-secondary border border-primary border-1 px-6 py-2 rounded-sm">
            Login
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 p-4  bg-white">
          <ul className="flex flex-col space-y-4 cursor-pointer text-black">
            {routes.map((item) => (
              <Link key={item.id} href={item.route}>
                <li className="hover:font-semibold hover:text-primary">{item.title}</li>
              </Link>
            ))}
          </ul>
          <div className="mt-4">
            <button className="btn text-primary hover:text-white font-semibold hover:bg-secondary border border-primary border-1 px-6 py-2 rounded-sm w-full">
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}