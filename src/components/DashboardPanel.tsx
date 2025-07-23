"use client";
import { FC, useState } from "react";

interface DashboardPanelProps {
  title: string;
  filters: Array<{
    option: string;
    value: string;
  }>;
}
export const DashboardPanel: FC<DashboardPanelProps> = ({ title, filters }) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  return (
    <div className="flex justify-between w-full">
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
        <button className="p-2 rounded-md bg-green text-white">
          Add Chart
        </button>
        <button className="p-2 rounded-md bg-rose-800 text-white">
          Delete charts
        </button>
      </div>
    </div>
  );
};
