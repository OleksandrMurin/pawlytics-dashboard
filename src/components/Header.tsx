"use client";
import logo from "@public/PawLytics-logo1.png";
import loginIcon from "@public/log-in-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-black text-cream400 opacity-70 fixed w-full top-0 left-0 right-0 z-50">
      <div className="container gap-[720px] p-2 flex items-center  h-[72px] ">
        <Image src={logo} alt="PawLytics logo" width={90} height={90} />
        <nav className="flex items-center justify-between gap-7 uppercase text-xl">
          <Link href="/" className="custom-border">
            Home
          </Link>
          <Link href="/dashboard/1">Dashboard</Link>
          <Link href="/reports">Reports</Link>
        </nav>
        <div className="flex items-center">
          <Image src={loginIcon} alt="Login icon" width={35} height={35} />
          <Link href="/auth/login" className="pl-2 uppercase text-xl">
            <p className="w-20 text-center">Sign in</p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
