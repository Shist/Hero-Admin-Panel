import { configureStore } from "@reduxjs/toolkit";
import heroes from "../components/heroesList/heroesSlice";
import filters from "../components/heroesFilters/filtersSlice";

const stringMiddleware = () => (nextFunction) => (action) => {
  if (typeof action === "string") {
    return nextFunction({
      type: action,
    });
  }
  return nextFunction(action);
};

const store = configureStore({
  reducer: { heroes, filters },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
