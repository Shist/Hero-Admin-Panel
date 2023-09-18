const initialState = {
  heroes: [],
  loadingStatus: "idle",
  filters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        loadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        loadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        loadingStatus: "fetch-error",
      };
    case "HEROES_DELETING_ERROR":
      return {
        ...state,
        loadingStatus: "delete-error",
      };
    case "HEROES_SENDING_ERROR":
      return {
        ...state,
        loadingStatus: "send-error",
      };
    case "FILTERS_FETCHING":
      return {
        ...state,
        loadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        loadingStatus: "idle",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        loadingStatus: "fetch-error",
      };
    default:
      return state;
  }
};

export default reducer;
