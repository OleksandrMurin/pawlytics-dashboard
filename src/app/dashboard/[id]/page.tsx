"use client";
import { DashboardGrid } from "@/components/DashboardGrid";
import { DashboardPanel } from "@/components/DashboardPanel";
import { RootState } from "@/store";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const DashboardIdPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const dashboard = useSelector(
    (state: RootState) => state.dashboards.all[params.id as string]
  );

  return (
    <div className="absolute top-[10%] left-[20%] w-[70vw]">
      <DashboardPanel
        name={dashboard.name}
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
