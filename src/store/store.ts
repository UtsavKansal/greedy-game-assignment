import { configureStore } from "@reduxjs/toolkit";
import { AppReducers } from "./AppSlice";
import { MetricReducers } from "./MetricSlice";

const store = configureStore({
  reducer: {
    app: AppReducers,
    metric: MetricReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
