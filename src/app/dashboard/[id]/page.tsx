"use client";
import { DashboardGrid } from "@/components/DashboardGrid";
import { DashboardPanel } from "@/components/DashboardPanel";
import { Dashboard, setDashboardTitles } from "@/store/dashboardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DashboardIdPage = () => {
  const dispatch = useDispatch();
  const dashbordExaple: Dashboard = {
    id: "1",
    name: "Dashboard 1",
    layout: [{ i: "1", x: 1, y: 1, w: 1, h: 1 }],
    charts: [],
  };
  useEffect(() => {
    const dashboardTitles = [
      { id: "1", title: "Dashboard 1" },
      { id: "2", title: "Dashboard 2" },
    ];
    dispatch(setDashboardTitles(dashboardTitles));
  }, [dispatch]);
  return (
    <div className="absolute top-[10%] left-[20%] w-[70vw]">
      <DashboardPanel
        title={dashbordExaple.name}
        filters={[
          { option: "Filter 1", value: "Value 1" },
          { option: "Filter 2", value: "Value 2" },
        ]}
      />
      <DashboardGrid />
    </div>
  );
};

export default DashboardIdPage;
