"use client";
import { updateDashboardName } from "@/store/dashboardSlice";
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

  return (
    <div className="flex mb-3 pl-3 justify-between bg-slate-200 w-full">
      <Modal isOpen={isAddChartOpen} onClose={() => setIsAddChartOpen(false)}>
        <form className="flex flex-col gap-4 text-black p-5">
          <div className="flex justify-between">
            <label htmlFor="metric-type">Select the metric</label>
            <select name="metric-type" id="metric-type">
              <option value="rppm">Rooms popularity per month</option>
              <option value="line">Monthly animal feed costs</option>
              <option value="appr">Annual profit per room</option>
            </select>
          </div>
          <div className="flex justify-between">
            <label htmlFor="chart-type">Select chart type</label>
            <select name="chart-type" id="chart-type">
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
              <option value="doughnut">Doughnut</option>
              <option value="radar">Radar</option>
              <option value="polar">Polar</option>
              <option value="scatter">Scatter</option>
            </select>
          </div>
          <button className="bg-green  rounded-md p-2 self-end">
            Add chart
          </button>
        </form>
      </Modal>
      {isChangingName ? (
        <div className="flex items-center justify-between min-w-48">
          <input
            className="min-w-40 p-1 pl-3 rounded-md"
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
        <div className="flex items-center justify-between min-w-48">
          <h1 className="min-w-40">{name}</h1>
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

      <div className="flex gap-4">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="relative w-20"
        >
          Filters
          {isFiltersOpen && (
            <div className="absolute w-full top-full left-0 bg-white p-2 rounded-md text-black">
              {filters.map((filter) => (
                <div key={filter.option}>{filter.option}</div>
              ))}
            </div>
          )}
        </button>
        <button
          className="p-2 rounded-md bg-green text-white"
          onClick={() => setIsAddChartOpen(!isAddChartOpen)}
        >
          Add Chart
        </button>
        <button className="p-2 rounded-md bg-rose-800 text-white">
          Delete charts
        </button>
      </div>
    </div>
  );
};
