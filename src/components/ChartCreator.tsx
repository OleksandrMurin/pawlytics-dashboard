"use client";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import {
  barChartAdapter,
  lineChartAdapter,
  pieChartAdapter,
} from "../store/Adapters";
import { ChartData } from "../store/dashboardSlice";

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
          colors={{ scheme: "spectral" }}
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
        />
      );
    case "bar":
      const barData = barChartAdapter(data);
      return (
        <ResponsiveBar
          data={barData}
          indexBy="country"
          keys={Object.keys(barData[0]).filter((x) => x !== "country")}
          colors={{ scheme: "spectral" }}
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
          margin={{ top: 100, right: 130, bottom: 50, left: 60 }}
        />
      );
    case "pie":
      const pieData = pieChartAdapter(data);
      return (
        <ResponsivePie
          data={pieData}
          margin={{ top: 100, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.6}
          cornerRadius={2}
          activeOuterRadiusOffset={8}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              translateY: 56,
              itemWidth: 100,
              itemHeight: 18,
              symbolShape: "circle",
            },
          ]}
        />
      );
  }
};
