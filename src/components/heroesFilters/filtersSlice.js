import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  filtersArr: [],
  loadingStatus: "idle",
  activeFilter: "all",
};

export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/filters");
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    activeFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.loadingStatus = "fetching";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersArr = action.payload;
        state.loadingStatus = "idle";
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.loadingStatus = "fetch-error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { activeFilterChanged } = actions;
