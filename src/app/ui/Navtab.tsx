"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
export default function Navtab() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { name: "All", href: "./", url: "/navbar-imgs/all.svg" },
    { name: "For Rent", href: "./", url: "/navbar-imgs/for-rent.svg" },
    { name: "For Sale", href: "./", url: "/navbar-imgs/for-sale.svg" },
    { name: "Roommates", href: "./", url: "/navbar-imgs/roommate.svg" },
    { name: "Review", href: "./", url: "/navbar-imgs/review.svg" },
  ];

  return (
    <nav className="hidden md:flex items-center bg-gray-100 rounded-full shadow-md p-1 space-x-2 w-max navtab mx-auto lg:m-6 ">
      {tabs.map(({ name, url }) => (
        <Link
          key={name}
          href={"/"}
          className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap flex ${activeTab === name
            ? "bg-black text-white"
            : "text-black hover:bg-gray-200"
            }`}
          onClick={() => setActiveTab(name)}
        >
          <span className="hidden lg:block p-2">{name}</span>
          <Image src={url} width={25} height={25} alt={name} className="" />
        </Link>
      ))}
    </nav>
  );
}
