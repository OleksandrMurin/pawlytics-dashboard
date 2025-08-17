"use client";
import { ChartCreator } from "@/components/ChartCreator";
import { RootState } from "@/store";
import { updateDashboardLayout } from "@/store/dashboardSlice";
import { useParams } from "next/navigation";
import { useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import DeleteChartButton from "./DeleteChartButton";

const layout = [
  { i: "chart-1", x: 0, y: 0, w: 8, h: 3 },
  { i: "chart-2", x: 4, y: 0, w: 8, h: 3 },
];

export const DashboardGrid = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const dashboard = useSelector(
    (state: RootState) => state.dashboards.all[params.id as string]
  );
  const [hoveredChartId, setHoveredChartId] = useState<string | null>(null);
  const onDrop = (newLayout: Layout[]) => {
    dispatch(
      updateDashboardLayout({
        id: params.id as string,
        layout: newLayout,
      })
    );
  };
  return (
    <div className="outline outline-2 rounded-md outline-slate-700">
      {dashboard.charts && (
        <GridLayout
          className="layout rounded-md min-h-[80vh] relative bg-slate-800 text-black"
          layout={dashboard.layout}
          cols={20}
          rowHeight={100}
          width={1400}
          isResizable={true}
          isDraggable={true}
          onDrop={onDrop}
          preventCollision={false}
          useCSSTransforms={false}
        >
          {dashboard.charts.map((chart) => {
            return (
              <div
                onMouseEnter={() => setHoveredChartId(chart.id)}
                onMouseLeave={() => setHoveredChartId(null)}
                key={chart.id}
                className="bg-blue-100 p-2 rounded-md shadow-lg shadow-slate-900 select-none relative"
              >
                {ChartCreator(chart.chartType, chart.data)}
                {hoveredChartId === chart.id && (
                  <DeleteChartButton
                    dashboardId={params.id as string}
                    chartId={chart.id}
                  />
                )}
                <div className="absolute top-5 left-[40%]">
                  <h2 className="text-xl text-black">{chart.title}</h2>
                </div>
                <h3 className="absolute text-gray-500 top-14 left-[40%]">
                  data for 2024
                </h3>
              </div>
            );
          })}
        </GridLayout>
      )}
    </div>
  );
};
