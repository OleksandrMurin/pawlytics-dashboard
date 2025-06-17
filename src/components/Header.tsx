"use client";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="bg-black text-cream400 opacity-70 fixed w-full top-0 left-0 right-0 z-50">
      <div className="container flex items-center justify-between h-[72px] ">
        <h1>PawLytics</h1>
        <nav className="flex items-center justify-between gap-7 uppercase text-xl">
          <Link href="/" className="custom-border">
            Home
          </Link>
          <Link href="/recipes">All recipes</Link>
          <Link href="/my_recipes">My recipes</Link>
        </nav>
        <div className="flex items-center justify-between">
          <Link href="/favorites" className="">
            <h1>Like</h1>
          </Link>

          <h1>LoginIcon</h1>
          <Link href="/auth/login" className="uppercase text-xl">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
