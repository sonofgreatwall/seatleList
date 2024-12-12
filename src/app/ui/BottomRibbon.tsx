"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navtab() {
    const [activeTab, setActiveTab] = useState("home");

    const tabs = [
        { name: "home", href: "/bottom-ribbon/home.svg" },
        { name: "map", href: "/bottom-ribbon/map.svg" },
        { name: "favourite", href: "/bottom-ribbon/heart.svg" },
        { name: "chart", href: "/bottom-ribbon/chart.svg" },
    ];

    return (
        <nav className="flex lg:hidden items-center bg-gray-100 rounded-full shadow-md p-1 space-x-2 w-max m-6 navtab fixed bottom-5 left-[50%] translate-x-[-50%]  ">
            {tabs.map(({ name, href }) => (
                <Link
                    key={name}
                    href={"/"}
                    className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap ${activeTab === name
                        ? "bg-black text-white"
                        : "text-black hover:bg-gray-200"
                        }`}
                    onClick={() => setActiveTab(name)}
                >
                    <Image src={href} width={20} height={20} alt={name} className="" />
                </Link>

            ))}
        </nav>
    );
}
