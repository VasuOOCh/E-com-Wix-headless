import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./Searchbar";
import NavIcons from "./NavIcons";

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:32 2xl:pz-64 relative">
      {/* Mobile */}
      <div className="flex items-center justify-between h-full md:hidden">
        <Link href={""}>
          <div className="text-2xl tracking-wide">LAMA</div>
        </Link>
        <Menu />
      </div>

      {/* Bigger Screen */}
      <div className="hidden md:flex items-center h-full justify-between gap-8 ">
        <div className="w=1/3 xl:w-1/2 flex items-center gap-8 ">
          <Link href={""} className="flex items-center gap-3">
            <Image src={"/logo.png"} height={24} width={24} alt="" />
            <div className="text-2xl tracking-wide">LAMA</div>
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href={""}>Home</Link>
            <Link href={""}>Shops</Link>
            <Link href={""}>Deals</Link>
            <Link href={""}>About</Link>
            <Link href={""}>Contact</Link>
          </div>
        </div>
        <div className="w-2/3 flex items-center justify-between gap-8 xl:w-1/2">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
