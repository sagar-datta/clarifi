import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../slices/ui/slice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
  // Adding middleware for development tools
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
