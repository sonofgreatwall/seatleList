"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navtab() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { name: "All", href: "./" },
    { name: "For Rent", href: "./" },
    { name: "For Sale", href: "./" },
    { name: "Roommates", href: "./" },
    { name: "Review", href: "./" },
  ];

  return (
    <nav className="flex items-center bg-gray-100 rounded-full shadow-md p-1 space-x-2 w-max m-6 navtab">
      {tabs.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${
            activeTab === name
              ? "bg-black text-white"
              : "text-black hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab(name)}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
