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
        { i: "chart-2", x: 4, y: 0, w: 8, h: 3 },
      ],
      charts: [
        {
          id: "chart-1",
          title: "roomsPopularityData",
          metric: "roomsPopularity",
          chartType: "line",
          filters: false,
          data: {
            "101": {
              January: 110,
              February: 230,
              March: 400,
            },
            "102": {
              January: 200,
              February: 300,
              March: 250,
            },
            "103": {
              January: 310,
              February: 280,
              March: 370,
            },
            "104": {
              January: 300,
              February: 300,
              March: 300,
            },
            "105": {
              January: 200,
              February: 200,
              March: 400,
            },
          },
        },
        {
          id: "chart-2",
          title: "Transport prices",
          metric: "roomsPopularity",
          chartType: "bar",
          filters: false,
          data: {
            japan: {
              plane: 275,
              helicopter: 248,
              boat: 196,
              train: 296,
              subway: 196,
              bus: 234,
              car: 118,
              moto: 2,
              bicycle: 61,
              horse: 55,
              skateboard: 169,
              others: 169,
            },
            france: {
              plane: 176,
              helicopter: 48,
              boat: 40,
              train: 4,
              subway: 116,
              bus: 276,
              car: 289,
              moto: 69,
              bicycle: 85,
              horse: 282,
              skateboard: 106,
              others: 228,
            },
            us: {
              plane: 51,
              helicopter: 211,
              boat: 25,
              train: 251,
              subway: 83,
              bus: 80,
              car: 185,
              moto: 29,
              bicycle: 221,
              horse: 14,
              skateboard: 263,
              others: 23,
            },
            germany: {
              plane: 274,
              helicopter: 9,
              boat: 119,
              train: 142,
              subway: 152,
              bus: 25,
              car: 195,
              moto: 24,
              bicycle: 188,
              horse: 201,
              skateboard: 215,
              others: 293,
            },
            norway: {
              plane: 26,
              helicopter: 27,
              boat: 270,
              train: 157,
              subway: 198,
              bus: 285,
              car: 147,
              moto: 278,
              bicycle: 25,
              horse: 121,
              skateboard: 196,
              others: 18,
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
    addChart(state, action: PayloadAction<{ id: string; chart: Chart }>) {
      state.all[action.payload.id].charts.push(action.payload.chart);
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
