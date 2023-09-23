import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroesArr: [],
  loadingStatus: "idle",
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesFetching: (state) => {
      state.loadingStatus = "fetching";
    },
    heroesFetched: (state, action) => {
      state.heroesArr = action.payload;
      state.loadingStatus = "idle";
    },
    heroesFetchingError: (state) => {
      state.loadingStatus = "fetch-error";
    },
    heroDeleting: (state) => {
      state.loadingStatus = "deleting";
    },
    heroDeleted: (state, action) => {
      state.heroesArr = state.heroesArr.filter(
        (item) => item.id !== action.payload
      );
      state.loadingStatus = "idle";
    },
    heroDeletingError: (state) => {
      state.loadingStatus = "delete-error";
    },
    heroCreating: (state) => {
      state.loadingStatus = "creating";
    },
    heroCreated: (state, action) => {
      state.heroesArr.push(action.payload);
      state.loadingStatus = "idle";
    },
    heroCreatingError: (state) => {
      state.loadingStatus = "create-error";
    },
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleting,
  heroDeleted,
  heroDeletingError,
  heroCreating,
  heroCreated,
  heroCreatingError,
} = actions;
