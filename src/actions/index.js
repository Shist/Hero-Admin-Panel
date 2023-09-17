export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroesDeletingError = () => {
  return {
    type: "HEROES_DELETING_ERROR",
  };
};

export const heroesSendingError = () => {
  return {
    type: "HEROES_SENDING_ERROR",
  };
};
