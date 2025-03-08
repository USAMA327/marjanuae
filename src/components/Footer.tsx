"use client";

import { usePathname } from "next/navigation";
import routes from "../data/routes.json";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo/logo.png";
import Payment from "../../public/payments/payment.png";
import { contactDetails } from "@/utils/contact";
import { Icon } from "@iconify/react";
export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 pt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Contact */}
        <div>
          <Link href={"/"}>
            <div className="flex flex-col gap-2 group ">
              <Image src={Logo} alt="AL MARJAN" className="h-12 w-12  " />
              <h3 className="text-3xl font-serif font-bold text-white group-hover:text-orange-400">
                AL MARJAN
              </h3>
            </div>
          </Link>
          <a
            href={contactDetails.location.href}
            target="_blank"
            className="mt-3 text-sm flex items-center justify-start gap-2"
          >
            <Icon icon="logos:google-maps" className="text-lg " />

            <p className=" hover:text-orange-400 text-success-500 ">
              {contactDetails.location.shortValue}
            </p>
          </a>
          <a
            href={contactDetails.phone.href}
            className="mt-2 text-sm flex items-center gap-2"
          >
            <Icon icon="fluent-color:phone-16" className="text-lg -ml-1" />
            <p className=" hover:text-orange-400 ">
              {contactDetails.phone.value}
            </p>
          </a>
          <a
            href={contactDetails.email.href}
            className="mt-2 text-sm flex items-center gap-2"
          >
            <Icon icon="material-icon-theme:email" className="text-lg -ml-1" />
            <p className=" hover:text-orange-400 ">
              {contactDetails.email.value}
            </p>
          </a>
        </div>

        {/* Links Section */}
        <div>
          <h4 className="text-lg font-semibold text-white">Main Pages</h4>
          <ul className="mt-3 space-y-2">
            {routes.map((item) => (
              <li key={item.id}>
                <Link href={item.route}>
                  <p
                    className={`${
                      pathname === item.route ? "text-orange-400" : ""
                    } hover:text-orange-400 transition`}
                  >
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white">About Marjan</h4>
          <ul className="mt-3 space-y-2">
            {[
              {
                id: 1,
                title: "Privacy & Policy",
                route: "/privacy-policy",
              },
              {
                id: 1,
                title: "FAQ's",
                route: "/faq",
              },
              {
                id: 1,
                title: "Terms and Conditions",
                route: "/refund-returns",
              },
            ].map((item) => (
              <li key={item.route}>
                <Link href={item.route}>
                  <p
                    className={`${
                      pathname === item.route ? "text-orange-400" : ""
                    } hover:text-orange-400 transition`}
                  >
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Social Media Icons */}
          <h4 className="text-lg font-semibold text-white">Follow Us</h4>
          <div className="flex mt-5 space-x-6">
            <a
              href={contactDetails.facebook.href}
              target="_blank"
              className="hover:text-blue-500 text-white transition text-2xl"
            >
              <i className="icon-[logos--facebook]"></i>
            </a>
            <a
              href={contactDetails.instagram.href}
              target="_blank"
              className="hover:text-pink-500  transition text-2xl"
            >
              <Icon icon="skill-icons:instagram" />
            </a>
          </div>
          <hr className="border-slate-100  my-3" />
          <div className="flex gap-3">
            <Image src={Payment} alt="payments" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex items-center place-content-center py-5 mt-5 text-sm text-gray-500 border-t border-gray-700 hover:text-white">
        © 2010 Al Morjan Rent A Car, All Rights Reserved
      </div>
    </footer>
  );
}
