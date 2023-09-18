const initialState = {
  filtersArr: [],
  loadingStatus: "idle",
  activeFilter: "all",
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case "FILTERS_FETCHING":
      return {
        ...state,
        loadingStatus: "fetching",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filtersArr: action.payload,
        loadingStatus: "idle",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        loadingStatus: "fetch-error",
      };
    case "ACTIVE_FILTER_CHANGED":
      return {
        ...state,
        activeFilter: action.payload,
      };
    default:
      return state;
  }
};

export default filters;
