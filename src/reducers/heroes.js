const initialState = {
  heroesArr: [],
  loadingStatus: "idle",
};

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        loadingStatus: "fetching",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroesArr: action.payload,
        loadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        loadingStatus: "fetch-error",
      };
    case "HERO_DELETING":
      return {
        ...state,
        loadingStatus: "deleting",
      };
    case "HERO_DELETED":
      return {
        ...state,
        heroesArr: state.heroesArr.filter((item) => item.id !== action.payload),
        loadingStatus: "idle",
      };
    case "HERO_DELETING_ERROR":
      return {
        ...state,
        loadingStatus: "delete-error",
      };
    case "HERO_CREATING":
      return {
        ...state,
        loadingStatus: "creating",
      };
    case "HERO_CREATED":
      return {
        ...state,
        heroesArr: [...state.heroesArr, action.payload],
        loadingStatus: "idle",
      };
    case "HERO_CREATING_ERROR":
      return {
        ...state,
        loadingStatus: "create-error",
      };
    default:
      return state;
  }
};

export default heroes;
