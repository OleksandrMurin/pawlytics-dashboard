"use client";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { barChartAdapter, lineChartAdapter } from "../store/Adapters";
import { ChartData } from "../store/dashboardSlice";

const CustomLayer = ({ width, title }: { width: number; title: string }) => {
  return (
    <text
      x={width / 2}
      y={-20}
      textAnchor="middle"
      dominantBaseline="hanging"
      style={{ fontSize: 16, fontWeight: "bold" }}
      fill="black"
    >
      {title}
    </text>
  );
};

export const ChartCreator = (
  chartType: "bar" | "line" | "pie",
  data: ChartData
) => {
  switch (chartType) {
    case "line":
      const lineData = lineChartAdapter(data);
      return (
        <ResponsiveLine
          data={lineData}
          margin={{ top: 100, right: 110, bottom: 50, left: 60 }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
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
          layers={["grid", "lines", "points", "axes", "legends", CustomLayer()]}
        />
      );
    case "bar":
      const barData = barChartAdapter(data);
      return (
        <ResponsiveBar
          data={barData}
          indexBy="country"
          keys={Object.keys(barData[0]).filter((x) => x !== "country")}
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
          layers={["grid", "markers", "bars", "axes", "legends", CustomLayer]}
        />
      );
  }
};
