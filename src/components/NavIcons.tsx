"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userInfo } from "os";
import React, { useState } from "react";
import CartModal from "./CartModal";

const NavIcons = () => {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isLoggedIn) {
    return router.push("/login");
  }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        alt=""
        width={22}
        className="cursor-pointer"
        height={22}
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        src={"/profile.png"}
      />
      {isProfileOpen && (
        <div className="absolute p-4 top-10 left-0 text-sm rounded-sm shadow-lg z-20 bg-white">
          <Link href={"/"}>Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}
      <Image
        alt=""
        width={22}
        className="cursor-pointer"
        height={22}
        src={"/notification.png"}
        onClick={() => setIsNotifications(!isNotifications)}
      />
      <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
        <Image
          alt=""
          width={22}
          className="cursor-pointer"
          height={22}
          src={"/cart.png"}
          
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          3
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
