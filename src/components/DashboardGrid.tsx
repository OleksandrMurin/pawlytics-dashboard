"use client";
import { ResponsiveBar } from "@nivo/bar";
import GridLayout from "react-grid-layout";

const data = [
  {
    country: "AD",
    "hot dog": 40,
    burger: 79,
    sandwich: 102,
    kebab: 194,
    fries: 66,
    donut: 54,
  },
  {
    country: "AE",
    "hot dog": 172,
    burger: 60,
    sandwich: 20,
    kebab: 68,
    fries: 110,
    donut: 64,
  },
  {
    country: "AF",
    "hot dog": 98,
    burger: 94,
    sandwich: 13,
    kebab: 134,
    fries: 144,
    donut: 54,
  },
  {
    country: "AG",
    "hot dog": 13,
    burger: 133,
    sandwich: 143,
    kebab: 135,
    fries: 174,
    donut: 83,
  },
  {
    country: "AI",
    "hot dog": 98,
    burger: 107,
    sandwich: 22,
    kebab: 58,
    fries: 5,
    donut: 61,
  },
  {
    country: "AL",
    "hot dog": 127,
    burger: 98,
    sandwich: 123,
    kebab: 85,
    fries: 88,
    donut: 181,
  },
  {
    country: "AM",
    "hot dog": 69,
    burger: 44,
    sandwich: 150,
    kebab: 84,
    fries: 19,
    donut: 35,
  },
];
const layout = [
  { i: "chart-1", x: 0, y: 0, w: 4, h: 2 },
  { i: "chart-2", x: 4, y: 0, w: 8, h: 3 },
];

export const DashboardGrid = () => {
  return (
    <div>
      <GridLayout
        className="layout bg-amber-200"
        layout={layout}
        cols={20}
        rowHeight={100}
        width={1200}
        isResizable={true}
        isDraggable={true}
      >
        <div key="chart-1" className="bg-blue-100 p-2">
          <ResponsiveBar /* or Bar for fixed dimensions */
            data={data}
            indexBy="country"
            labelSkipWidth={12}
            labelSkipHeight={12}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                translateX: 120,
                itemsSpacing: 3,
                itemWidth: 100,
                itemHeight: 16,
              },
            ]}
            axisBottom={{ legend: "country (indexBy)", legendOffset: 32 }}
            axisLeft={{ legend: "food", legendOffset: -40 }}
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          />
        </div>
        <div key="chart-2" className="bg-green-100 p-2">
          График 2
        </div>
      </GridLayout>
    </div>
  );
};
