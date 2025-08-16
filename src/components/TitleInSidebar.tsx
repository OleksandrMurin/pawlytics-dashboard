"use client";
import { deleteDashboard } from "@/store/dashboardSlice";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const handleDeleteDashboard = () => {
    dispatch(deleteDashboard({ id }));
  };
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Link
      href={`/dashboard/${id}`}
      className={`w-full h-10 rounded-md flex justify-between items-center px-3 ${
        isChosen ? "text-blue-500 bg-orange-500" : "text-gray-500 bg-slate-200"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h1 className={``}>{title}</h1>
      <button className="w-8 h-8" onClick={handleDeleteDashboard}>
        {isHovering && (
          <Image
            className="w-8 h-8 select-none"
            width={20}
            height={20}
            src={"https://www.svgrepo.com/show/437329/trash-circle.svg"}
            alt="Trash"
          />
        )}
      </button>
    </Link>
  );
};
