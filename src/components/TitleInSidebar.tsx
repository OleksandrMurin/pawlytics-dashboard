"use client";
import Link from "next/link";
import { FC } from "react";

interface TitleInSidebarProps {
  id: string;
  title: string;
  isChoosen: boolean;
}

export const TitleInSidebar: FC<TitleInSidebarProps> = ({
  id,
  title,
  isChoosen,
}) => {
  return (
    <Link href={`/dashboard/${id}`}>
      <h1
        className={`${
          isChoosen
            ? "text-blue-500 bg-orange-500"
            : "text-gray-500 bg-slate-200"
        }`}
      >
        {title}
      </h1>
    </Link>
  );
};
