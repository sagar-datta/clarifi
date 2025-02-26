import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // Add reducers here as we create them
  },
  // Adding middleware for development tools
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
