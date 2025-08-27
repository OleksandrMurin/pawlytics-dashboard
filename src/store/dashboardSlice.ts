import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";

export type ChartData = Record<string, Record<string, number>>;

export interface Chart {
  id: string;
  title: string;
  metric: string;
  chartType: "bar" | "line" | "pie";
  entity?: string;
  filters: boolean;
  data: ChartData;
}

export interface Dashboard {
  id: string;
  name: string;
  layout: Layout[];
  charts: Chart[];
}

interface DashboardState {
  all: Record<string, Dashboard>;
  dashboardTitles: Array<{ id: string; title: string }>;
}

const initialState: DashboardState = {
  all: {
    "1": {
      id: "1",
      name: "DemoDashboard",
      layout: [
        { i: "chart-1", x: 0, y: 0, w: 16, h: 4 },
        { i: "chart-2", x: 0, y: 4, w: 8, h: 3 },
      ],
      charts: [
        {
          id: "chart-2",
          title: "Visits by animal type",
          metric: "visitsByAnimalType",
          chartType: "line",
          filters: false,
          data: {
            Dogs: {
              Jan: 32,
              Feb: 29,
              Mar: 34,
              Apr: 31,
              May: 36,
              Jun: 38,
              Jul: 42,
              Aug: 45,
              Sep: 39,
              Oct: 37,
              Nov: 33,
              Dec: 40,
            },
            Cats: {
              Jan: 21,
              Feb: 19,
              Mar: 22,
              Apr: 20,
              May: 23,
              Jun: 25,
              Jul: 27,
              Aug: 29,
              Sep: 26,
              Oct: 24,
              Nov: 22,
              Dec: 25,
            },
            Birds: {
              Jan: 6,
              Feb: 5,
              Mar: 6,
              Apr: 7,
              May: 7,
              Jun: 8,
              Jul: 9,
              Aug: 10,
              Sep: 8,
              Oct: 7,
              Nov: 7,
              Dec: 8,
            },
            Rodents: {
              Jan: 4,
              Feb: 3,
              Mar: 4,
              Apr: 5,
              May: 5,
              Jun: 6,
              Jul: 6,
              Aug: 7,
              Sep: 6,
              Oct: 5,
              Nov: 5,
              Dec: 5,
            },
            Reptiles: {
              Jan: 12,
              Feb: 1,
              Mar: 1,
              Apr: 1,
              May: 1,
              Jun: 1,
              Jul: 1,
              Aug: 1,
              Sep: 1,
              Oct: 1,
              Nov: 1,
              Dec: 1,
            },
          },
        },
        {
          id: "chart-1",
          title: "Average feed consumption",
          metric: "averageFeedConsumptionByAnimalSpecies",
          chartType: "pie",
          filters: false,
          data: {
            FirstData: {
              Dog: 325,
              Cat: 270,
              Rabbit: 150,
              Hamster: 18,
              Parrot: 25,
              Iguana: 32,
              Turtle: 12,
            },
          },
        },
      ],
    },
  },
  dashboardTitles: [
    { id: "1", title: "DemoDashboard" },
    { id: "2", title: "Dashboard 2" },
  ],
};

const dashboardSlice = createSlice({
  name: "dashboards",
  initialState,
  reducers: {
    setDashboards(state, action: PayloadAction<Dashboard[]>) {
      state.all = Object.fromEntries(action.payload.map((d) => [d.id, d]));
    },
    setDashboardTitles(
      state,
      action: PayloadAction<{ id: string; title: string }[]>
    ) {
      state.dashboardTitles = action.payload;
    },
    addDashboard(state, action: PayloadAction<Dashboard>) {
      state.all[action.payload.id] = action.payload;
      state.dashboardTitles.push({
        id: action.payload.id,
        title: action.payload.name,
      });
    },
    addChart(
      state,
      action: PayloadAction<{ id: string; chart: Chart; chartLayout: Layout }>
    ) {
      state.all[action.payload.id].charts.push(action.payload.chart);
      state.all[action.payload.id].layout.push(action.payload.chartLayout);
    },
    updateDashboardLayout(
      state,
      action: PayloadAction<{ id: string; layout: Layout[] }>
    ) {
      state.all[action.payload.id].layout = action.payload.layout;
    },
    updateDashboardCharts(
      state,
      action: PayloadAction<{ id: string; charts: Chart[] }>
    ) {
      state.all[action.payload.id].charts = action.payload.charts;
    },
    updateDashboardName(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      if (state.all[action.payload.id]) {
        state.all[action.payload.id].name = action.payload.name;
        state.dashboardTitles = state.dashboardTitles.map((title) =>
          title.id === action.payload.id
            ? { ...title, title: action.payload.name }
            : title
        );
      }
    },
    deleteDashboard(state, action: PayloadAction<{ id: string }>) {
      delete state.all[action.payload.id];
      state.dashboardTitles = state.dashboardTitles.filter(
        (title) => title.id !== action.payload.id
      );
    },
    deleteChart(state, action: PayloadAction<{ id: string; chartId: string }>) {
      const dashboardId = action.payload.id;
      const chartId = action.payload.chartId;
      console.log(dashboardId, chartId);
      state.all[dashboardId].charts = state.all[dashboardId].charts.filter(
        (chart) => chart.id !== chartId
      );
      state.all[dashboardId].layout = state.all[dashboardId].layout.filter(
        (item) => item.i !== chartId
      );
    },
  },
});

export const {
  setDashboards,
  updateDashboardLayout,
  updateDashboardCharts,
  updateDashboardName,
  addDashboard,
  setDashboardTitles,
  addChart,
  deleteDashboard,
  deleteChart,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
