"use client";
import axiosInstance from "@/api/axiosInstance";
import { CHART_SIZES, METRICS_LABELS } from "@/constants";
import {
  addChart,
  ChartData,
  updateDashboardName,
} from "@/store/dashboardSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "./Modal";

interface DashboardPanelProps {
  name: string;
  filters: Array<{
    option: string;
    value: string;
  }>;
}
export const DashboardPanel: FC<DashboardPanelProps> = ({ name, filters }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const [isAddChartOpen, setIsAddChartOpen] = useState(false);
  const [isChangingName, setIsChangingName] = useState(false);
  const [dashboardName, setDashboardName] = useState(name);

  const handleNameChange = () => {
    if (dashboardName !== name) {
      dispatch(
        updateDashboardName({ id: params.id as string, name: dashboardName })
      );
    }
    setIsChangingName(false);
  };

  const handleAddChart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const metric = formData.get("metric-type") as string;
    const year = formData.get("year") as string;
    const layout = formData.get("layout") as string;
    const chartType = formData.get("chart-type") as "bar" | "line" | "pie";
    const metricObj = METRICS_LABELS[metric as keyof typeof METRICS_LABELS];
    const response = await axiosInstance.get<ChartData>(
      metricObj.endpoint + `${year}`
    );

    dispatch(
      addChart({
        id: params.id as string,
        chart: {
          id: metricObj.id,
          title: metricObj.name,
          metric,
          chartType,
          filters: false,
          data: response.data,
        },
        chartLayout: {
          i: `${metricObj.id}`,
          ...CHART_SIZES[layout as keyof typeof CHART_SIZES],
        },
      })
    );
    console.log(response.data);
    setIsAddChartOpen(false);
  };

  return (
    <div className="flex mb-3 p-2 rounded-md justify-between bg-slate-200 w-full">
      <Modal isOpen={isAddChartOpen} onClose={() => setIsAddChartOpen(false)}>
        <form
          onSubmit={handleAddChart}
          className="flex flex-col gap-4 text-black p-2"
        >
          <div className="flex flex-col justify-between">
            <label
              htmlFor="metric-type"
              className="text-sm font-medium text-gray-600 mb-1 italic"
            >
              Select the metric
            </label>
            <select
              name="metric-type"
              id="metric-type"
              className="w-full border rounded-lg px-2 py-1.5"
            >
              {Object.entries(METRICS_LABELS).map(([key, value]) => {
                return (
                  <option key={key} value={key}>
                    {value.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col justify-between">
            <label
              htmlFor="year"
              className="text-sm font-medium text-gray-600 mb-1 italic"
            >
              Select the year
            </label>
            <select
              name="year"
              id="year"
              className="w-full border rounded-lg px-2 py-1.5"
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i} value={i + 2020}>
                  {i + 2020}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-between">
            <label
              htmlFor="chart-type"
              className="text-sm font-medium text-gray-600 mb-1 italic"
            >
              Select chart type
            </label>
            <select
              name="chart-type"
              id="chart-type"
              className="w-full border rounded-lg px-2 py-1.5"
            >
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
            </select>
          </div>
          <div className="flex flex-col justify-between">
            <label
              htmlFor="layout"
              className="text-sm font-medium text-gray-600 mb-1 italic"
            >
              Select size of chart
            </label>
            <select
              name="layout"
              id="layout"
              className="w-full border rounded-lg px-2 py-1.5"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-lime-500 text-white font-semibold rounded-lg py-2 hover:bg-lime-600 transition"
          >
            <p>+ Add chart</p>
          </button>
        </form>
      </Modal>
      {isChangingName ? (
        <div className="flex items-center justify-between min-w-48">
          <input
            className="min-w-40 p-1 pl-2 rounded-md text-xl"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
          />
          <button onClick={handleNameChange}>
            <Image
              className="pl-3 w-8 h-8 select-none"
              width={20}
              height={20}
              src={"https://www.svgrepo.com/show/425941/accept.svg"}
              alt="Big pencil"
            />
          </button>
        </div>
      ) : (
        <div className="flex items-center text-xl justify-between min-w-48">
          <h1 className="min-w-40 pl-2">{name}</h1>
          <button onClick={() => setIsChangingName(!isChangingName)}>
            <Image
              className="pl-3 w-8 h-8 select-none"
              width={20}
              height={20}
              src={"https://www.svgrepo.com/show/42233/pencil-edit-button.svg"}
              alt="Big pencil"
            />
          </button>
        </div>
      )}

      <div className="flex gap-4 ">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="relative rounded-md w-28 bg-slate-300 p-2"
        >
          <span className="text-slate-800 text-xl">Filters</span>
          {isFiltersOpen && (
            <div className="absolute w-full top-full left-0 bg-white p-2 rounded-md text-black">
              {filters.map((filter) => (
                <div key={filter.option}>{filter.option}</div>
              ))}
            </div>
          )}
        </button>
        <button
          className="p-2 min-w-20 text-xl rounded-md bg-lime-500 text-white transition hover:bg-lime-600"
          onClick={() => setIsAddChartOpen(!isAddChartOpen)}
        >
          + Add chart
        </button>
      </div>
    </div>
  );
};
