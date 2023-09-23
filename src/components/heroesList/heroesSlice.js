import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  heroesArr: [],
  loadingStatus: "idle",
};

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
      state.heroesArr = state.heroesArr.filter(
        (item) => item.id !== action.payload
      );
      state.loadingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.loadingStatus = "fetching";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesArr = action.payload;
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
        state.heroesArr.push(action.payload);
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
export const { heroDeleted } = actions;
