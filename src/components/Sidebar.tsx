"use client";

import { RootState } from "@/store";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { AddDashboardButton } from "./AddDashboardButton";
import { TitleInSidebar } from "./TitleInSidebar";

export const Sidebar = () => {
  const dashboardTitles = useSelector(
    (state: RootState) => state.dashboards.dashboardTitles
  );
  const params = useParams();
  const currentDashboardId = params.id;
  return (
    <div className="fixed w-1/6 h-full bg-gray-100">
      <div className="flex flex-col gap-2 pt-20 px-3">
        {dashboardTitles.map((title) => (
          <TitleInSidebar
            key={title.id}
            id={title.id}
            title={title.title}
            isChosen={title.id === currentDashboardId}
          />
        ))}
        <AddDashboardButton />
      </div>
    </div>
  );
};
