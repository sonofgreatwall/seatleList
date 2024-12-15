"use client"
import Link from "next/link";
// import Button from "./components/Button";
import { useState } from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function TopBar() {
  const [sideBarActive, setSideBarActive] = useState(false)
  const [authButtonActive, setAuthButtonActive] = useState<number>(0);

  return (
    <div className="md:relative fixed z-[1000] top-0 left-0 w-full flex justify-between items-center px-4 md:px-10 min-h-16 md:py-5 py-4 text-sm bg-white">
      <div className="gap-8 items-center hidden md:flex font-semibold">
        <Link href="." className="text-center inline-block">Blog</Link>
        <Link href="." className="text-center inline-block">FAQ</Link>
        <Link href="." className="text-center inline-block">Event</Link>
        <Link href="." className="text-center inline-block">About</Link>
      </div>
      <div className="flex items-center">
        <div className="md:hidden inline-block pr-6" onClick={() => setSideBarActive(!sideBarActive)}>
          <Bars3BottomLeftIcon className="h-6 w-6" />
        </div>
        <Link href="/" className="font-light text-2xl
              md:absolute
              md:top-1/2
              md:left-1/2
              md:-translate-x-1/2
              md:-translate-y-1/2 
            ">SeattleListed</Link>
      </div>
      <div
        className={`h-screen p-10 w-screen fixed topbar top-0 left-0 transition-all ease-in-out duration-500 ${sideBarActive ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={() => setSideBarActive(false)}
      >
        <div className="gap-8 items-center flex flex-col text-lg">
          <Link href="." className="text-center inline-block">Blog</Link>
          <Link href="." className="text-center inline-block">FAQ</Link>
          <Link href="." className="text-center inline-block">Event</Link>
          <Link href="." className="text-center inline-block">About</Link>
        </div>
      </div>
      <div onClick={() => setSideBarActive(false)} className={`w-fit md:px-4 grid md:flex md:gap-2 items-center ${sideBarActive ? '' : ''}`}>

        <div className="relative">
          <button onClick={() => { authButtonActive === 1 ? setAuthButtonActive(0) : setAuthButtonActive(1) }}>
            <Image src={"/user.svg"} width={40} height={40} alt="user-icon" />
          </button>
          <div className={` flex-col shadow-lg absolute left-[-80px] top-10 bg-white`}>
            <a href="." className="px-8 py-4 hover:bg-gray-200 flex justify-between w-full inline-block">Login<Image src={"/login.svg"} width={20} height={20} alt="login-icon" /></a>
            <a href="." className="px-8 py-4 hover:bg-gray-200  flex justify-between w-full inline-block">Register<Image src={"/register.svg"} width={20} height={20} alt="register-icon" /></a>
          </div>

        </div>
        {/* <Link href="">
            <Button className="w-full hidden md:block">Log in</Button>
          </Link>
          <Link href="/register">
            <Button className="py-4" variant="primary">Sign up</Button>
          </Link> */}
      </div>
    </div>
  )
}