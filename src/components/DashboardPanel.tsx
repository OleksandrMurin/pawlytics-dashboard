"use client";
import { FC, useState } from "react";
import { Modal } from "./Modal";

interface DashboardPanelProps {
  title: string;
  filters: Array<{
    option: string;
    value: string;
  }>;
}
export const DashboardPanel: FC<DashboardPanelProps> = ({ title, filters }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isAddChartOpen, setIsAddChartOpen] = useState(false);
  const data = [
    { id: "japan", transport: "plane", value: 5 },
    { id: "japan", transport: "helicopter", value: 214 },
    { id: "japan", transport: "boat", value: 131 },
    { id: "japan", transport: "train", value: 168 },
    { id: "japan", transport: "subway", value: 6 },
    { id: "japan", transport: "bus", value: 211 },
    { id: "japan", transport: "car", value: 77 },
    { id: "japan", transport: "moto", value: 274 },
    { id: "japan", transport: "bicycle", value: 69 },
    { id: "japan", transport: "horse", value: 35 },
    { id: "japan", transport: "skateboard", value: 112 },
    { id: "japan", transport: "others", value: 181 },

    { id: "france", transport: "plane", value: 42 },
    { id: "france", transport: "helicopter", value: 61 },
    { id: "france", transport: "boat", value: 94 },
    { id: "france", transport: "train", value: 105 },
    { id: "france", transport: "subway", value: 195 },
    { id: "france", transport: "bus", value: 223 },
    { id: "france", transport: "car", value: 230 },
    { id: "france", transport: "moto", value: 251 },
    { id: "france", transport: "bicycle", value: 216 },
    { id: "france", transport: "horse", value: 69 },
    { id: "france", transport: "skateboard", value: 282 },
    { id: "france", transport: "others", value: 228 },

    { id: "us", transport: "plane", value: 87 },
    { id: "us", transport: "helicopter", value: 221 },
    { id: "us", transport: "boat", value: 9 },
    { id: "us", transport: "train", value: 107 },
    { id: "us", transport: "subway", value: 76 },
    { id: "us", transport: "bus", value: 65 },
    { id: "us", transport: "car", value: 3 },
    { id: "us", transport: "moto", value: 211 },
    { id: "us", transport: "bicycle", value: 5 },
    { id: "us", transport: "horse", value: 183 },
    { id: "us", transport: "skateboard", value: 26 },
    { id: "us", transport: "others", value: 219 },
  ];
  return (
    <div className="flex justify-between w-full">
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
      <h1>{title}</h1>
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
