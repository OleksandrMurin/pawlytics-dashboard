import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  layout: Array<{ i: string; x: number; y: number; w: number; h: number }>;
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
          title: "Transport prices",
          metric: "roomsPopularity",
          chartType: "bar",
          filters: false,
          data: {
            Japan: {
              plane: 5,
              helicopter: 214,
              boat: 131,
              train: 168,
              subway: 6,
              bus: 211,
              car: 77,
              moto: 274,
              bicycle: 69,
              horse: 35,
              skateboard: 112,
              others: 181,
            },

            France: {
              plane: 42,
              helicopter: 61,
              boat: 94,
              train: 105,
              subway: 195,
              bus: 223,
              car: 230,
              moto: 251,
              bicycle: 216,
              horse: 69,
              skateboard: 282,
              others: 228,
            },
            USA: {
              plane: 87,
              helicopter: 221,
              boat: 9,
              train: 107,
              subway: 76,
              bus: 65,
              car: 3,
              moto: 211,
              bicycle: 5,
              horse: 183,
              skateboard: 26,
              others: 219,
            },
            Germany: {
              plane: 156,
              helicopter: 54,
              boat: 152,
              train: 173,
              subway: 0,
              bus: 38,
              car: 13,
              moto: 261,
              bicycle: 208,
              horse: 85,
              skateboard: 184,
              others: 290,
            },
            Norway: {
              plane: 65,
              helicopter: 146,
              boat: 94,
              train: 96,
              subway: 42,
              bus: 49,
              car: 36,
              moto: 130,
              bicycle: 151,
              horse: 84,
              skateboard: 89,
              others: 243,
            },
          },
        },
      ],
    },
  },
  dashboardTitles: [],
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
    updateDashboardLayout(
      state,
      action: PayloadAction<{ id: string; layout: Dashboard["layout"] }>
    ) {
      state.all[action.payload.id].layout = action.payload.layout;
    },
    updateDashboardCharts(
      state,
      action: PayloadAction<{ id: string; charts: Chart[] }>
    ) {
      state.all[action.payload.id].charts = action.payload.charts;
    },
  },
});

export const {
  setDashboards,
  updateDashboardLayout,
  updateDashboardCharts,
  addDashboard,
  setDashboardTitles,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
