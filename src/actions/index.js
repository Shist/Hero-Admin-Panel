import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroDeleting,
  heroDeleted,
  heroDeletingError,
  heroCreating,
  heroCreated,
  heroCreatingError,
} from "../components/heroesList/heroesSlice";
import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from "../components/heroesFilters/filtersSlice";

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const deleteHero = (request, id) => (dispatch) => {
  dispatch(heroDeleting());
  request(`http://localhost:3001/heroes/${id}`, "DELETE")
    .then(() => dispatch(heroDeleted(id)))
    .catch(() => dispatch(heroDeletingError()));
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

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3001/filters")
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};
