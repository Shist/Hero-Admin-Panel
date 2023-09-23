import { configureStore } from "@reduxjs/toolkit";
import filters from "../components/heroesFilters/filtersSlice";
import { apiSlice } from "../api/apiSlice";

const stringMiddleware = () => (nextFunction) => (action) => {
  if (typeof action === "string") {
    return nextFunction({
      type: action,
    });
  }
  return nextFunction(action);
};

const store = configureStore({
  reducer: { filters, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
