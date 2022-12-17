import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SliceState = {
  selectedMetrics: string[];
  metrics: string[];
};

// First approach: define the initial state using that type
const initialState: {
  selectedMetrics: SliceState["selectedMetrics"];
  metrics: SliceState["metrics"];
} = {
  selectedMetrics: [
    "date",
    "app_id",
    "requests",
    "responses",
    "impressions",
    "clicks",
    "revenue",
    "fill_rate",
    "ctr",
  ],
  metrics: [
    "date",
    "app_id",
    "requests",
    "responses",
    "impressions",
    "clicks",
    "revenue",
    "fill_rate",
    "ctr",
  ],
};

const MetricSlice = createSlice({
  name: "metrics",
  initialState, // type SliceState is inferred for the state of the slice
  reducers: {
    setSelectedMetrics: (state, action: PayloadAction<string[]>) => {
      state.selectedMetrics = action.payload;
    },
    setMetrics: (state, action: PayloadAction<string[]>) => {
      state.metrics = action.payload;
    },
  },
});

export const MetricReducers = MetricSlice.reducer;
export const MetricActions = MetricSlice.actions;
