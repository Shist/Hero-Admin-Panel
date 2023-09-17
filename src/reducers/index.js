const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "fetch-error",
      };
    case "HEROES_DELETING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "delete-error",
      };
    case "HEROES_SENDING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "send-error",
      };
    default:
      return state;
  }
};

export default reducer;
