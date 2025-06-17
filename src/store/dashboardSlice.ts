import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Chart {
  id: string;
  title: string;
  metric: string;
  chartType: "bar" | "line" | "pie";
  entity: string;
  filters: boolean;
  data: string;
}

export interface Dashboard {
  id: string;
  name: string;
  layout: Array<{ i: string; x: number; y: number; w: number; h: number }>;
  charts: Chart[];
}

interface DashboardState {
  all: Record<string, Dashboard>;
}

const initialState: DashboardState = {
  all: {},
};

const dashboardSlice = createSlice({
  name: "dashboards",
  initialState,
  reducers: {
    setDashboards(state, action: PayloadAction<Dashboard[]>) {
      state.all = Object.fromEntries(action.payload.map((d) => [d.id, d]));
    },
    addDashboard(state, action: PayloadAction<Dashboard>) {
      state.all[action.payload.id] = action.payload;
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
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
