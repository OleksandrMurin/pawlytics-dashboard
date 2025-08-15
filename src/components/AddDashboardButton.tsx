// src/components/AddDashboardButton.tsx
"use client";
import { addDashboard } from "@/store/dashboardSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const AddDashboardButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleAddDashboard = () => {
    const newId = Date.now().toString();
    const newDashboard = {
      id: newId,
      name: `Dashboard ${newId.slice(-4)}`,
      layout: [{ i: "chart-1", x: 0, y: 0, w: 16, h: 4 }],
      charts: [],
    };
    dispatch(addDashboard(newDashboard));

    router.push(`/dashboard/${newId}`);
  };

  return (
    <button
      onClick={handleAddDashboard}
      className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
    >
      + Добавить дашборд
    </button>
  );
};
