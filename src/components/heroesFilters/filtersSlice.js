import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtersArr: [],
  loadingStatus: "idle",
  activeFilter: "all",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.loadingStatus = "fetching";
    },
    filtersFetched: (state, action) => {
      state.filtersArr = action.payload;
      state.loadingStatus = "idle";
    },
    filtersFetchingError: (state) => {
      state.loadingStatus = "fetch-error";
    },
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;
export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  activeFilterChanged,
} = actions;
