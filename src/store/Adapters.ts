import { ChartData } from "./dashboardSlice";

type LineChartData = Array<{
  id: string;
  data: Array<{ x: string; y: number }>;
}>;

export const countriesLinearAdapter = (arr: ChartData): LineChartData => {
  return Object.entries(arr).map(([id, data]) => ({
    id,
    data: Object.entries(data).map(([x, y]) => ({ x, y })),
  }));
};
