"use client";
import Link from "next/link";
import { FC } from "react";

interface TitleInSidebarProps {
  id: string;
  title: string;
  isChosen: boolean;
}

export const TitleInSidebar: FC<TitleInSidebarProps> = ({
  id,
  title,
  isChosen,
}) => {
  return (
    <Link href={`/dashboard/${id}`} className="w-full flex justify-center">
      <h1
        className={`${
          isChosen
            ? "text-blue-500 bg-orange-500"
            : "text-gray-500 bg-slate-200"
        }`}
      >
        {title}
      </h1>
      <button className="absolute right-0 top-0 w-8 h-8"></button>
    </Link>
  );
};
