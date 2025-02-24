'use client'

import { usePathname } from "next/navigation";
import routes from "../data/routes.json";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {

  const pathname  = usePathname()
  
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Contact */} 
        <div >
          <Link href={"/"}>
          <div className="flex flex-col gap-2 ">

          <Image src="/logo/logo.png" alt="AL MARJAN" className="h-12 w-12  " />
          <h3 className="text-3xl font-serif font-bold text-white">AL MARJAN</h3>
          </div>
          </Link>
          <a href={`https://www.google.com/maps?q=25.7862,55.9571`} target="_blank" className="mt-3 text-sm flex items-center gap-2">
            <i className="icon-[ph--map-pin-line-thin] text-white text-lg"></i>
           
            <p className=' hover:text-orange-400 ' > Al Nakheel, Ras al Khaimah</p>
          </a>
          <a  href="tel:+971505996321"  className="mt-2 text-sm flex items-center gap-2">
            <i className="icon-[ph--phone-light] text-white text-lg"></i>
            <p  className=' hover:text-orange-400 '>+971-50-599-6321</p>
          </a>
          <a href="mailto:rak@marjanuae.com"  className="mt-2 text-sm flex items-center gap-2">
            <i className="icon-[mdi--email] text-white text-lg"></i>
            <p className=' hover:text-orange-400 ' >rak@marjanuae.com</p>
          </a>
             {/* Social Media Icons */}

        <div className="flex mt-5 space-x-6">
          <a href="#" className="hover:text-blue-500 text-white transition text-2xl">
            <i className="icon-[ic--baseline-facebook]"></i>
          </a>
          <a href="#" className="hover:text-pink-500 text-white transition text-2xl">
            <i className="icon-[mdi--instagram]"></i>
          </a>
       
      </div>
        </div>

        {/* Links Section */}
        <div>
          <h4 className="text-lg font-semibold text-white">Main Pages</h4>
          <ul className="mt-3 space-y-2">
            {routes.map((item) => (
              <li key={item.id}>
                <Link href={item.route}>
                <p className={`${pathname === item.route ? "text-orange-400" :""} hover:text-orange-400 transition`}>
                  {item.title}
                </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white">Resources</h4>
          <ul className="mt-3 space-y-2">
            {[
              "Download",
              "Help Centre",
              "Guides",
              "Partner Network",
              "Cruises",
              "Developer",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-orange-400 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white">About Marjan</h4>
          <ul className="mt-3 space-y-2">
            {[
              "Why choose us",
              "Our Story",
              "Privacy & Policy",
              "FAQ's",
              "Terms and Conditions",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-orange-400 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

   

      {/* Copyright */}
      <div className="flex items-center place-content-center py-5 mt-5 text-sm text-gray-500 border-t border-gray-700">
        © 2010 Al Morjan Rent A Car, All Rights Reserved
      </div>
    </footer>
  );
}
