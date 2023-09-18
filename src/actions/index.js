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
