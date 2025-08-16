"use client";
import { DashboardGrid } from "@/components/DashboardGrid";
import { DashboardPanel } from "@/components/DashboardPanel";
import { RootState } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboardIdPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const dashboard = useSelector(
    (state: RootState) => state.dashboards.all[params.id as string]
  );
  useEffect(() => {
    if (!dashboard) {
      router.push("/dashboard/1");
    }
  }, [dashboard]);
  if (dashboard) {
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
  }
  return <div>Dashboard not found</div>;
};

export default DashboardIdPage;
