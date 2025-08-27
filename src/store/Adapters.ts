import { ChartData } from "./dashboardSlice";

type LineChartData = Array<{
  id: string;
  data: Array<{ x: string; y: number }>;
}>;
type PieChartData = Array<{
  id: string;
  label: string;
  value: number;
  color: string;
}>;
type BarChartData = Array<{ [key: string]: string | number }>;

export const lineChartAdapter = (arr: ChartData): LineChartData => {
  return Object.entries(arr).map(([id, data]) => ({
    id,
    data: Object.entries(data).map(([x, y]) => ({ x, y })),
  }));
};

const generateColor = (index: number): string => {
  const hue = (index * 137.508) % 360; // золотое число для равномерного распределения
  return `hsl(${hue}, 70%, 50%)`;
};

export const barChartAdapter = (arr: ChartData): BarChartData => {
  return Object.entries(arr).map(([key, data]) => ({ country: key, ...data }));
};

export const pieChartAdapter = (arr: ChartData): PieChartData => {
  // Берем первый объект из ChartData (в вашем случае это FirstData)
  const firstData = Object.values(arr)[0] as Record<string, number>;

  return Object.entries(firstData).map(([key, value], index) => ({
    id: key,
    label: key,
    value: value,
    color: generateColor(index),
  }));
};
