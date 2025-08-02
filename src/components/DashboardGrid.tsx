"use client";
import { ResponsiveLine } from "@nivo/line";
import GridLayout from "react-grid-layout";

const data = [
  {
    id: "japan",
    data: [
      {
        x: "plane",
        y: 5,
      },
      {
        x: "helicopter",
        y: 214,
      },
      {
        x: "boat",
        y: 131,
      },
      {
        x: "train",
        y: 168,
      },
      {
        x: "subway",
        y: 6,
      },
      {
        x: "bus",
        y: 211,
      },
      {
        x: "car",
        y: 77,
      },
      {
        x: "moto",
        y: 274,
      },
      {
        x: "bicycle",
        y: 69,
      },
      {
        x: "horse",
        y: 35,
      },
      {
        x: "skateboard",
        y: 112,
      },
      {
        x: "others",
        y: 181,
      },
    ],
  },
  {
    id: "france",
    data: [
      {
        x: "plane",
        y: 42,
      },
      {
        x: "helicopter",
        y: 61,
      },
      {
        x: "boat",
        y: 94,
      },
      {
        x: "train",
        y: 105,
      },
      {
        x: "subway",
        y: 195,
      },
      {
        x: "bus",
        y: 223,
      },
      {
        x: "car",
        y: 230,
      },
      {
        x: "moto",
        y: 251,
      },
      {
        x: "bicycle",
        y: 216,
      },
      {
        x: "horse",
        y: 69,
      },
      {
        x: "skateboard",
        y: 282,
      },
      {
        x: "others",
        y: 228,
      },
    ],
  },
  {
    id: "us",
    data: [
      {
        x: "plane",
        y: 87,
      },
      {
        x: "helicopter",
        y: 221,
      },
      {
        x: "boat",
        y: 9,
      },
      {
        x: "train",
        y: 107,
      },
      {
        x: "subway",
        y: 76,
      },
      {
        x: "bus",
        y: 65,
      },
      {
        x: "car",
        y: 3,
      },
      {
        x: "moto",
        y: 211,
      },
      {
        x: "bicycle",
        y: 5,
      },
      {
        x: "horse",
        y: 183,
      },
      {
        x: "skateboard",
        y: 26,
      },
      {
        x: "others",
        y: 219,
      },
    ],
  },
  {
    id: "germany",
    data: [
      {
        x: "plane",
        y: 156,
      },
      {
        x: "helicopter",
        y: 54,
      },
      {
        x: "boat",
        y: 152,
      },
      {
        x: "train",
        y: 173,
      },
      {
        x: "subway",
        y: 0,
      },
      {
        x: "bus",
        y: 38,
      },
      {
        x: "car",
        y: 13,
      },
      {
        x: "moto",
        y: 261,
      },
      {
        x: "bicycle",
        y: 208,
      },
      {
        x: "horse",
        y: 85,
      },
      {
        x: "skateboard",
        y: 184,
      },
      {
        x: "others",
        y: 290,
      },
    ],
  },
  {
    id: "norway",
    data: [
      {
        x: "plane",
        y: 65,
      },
      {
        x: "helicopter",
        y: 146,
      },
      {
        x: "boat",
        y: 94,
      },
      {
        x: "train",
        y: 96,
      },
      {
        x: "subway",
        y: 42,
      },
      {
        x: "bus",
        y: 49,
      },
      {
        x: "car",
        y: 36,
      },
      {
        x: "moto",
        y: 130,
      },
      {
        x: "bicycle",
        y: 151,
      },
      {
        x: "horse",
        y: 84,
      },
      {
        x: "skateboard",
        y: 89,
      },
      {
        x: "others",
        y: 243,
      },
    ],
  },
];
const roomsPopularityData = [
  {
    id: "January",
    data: [
      { x: "101", y: 23 },
      { x: "102", y: 17 },
      { x: "103", y: 31 },
      { x: "104", y: 12 },
      { x: "105", y: 27 },
    ],
  },
  {
    id: "February",
    data: [
      { x: "101", y: 19 },
      { x: "102", y: 22 },
      { x: "103", y: 28 },
      { x: "104", y: 15 },
      { x: "105", y: 30 },
    ],
  },
  {
    id: "March",
    data: [
      { x: "101", y: 25 },
      { x: "102", y: 20 },
      { x: "103", y: 35 },
      { x: "104", y: 18 },
      { x: "105", y: 29 },
    ],
  },
];
const feedCostsData = [
  {
    id: "January",
    data: [
      { x: "Dog", y: 120 },
      { x: "Cat", y: 80 },
      { x: "Parrot", y: 30 },
      { x: "Rabbit", y: 40 },
    ],
  },
  {
    id: "February",
    data: [
      { x: "Dog", y: 110 },
      { x: "Cat", y: 85 },
      { x: "Parrot", y: 25 },
      { x: "Rabbit", y: 45 },
    ],
  },
  {
    id: "March",
    data: [
      { x: "Dog", y: 130 },
      { x: "Cat", y: 78 },
      { x: "Parrot", y: 35 },
      { x: "Rabbit", y: 38 },
    ],
  },
];
const layout = [
  { i: "chart-1", x: 0, y: 0, w: 16, h: 4 },
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
          <ResponsiveLine /* or Line for fixed dimensions */
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            axisBottom={{ legend: "transportation", legendOffset: 36 }}
            axisLeft={{ legend: "count", legendOffset: -40 }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "seriesColor" }}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                translateX: 100,
                itemWidth: 80,
                itemHeight: 22,
                symbolShape: "circle",
              },
            ]}
          />
        </div>
        <div key="chart-2" className="bg-green-100 p-2">
          График 2
        </div>
      </GridLayout>
    </div>
  );
};
