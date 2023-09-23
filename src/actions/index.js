export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

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

export const deleteHero = (request, id) => (dispatch) => {
  dispatch(heroDeleting());
  request(`http://localhost:3001/heroes/${id}`, "DELETE")
    .then(() => dispatch(heroDeleted(id)))
    .catch(() => dispatch(heroDeletingError()));
};

export const heroDeleting = () => {
  return {
    type: "HERO_DELETING",
  };
};

export const heroDeleted = (id) => {
  return {
    type: "HERO_DELETED",
    payload: id,
  };
};

export const heroDeletingError = () => {
  return {
    type: "HERO_DELETING_ERROR",
  };
};

export const createHero = (request, newHero, resetForm) => (dispatch) => {
  dispatch(heroCreating());
  request(`http://localhost:3001/heroes`, "POST", JSON.stringify(newHero))
    .then(() => {
      resetForm();
      dispatch(heroCreated(newHero));
    })
    .catch(() => dispatch(heroCreatingError()));
};

export const heroCreating = () => {
  return {
    type: "HERO_CREATING",
  };
};

export const heroCreated = (hero) => {
  return {
    type: "HERO_CREATED",
    payload: hero,
  };
};

export const heroCreatingError = () => {
  return {
    type: "HERO_CREATING_ERROR",
  };
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3001/filters")
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};

export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};

export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};

export const activeFilterChanged = (newActiveFilter) => {
  return {
    type: "ACTIVE_FILTER_CHANGED",
    payload: newActiveFilter,
  };
};

// Example of using Redux-Thunk
// export const activeFilterChanged = (newActiveFilter) => (dispatch) => {
//   setTimeout(() => {
//     dispatch({
//       type: "ACTIVE_FILTER_CHANGED",
//       payload: newActiveFilter,
//     });
//   }, 1000);
// };
