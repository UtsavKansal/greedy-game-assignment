import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
  data: {
    app_id: string;
    app_name: string;
  }[];
};

// First approach: define the initial state using that type
const initialState: SliceState = { data: [{ app_id: "", app_name: "" }] };

const AppSlice = createSlice({
  name: "allApps",
  initialState, // type SliceState is inferred for the state of the slice
  reducers: {
    saveAllApps: (state, action: PayloadAction<SliceState>) => {
      state.data = action.payload.data;
    },
  },
});

export const AppReducers = AppSlice.reducer;
export const AppActions = AppSlice.actions;
