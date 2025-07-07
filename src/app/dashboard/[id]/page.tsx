"use client";
import { setDashboardTitles } from "@/store/dashboardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const DashboardIdPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const dashboardTitles = [
      { id: "1", title: "Dashboard 1" },
      { id: "2", title: "Dashboard 2" },
    ];
    dispatch(setDashboardTitles(dashboardTitles));
  }, [dispatch]);
  return <div></div>;
};

export default DashboardIdPage;
