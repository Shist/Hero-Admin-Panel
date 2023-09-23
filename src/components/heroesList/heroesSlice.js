import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({ loadingStatus: "idle" });

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/heroes");
});

export const deleteHero = createAsyncThunk(
  "heroes/deleteHero",
  async (id, { dispatch }) => {
    const { request } = useHttp();
    return await request(`http://localhost:3001/heroes/${id}`, "DELETE").then(
      (promise) => {
        dispatch(heroDeleted(id));
        return promise;
      }
    );
  }
);

export const createHero = createAsyncThunk(
  "heroes/createHero",
  async ({ newHero, resetForm }) => {
    const { request } = useHttp();
    return await request(
      `http://localhost:3001/heroes`,
      "POST",
      JSON.stringify(newHero)
    ).then((promise) => {
      resetForm();
      return promise;
    });
  }
);

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroDeleted: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
      state.loadingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loadingStatus = "fetching";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        heroesAdapter.setAll(state, action.payload);
        state.loadingStatus = "idle";
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.loadingStatus = "fetch-error";
      })
      .addCase(deleteHero.pending, (state) => {
        state.loadingStatus = "deleting";
      })
      .addCase(deleteHero.fulfilled, (state) => {
        state.loadingStatus = "idle";
      })
      .addCase(deleteHero.rejected, (state) => {
        state.loadingStatus = "delete-error";
      })
      .addCase(createHero.pending, (state) => {
        state.loadingStatus = "creating";
      })
      .addCase(createHero.fulfilled, (state, action) => {
        heroesAdapter.addOne(state, action.payload);
        state.loadingStatus = "idle";
      })
      .addCase(createHero.rejected, (state) => {
        state.loadingStatus = "create-error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

export const filteredHeroesSelector = createSelector(
  (state) => state.filters.activeFilter,
  selectAll,
  (activeFilter, heroesArr) => {
    if (activeFilter === "all") {
      return heroesArr;
    } else {
      return heroesArr.filter((item) => item.element === activeFilter);
    }
  }
);

export const { heroDeleted } = actions;
