"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userInfo } from "os";
import React, { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/app/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/app/hooks/useCartStore";

const NavIcons = () => {
  const wixClient = useWixClient()
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifications, setIsNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = wixClient.auth.loggedIn();
  const {cart,getCart,removeItem} = useCartStore()
    useEffect(() => {
        getCart(wixClient)   
    }, [wixClient ,getCart])

  const handleProfile = () => {
    if(!isLoggedIn) {
      router.push('/login');
    }else {
      setIsProfileOpen(!isProfileOpen)
    }
  }

  const handleLogout = async() => {
    try {
      setIsLoading(true)
      Cookies.remove('refreshToken');
      Cookies.remove('token');
      const { logoutUrl } = await wixClient.auth.logout(window.location.href);
      setIsLoading(false)
      setIsProfileOpen(false)
      router.push(logoutUrl)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        alt=""
        width={22}
        className="cursor-pointer"
        height={22}
        onClick={handleProfile}
        src={"/profile.png"}
      />
      {isProfileOpen && (
        <div className="absolute p-4 top-10 left-0 text-sm rounded-sm shadow-lg z-20 bg-white">
          <Link href={"/"}>Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {
              isLoading ? "Logging out..." : "Logout"
            }
          </div>
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
          {
            cart.lineItems ? cart.lineItems?.length : 0 
          }
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
